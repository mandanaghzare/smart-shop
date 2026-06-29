"use client"


import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


type EditProductFormProps = {
  product: {
    id: string,
    title: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    discount: number;
    description: string;
    rating: number;
  };
};

export default function AddProductPage({  }: EditProductFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedProduct = {
            title,
            brand,
            category,
            price,
            stock,
            discount,
            rating,
            description,
            imageUrl,
        };
        setIsSubmitting(true);
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
            });
            setIsSubmitting(false);
            const data = await response.json();


            if (!response.ok) {
            toast.error(data.message);
            return;
            }

            toast.success(data.message);
            router.push("/admin/products");
        };


  return (
    <div>
        <div className="mb-6">
            <p className="text-sm text-gray-500">Add Product</p>
            {/* <h1 className="mt-1 text-3xl font-bold text-gray-900">{title}</h1> */}
        </div>

        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        onChange={(e) => setBrand(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Discount (%)
                    </label>
                    <input
                        type="number"
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <input
                        type="number"
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push(`/admin/products`)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-gray-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    {isSubmitting ? "Creating..." : "Create Product"}
                </button>
            </div>
        </form>
    </div>
)}