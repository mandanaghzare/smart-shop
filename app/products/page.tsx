import ProductsCard from "@/components/ProductCard"
import { products } from "@/data/products"

const ProductsPage = () => {
    return(
        <div className="min-h-screen bg-gray-50 px-8 py-10">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">
                Products
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
export default ProductsPage