"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { FaStar } from "react-icons/fa";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="mt-1 text-gray-500">
                    Manage Smart Shop products and inventory.
                </p>
            </div>

            <button 
                onClick={() => router.push(`/admin/products/add`)}
                className="rounded-lg bg-gray-950 px-4 py-2 cursor-pointer text-sm font-medium text-white transition hover:bg-gray-800">
                Add Product
            </button>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 sm:max-w-sm"
            />
        </div>

        <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">#</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Product
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Category
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Price
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Stock
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Rating
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((product) => (
                        <tr
                            key={product.id}
                            className="border-b border-gray-100 transition hover:bg-gray-50"
                        >
                            <td className="px-6 py-4">
                                {product.id.slice(0,4)}
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <Link href={`/admin/products/${product.id}`}>
                                        {product.title}
                                    </Link>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {product.brand}
                                    </p>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                                {product.category}
                            </td>

                            <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                ${product.price}
                            </td>

                            <td className="px-6 py-4 text-right">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                    product.stock === 0
                                        ? "bg-red-100 text-red-700"
                                        : product.stock < 20
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    {product.stock === 0
                                    ? "Out of stock"
                                    : product.stock < 20
                                    ? `Low: ${product.stock}`
                                    : `In stock: ${product.stock}`}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-1">
                                    <FaStar className="text-amber-500" size={14} />
                                    <span className="font-medium text-slate-700">
                                        {product.rating.toFixed(1)}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                                        className="rounded-lg border cursor-pointer  cursor-pointer-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-950">
                                        <BiEditAlt />
                                    </button>

                                    <DeleteProductButton variant="icon" id={String(product.id)} />
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900">No products found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                        Try a different search keyword.
                        </p>
                    </div>
                    ) : (
                    <table>
                        ...
                    </table>
                )}
            </div>
        </div>
    </div>
  );
}