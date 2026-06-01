"use client"
import { useWishlist } from "@/store/wishlistStore"
import { Product } from "@/types/product"

export type AddToWishlistProps = {
    product: Product
}

const AddToWishlistBotton = ({product}: AddToWishlistProps) => {
    const addToWishlist = useWishlist((state) => state.addToWishlist)
    return(
        <div>
            <button onClick={() => addToWishlist(product)} className="cursor-pointer rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600">
                ♥ Wishlist
            </button>
        </div>
    )
}

export default AddToWishlistBotton