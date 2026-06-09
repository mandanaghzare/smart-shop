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
    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                    Your wishlist is empty
                    </h1>
                    <p className="mt-2 text-gray-500">
                    Add products to save them for later.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Wish List</h1>

            <div className="space-y-4">
                {wishlistItems.map((item) => (
                <Link
                   href={`/products/${item.id}`}
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {item.title}
                        </h2>
                        <p className="mt-1 text-gray-600">${item.price}</p>
                    </div>
                    <div className="image">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={60}
                            height={60}
                            className="
                                rounded-2xl
                                object-cover
                                shadow-lg
                                transition-transform
                                duration-300
                                hover:scale-105
                                "
                        />
                    </div>
                    <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                    Delete
                    </button>
                </Link>
                ))}
            </div>
            </div>
        </div>
    )
}

export default WishistPage;