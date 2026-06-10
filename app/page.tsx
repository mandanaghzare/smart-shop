"use client";

import ProductsCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const categories = [
        "all",
        ...Array.from(new Set(products.map((product) => product.category))),
    ];

    const [selectedCategory, setSelectedCategory] = useState("all");

    const topRatedProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    const featuredProducts = [...products]
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 4);

    const newArrivals = [...products]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

    return (
        <main className="min-h-screen bg-gray-50 px-4 pb-12 pt-24 transition-colors dark:bg-gray-950 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:px-8 sm:py-16">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:text-sm">
                    Welcome to Smart Shop
                </p>

                <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
                    Discover Products You&apos;ll Love
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400 sm:mt-6 sm:text-lg">
                    Explore our collection of high-quality products across multiple
                    categories. Find great deals, save your favorites, and shop with
                    confidence.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                    <Link
                        href="/products"
                        className="rounded-xl bg-slate-800 px-6 py-3 text-center font-medium text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                        Shop Products
                    </Link>

                    <Link
                        href="/cart"
                        className="rounded-xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        View Cart
                    </Link>
                </div>
            </section>

            <div className="mx-auto my-8 flex max-w-4xl flex-wrap justify-center gap-2 sm:my-10 sm:gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                            selectedCategory === category
                                ? "bg-gray-900 text-white dark:bg-gray-300 dark:text-gray-950"
                                : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <section className="mx-auto mt-10 max-w-6xl sm:mt-12">
                <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white sm:mb-6">
                    Top Rated Products
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {topRatedProducts.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-10 max-w-6xl sm:mt-12">
                <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white sm:mb-6">
                    Featured Products
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl bg-gray-900 px-6 py-10 text-white shadow-sm transition-colors dark:bg-gray-800 sm:mt-12 sm:px-8 sm:py-12">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-400 sm:text-sm">
                            Limited Time Offer
                        </p>

                        <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                            Big Deals Are Waiting For You
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
                            Discover our best discounts and shop selected products before the
                            deals are gone.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
                    >
                        Shop Deals
                    </Link>
                </div>
            </section>

            <section className="mx-auto mt-10 max-w-6xl sm:mt-12">
                <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white sm:mb-6">
                    New Arrivals
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {newArrivals.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </main>
    );
}