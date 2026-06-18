import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Briefcase, BarChart3, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Briefcase className="w-5 h-5" />
            </div>
            JobTracker AI
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Applications
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t flex items-center justify-between">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm font-medium">My Account</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-8 md:hidden">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <Briefcase className="w-5 h-5" />
              JobTracker
            </Link>
            <UserButton afterSignOutUrl="/" />
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
