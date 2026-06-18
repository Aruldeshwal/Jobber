'use server'

import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { syncUser } from "./user";

const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["applied", "interviewing", "offered", "rejected"]),
  jobDescription: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  salaryRange: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export async function createApplication(data: z.infer<typeof applicationSchema>) {
  await syncUser();
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedData = applicationSchema.parse(data);

  const [inserted] = await db.insert(applications).values({
    ...validatedData,
    userId,
  }).returning();

  // Trigger AI processing in the background (or await if you want immediate results)
  if (inserted.jobDescription) {
    // Note: In a real prod app, you might use a background job/queue
    const { processApplicationWithAI } = await import("./ai");
    await processApplicationWithAI(inserted.id);
  }

  revalidatePath("/dashboard");
}
