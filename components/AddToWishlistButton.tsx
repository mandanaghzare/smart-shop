"use client"
import { useWishlist } from "@/store/wishlistStore"
import { Product } from "@/types/product"
import { FaHeart } from "react-icons/fa"

export type AddToWishlistProps = {
    product: Product
}

const AddToWishlistButton = ({ product }: AddToWishlistProps) => {
    const addToWishlist = useWishlist((state) => state.addToWishlist);

    return (
        <button
            type="button"
            onClick={() => addToWishlist(product)}
            aria-label="Add to wishlist"
            className="flex h-11 cursor-pointer w-11 items-center justify-center rounded-xl border border-slate-600/60 bg-slate-900/30 text-slate-100 shadow-sm backdrop-blur transition hover:border-rose-400 hover:bg-rose-500 hover:text-white"
        >
            <FaHeart size={18} />
        </button>
    );
};

export default AddToWishlistButton