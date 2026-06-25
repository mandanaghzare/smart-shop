import { persist } from "zustand/middleware";
import { CartItem } from "./cartStore";
import { create } from "zustand";
import { users } from "@/data/users";

type Order = {
  id: string;

  userId: number;
  userName: string;
  userEmail: string;

  items: CartItem[];
  total: number;
  createdAt: string;
  status: "processing" | "delivered" | "cancelled";
};

type OrderStore = {
  orders: Order[];

  addOrder: (
    items: CartItem[],
    total: number
  ) => void;

  updateOrderStatus: (
    id: string,
    status: Order["status"]
  ) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (items, total) =>
        set((state) => {
          const randomUser =
            users[Math.floor(Math.random() * users.length)];

          return {
            orders: [
              ...state.orders,
              {
                id: crypto.randomUUID(),

                userId: randomUser.id,
                userName: `${randomUser.firstName} ${randomUser.lastName}`,
                userEmail: randomUser.email,

                items,
                total,
                createdAt: new Date().toLocaleDateString(),
                status: "processing",
              },
            ],
          };
        }),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? { ...order, status }
              : order
          ),
        })),
    }),
    {
      name: "order-storage",
    }
  )
);