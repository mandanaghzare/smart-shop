"use client"
import { useCartStore } from "@/store/cartStore"
import { useOrderStor } from "@/store/orderStore"
import { CartItem } from "@/store/cartStore";
import { useState } from "react"
import Link from "next/link";


const CheckoutPage = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    const clearCart = useCartStore((state) => state.clearCart)
    const subTotal = cartItems.reduce((total,item) => total + item.price * item.quantity , 0)
    const shipping = subTotal > 200 ? 0 : 20
    const total = subTotal + shipping
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)
    const addOrder = useOrderStor((state) => state.addOrder)

    const handlePlaceOrder = () => {
        const latestCart = JSON.parse(localStorage.getItem("cart-storage") || "{}");
        const latestItems: CartItem[] = latestCart?.state?.cartItems || [];

        if (latestItems.length === 0) {
            alert("Your cart is already empty.");
            clearCart();
            return;
        }

        const latestSubtotal = latestItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const latestShipping = latestSubtotal > 200 ? 0 : 20;
        const latestTotal = latestSubtotal + latestShipping;

        addOrder(latestItems, latestTotal);
        clearCart();
        setIsOrderPlaced(true);
    };

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-12 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
            {isOrderPlaced ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    ✓
                </div>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Order placed successfully!
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Thank you for your purchase. Your order has been saved.
                </p>
                </div>
            ) : cartItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Your cart is empty
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Add some products to your cart before checkout.
                </p>
                </div>
            ) : (
                <>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    Checkout
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Review your order before placing it.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Order Items
                    </h2>

                    <div className="mt-6 space-y-4">
                        {cartItems.map((item) => (
                        <Link
                            href={`/products/${item.id}`}
                            target="_blank"
                            key={item.id}
                            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                            <div className="min-w-0">
                            <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                                {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Quantity: {item.quantity}
                            </p>
                            </div>

                            <p className="shrink-0 font-bold text-slate-900 dark:text-slate-100">
                            ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </Link>
                        ))}
                    </div>
                    </section>

                    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Order Summary
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Items</span>
                        <span>{cartItems.length}</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Subtotal</span>
                        <span>${subTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                        <div className="flex items-center justify-between text-2xl font-bold text-slate-900 dark:text-slate-100">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        type="button"
                        className="mt-8 w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                        Place Order
                    </button>
                    </aside>
                </div>
                </>
            )}
            </div>
        </div>
    );
}
export default CheckoutPage