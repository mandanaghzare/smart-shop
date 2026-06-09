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
      <div className="min-h-screen bg-slate-100 px-8 py-12 transition-colors dark:bg-slate-950">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Profile Dashboard
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your account and view your activity.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-800 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>

            <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
              {user.email}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/cart"
              className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Cart Items
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {cartItems.length}
              </p>
            </Link>

            <Link
              href="/wishlist"
              className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Wishlist
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {wishlistItems.length}
              </p>
            </Link>

            <Link
              href="/orders"
              className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Orders
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {orderItems.length}
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
}
export default ProfilePage