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
    const increaseQuantity= useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    if(!user) {
      return <LoginRequired />
    }
    return (
      <div className="min-h-screen bg-gray-50 px-8 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-6
                    rounded-2xl border border-gray-200
                    p-5
                    shadow-sm
                    transition
                    hover:shadow-md
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
                      object-cover
                    "
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Unit Price: ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="
                        h-9 w-9
                        rounded-lg border
                        hover:bg-gray-100
                        cursor-pointer
                      "
                    >
                      +
                    </button>

                    <span className="font-medium min-w-[60px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="
                        h-9 w-9
                        rounded-lg border
                        hover:bg-gray-100
                        cursor-pointer
                      "
                    >
                      -
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="
                      rounded-lg p-2
                      text-red-500
                      hover:bg-red-50
                      transition
                      cursor-pointer
                    "
                  >
                    <FaTrash />
                  </button>

                  <p className="min-w-[90px] text-right text-lg font-bold text-gray-900">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t pt-6 text-2xl font-bold">
            <span>Subtotal</span>
            <span>${subTotal}</span>
          </div>

          <Link
            href="/checkout"
            className="
              mt-6 block w-full
              rounded-xl
              bg-blue-600
              py-3
              text-center
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-blue-700
            "
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
}
export default CartPage