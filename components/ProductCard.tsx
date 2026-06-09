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
  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="relative h-52 bg-gray-50">
      {product.discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
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

    <div className="flex flex-1 flex-col p-5 min-w-0">
      <h2 className="truncate text-lg font-semibold text-gray-900">
        {product.title}
      </h2>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={index < fullStars ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>

        <span className="text-sm font-medium text-gray-600">
          {product.rating}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p className="line-clamp-1">Brand: {product.brand}</p>
        <p className="capitalize">Category: {product.category}</p>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>

          {product.discount > 0 && (
            <span className="pb-0.5 text-sm text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <p
          className={
            product.stock > 0
              ? "mt-3 text-sm font-medium text-green-600"
              : "mt-3 text-sm font-medium text-red-600"
          }
        >
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            View Details
          </Link>

          <AddToCartButton
            variant="icon"
            product={product}
          >
          </AddToCartButton>
        </div>
      </div>
    </div>
  </div>
);
}

export default ProductsCard