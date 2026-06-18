'use server'

import { db } from "@/db";
import { applications, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { summarizeJobDescription, generateJobEmbedding } from "@/lib/ai";
import { revalidatePath } from "next/cache";

export async function processApplicationWithAI(applicationId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const [app] = await db.select().from(applications).where(eq(applications.id, applicationId));
  if (!app || !app.jobDescription) return;

  // 1. Summarize the job description
  const summary = await summarizeJobDescription(app.jobDescription);
  
  // 2. Update the application notes with the summary
  await db.update(applications)
    .set({ notes: (app.notes || '') + '\n\n--- AI Summary ---\n' + summary })
    .where(eq(applications.id, applicationId));

  // 3. Generate and store embeddings for RAG search
  await generateJobEmbedding(applicationId, app.jobDescription);

  revalidatePath("/dashboard");
}
