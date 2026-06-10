"use client"
import { useAuthStore } from "@/store/authStore"
import { useWishlist } from "@/store/wishlistStore"
import Image from "next/image"
import LoginRequired from "../login/LoginRequired"
import Link from "next/link"


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
        <div className="min-h-screen bg-slate-100 px-4 pb-12 pt-24 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Wish List
                </h1>

                {wishlistItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-4 py-12 text-center dark:border-slate-700 dark:bg-slate-800/70">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            Your wishlist is empty
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                            Save products you love and find them here later.
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-block rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-slate-200 bg-slate-100 p-4 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
                            >
                                <div className="flex gap-4">
                                    <Link
                                        href={`/products/${item.id}`}
                                        className="shrink-0"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={96}
                                            height={96}
                                            className="h-24 w-24 rounded-xl bg-slate-200 object-contain p-3 shadow-md transition-transform duration-300 hover:scale-105 dark:bg-slate-700"
                                        />
                                    </Link>

                                    <div className="min-w-0 flex-1">
                                        <Link href={`/products/${item.id}`}>
                                            <h2 className="line-clamp-2 text-base font-bold leading-6 text-slate-900 transition hover:text-slate-700 dark:text-slate-100 dark:hover:text-white">
                                                {item.title}
                                            </h2>
                                        </Link>

                                        <p className="mt-2 font-semibold text-slate-600 dark:text-slate-400">
                                            ${item.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                                    <Link
                                        href={`/products/${item.id}`}
                                        className="flex-1 rounded-xl bg-slate-800 px-4 py-2.5 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishistPage;