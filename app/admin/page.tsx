
"use client"
import AnalyticsSummary from "@/components/admin/dashboard/AnalyticsSummary";
import KpiCard from "@/components/admin/dashboard/KpiCard";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import { useOrderStore } from "@/store/orderStore";
import usersData from "@/data/users.json";
import { products } from "@/data/products";
import LowStockProducts from "@/components/admin/dashboard/LowStockProducts";

export default function DashboardPage() {
  const orders = useOrderStore((state) => state.orders);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const totalOrders = orders.length;

  const totalUsers = usersData.users.length;

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
  (product) => product.stock < 10
).length;

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
        <KpiCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change="+0%"
          trend="up"
        />

        <KpiCard
          title="Orders"
          value={String(totalOrders)}
          change="+0%"
          trend="up"
        />

        <KpiCard
          title="Users"
          value={String(totalUsers)}
          change="+0%"
          trend="up"
        />

        <KpiCard
          title="Products"
          value={String(totalProducts)}
          change={`${lowStockProducts} Low Stock`}
          trend={lowStockProducts > 0 ? "down" : "up"}
        />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <AnalyticsSummary />
      </div>

      <RecentOrdersTable />
      <div className="mt-6">
        <LowStockProducts />
    </div>
    </div>
  );
}