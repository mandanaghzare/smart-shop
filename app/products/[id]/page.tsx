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
            
    return (
        <div className="min-h-screen bg-slate-100 px-8 py-12 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <Link
                href="/products"
                className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
                ← Back to Products
            </Link>

            <p className="mb-3 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {product.category}
            </p>

            <div className="flex items-center justify-between gap-10">
                <div className="flex flex-1 items-center">
                <h1 className="max-w-2xl text-4xl font-bold text-slate-900 dark:text-slate-100">
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
                    bg-slate-100
                    object-contain
                    shadow-lg
                    transition-transform
                    duration-300
                    hover:scale-105
                    dark:bg-slate-800
                    "
                />
                </div>
            </div>

            <p
                className={
                product.stock > 0
                    ? "mt-6 font-medium text-emerald-600 dark:text-emerald-400"
                    : "mt-6 font-medium text-rose-600 dark:text-rose-400"
                }
            >
                {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
                {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                ${discountedPrice.toFixed(0)}
                </span>

                {product.discount > 0 && (
                <>
                    <span className="text-lg text-slate-400 line-through dark:text-slate-500">
                    ${product.price}
                    </span>

                    <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                    Save {product.discount}%
                    </span>
                </>
                )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <span className="font-semibold">Brand:</span> {product.brand}
                </p>

                <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
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

                <div className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Stock
                    </span>

                    <span
                    className={
                        product.stock === 0
                        ? "font-medium text-rose-600 dark:text-rose-400"
                        : product.stock <= 5
                        ? "font-medium text-rose-600 dark:text-rose-400"
                        : product.stock <= 15
                        ? "font-medium text-amber-600 dark:text-amber-400"
                        : "font-medium text-emerald-600 dark:text-emerald-400"
                    }
                    >
                    {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                    className={`h-full rounded-full ${stockColor}`}
                    style={{ width: `${stockPercent}%` }}
                    />
                </div>
                </div>

                <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <span className="font-semibold">Discount:</span> {product.discount}%
                </p>
            </div>

            <div className="mt-6 flex gap-3">
                <AddToCartButton product={product} />
            </div>
            </div>

            <div className="mx-auto mt-12 max-w-7xl space-y-10">
            {product.reviews.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Customer Reviews
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    What customers are saying about this product.
                    </p>
                </div>

                <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-800 dark:bg-slate-800"
                    >
                        <div className="mb-2 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {review.reviewerName}
                            </p>

                            <div className="mt-1 flex">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                                <span
                                key={starIndex}
                                className={
                                    starIndex < review.rating
                                    ? "text-amber-400"
                                    : "text-slate-300 dark:text-slate-700"
                                }
                                >
                                ★
                                </span>
                            ))}
                            </div>
                        </div>

                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            {new Date(review.date).toLocaleDateString()}
                        </span>
                        </div>

                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {review.comment}
                        </p>
                    </div>
                    ))}
                </div>
                </section>
            )}

            {relatedProducts.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    You may also like
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
    );
}

export default ProductIds