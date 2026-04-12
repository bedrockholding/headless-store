import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 h-10 w-48 animate-pulse rounded bg-zinc-200" />
      <ProductGridSkeleton />
    </div>
  );
}
