import Link from "next/link";
import { Suspense } from "react";

import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { getProducts } from "@/lib/shopify/data";

type SearchParams = { q?: string };

async function SearchResults({ query }: { query: string }) {
  const products = await getProducts(query.trim() || undefined);
  return <ProductGrid products={products} />;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Search
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Uses Shopify&apos;s{" "}
          <a
            href="https://shopify.dev/docs/api/storefront/latest/queries/products"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            products
          </a>{" "}
          search query (e.g. title, type, vendor).
        </p>
        <form className="mt-6 flex max-w-md gap-2" action="/search" method="get">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search products…"
            className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Search
          </button>
        </form>
        <p className="mt-4 text-sm">
          <Link href="/" className="text-zinc-700 underline">
            ← Back to all products
          </Link>
        </p>
      </div>
      <Suspense key={q} fallback={<ProductGridSkeleton />}>
        <SearchResults query={q} />
      </Suspense>
    </div>
  );
}
