"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

import { removeCartLine, updateCartLine } from "@/app/actions/cart";
import { formatMoney } from "@/lib/format-money";
import type { CartLine } from "@/lib/shopify/types";

import { ShopifyImage } from "./shopify-image";

export function CartLineItem({ line }: { line: CartLine }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { merchandise } = line;
  const href = `/products/${merchandise.product.handle}`;

  function setQuantity(next: number) {
    setError(null);
    startTransition(async () => {
      const result = await updateCartLine(line.id, next);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function onRemove() {
    setError(null);
    startTransition(async () => {
      const result = await removeCartLine(line.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <li className="flex gap-4 border-b border-zinc-100 py-6 last:border-0">
      <Link
        href={href}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-50"
      >
        <ShopifyImage
          image={merchandise.image}
          alt={merchandise.product.title}
          sizes="96px"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <Link
            href={href}
            className="font-medium text-zinc-900 hover:underline"
          >
            {merchandise.product.title}
          </Link>
          {merchandise.title !== "Default Title" ? (
            <p className="text-sm text-zinc-600">{merchandise.title}</p>
          ) : null}
        </div>
        <p className="text-sm font-medium text-zinc-800">
          {formatMoney(merchandise.price)}
        </p>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="sr-only">Quantity</span>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                setQuantity(line.quantity <= 1 ? 0 : line.quantity - 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-8 text-center font-medium tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              disabled={pending}
              onClick={() => setQuantity(line.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={onRemove}
            className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
