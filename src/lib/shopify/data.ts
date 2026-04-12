import "server-only";

import { shopifyFetch } from "./client";
import {
  CART_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";
import type { Cart, ProductDetail, ProductSummary } from "./types";

const PRODUCTS_FIRST = 24;

export async function getProducts(query?: string): Promise<ProductSummary[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ProductSummary }[] };
  }>(
    PRODUCTS_QUERY,
    { first: PRODUCTS_FIRST, query: query || null },
    { revalidate: 60, tags: ["products"] },
  );

  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(
  handle: string,
): Promise<ProductDetail | null> {
  const data = await shopifyFetch<{
    product: {
      id: string;
      title: string;
      descriptionHtml: string;
      images: {
        edges: {
          node: NonNullable<ProductSummary["featuredImage"]>;
        }[];
      };
      options: { name: string; values: string[] }[];
      variants: {
        edges: { node: ProductDetail["variants"][number]["node"] }[];
      };
    } | null;
  }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    { revalidate: 60, tags: [`product-${handle}`] },
  );

  const p = data.product;
  if (!p) return null;

  return {
    id: p.id,
    title: p.title,
    descriptionHtml: p.descriptionHtml,
    images: p.images.edges,
    options: p.options,
    variants: p.variants.edges,
  };
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cart: {
      id: string;
      checkoutUrl: string;
      cost: Cart["cost"];
      lines: { edges: { node: Cart["lines"][number]["node"] }[] };
    } | null;
  }>(CART_QUERY, { cartId }, { revalidate: false });

  const cart = data.cart;
  if (!cart) return null;

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    cost: cart.cost,
    lines: cart.lines.edges,
  };
}
