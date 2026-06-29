"use client";

import { useEffect, useMemo, useState } from "react";
import { getProductReviews, Review, upsertReview } from "@/lib/reviewService";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const user = useAuthStore((state) => state.user);

 useEffect(() => {
  let isMounted = true;

  async function loadReviews() {
    try {
      setIsLoading(true);
      setLoadError(false);

      const data = await getProductReviews(productId);

      if (isMounted) {
        setReviews(data);
      }
    } catch (error) {

      if (isMounted) {
        setLoadError(true);
        toast.error("Failed to load reviews.");
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }

  loadReviews();

  return () => {
    isMounted = false;
  };
}, [productId, reloadKey]);


  const mappedInitialReviews = useMemo(
    () =>
      initialReviews.map((review, index) => ({
        id: `initial-${index}`,
        productId,
        userId: `initial-${index}`,
        userName: review.reviewerName,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.date,
      })),
    [initialReviews, productId]
  );

  const allReviews = useMemo(
    () => [...reviews, ...mappedInitialReviews],
    [reviews, mappedInitialReviews]
  );

  const averageRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) /
        allReviews.length
      : 0;

  const hasUserReviewed = user
    ? reviews.some((review) => review.userId === user.uid)
    : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setIsSubmitting(true);

      await upsertReview({
        productId,
        userId: user.uid,
        userName: user.name,
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);

      const data = await getProductReviews(productId);
      setReviews(data);

      toast.success(
        hasUserReviewed
          ? "Review updated successfully."
          : "Review submitted successfully."
      );
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/30 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
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

        <div className="rounded-xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-right">
          <p className="text-2xl font-bold text-amber-400">
            {averageRating.toFixed(1)}
          </p>
          <p className="text-xs text-slate-400">Average rating</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-xl border border-slate-800 bg-slate-800/70 p-4"
      >
        {hasUserReviewed && (
          <p className="mb-4 rounded-lg border border-emerald-900/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
            You can update your previous review by submitting again.
          </p>
        )}

        <label className="text-sm font-medium text-slate-200">Rating</label>

        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`text-3xl transition ${
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
          placeholder={
            hasUserReviewed
              ? "Update your review..."
              : "Write your review..."
          }
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Submitting..."
            : hasUserReviewed
            ? "Update Review"
            : "Submit Review"}
        </button>
      </form>

      <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-slate-800 bg-slate-800/70 p-4 sm:p-5"
            >
              <div className="mb-4 h-4 w-32 rounded bg-slate-700" />
              <div className="mb-4 h-3 w-24 rounded bg-slate-700" />
              <div className="h-3 w-full rounded bg-slate-700" />
            </div>
          ))
        ) : loadError ? (
          <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-5 text-center">
            <p className="font-semibold text-red-300">Unable to load reviews.</p>
            <p className="mt-2 text-sm text-red-200/80">
              Please try again later.
            </p>

            <button
              type="button"
              onClick={() => setReloadKey((current) => current + 1)}
              className="mt-4 rounded-lg border border-red-800 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-900/40"
            >
              Try Again
            </button>
          </div>
        ) : allReviews.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-800/70 p-6 text-center">
            <p className="text-2xl">⭐</p>
            <p className="mt-3 font-semibold text-slate-100">No reviews yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Be the first customer to share your experience.
            </p>
          </div>
        ) : (
          allReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-slate-800 bg-slate-800/70 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-100">{review.userName}</p>

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

              <p className="text-sm leading-6 text-slate-300">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}