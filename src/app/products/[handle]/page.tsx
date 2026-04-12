import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductGallery } from "@/components/product-gallery";
import { getProductByHandle } from "@/lib/shopify/data";
import type { ProductVariant } from "@/lib/shopify/types";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.title,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const variants: ProductVariant[] = product.variants.map((e) => e.node);
  const images = product.images.map((e) => e.node).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        ← All products
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={images} productTitle={product.title} />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {product.title}
            </h1>
          </div>
          <AddToCartForm variants={variants} />
          {product.descriptionHtml ? (
            <div
              className="product-description border-t border-zinc-200 pt-6 text-sm leading-relaxed text-zinc-700 [&_a]:text-zinc-900 [&_a]:underline [&_img]:max-w-full [&_img]:rounded-lg [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
