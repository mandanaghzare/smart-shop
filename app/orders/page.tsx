"use client"
import { useAuthStore } from "@/store/authStore";
import { useOrderStor } from "@/store/orderStore";
import Link from "next/link";
import LoginRequired from "../login/LoginRequired";

const OrdersPage = () => {
    const orderItems = useOrderStor((state) => state.orders)
   const user = useAuthStore((state) => state.user)
   const hasHydrated = useAuthStore((state) => state.hasHydrated);
   const statusStyles = {
        processing: "bg-yellow-100 text-yellow-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    }

    if (!hasHydrated) {
        return null;
    }
    
    if(!user) return <LoginRequired />

    return(
        <div className="min-h-screen bg-gray-50 px-8 py-12">
            <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

                {orderItems.length === 0 ? (
                    <p className="mt-4 text-gray-500">No orders yet.</p>
                    ) :
                    <div className="mt-6 space-y-6">
                        {orderItems.map((order) => (
                            <div
                            key={order.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                                <div>
                                <p className="text-sm text-gray-500">Order</p>
                                <h2 className="text-lg font-bold text-gray-900">
                                    #{order.id.slice(0, 4)}
                                </h2>
                                </div>

                                <span className={`${statusStyles[order.status]} px-3 py-1 rounded-full text-sm font-medium`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {order.items.map((item) => (
                                <Link
                                    href={`/products/${item.id}`}
                                    target="_blank"
                                    key={item.id}
                                    className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                        {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                        </p>
                                    </div>

                                    <p className="font-bold text-gray-900">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    </div>
                                </Link>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-3 border-t border-gray-200 pt-4 sm:grid-cols-3">
                                <div className="text-center">
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium text-gray-900">{order.createdAt}</p>
                                </div>

                                <div className="text-center">
                                <p className="text-sm text-gray-500">Items</p>
                                <p className="font-medium text-gray-900">{order.items.length}</p>
                                </div>

                                <div className="text-center">
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                }
            </div>
        </div>
    );
}

export default OrdersPage;