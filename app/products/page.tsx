"use client"
import ProductsCard from "@/components/ProductCard"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import { products } from "@/data/products"
import { useEffect, useState } from "react"


const ProductsPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortOption, setSortOption] = useState("default")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8
    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
    const [isLoading, setIsLoading] = useState(true);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory

        return matchesCategory && matchesSearch;
    })
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-low") {
            return a.price - b.price
        }

        if (sortOption === "price-high") {
            return b.price - a.price
        }

        if (sortOption === "rating") {
            return b.rating - a.rating
        }

        return 0
    })
    const currentProducts =
        sortedProducts.slice(
            firstProductIndex,
            lastProductIndex
        )
    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage
    )
    const categories = [
        "all",
        ...Array.from(new Set(products.map((product) => product.category))),
    ]
    useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
    }, []);
    return (
      <div className="min-h-screen bg-slate-100 px-4 pb-12 pt-24 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              Discover Products
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Browse our collection and find your next favorite item.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col items-center gap-5">
              <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                onChange={(e) => {
                  setSearchItem(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700 sm:max-w-lg"
              />

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium capitalize transition sm:px-4 ${
                      selectedCategory === category
                        ? "bg-slate-800 text-slate-100 dark:bg-slate-700"
                        : "border border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="mb-5 w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-slate-500 dark:focus:ring-slate-700 sm:w-44"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {isLoading ? (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-14 text-center transition-colors dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                No products found
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {currentProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 rounded-lg border text-sm font-semibold transition ${
                    currentPage === index + 1
                      ? "border-slate-800 bg-slate-800 text-slate-100 dark:border-slate-600 dark:bg-slate-700"
                      : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
export default ProductsPage