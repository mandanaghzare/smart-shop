"use client"
import ProductsCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const categories = [
      "all",
      ...Array.from(new Set(products.map((product) => product.category))),
  ]
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const topRatedProducts  = [...products].sort((a, b) => {
          return b.rating - a.rating
  })
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <section className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white px-8 py-16 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
          Welcome to Smart Shop
        </p>

        <h1 className="mt-4 text-5xl font-bold text-gray-900">
          Discover Products You&apos;ll Love
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
          Explore our collection of high-quality products across multiple
          categories. Find great deals, save your favorites, and shop with
          confidence.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Shop Products
          </Link>

          <Link
            href="/cart"
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            View Cart
          </Link>
        </div>
      </section>
      <div className="flex flex-wrap my-10 justify-center gap-3">
          {categories.map((category) => (
              <button
                  key={category}
                  onClick={() => {
                      setSelectedCategory(category)
                      setCurrentPage(1)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === category
                          ? "bg-gray-900 text-white"
                          : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                      }`}
              >
                  {category}
              </button>
          ))}
      </div>
      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Top Rated Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topRatedProducts.slice(0, 4).map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}