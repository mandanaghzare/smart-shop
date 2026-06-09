"use client"
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useThemeStore } from "@/store/themeStore";
import { useWishlist } from "@/store/wishlistStore";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



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
    const { darkMode, toggleTheme, initTheme } = useThemeStore();

    useEffect(() => {
        initTheme();
    }, [initTheme]);
    
    return (
        <nav
            className="
                fixed left-0 right-0 top-0 z-50
                border-b border-slate-200
                bg-slate-50/90
                px-8 py-4
                backdrop-blur-md
                transition-colors
                dark:border-slate-900
                dark:bg-slate-950/90">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-900 transition-colors dark:text-gray-200"
                >
                    Smart Shop
                </Link>

                <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <li>
                    <Link href="/" className="transition hover:text-gray-950 dark:hover:text-white">
                        Home
                    </Link>
                    </li>

                    <li>
                    <Link href="/products" className="transition hover:text-gray-950 dark:hover:text-white">
                        Products
                    </Link>
                    </li>

                    {user && (
                    <li>
                        <Link href="/cart" className="transition hover:text-gray-950 dark:hover:text-white">
                        Cart ({cartItems.length})
                        </Link>
                    </li>
                    )}

                    {user && (
                    <li>
                        <Link href="/wishlist" className="transition hover:text-gray-950 dark:hover:text-white">
                        Wish List ({wishlistItems.length})
                        </Link>
                    </li>
                    )}

                    <li>
                        {user ? (
                            <div className="flex items-center gap-6">
                            <Link href="/profile" className="transition hover:text-gray-950 dark:hover:text-white">
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="cursor-pointer transition hover:text-gray-950 dark:hover:text-white"
                            >
                                Logout
                            </button>
                            </div>
                        ) : (
                            <Link
                            className="text-sm text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
                            href="/login"
                            >
                            Login
                            </Link>
                        )}
                    </li>
                </ul>
                <button
                    onClick={toggleTheme}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl border border-gray-200
                        bg-white text-gray-700
                        transition hover:bg-gray-100
                        dark:border-gray-700
                        dark:bg-gray-900
                        dark:text-yellow-400
                        dark:hover:bg-gray-800
                    "
                    >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;