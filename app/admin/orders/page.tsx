"use client"
import { useOrderStore } from "@/store/orderStore";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const statusFilters = [
    "All",
    "processing",
    "delivered",
    "cancelled",
  ];
  
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.createdAt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" ||
        order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus]);

  console.log(filteredOrders);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 lg:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedStatus === status
                  ? "bg-gray-950 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {filteredOrders.length > 0 ? (
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Created At</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 text-sm transition hover:bg-gray-50"
                >
                  <td className="py-4 font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </td>

                  <td className="py-4 text-gray-600">
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </td>

                  <td className="py-4 font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4 text-gray-600">{order.createdAt}</td>

                  <td className="py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-10 text-center">
            <h3 className="font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}