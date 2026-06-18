import { AddApplicationModal } from "@/components/AddApplicationModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const { userId } = auth();
  
  const userApplications = userId 
    ? await db.select().from(applications).where(eq(applications.userId, userId))
    : [];

  const columns = [
    { label: "Applied", value: "applied" },
    { label: "Interviewing", value: "interviewing" },
    { label: "Offer", value: "offered" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Manage and track your job applications.
          </p>
        </div>
        <AddApplicationModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {columns.map((column) => {
          const columnApps = userApplications.filter(app => app.status === column.value);
          
          return (
            <Card key={column.value} className="bg-slate-100/50 dark:bg-slate-900/50 border-dashed flex flex-col">
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {column.label}
                  <span className="text-xs bg-white dark:bg-slate-800 px-2 py-0.5 rounded border">
                    {columnApps.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {columnApps.length === 0 ? (
                  <div className="text-xs text-center text-muted-foreground py-10">
                    No applications yet.
                  </div>
                ) : (
                  columnApps.map(app => (
                    <Card key={app.id} className="p-3 text-sm shadow-sm">
                      <div className="font-bold">{app.company}</div>
                      <div className="text-muted-foreground">{app.role}</div>
                      {app.appliedDate && (
                        <div className="text-[10px] mt-2 opacity-50">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
