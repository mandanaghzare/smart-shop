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

    return (
        <div className="min-h-screen bg-slate-100 px-8 py-12 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Orders
            </h1>

            {orderItems.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400">
                    No orders yet.
                </p>
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                {orderItems.map((order) => (
                    <div
                    key={order.id}
                    className="rounded-2xl border border-slate-200 bg-slate-100 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800"
                    >
                    <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                        <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Order
                        </p>

                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            #{order.id.slice(0, 4)}
                        </h2>
                        </div>

                        <span
                        className={`${statusStyles[order.status]} rounded-full px-3 py-1 text-sm font-medium`}
                        >
                        {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {order.items.map((item) => (
                        <Link
                            href={`/products/${item.id}`}
                            target="_blank"
                            key={item.id}
                            className="
                            block rounded-xl
                            border border-slate-200
                            bg-slate-50 p-4
                            transition
                            hover:bg-slate-200
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:hover:bg-slate-700
                            "
                        >
                            <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                                {item.title}
                                </h3>

                                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                                {item.description}
                                </p>
                            </div>

                            <p className="shrink-0 font-bold text-slate-900 dark:text-slate-100">
                                ${item.price.toFixed(2)}
                            </p>
                            </div>
                        </Link>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 dark:border-slate-700 sm:grid-cols-3">
                        <div className="text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Date
                        </p>

                        <p className="font-medium text-slate-900 dark:text-slate-100">
                            {order.createdAt}
                        </p>
                        </div>

                        <div className="text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Items
                        </p>

                        <p className="font-medium text-slate-900 dark:text-slate-100">
                            {order.items.length}
                        </p>
                        </div>

                        <div className="text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total
                        </p>

                        <p className="font-bold text-slate-900 dark:text-slate-100">
                            ${order.total.toFixed(2)}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    );
}

export default OrdersPage;