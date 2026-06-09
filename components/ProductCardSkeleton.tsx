export default function ProductCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="h-52 animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="pt-6">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}