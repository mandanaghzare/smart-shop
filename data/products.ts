import productsData from "./products.json";
import type { Product } from "@/types/product";

export const products: Product[] = productsData.products.map((product) => ({
  id: String(product.id),
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  brand: product.brand ?? "Unknown",
  rating: product.rating,
  stock: product.stock,
  image: product.thumbnail,
  discount: product.discountPercentage,
  createdAt: product.meta.createdAt,

  reviews: product.reviews.map((review) => ({
    rating: review.rating,
    comment: review.comment,
    date: review.date,
    reviewerName: review.reviewerName,
  })),
}));