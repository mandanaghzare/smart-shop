import { create } from "zustand";
import { Product } from "@/types/product";
import { products } from "@/data/products";

type CartItem = Product & {
  quantity: number;
};

export type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],        
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

    increaseQuantity: (id) => 
      set((state) => ({
        cartItems: state.cartItems.map((item) => 
          item.id === id ? {...item, quantity: item.quantity + 1} : item 
        )
      })),

    decreaseQuantity: (id) => 
      set((state) => ({
        cartItems: state.cartItems.map((item) => 
          item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
        )
      })),



  clearCart: () => set({ cartItems: [] }),
}));