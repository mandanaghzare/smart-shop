import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export type Review = {
  id: string;
  productId: string;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: unknown;
};

export async function getProductReviews(productId: string) {
  const q = query(
    collection(db, "reviews"),
    where("productId", "==", productId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
}

export async function addReview({
  productId,
  userId,
  userName,
  rating,
  comment,
}: Omit<Review, "id" | "createdAt">) {
  await addDoc(collection(db, "reviews"), {
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: serverTimestamp(),
  });
}