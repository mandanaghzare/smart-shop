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
  const topRatedProducts  = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0,4)

  const featuredProducts = [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0,4)

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
          {topRatedProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
           Featured Products
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-gray-900 px-8 py-12 text-white shadow-sm">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Limited Time Offer
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Big Deals Are Waiting For You
            </h2>

            <p className="mt-4 max-w-xl text-gray-300">
              Discover our best discounts and shop selected products before the deals
              are gone.
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Shop Deals
          </Link>
        </div>
      </section>له
    </main>
  );
}