"use client";

import { useEffect, useMemo, useState } from "react";
import { addReview, getProductReviews, Review } from "@/lib/reviewService";

type ProductReviewsProps = {
  productId: string;
  initialReviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

export default function ProductReviews({
  productId,
  initialReviews,
}: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  

 

  useEffect(() => {
  async function fetchReviews() {
    const data = await getProductReviews(productId);
    setReviews(data);
  }

  fetchReviews();
}, [productId]);

  const allReviews = useMemo(() => {
    const mappedInitialReviews = initialReviews.map((review, index) => ({
      id: `initial-${index}`,
      productId,
      userId: 0,
      userName: review.reviewerName,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.date,
    }));

    return [...reviews, ...mappedInitialReviews];
  }, [reviews, initialReviews, productId]);

  const averageRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) /
        allReviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setIsSubmitting(true);

    try {
      await addReview({
        productId,
        userId: 1,
        userName: "Demo User",
        rating,
        comment,
      });

        setComment("");
        setRating(5);
        const data = await getProductReviews(productId);
        setReviews(data);
        } finally {
        setIsSubmitting(false);
        }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/30 sm:p-8">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
          Customer Reviews
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {allReviews.length > 0
            ? `${averageRating.toFixed(1)} average rating from ${
                allReviews.length
              } reviews.`
            : "Be the first to review this product."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-xl border border-slate-800 bg-slate-800/80 p-4"
      >
        <label className="text-sm font-medium text-slate-200">Rating</label>

        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`text-2xl ${
                  value <= rating ? "text-amber-400" : "text-slate-600"
                }`}
              >
                ★
              </button>
            );
          })}
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-200">
          Comment
        </label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Write your review..."
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div className="space-y-4">
        {allReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-slate-800 bg-slate-800/80 p-4 sm:p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-100">
                  {review.userName}
                </p>

                <div className="mt-2 flex">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={
                        starIndex < review.rating
                          ? "text-amber-400"
                          : "text-slate-600"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-300">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}