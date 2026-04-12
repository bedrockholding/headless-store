"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

import { addToCart } from "@/app/actions/cart";
import { formatMoney } from "@/lib/format-money";
import type { ProductVariant } from "@/lib/shopify/types";

type Props = {
  variants: ProductVariant[];
};

export function AddToCartForm({ variants }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const firstAvailable =
    variants.find((v) => v.availableForSale) ?? variants[0] ?? null;
  const [selectedId, setSelectedId] = useState<string>(
    firstAvailable?.id ?? "",
  );

  const selected = variants.find((v) => v.id === selectedId) ?? firstAvailable;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected?.availableForSale) return;
    setError(null);
    startTransition(async () => {
      const result = await addToCart(selected.id, 1);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  if (variants.length === 0) {
    return (
      <p className="text-sm text-amber-700">This product has no variants.</p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {variants.length > 1 ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
          Variant
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                {v.title} — {formatMoney(v.price)}
                {!v.availableForSale ? " (sold out)" : ""}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="text-lg font-semibold text-zinc-900">
          {formatMoney(selected!.price)}
        </p>
      )}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || !selected?.availableForSale}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add to cart"}
      </button>
    </form>
  );
}
