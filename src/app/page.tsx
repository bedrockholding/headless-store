import { Suspense } from "react";

import { HomeProductSection } from "@/components/home-product-section";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          All products
        </h1>
        <p className="mt-2 max-w-xl text-zinc-600">
          Browse the catalog. Use{" "}
          <a href="/search" className="font-medium text-zinc-900 underline">
            search
          </a>{" "}
          to filter by Shopify&apos;s product query syntax.
        </p>
      </div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeProductSection />
      </Suspense>
    </div>
  );
}
