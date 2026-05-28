"use client"

import { useCartStore } from "@/store/cartStore"



const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    const increaseQuantity= useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
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
                <button onClick={() => increaseQuantity(item.id)}> + </button>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <button onClick={() => decreaseQuantity(item.id)}> - </button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>🗑</button>
              <p className="text-lg font-bold text-gray-900">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-between border-t pt-4 text-xl font-bold">
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>
      <div className="checkout">
        <button></button>
      </div>
    </div>
  </div>
);
}
export default CartPage