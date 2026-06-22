import { products } from "@/data/products";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminProductDetailsPage ({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;    
    const item = products.find((product) => product.id === id) 

    if (!item) {
        return <div>Product not found</div>;
    }
        return (
          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Product Details</p>
                <h1 className="mt-1 text-3xl font-bold text-gray-900">
                  {item.title}
                </h1>
              </div>
      
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Edit
                </button>
      
                <button className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
      
            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex h-80 items-center justify-center rounded-xl bg-gray-50">
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={320}
                        height={320}
                        className="h-full w-full object-contain"
                    />
                </div>
              </div>
      
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Product Information
                  </h2>
      
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <InfoItem label="Brand" value={item.brand} />
                    <InfoItem label="Category" value={item.category} />
                    <InfoItem label="Price" value={`$${item.price}`} />
                    <InfoItem label="Discount" value={`${item.discount}%`} />
                    <InfoItem label="Stock" value={`${item.stock} units`} />
                    <InfoItem label="Rating" value={`${item.rating.toFixed(1)}`} />
                  </div>
                </div>
      
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Description
                  </h2>
      
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>
      
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Reviews
                  </h2>
      
                  <div className="mt-4 space-y-3">
                        {item.reviews.map((review) => (
                            <div
                                key={`${review.reviewerName}-${review.date}`}
                                className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {review.reviewerName}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {formatDate(review.date)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                        <span>{review.rating}</span>
                                        <FaStar className="text-amber-500" size={14} />
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-600">
                                {review.comment}
                                </p>
                            </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
