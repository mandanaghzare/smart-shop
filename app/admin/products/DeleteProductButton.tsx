"use client";

import { useRouter } from "next/navigation";
import { BiTrash } from "react-icons/bi";
import { toast } from "sonner";

type DeleteProductButtonProps = {
  id: string;
  variant?: "default" | "icon";
};

export default function DeleteProductButton({
  id, variant
}: DeleteProductButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");

      router.push("/admin/products");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border cursor-pointer border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
      {variant === "icon" ? <BiTrash /> : "Delete"}
    </button>
  );
}