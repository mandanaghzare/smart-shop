import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistBotton from "@/components/AddToWishlistButton";
import { products } from "@/data/products"
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
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
                <div className="flex justify-between items-center gap-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                        {product.title}
                        </h1>
                    </div>
                    <div className="image">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={220}
                            height={220}
                            className="
                                rounded-2xl
                                object-cover
                                shadow-lg
                                transition-transform
                                duration-300
                                hover:scale-105
                                "
                        />
                    </div>
                </div>

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
                    <AddToCartButton product={product} />
                    <AddToWishlistBotton product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductIds