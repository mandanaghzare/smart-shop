import { Product } from "@/types/product"
import Link from "next/link"


type ProductsCardProps = {
    product: Product
}

const ProductsCard = ({ product } : ProductsCardProps) => {
    return(
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{product.title}</h2>
            <p className="text-sm text-gray-600">Brand: {product.brand}</p>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
            <p className="mt-3 text-xl font-bold text-gray-900">Price: ${product.price}</p>
            <p className={product.stock > 0 ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-600"}>Status: {product.stock > 0 ? "In stock" : "Out of stock"}</p>
            <Link href={`/products/${product.id}`} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
                Product Details
            </Link>
        </div>
    )
}

export default ProductsCard