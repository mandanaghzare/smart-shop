import { products } from "@/data/products"
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

type ProductDetailsPageProps = {
    params: Promise<{
        id: string
    }>;
};

const addToCart = useCartStore

const ProductIds = async ({params}: ProductDetailsPageProps) => {
    const { id } = await params;
    const product = products.find((product) => product.id === id);

    if(!product) {
        return <div>Product Not Found</div>
    }
    return(
        <div className="min-h-screen bg-gray-50 px-8 py-12">
            <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <Link
                href="/products"
                className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                ← Back to Products
                </Link>

                <p className="mb-3 text-sm uppercase tracking-wide text-gray-500">
                {product.category}
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                {product.title}
                </h1>
                
                <p
                className={
                    product.stock > 0
                    ? "mt-6 font-medium text-green-600"
                    : "mt-6 font-medium text-red-600"
                }
                >
                {product.stock > 0 ? "In stock" : "Out of stock"}
                </p>

                <p className="mt-4 text-gray-600">
                {product.description}
                </p>

                <p className="mt-6 text-3xl font-bold text-gray-900">
                ${product.price}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Brand:</span> {product.brand}
                </p>

                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Rating:</span> {product.rating}
                </p>

                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Stock:</span> {product.stock}
                </p>

                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Discount:</span> {product.discount}%
                </p>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductIds