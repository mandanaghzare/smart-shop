import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ProductReviews from "@/components/ProductReviews";
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
        <div className="min-h-screen bg-slate-950 px-4 pb-12 pt-24 transition-colors sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/40 transition-colors sm:p-8">
                    <Link
                        href="/products"
                        className="mb-6 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                        ← Back to Products
                    </Link>

                    <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-start">
                        <div>
                            <p className="mb-3 text-xs uppercase tracking-wide text-slate-400 sm:text-sm">
                                {product.category}
                            </p>

                            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-slate-100 sm:text-5xl">
                                {product.title}
                            </h1>

                            <p
                                className={
                                    product.stock > 0
                                        ? "mt-5 font-semibold text-emerald-400"
                                        : "mt-5 font-semibold text-rose-400"
                                }
                            >
                                {product.stock > 0 ? "In stock" : "Out of stock"}
                            </p>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                                {product.description}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                                <span className="text-3xl font-bold text-slate-100 sm:text-4xl">
                                    ${discountedPrice.toFixed(0)}
                                </span>

                                {product.discount > 0 && (
                                    <>
                                        <span className="text-sm text-slate-500 line-through sm:text-lg">
                                            ${product.price}
                                        </span>

                                        <span className="rounded-full bg-rose-900/70 px-3 py-1.5 text-xs font-bold text-rose-100 sm:px-4 sm:py-2 sm:text-sm">
                                            Save {product.discount}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="relative mx-auto flex h-64 w-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-800/70 p-5 shadow-xl shadow-slate-950/30 sm:h-80 sm:max-w-md sm:p-8 lg:mx-0">
                            <div className="absolute right-4 top-4 z-10">
                                <AddToWishlistButton product={product} />
                            </div>

                            <Image
                                src={product.image}
                                alt={product.title}
                                width={260}
                                height={260}
                                className="max-h-52 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 sm:max-h-72"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                        <p className="rounded-xl bg-slate-800/80 p-4 text-sm text-slate-300 shadow-sm sm:p-5 sm:text-base">
                            <span className="font-bold text-slate-100">Brand:</span>{" "}
                            {product.brand}
                        </p>

                        <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-4 shadow-sm sm:gap-3 sm:p-5">
                            <div className="flex text-base sm:text-lg">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index < fullStars
                                                ? "text-amber-400"
                                                : "text-slate-600"
                                        }
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <span className="text-sm font-medium text-slate-300 sm:text-base">
                                {product.rating}
                            </span>
                        </div>

                        <div className="rounded-xl bg-slate-800/80 p-4 text-sm text-slate-300 shadow-sm sm:p-5 sm:text-base">
                            <div className="mb-3 flex items-center justify-between sm:mb-4">
                                <span className="font-bold text-slate-100">Stock</span>

                                <span
                                    className={
                                        product.stock === 0
                                            ? "font-semibold text-rose-400"
                                            : product.stock <= 5
                                            ? "font-semibold text-rose-400"
                                            : product.stock <= 15
                                            ? "font-semibold text-amber-400"
                                            : "font-semibold text-emerald-400"
                                    }
                                >
                                    {product.stock > 0
                                        ? `${product.stock} available`
                                        : "Out of stock"}
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-700 sm:h-2.5">
                                <div
                                    className={`h-full rounded-full ${stockColor}`}
                                    style={{ width: `${stockPercent}%` }}
                                />
                            </div>
                        </div>

                        <p className="rounded-xl bg-slate-800/80 p-4 text-sm text-slate-300 shadow-sm sm:p-5 sm:text-base">
                            <span className="font-bold text-slate-100">Discount:</span>{" "}
                            {product.discount}%
                        </p>
                    </div>

                    <div className="mt-5 sm:mt-6">
                        <AddToCartButton product={product} />
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
                    <ProductReviews
                        productId={product.id}
                        initialReviews={product.reviews}
                    />

                    {relatedProducts.length > 0 && (
                        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/30 sm:p-8">
                            <div className="mb-5 sm:mb-6">
                                <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
                                    You may also like
                                </h2>
                                <p className="mt-2 text-sm text-slate-400">
                                    Similar products from the same category.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {relatedProducts.slice(0, 4).map((item) => {
                                    const itemDiscountedPrice =
                                        item.price - (item.price * item.discount) / 100;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={`/products/${item.id}`}
                                            className="group rounded-xl bg-slate-800/70 p-4 transition hover:-translate-y-1 hover:bg-slate-800"
                                        >
                                            <div className="relative mx-auto h-32 w-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                    className="object-contain p-2 transition group-hover:scale-105"
                                                />
                                            </div>

                                            <h3 className="mt-4 truncate text-sm font-bold text-slate-100">
                                                {item.title}
                                            </h3>

                                            <div className="mt-3 flex items-center justify-between text-sm">
                                                <span className="font-bold text-slate-100">
                                                    ${itemDiscountedPrice.toFixed(2)}
                                                </span>

                                                <span className="text-amber-400">
                                                    ★{" "}
                                                    <span className="text-slate-400">
                                                        {item.rating}
                                                    </span>
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>

                <div className="mt-6 sm:mt-8">
                    <RecentlyViewed currentProductId={product.id} />
                </div>
            </div>
        </div>
    );
}

export default ProductIds