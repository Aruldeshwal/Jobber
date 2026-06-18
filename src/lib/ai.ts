import { openai } from '@ai-sdk/openai';
import { generateText, embed } from 'ai';
import { db } from '@/db';
import { applicationEmbeddings } from '@/db/schema';

export async function summarizeJobDescription(description: string) {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: 'You are a professional career coach and recruiter. Summarize the following job description into key responsibilities, required skills, and "nice-to-have" qualifications. Be concise and use bullet points.',
    prompt: description,
  });
  return text;
}

export async function generateJobEmbedding(applicationId: string, content: string) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: content,
  });

  await db.insert(applicationEmbeddings).values({
    applicationId,
    content,
    embedding,
  });
}

export async function matchResumeToJob(resumeText: string, jobDescription: string) {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: 'You are an expert recruiter. Compare the user resume against the job description. Provide a compatibility score (0-100), identify matching skills, and list missing critical skills.',
    prompt: `Resume: ${resumeText}\n\nJob Description: ${jobDescription}`,
  });
  return text;
}
