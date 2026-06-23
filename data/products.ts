import productsData from "./products.json";
import type { Product } from "@/types/product";

type RawProduct = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand?: string;
  rating: number;
  stock: number;
  thumbnail?: string;
  image?: string;
  discountPercentage?: number;
  discount?: number;
  createdAt?: string;
  meta?: {
    createdAt?: string;
  };
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
};

export const products: Product[] = (productsData.products as RawProduct[]).map((product) => ({
  id: String(product.id),
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  brand: product.brand ?? "Unknown",
  rating: product.rating,
  stock: product.stock,
  image: product.thumbnail ?? product.image ?? "",
  discount: product.discountPercentage ?? product.discount ?? 0,
  createdAt: product.createdAt ?? product.meta?.createdAt ?? "",
  reviews:
    product.reviews?.map((review) => ({
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      reviewerName: review.reviewerName,
    })) ?? [],
}));