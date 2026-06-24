"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";

export default function OrderDetailsPage() {
    const params = useParams<{ id: string }>();
    const orders = useOrderStore((state) => state.orders); 
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus )


    const order = orders.find((order) => order.id === params.id);

    if (!order) {
        return (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-lg font-semibold text-gray-900">
            Order not found
            </h1>

            <Link
            href="/admin/orders"
            className="mt-4 inline-flex rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
            Back to Orders
            </Link>
        </div>
        );
    }

    return (
        <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
            <div>
            <p className="text-sm text-gray-500">Order Details</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
                #{order.id.slice(0, 8)}
            </h1>
            </div>

            <Link
            href="/admin/orders"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
            Back to Orders
            </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">
                Status
            </p>
            <select
                value={order.status}
                onChange={(e) =>
                    updateOrderStatus(
                    order.id,
                    e.target.value as
                        | "processing"
                        | "delivered"
                        | "cancelled"
                    )
                }
                className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                >
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">
                Date
            </p>
            <p className="mt-2 font-semibold text-gray-900">{order.createdAt}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">
                Total
            </p>
            <p className="mt-2 font-semibold text-gray-900">
                ${order.total.toFixed(2)}
            </p>
            </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Ordered Items</h2>

            <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[650px]">
                <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Subtotal</th>
                </tr>
                </thead>

                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 text-sm">
                    <td className="py-4">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">
                        {item.brand ?? "Unknown"}
                        </p>
                    </td>

                    <td className="py-4 text-gray-700">
                        ${item.price.toFixed(2)}
                    </td>

                    <td className="py-4 text-gray-700">{item.quantity}</td>

                    <td className="py-4 font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}