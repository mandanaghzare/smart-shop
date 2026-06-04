"use client"
import ProductsCard from "@/components/ProductCard"
import { products } from "@/data/products"
import { useState } from "react"

const ProductsPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortOption, setSortOption] = useState("default")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8
    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
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
    return (
        <div className="min-h-screen bg-gray-50 px-8 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Discover Products
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Browse our collection and find your next favorite item.
                    </p>
                </div>

                <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center gap-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="
                            w-full max-w-lg
                            rounded-xl border border-gray-300
                            bg-white px-4 py-3
                            text-sm text-gray-900
                            shadow-sm
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-gray-900
                            focus:ring-2
                            focus:ring-gray-200
                            "
                        />

                        <div className="flex flex-wrap justify-center gap-3">
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
                    </div>
                </div>

                <select
                    value={sortOption}
                    onChange={(e) => {
                        setSortOption(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="rounded-xl mb-5 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none"
                >
                    <option value="default">Sort by</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>

                {filteredProducts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Try another search or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {currentProducts.map((product) => (
                            <ProductsCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                <div className="mt-10 flex justify-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`h-10 w-10 rounded-lg border transition ${currentPage === index + 1
                                    ? "bg-gray-900 text-white"
                                    : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProductsPage