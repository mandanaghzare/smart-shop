"use client";

import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useThemeStore } from "@/store/themeStore";
import { useWishlist } from "@/store/wishlistStore";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const wishlistItems = useWishlist((state) => state.wishlistItems);
    const cartItems = useCartStore((state) => state.cartItems);
    const { darkMode, toggleTheme, initTheme } = useThemeStore();

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push("/");
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-slate-50/90 px-4 py-4 backdrop-blur-md transition-colors dark:border-slate-900 dark:bg-slate-950/90 sm:px-8">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-lg font-bold text-gray-900 transition-colors dark:text-gray-200 sm:text-xl"
                >
                    Smart Shop
                </Link>

                <ul className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 md:flex">
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
                        <>
                            <li>
                                <Link href="/cart" className="transition hover:text-gray-950 dark:hover:text-white">
                                    Cart ({cartItems.length})
                                </Link>
                            </li>

                            <li>
                                <Link href="/wishlist" className="transition hover:text-gray-950 dark:hover:text-white">
                                    Wish List ({wishlistItems.length})
                                </Link>
                            </li>

                            <li>
                                <Link href="/profile" className="transition hover:text-gray-950 dark:hover:text-white">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer transition hover:text-gray-950 dark:hover:text-white"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                    {!user && (
                        <li>
                            <Link
                                href="/login"
                                className="transition hover:text-gray-950 dark:hover:text-white"
                            >
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-yellow-400 dark:hover:bg-gray-800"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 md:hidden"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="mx-auto mt-4 max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:hidden">
                    <div className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Link onClick={closeMenu} href="/" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                            Home
                        </Link>

                        <Link onClick={closeMenu} href="/products" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                            Products
                        </Link>

                        {user && (
                            <>
                                <Link onClick={closeMenu} href="/cart" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    Cart ({cartItems.length})
                                </Link>

                                <Link onClick={closeMenu} href="/wishlist" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    Wish List ({wishlistItems.length})
                                </Link>

                                <Link onClick={closeMenu} href="/profile" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-xl px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {!user && (
                            <Link onClick={closeMenu} href="/login" className="rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;