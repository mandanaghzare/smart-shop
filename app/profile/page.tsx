"use client"
import { useAuthStore } from "@/store/authStore"
import LoginRequired from "../login/LoginRequired"
import { useCartStore } from "@/store/cartStore"
import { useWishlist } from "@/store/wishlistStore"
import Link from "next/link"
import { useOrderStor } from "@/store/orderStore"

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user)
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const cartItems = useCartStore((state) => state.cartItems)
    const wishlistItems = useWishlist((state) => state.wishlistItems)
    const orderItems= useOrderStor((state) => state.orders)

    if (!hasHydrated) {
      return null;
    }
    
    if(!user) {
        return <LoginRequired />
    }
    return (
  <div className="min-h-screen bg-gray-50 px-8 py-12">
    <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Profile Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your account and view your activity.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm text-gray-500">Email</p>
        <p className="mt-1 font-semibold text-gray-900">
          {user.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/cart" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Cart Items</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {cartItems.length}
          </p>
        </Link>

        <Link href="/wishlist" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Wishlist</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {wishlistItems.length}
          </p>
        </Link>

        <Link href="/orders" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {orderItems.length}
          </p>
        </Link>
      </div>
    </div>
  </div>
);
}
export default ProfilePage