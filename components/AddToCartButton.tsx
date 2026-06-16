"use client"
import { useCartStore } from "@/store/cartStore"
import { Product } from "@/types/product"
import { toast } from "sonner"


export type AddToCartButtonProps = {
    product: Product
    variant?: "default" | "icon";
}

const AddToCartButton = ({product, variant}: AddToCartButtonProps) => {
    const addToCart = useCartStore((state) => state.addToCart)
    return(
        <div>
            <button
            onClick={() => 
                {addToCart(product);
                toast.success(`${product.title} added to cart`);
            }}
                className={
                    variant === "icon"
                    ? "rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    : "rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                }
                >
                {variant === "icon" ? "+" : "Add to Cart"}
            </button>
        </div>
    )
}

export default AddToCartButton