import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistBotton from "@/components/AddToWishlistButton";
import ProductsCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { products } from "@/data/products"
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
                <div className="flex justify-between items-center gap-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                        {product.title}
                        </h1>
                    </div>
                    <div className="flex items-end">
                        <AddToWishlistBotton product={product} />
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
                                ml-3
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
            <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">
                    Related Products
                </h2>

                {relatedProducts.length > 0 && (
                    <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                                    >
                                    <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-white">
                                        <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {product.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.brand}
                                        </p>
                                        </div>

                                        <p className="font-bold text-gray-900">
                                        ${product.price}
                                        </p>
                                    </div>

                                    {product.discount > 0 && (
                                        <span className="mt-3 inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                                        {product.discount}% OFF
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </section>
            <RecentlyViewed currentProductId={product.id}  />
        </div>
    )
}

export default ProductIds