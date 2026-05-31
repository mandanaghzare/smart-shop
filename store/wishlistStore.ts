import { create } from "zustand"
import { persist } from "zustand/middleware"

type WishlishStore = {
    wishlistItem: WishListItem[]
    addToWishlist: (product: WishListItem) => void
    removeFromWishlist: (id: number) => void
}
type WishListItem = {
    id: number
    title: string
    price: number
    image: string
}

export const useWishList = create<WishlishStore>()(
    persist(
        (set) => {
            addToWishlist: () => {

            }
        },
        {
            name: "wishList-storage"
        }
    )
)