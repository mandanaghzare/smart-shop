
export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  rating: number;
  stock: number;
  image: string;
  discount: number;
  createdAt: string;
  reviews: Review[];
};