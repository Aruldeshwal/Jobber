'use server'

import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function getAnalyticsData() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. Get status counts for the funnel
  const statusCounts = await db
    .select({
      status: applications.status,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(applications)
    .where(eq(applications.userId, userId))
    .groupBy(applications.status);

  // 2. Get applications over time (last 30 days)
  const timelineData = await db.execute(sql`
    SELECT 
      date_trunc('day', applied_date) as date,
      count(*) as count
    FROM ${applications}
    WHERE user_id = ${userId}
      AND applied_date > now() - interval '30 days'
    GROUP BY date
    ORDER BY date ASC
  `);

  return {
    statusCounts,
    timelineData: timelineData as any[],
  };
}
