"use client"

import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { FaTrash } from "react-icons/fa"
import LoginRequired from "../login/LoginRequired"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"



const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    const user = useAuthStore((state) => state.user)
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const increaseQuantity= useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    if (!hasHydrated) {
      return null;
    }
    if(!user) {
      return <LoginRequired />
    }
    return (
      <div className="min-h-screen bg-slate-100 px-4 pb-12 pt-24 transition-colors dark:bg-slate-950 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-4 py-12 text-center dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-slate-500 dark:text-slate-400">Cart is empty</p>

              <Link
                href="/products"
                className="mt-6 inline-block rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-24 w-24 shrink-0 rounded-xl bg-slate-700 object-contain p-3"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-base font-bold leading-6 text-slate-100">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        Unit Price: ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 text-slate-200 transition hover:bg-slate-700"
                      >
                        -
                      </button>

                      <span className="min-w-6 text-center font-semibold text-slate-100">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 text-slate-200 transition hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-slate-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => {
                          removeFromCart(item.id)
                          toast.info("Item removed from cart");
                        }}
                        aria-label="Remove item"
                        className="rounded-lg p-2 text-rose-400 transition hover:bg-rose-950"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-slate-200 pt-6 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100 sm:text-2xl">
            <span>Subtotal</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-xl bg-slate-800 py-3 text-center font-semibold text-slate-100 shadow-md transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
}
export default CartPage