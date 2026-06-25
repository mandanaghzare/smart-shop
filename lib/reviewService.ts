import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: unknown;
  updatedAt?: unknown;
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

export async function upsertReview({
  productId,
  userId,
  userName,
  rating,
  comment,
}: Omit<Review, "id" | "createdAt" | "updatedAt">) {
  const existingReviewQuery = query(
    collection(db, "reviews"),
    where("productId", "==", productId),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(existingReviewQuery);

  if (!snapshot.empty) {
    const reviewRef = doc(db, "reviews", snapshot.docs[0].id);

    await updateDoc(reviewRef, {
      rating,
      comment,
      userName,
      updatedAt: serverTimestamp(),
    });

    return;
  }

  await addDoc(collection(db, "reviews"), {
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: serverTimestamp(),
  });
}