
import AnalyticsSummary from "@/components/admin/dashboard/AnalyticsSummary";
import KpiCard from "@/components/admin/dashboard/KpiCard";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import { kpiStats } from "@/data/dashboard-data";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Manage Smart Shop performance, orders, and customers.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <KpiCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <AnalyticsSummary />
      </div>

      <RecentOrdersTable />
    </div>
  );
}