"use client"
import { useCartStore } from "@/store/cartStore"
import { useOrderStor } from "@/store/orderStore"
import { CartItem } from "@/store/cartStore";
import { useState } from "react"


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
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {isOrderPlaced ? (
                <div>
                    <h1>Order placed successfully!</h1>
                    <p>Thank you for your purchase.</p>
                </div>
            ) :
            cartItems.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                Your cart is empty
                </p>
            ) : (
                <>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

                <h2 className="mt-6 text-lg font-semibold text-gray-800">
                    Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-gray-700">
                    <span>Number of items</span>
                    <span>{cartItems.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subTotal}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                    </div>

                    <div className="mt-6 border-t pt-6">
                    <div className="flex items-center justify-between text-2xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    </div>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    type="button"
                    className="mt-8 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Place Order
                </button>
                </>
            )}
            </div>
        </div>
        );
}
export default CheckoutPage