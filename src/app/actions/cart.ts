"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/client";
import { getCart } from "@/lib/shopify/data";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from "@/lib/shopify/queries";
import type { Cart } from "@/lib/shopify/types";

import { SHOPIFY_CART_ID_COOKIE } from "@/lib/shopify-cookies";

const CART_ID_COOKIE = SHOPIFY_CART_ID_COOKIE;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function revalidateStorefront() {
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

async function getCartIdFromCookie(): Promise<string | undefined> {
  const c = await cookies();
  return c.get(CART_ID_COOKIE)?.value;
}

async function setCartCookie(cartId: string) {
  const c = await cookies();
  c.set(CART_ID_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

async function clearCartCookie() {
  const c = await cookies();
  c.delete(CART_ID_COOKIE);
}

export async function getCartForSession(): Promise<Cart | null> {
  const cartId = await getCartIdFromCookie();
  if (!cartId) return null;
  return getCart(cartId);
}

export async function getCartLineCount(): Promise<number> {
  const cart = await getCartForSession();
  if (!cart) return 0;
  return cart.lines.reduce((acc, { node }) => acc + node.quantity, 0);
}

export async function addToCart(
  merchandiseId: string,
  quantity: number,
  isRecreateAttempt = false,
) {
  if (quantity < 1) {
    return { ok: false as const, error: "Quantity must be at least 1" };
  }

  let cartId = await getCartIdFromCookie();

  if (!cartId) {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string } | null;
        userErrors: { message: string }[];
      };
    }>(
      CART_CREATE_MUTATION,
      { input: { lines: [{ merchandiseId, quantity }] } },
      { revalidate: false },
    );

    const errs = data.cartCreate.userErrors;
    if (errs.length) {
      return { ok: false as const, error: errs.map((e) => e.message).join(", ") };
    }

    cartId = data.cartCreate.cart?.id ?? undefined;
    if (!cartId) {
      return { ok: false as const, error: "Could not create cart" };
    }
    await setCartCookie(cartId);
  } else {
    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: { id: string } | null;
        userErrors: { message: string }[];
      };
    }>(
      CART_LINES_ADD_MUTATION,
      { cartId, lines: [{ merchandiseId, quantity }] },
      { revalidate: false },
    );

    const errs = data.cartLinesAdd.userErrors;
    const cartMissing = !data.cartLinesAdd.cart;
    if (errs.length || cartMissing) {
      if (!isRecreateAttempt) {
        await clearCartCookie();
        return addToCart(merchandiseId, quantity, true);
      }
      return {
        ok: false as const,
        error:
          errs.map((e) => e.message).join(", ") ||
          "Could not add item to cart",
      };
    }
  }

  revalidateStorefront();
  return { ok: true as const };
}

export async function updateCartLine(lineId: string, quantity: number) {
  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    return { ok: false as const, error: "No cart" };
  }

  if (quantity < 1) {
    return removeCartLine(lineId);
  }

  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: { id: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines: [{ id: lineId, quantity }] },
    { revalidate: false },
  );

  const errs = data.cartLinesUpdate.userErrors;
  if (errs.length) {
    return { ok: false as const, error: errs.map((e) => e.message).join(", ") };
  }

  if (!data.cartLinesUpdate.cart) {
    await clearCartCookie();
    return { ok: false as const, error: "Cart expired" };
  }

  revalidateStorefront();
  return { ok: true as const };
}

export async function removeCartLine(lineId: string) {
  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    return { ok: false as const, error: "No cart" };
  }

  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: { id: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds: [lineId] },
    { revalidate: false },
  );

  const errs = data.cartLinesRemove.userErrors;
  if (errs.length) {
    return { ok: false as const, error: errs.map((e) => e.message).join(", ") };
  }

  if (!data.cartLinesRemove.cart) {
    await clearCartCookie();
  }

  revalidateStorefront();
  return { ok: true as const };
}
