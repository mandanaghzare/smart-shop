"use client"
import { useCartStore } from "@/store/cartStore"
import { Product } from "@/types/product"


export type AddToCartButtonProps = {
    product: Product
}

const AddToCartButton = ({product}: AddToCartButtonProps) => {
    const addToCart = useCartStore((state) => state.addToCart)
    return(
        <div>
            <button onClick={() => addToCart(product)}
                className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Add to Cart
            </button>
        </div>
    )
}

export default AddToCartButton