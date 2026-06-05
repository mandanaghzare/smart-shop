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
    // const discountedPrice = product?.price - ( product?.price * product?.discount) / 100
    // const stockPercent = Math.min((product.stock / 30) * 100, 100);

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
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">
            Recently Viewed
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentProducts.map((product) => (
                <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                <div className="relative mb-4 h-36 overflow-hidden rounded-xl bg-white">
                    <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>

                <h3 className="font-semibold text-gray-900">
                    {product.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {product.brand}
                </p>

                <p className="mt-3 font-bold text-gray-900">
                    ${product.price}
                </p>
                </Link>
            ))}
        </div>
        </section>
    );
};

export default RecentlyViewed;