"use client"
import { useAuthStore } from "@/store/authStore"
import { useWishlist } from "@/store/wishlistStore"
import Image from "next/image"
import LoginRequired from "../login/LoginRequired"
import Link from "next/link"
import { products } from "@/data/products"


const WishistPage = () => {
    const user = useAuthStore((state) => state.user)
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const wishlistItems = useWishlist((state) => state.wishlistItems)
    const removeFromWishlist = useWishlist((state) => state.removeFromWishlist)

    if (!hasHydrated) {
        return null;
    }
    
    if (!user) {
        return <LoginRequired />
    }
    return (
        <div className="min-h-screen bg-slate-100 px-6 py-12 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
                Wish List
            </h1>

            {wishlistItems.length === 0 ? (
                <div
                    className="
                        rounded-2xl
                        border border-dashed border-slate-300
                        bg-slate-50
                        py-12
                        text-center
                        dark:border-slate-700
                        dark:bg-slate-900"
                    >
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Your wishlist is empty
                    </h2>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Save products you love and find them here later.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                {wishlistItems.map((item) => (
                    <Link
                    href={`/products/${item.id}`}
                    key={item.id}
                    className="
                        flex items-center justify-between gap-4
                        rounded-xl border border-slate-200
                        bg-slate-100 p-4
                        transition
                        hover:shadow-md
                        dark:border-slate-800
                        dark:bg-slate-800
                    "
                    >
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                        </h2>

                        <p className="mt-1 font-medium text-slate-600 dark:text-slate-400">
                        ${item.price}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Image
                        src={item.image}
                        alt={item.title}
                        width={70}
                        height={70}
                        className="
                            rounded-xl
                            bg-slate-200
                            object-contain
                            p-2
                            shadow-md
                            transition-transform
                            duration-300
                            hover:scale-105
                            dark:bg-slate-700
                        "
                        />
                    </div>

                    <button
                        onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(item.id);
                        }}
                        className="
                        shrink-0
                        rounded-lg
                        bg-rose-600
                        px-4 py-2
                        text-sm font-semibold
                        text-slate-100
                        transition
                        hover:bg-rose-700
                        "
                    >
                        Delete
                    </button>
                    </Link>
                ))}
                </div>
            )}
            </div>
        </div>
    );
}

export default WishistPage;