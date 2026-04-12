"use client";

import { useState } from "react";

import type { ShopifyImage } from "@/lib/shopify/types";

import { ShopifyImage as ShopifyImageComponent } from "./shopify-image";

type Props = {
  images: ShopifyImage[];
  productTitle: string;
};

export function ProductGallery({ images, productTitle }: Props) {
  const list = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  const current = list[index] ?? null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
        <ShopifyImageComponent
          image={current}
          alt={productTitle}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-contain"
          priority
        />
      </div>
      {list.length > 1 ? (
        <ul className="flex flex-wrap gap-2">
          {list.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 bg-zinc-50 ${
                  i === index ? "border-zinc-900" : "border-transparent"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <ShopifyImageComponent
                  image={img}
                  alt=""
                  sizes="64px"
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
