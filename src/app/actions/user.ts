'use server'

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import pdf from "pdf-parse";
import { revalidatePath } from "next/cache";

export async function uploadAndParseResume(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Parse PDF
  const data = await pdf(buffer);
  const text = data.text;

  // Update user in DB with parsed text (using resumeUrl field as a placeholder for text for now, or we could add a new field)
  // For simplicity, let's assume 'resumeUrl' stores the content or add a 'resumeText' field in a real migration
  await db.update(users)
    .set({ name: text.substring(0, 100), resumeUrl: text }) // Storing text in resumeUrl for now
    .where(eq(users.id, userId));

  revalidatePath("/settings");
  return { success: true };
}

export async function getUserProfile() {
  const { userId } = auth();
  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user;
}
