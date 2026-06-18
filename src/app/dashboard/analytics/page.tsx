import { getAnalyticsData } from "@/app/actions/analytics";
import AnalyticsClient from "@/components/AnalyticsClient";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Insight into your job search performance and trends.
        </p>
      </div>

      <AnalyticsClient data={data} />
    </div>
  );
}
