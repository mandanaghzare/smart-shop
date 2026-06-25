"use client";

import { products } from "@/data/products";
import { users } from "@/data/users";
import { useOrderStore } from "@/store/orderStore";

export default function AnalyticsPage() {
  const orders = useOrderStore((state) => state.orders);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length;
  const processingOrders = orders.filter((order) => order.status === "processing").length;
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length;

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const lowStockProducts = products.filter((product) => product.stock < 10).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      description: "Revenue from all orders",
    },
    {
      title: "Total Orders",
      value: String(totalOrders),
      description: "All customer orders",
    },
    {
      title: "Average Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      description: "Revenue divided by orders",
    },
    {
      title: "Total Users",
      value: String(users.length),
      description: "Registered and demo users",
    },
    {
      title: "Total Products",
      value: String(products.length),
      description: "Products in catalog",
    },
    {
      title: "Low Stock",
      value: String(lowStockProducts),
      description: "Products below 10 units",
    },
  ];

  const statusStats = [
    {
      label: "Processing",
      value: processingOrders,
      className: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      className: "bg-green-100 text-green-700",
    },
    {
      label: "Cancelled",
      value: cancelledOrders,
      className: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-gray-500">
          Track Smart Shop performance using current demo data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {stat.value}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Orders by Status
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {statusStats.map((status) => (
            <div
              key={status.label}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
              >
                {status.label}
              </span>

              <p className="mt-3 text-2xl font-bold text-gray-900">
                {status.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}