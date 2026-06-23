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

export default function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(product.title);
    const [brand, setBrand] = useState(product.brand);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [discount, setDiscount] = useState(product.discount);
    const [description, setDescription] = useState(product.description);
    const [rating, setRating] = useState(product.rating);
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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
        const response = await fetch(`/api/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        
        setIsSubmitting(false);
        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message || "Failed to update product");
            return;
        }
        
        toast.success(data.message || "Product updated successfully");
        router.push(`/admin/products/${product.id}`);
    };
    
    
    return (
        <div>
        <div className="mb-6">
            <p className="text-sm text-gray-500">Edit Product</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{title}</h1>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        value={stock}
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
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-gray-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    </div>
)}