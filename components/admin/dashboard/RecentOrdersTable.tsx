"use client"
import { useOrderStore } from "@/store/orderStore";
import Link from "next/link";

export default function RecentOrdersTable() {
    const orders = useOrderStore((state) => state.orders);

    const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Orders
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Latest customer orders
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <thead>
                <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Amount
                </th>
                </tr>
            </thead>

            <tbody>
                {recentOrders.map((order) => (
                <tr
                    key={order.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        <Link
                            href={`/admin/orders/${order.id}`}
                            className="hover:text-blue-600"
                        >
                            #{order.id.slice(0, 8)}
                        </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                        {order.userName}
                    </td>

                    <td className="px-6 py-4">
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {order.total}
                    </td>
                </tr>
                ))}
            </tbody>
            {recentOrders.length === 0 && (
                <tr>
                    <td
                    colSpan={6}
                    className="py-8 text-center text-sm text-gray-500"
                    >
                    No recent orders yet.
                    </td>
                </tr>
            )}
        </table>
      </div>
    </div>
  );
}