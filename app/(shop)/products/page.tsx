"use client"
import ProductsCard from "@/components/ProductCard"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import { products } from "@/data/products"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"


const ProductsPageContent  = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchItem, setSearchItem] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
    const [sortOption, setSortOption] = useState(searchParams.get("sort") || "default")
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
    const productsPerPage = 8
    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
    const [isLoading, setIsLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [inStockOnly, setInStockOnly] = useState( searchParams.get("stock") === "in")

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory
        const matchesPrice = 
          product.price >= Number(minPrice || "0") &&
          product.price <= Number(maxPrice || Infinity)

        const matchesInStock = !inStockOnly || product.stock > 0
            
        return matchesCategory && matchesSearch && matchesPrice && matchesInStock;
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
    const updateUrlParams = (key:string, value:string) => {
      const params = new URLSearchParams(searchParams.toString())

      if(value && value !== "defaul" && value !== "all"){
        params.set(key,value)
      } else {
        params.delete(key)
      }
      
      if(key !== "page") {
        params.set("page", "1")
      }
      router.push(`${pathname}?${params.toString()}`)
    }

    const handleClearFilter = () => {
      setInStockOnly(false);
      setMaxPrice("")
      setMinPrice("")
      setSearchItem("")
      setSelectedCategory("all")
      setSortOption("default")
      setCurrentPage(1)
      router.push(pathname)
    }

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

          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col items-center gap-5">
              <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchItem(value);
                  setCurrentPage(1);
                  updateUrlParams("search", value);
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
                      updateUrlParams("category", category);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                      selectedCategory === category
                        ? "bg-slate-800 text-slate-100 shadow-sm dark:bg-slate-700"
                        : "border border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Filters
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Refine products by price, availability, and sorting.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearFilter}
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-rose-500 dark:hover:bg-rose-950 dark:hover:text-rose-300 sm:w-auto"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[220px_1fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                Sort Products
              </label>

              <select
                value={sortOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setSortOption(value);
                  setCurrentPage(1);
                  updateUrlParams("sort", value);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-slate-500 dark:focus:ring-slate-700"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                Price Range
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Min Price
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCurrentPage(1);
                      setMinPrice(value);
                      updateUrlParams("minPrice", value);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Max Price
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="No limit"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCurrentPage(1);
                      setMaxPrice(value);
                      updateUrlParams("maxPrice", value);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
              <label className="flex h-full cursor-pointer items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Availability
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Show only products that are currently in stock.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setInStockOnly(checked);
                    setCurrentPage(1);
                    updateUrlParams("stock", checked ? "in" : "");
                  }}
                  className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-slate-800 dark:border-slate-600"
                />
              </label>
            </div>
          </div>
        </div>

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
                  onClick={() => {
                    setCurrentPage(index + 1);
                    updateUrlParams("page", String(index + 1));
                  }}
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
const ProductsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;