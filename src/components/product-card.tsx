import Link from "next/link";

import { formatMoney } from "@/lib/format-money";
import type { ProductSummary } from "@/lib/shopify/types";

import { ShopifyImage } from "./shopify-image";

export function ProductCard({ product }: { product: ProductSummary }) {
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <ShopifyImage
          image={product.featuredImage}
          alt={product.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="line-clamp-2 text-sm font-medium text-zinc-900">
          {product.title}
        </h2>
        <p className="text-sm font-semibold text-zinc-700">
          {formatMoney(price)}
        </p>
      </div>
    </Link>
  );
}
