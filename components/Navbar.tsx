"use client";

import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useThemeStore } from "@/store/themeStore";
import { useWishlist } from "@/store/wishlistStore";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const wishlistItems = useWishlist((state) => state.wishlistItems);
    const cartItems = useCartStore((state) => state.cartItems);
    const { darkMode, toggleTheme, initTheme } = useThemeStore();
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const initAuth = useAuthStore((state) => state.initAuth);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push("/");
        toast.success("Logged out")
    };

    const closeMenu = () => setIsOpen(false);

    const pathname = usePathname();

    const navLinkClass = (href: string) =>
    `rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700 ${
        pathname === href
        ? "bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;
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

                <ul className="hidden items-center gap-2 text-sm font-medium md:flex">
                    <li>
                        <Link href="/" className={navLinkClass("/")}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link href="/products" className={navLinkClass("/products")}>
                            Products
                        </Link>
                    </li>

                    {!hasHydrated && (
                    <li className="h-9 w-80 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    )}

                    {hasHydrated && user && (
                    <>
                        <li>
                            <Link href="/cart" className={navLinkClass("/cart")}>
                                Cart ({cartItems.length})
                            </Link>
                        </li>

                        <li>
                            <Link href="/wishlist" className={navLinkClass("/wishlist")}>
                                Wish List ({wishlistItems.length})
                            </Link>
                        </li>

                        <li>
                            <Link href="/profile" className={navLinkClass("/profile")}>
                                Profile
                            </Link>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="cursor-pointer rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                    )}

                    {hasHydrated && !user && (
                    <li>
                        <Link href="/login" className={navLinkClass("/login")}>
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
                    >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus:ring-slate-600 md:hidden"
                    >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
            <div className="mx-auto mt-4 max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:hidden">
                <div className="flex flex-col gap-2 text-sm font-medium">
                <Link onClick={closeMenu} href="/" className={navLinkClass("/")}>
                    Home
                </Link>

                <Link
                    onClick={closeMenu}
                    href="/products"
                    className={navLinkClass("/products")}
                >
                    Products
                </Link>

                {!hasHydrated && (
                    <div className="space-y-2">
                    <div className="h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    <div className="h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    <div className="h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                )}

                {hasHydrated && user && (
                    <>
                    <Link onClick={closeMenu} href="/cart" className={navLinkClass("/cart")}>
                        Cart ({cartItems.length})
                    </Link>

                    <Link
                        onClick={closeMenu}
                        href="/wishlist"
                        className={navLinkClass("/wishlist")}
                    >
                        Wish List ({wishlistItems.length})
                    </Link>

                    <Link
                        onClick={closeMenu}
                        href="/profile"
                        className={navLinkClass("/profile")}
                    >
                        Profile
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg px-3 py-2 text-left text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        Logout
                    </button>
                    </>
                )}

                {hasHydrated && !user && (
                    <Link onClick={closeMenu} href="/login" className={navLinkClass("/login")}>
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