import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"
import AddToCartButton from "./AddToCartButton"


type ProductsCardProps = {
    product: Product
}

const ProductsCard = ({ product } : ProductsCardProps) => {
    
    const fullStars = Math.floor(product.rating);
    const discountedPrice = product?.price - ( product?.price * product?.discount) / 100
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="relative h-52 bg-slate-100 dark:bg-slate-800">
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-slate-50 shadow-sm">
              -{product.discount.toFixed(0)}%
            </span>
          )}

          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
            {product.title}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index < fullStars
                      ? "text-amber-400"
                      : "text-slate-300 dark:text-slate-700"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {product.rating}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <p className="line-clamp-1">Brand: {product.brand}</p>
            <p className="capitalize">Category: {product.category}</p>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                ${discountedPrice.toFixed(2)}
              </span>

              {product.discount > 0 && (
                <span className="pb-0.5 text-sm text-slate-400 line-through dark:text-slate-500">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p
              className={
                product.stock > 0
                  ? "mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                  : "mt-3 text-sm font-medium text-rose-600 dark:text-rose-400"
              }
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 rounded-xl bg-slate-800 px-4 py-2 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                View Details
              </Link>

              <AddToCartButton variant="icon" product={product} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductsCard