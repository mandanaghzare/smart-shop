import Link from "next/link";
import { products } from "@/data/products";

export default function LowStockProducts() {
  const lowStockProducts = products
    .filter((product) => product.stock < 10)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Low Stock Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Products that need attention.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
        </Link>
      </div>

      {lowStockProducts.length > 0 ? (
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 transition hover:bg-gray-100"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {product.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {product.category}
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                {product.stock} left
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-sm font-medium text-gray-900">
            Stock levels look good
          </p>
          <p className="mt-1 text-sm text-gray-500">
            No products are currently low in stock.
          </p>
        </div>
      )}
    </div>
  );
}