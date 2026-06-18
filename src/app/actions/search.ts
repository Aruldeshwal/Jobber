'use server'

import { db } from "@/db";
import { applications, applicationEmbeddings } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { sql } from "drizzle-orm";

export async function smartSearchApplications(query: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. Generate embedding for the search query
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: query,
  });

  // 2. Perform vector similarity search
  // We use cosine similarity (1 - vector_distance)
  // NeonDB pgvector uses <=> for cosine distance
  const results = await db.execute(sql`
    SELECT a.*, (1 - (ae.embedding <=> ${JSON.stringify(embedding)}::vector)) as similarity
    FROM ${applications} a
    JOIN ${applicationEmbeddings} ae ON a.id = ae.application_id
    WHERE a.user_id = ${userId}
    ORDER BY similarity DESC
    LIMIT 5
  `);

  return results as any[];
}

export async function updateApplicationStatus(id: string, status: string) {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    
    await db.update(applications)
        .set({ status })
        .where(sql`${applications.id} = ${id} AND ${applications.userId} = ${userId}`);
}
