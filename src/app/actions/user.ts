'use server'

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const pdf = require("pdf-parse");

export async function syncUser() {
  const { userId } = auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  // Upsert user
  await db
    .insert(users)
    .values({
      id: userId,
      email: email,
      name: name,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: { email, name },
    });

  return userId;
}

export async function ensureUserExists() {
  return await syncUser();
}

export async function getUserProfile() {
  const { userId } = auth();
  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user;
}

export async function uploadAndParseResume(formData: FormData) {
  const userId = await ensureUserExists();
  if (!userId) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Parse PDF
  const data = await pdf(buffer);
  const text = data.text;

  // Update user in DB with parsed text
  await db.update(users)
    .set({ resumeUrl: text }) 
    .where(eq(users.id, userId));

  revalidatePath("/settings");
  return { success: true };
}
