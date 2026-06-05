import { Product } from "@/types/product"
import Link from "next/link"


type ProductsCardProps = {
    product: Product
}

const ProductsCard = ({ product } : ProductsCardProps) => {
    
    const fullStars = Math.floor(product.rating);
    const discountedPrice = product?.price - ( product?.price * product?.discount) / 100
    return(
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
                {product.title}
            </h2>
            <div className="flex items-center gap-2">
                <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <span
                        key={index}
                        className={
                        index < fullStars
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                    >
                        ★
                    </span>
                    ))}
                </div>

                <span className="text-sm font-medium text-gray-600">
                    {product.rating}
                </span>
            </div>
            <p className="text-sm text-gray-600">
                Brand: {product.brand}
            </p>
            <p className="text-sm text-gray-600">
                Category: {product.category}
            </p>
            <div className="mt-6 flex items-center gap-3">
                <span className="font-bold text-gray-900">
                    ${discountedPrice.toFixed(0)}
                </span>

                {product.discount > 0 && (
                    <>
                    <span className="text-sm text-gray-400 line-through">
                        ${product.price}
                    </span>

                    <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-600">
                        Save {product.discount}%
                    </span>
                    </>
                )}
            </div>
            <p className={product.stock > 0 ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-600"}>
                Status: {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <Link href={`/products/${product.id}`} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
                Product Details
            </Link>
        </div>
    )
}

export default ProductsCard