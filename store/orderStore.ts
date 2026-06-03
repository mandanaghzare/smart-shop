import { persist } from "zustand/middleware";
import { CartItem } from "./cartStore";
import { create } from "zustand";


type Order = {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: string;
    status: "processing" | "delivered" | "cancelled"
}

type OrderStore = {
    orders: Order[];
    addOrder: (item: CartItem[], total: number) => void
}

export const useOrderStor = create<OrderStore>() (
    persist(
        (set) => ({
            orders: [],

            addOrder: (items, total) =>
                set((state) => ({
                    orders: [
                        ...state.orders,
                        {
                            id: crypto.randomUUID(),
                            items,
                            total,
                            createdAt: new Date().toLocaleDateString(),
                            status: "processing",
                        }
                    ]
                }))
        }),
        {
            name: "order-storage",
        }
    )
)