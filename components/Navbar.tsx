"use client"
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistStore";
import Link from "next/link";
import { useRouter } from "next/navigation";



const Navbar = () => {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const wishlistItems = useWishlist((state) => state.wishlistItems)
    const cartItems = useCartStore((state) => state.cartItems)
    const router = useRouter()
    const handleLogout = () => {
        logout()
        router.push("/")
    }
    return(
        <nav className="border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                    Smart Shop
                </Link>
                <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    <li>
                        <Link href="/" className="transition hover:text-gray-950">Home</Link>
                    </li>
                    <li>
                        <Link href="/products" className="transition hover:text-gray-950">Products</Link>
                    </li>
                    <li>
                        <Link href="/cart" className="transition hover:text-gray-950">Cart ({cartItems.length})</Link>
                    </li>
                    <li>
                        <Link href="/wishlist" className="transition hover:text-gray-950">Wish List ({wishlistItems.length})</Link>
                    </li>
                    <li>
                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link href="/profile" className="transition hover:text-gray-950">
                                Profile
                                </Link>

                                <button
                                onClick={handleLogout}
                                className="transition cursor-pointer hover:text-gray-950"
                                >
                                Logout
                                </button>
                            </div>
                            ) : (
                            <Link className="text-sm text-gray-700 hover:text-black" href="/login">
                                Login
                            </Link>
                        )}
                    </li>
                </ul>                
            </div>
        </nav>
    )
}

export default Navbar;