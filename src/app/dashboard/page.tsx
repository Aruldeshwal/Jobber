import { AddApplicationModal } from "@/components/AddApplicationModal";
import { SmartSearch } from "@/components/SmartSearch";
import { KanbanBoard } from "@/components/KanbanBoard";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { syncUser } from "../actions/user";

export default async function DashboardPage() {
  await syncUser();
  const { userId } = auth();
  
  const userApplications = userId 
    ? await db.select().from(applications).where(eq(applications.userId, userId)).orderBy(desc(applications.appliedDate))
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Manage and track your job applications with AI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SmartSearch />
          <AddApplicationModal />
        </div>
      </div>

      <KanbanBoard initialApplications={userApplications} />
    </div>
  );
}
