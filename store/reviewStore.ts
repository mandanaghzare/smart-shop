import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductReview = {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewStore = {
  reviews: ProductReview[];

  addReview: (
    review: Omit<ProductReview, "id" | "createdAt">
  ) => void;
};

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],

      addReview: (review) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              id: crypto.randomUUID(),
              ...review,
              createdAt: new Date().toLocaleDateString(),
            },
          ],
        })),
    }),
    {
      name: "review-storage",
    }
  )
);