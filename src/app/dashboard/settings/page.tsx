import ResumeUpload from "@/components/ResumeUpload";
import { getUserProfile } from "@/app/actions/user";

export default async function SettingsPage() {
  const user = await getUserProfile();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and AI configurations.
        </p>
      </div>

      <div className="grid gap-6">
        <ResumeUpload initialResume={user?.resumeUrl} />
        
        <Card className="opacity-50 grayscale cursor-not-allowed">
          <CardHeader>
            <CardTitle>AI Preferences</CardTitle>
            <CardDescription>Configure how the AI interacts with your data (Coming soon).</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
