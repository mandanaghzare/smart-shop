"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

type RecentlyViewedProps = {
  currentProductId: string;
};

const RecentlyViewed = ({ currentProductId }: RecentlyViewedProps) => {
    const [recentProducts, setRecentProducts] = useState<Product[]>([])

    useEffect(() => {
        const storedProducts = JSON.parse(
            localStorage.getItem("recently-viewed") || "[]"
        );

        const updatedProducts = [
            currentProductId,
            ...storedProducts.filter((id: string) => id !== currentProductId),
        ].slice(0, 5);

        localStorage.setItem("recently-viewed", JSON.stringify(updatedProducts));

        const productsToShow = updatedProducts
            .filter((id: string) => id !== currentProductId)
            .map((id: string) => products.find((product) => product.id === id))
            .filter((product): product is Product => Boolean(product));

        queueMicrotask(() => {
            setRecentProducts(productsToShow);
        });
    }, [currentProductId]);

    if (recentProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Recently Viewed
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Products you recently explored.
            </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentProducts.map((product) => (
                <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="
                    group
                    rounded-2xl
                    border border-slate-200
                    bg-slate-100
                    p-4
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-800
                "
                >
                <div className="relative mb-4 h-36 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700">
                    <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-3 transition duration-300 group-hover:scale-105"
                    />
                </div>

                <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {product.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {product.brand}
                </p>

                <p className="mt-3 font-bold text-slate-900 dark:text-slate-100">
                    ${product.price}
                </p>
                </Link>
            ))}
            </div>
        </section>
    );
};

export default RecentlyViewed;