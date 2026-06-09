"use client"

import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { FaTrash } from "react-icons/fa"
import LoginRequired from "../login/LoginRequired"
import { useAuthStore } from "@/store/authStore"



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
      <div className="min-h-screen bg-slate-100 px-8 py-12 transition-colors dark:bg-slate-950">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">Cart is empty</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-6
                    rounded-2xl border border-slate-200
                    bg-slate-100
                    p-5
                    shadow-sm
                    transition
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-800
                    dark:hover:shadow-slate-950/50
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="
                      h-28 w-28
                      rounded-xl
                      bg-slate-200
                      object-contain
                      p-2
                      dark:bg-slate-700
                    "
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Unit Price: ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="
                        h-9 w-9
                        cursor-pointer
                        rounded-lg border border-slate-300
                        text-slate-700
                        transition
                        hover:bg-slate-200
                        dark:border-slate-700
                        dark:text-slate-200
                        dark:hover:bg-slate-700
                      "
                    >
                      +
                    </button>

                    <span className="min-w-15 text-center font-medium text-slate-900 dark:text-slate-100">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="
                        h-9 w-9
                        cursor-pointer
                        rounded-lg border border-slate-300
                        text-slate-700
                        transition
                        hover:bg-slate-200
                        dark:border-slate-700
                        dark:text-slate-200
                        dark:hover:bg-slate-700
                      "
                    >
                      -
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="
                      cursor-pointer
                      rounded-lg p-2
                      text-rose-600
                      transition
                      hover:bg-rose-100
                      dark:text-rose-400
                      dark:hover:bg-rose-950
                    "
                  >
                    <FaTrash />
                  </button>

                  <p className="min-w-22.5 text-right text-lg font-bold text-slate-900 dark:text-slate-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-slate-200 pt-6 text-2xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
            <span>Subtotal</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="
              mt-6 block w-full
              rounded-xl
              bg-slate-800
              py-3
              text-center
              font-semibold
              text-slate-100
              shadow-md
              transition
              hover:bg-slate-700
              dark:bg-slate-700
              dark:hover:bg-slate-600
            "
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
}
export default CartPage