import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistBotton from "@/components/AddToWishlistButton";
import ProductsCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

type ProductDetailsPageProps = {
    params: Promise<{
        id: string
    }>;
};

const ProductIds = async ({params}: ProductDetailsPageProps) => {
    const { id } = await params;
    const product = products.find((product) => product.id === id);
    const relatedProducts = products.filter(
        (item) => 
            item.category === product?.category &&
            item.id !== product.id
    )
    if(!product) {
        return <div>Product Not Found</div>
    }
    const fullStars = Math.floor(product.rating);
    const discountedPrice = product?.price - (product?.price * product?.discount) / 100
    const stockPercent = Math.min((product.stock / 30) * 100, 100);

    const stockColor =
        product.stock === 0
            ? "bg-red-500"
            : product.stock <= 5
            ? "bg-red-500"
            : product.stock <= 15
            ? "bg-yellow-500"
            : "bg-green-500";
            
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
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-1 items-center">
                        <h1 className="max-w-2xl text-4xl font-bold text-gray-900">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex shrink-0 items-end">
                        <AddToWishlistBotton product={product} />

                        <Image
                        src={product.image}
                        alt={product.title}
                        width={220}
                        height={220}
                        className="
                            ml-3
                            rounded-2xl
                            bg-white
                            object-contain
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

                <div className="mt-6 flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                        ${discountedPrice.toFixed(0)}
                    </span>

                    {product.discount > 0 && (
                        <>
                        <span className="text-lg text-gray-400 line-through">
                            ${product.price}
                        </span>

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                            Save {product.discount}%
                        </span>
                        </>
                    )}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Brand:</span> {product.brand}
                </p>

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

                <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Stock</span>

                        <span
                        className={
                            product.stock === 0
                            ? "font-medium text-red-600"
                            : product.stock <= 5
                            ? "font-medium text-red-600"
                            : product.stock <= 15
                            ? "font-medium text-yellow-600"
                            : "font-medium text-green-600"
                        }
                        >
                        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                        className={`h-full rounded-full ${stockColor}`}
                        style={{ width: `${stockPercent}%` }}
                        />
                    </div>
                </div>

                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    <span className="font-semibold">Discount:</span> {product.discount}%
                </p>
                </div>

                <div className="mt-6 flex gap-3">
                    <AddToCartButton product={product} />
                </div>
            </div>
            <div className="mx-auto mt-12 max-w-7xl space-y-10">
                {product.reviews.length > 0 && (
                    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                        Customer Reviews
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                        What customers are saying about this product.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                        >
                            <div className="mb-2 flex items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-gray-900">
                                {review.reviewerName}
                                </p>

                                <div className="mt-1 flex">
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <span
                                    key={starIndex}
                                    className={
                                        starIndex < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                    >
                                    ★
                                    </span>
                                ))}
                                </div>
                            </div>

                            <span className="text-xs text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                            </div>

                            <p className="text-sm leading-6 text-gray-600">
                            {review.comment}
                            </p>
                        </div>
                        ))}
                    </div>
                    </section>
                )}

                {relatedProducts.length > 0 && (
                    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            You may also like
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Similar products from the same category.
                        </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.slice(0, 4).map((product) => (
                            <ProductsCard key={product.id} product={product} />
                        ))}
                        </div>
                    </section>
                )}

                <RecentlyViewed currentProductId={product.id} />
            </div>
        </div>
    )
}

export default ProductIds