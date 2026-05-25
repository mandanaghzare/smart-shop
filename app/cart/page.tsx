"use client"

import { useCartStore } from "@/store/cartStore"


const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    return (
  <div className="min-h-screen bg-gray-50 px-8 py-12">
    <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="text-lg font-bold text-gray-900">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
export default CartPage