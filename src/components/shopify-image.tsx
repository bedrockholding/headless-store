import Image from "next/image";

import type { ShopifyImage } from "@/lib/shopify/types";

type Props = {
  image: ShopifyImage | null | undefined;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ShopifyImage({
  image,
  alt,
  sizes,
  className,
  priority,
}: Props) {
  if (!image?.url) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 text-zinc-400 ${className ?? ""}`}
        aria-hidden
      >
        <span className="text-sm">No image</span>
      </div>
    );
  }

  const w = image.width ?? 800;
  const h = image.height ?? 800;

  return (
    <Image
      src={image.url}
      alt={image.altText ?? alt}
      width={w}
      height={h}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
