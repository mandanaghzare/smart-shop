"use client"
import { useOrderStor } from "@/store/orderStore";
import { useMemo, useState } from "react";

export default function OrdersPage() {
  const orders = useOrderStor((state) => state.orders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const statusFilters = ["All", "Completed", "Pending", "Cancelled"];
  
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.createdAt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

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
              className={`rounded-full px-4 cursor-pointer py-2 text-sm font-medium transition ${
              selectedStatus === status
                ? "bg-gray-950 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-950"
            }`}>
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}