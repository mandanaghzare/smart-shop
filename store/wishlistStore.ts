import { create } from "zustand"
import { persist } from "zustand/middleware"

type WishlistItems = {
    id: string
    title: string
    price: number
    image: string
}
type WishlishStore = {
    wishlistItems: WishlistItems[]
    addToWishlist: (product: WishlistItems) => void
    removeFromWishlist: (id: string) => void
}

export const useWishlist = create<WishlishStore>()(
    persist(
        (set) => ({
            wishlistItems: [],

            addToWishlist: (product) => 
                set((state) => {
                    const exists = state.wishlistItems.some(
                        (item) => item.id === product.id
                    )
                    if(exists) { return state }
                    return {
                        wishlistItems: [...state.wishlistItems, product]
                    }
                }),

            removeFromWishlist: (id) => {
                set((state) => ({
                    wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
                }))
            },
        }),
        {
            name: "wishList-storage"
        }
    )
)