"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { shopifyFetch } from "@/lib/shopify/client";
import {
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
  CUSTOMER_QUERY,
} from "@/lib/shopify/queries";

import { SHOPIFY_CART_ID_COOKIE } from "@/lib/shopify-cookies";

const CUSTOMER_TOKEN_COOKIE = "shopifyCustomerAccessToken";
const TOKEN_COOKIE_MAX_SEC = 60 * 60 * 24 * 30;

export type CustomerSession = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

export type LoginFormState = {
  error?: string;
};

function cookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: maxAgeSec,
    path: "/",
  };
}

async function setCustomerTokenCookie(accessToken: string, expiresAtIso: string) {
  const expiresMs = new Date(expiresAtIso).getTime();
  const sec = Math.floor((expiresMs - Date.now()) / 1000);
  const maxAge =
    Number.isFinite(sec) && sec > 60
      ? Math.min(sec, TOKEN_COOKIE_MAX_SEC)
      : 60 * 60 * 24 * 14;

  const c = await cookies();
  c.set(CUSTOMER_TOKEN_COOKIE, accessToken, cookieOptions(maxAge));
}

export async function getCustomerAccessToken(): Promise<string | undefined> {
  const c = await cookies();
  return c.get(CUSTOMER_TOKEN_COOKIE)?.value;
}

export async function getCustomerSession(): Promise<CustomerSession | null> {
  const token = await getCustomerAccessToken();
  if (!token) return null;

  try {
    const data = await shopifyFetch<{
      customer: CustomerSession | null;
    }>(
      CUSTOMER_QUERY,
      { customerAccessToken: token },
      { revalidate: false },
    );
    if (!data.customer) {
      const c = await cookies();
      c.delete(CUSTOMER_TOKEN_COOKIE);
      return null;
    }
    return data.customer;
  } catch {
    const c = await cookies();
    c.delete(CUSTOMER_TOKEN_COOKIE);
    return null;
  }
}

async function attachCartToCustomer(customerAccessToken: string) {
  const c = await cookies();
  const cartId = c.get(SHOPIFY_CART_ID_COOKIE)?.value;
  if (!cartId) return;

  const data = await shopifyFetch<{
    cartBuyerIdentityUpdate: {
      userErrors: { message: string }[];
    };
  }>(
    CART_BUYER_IDENTITY_UPDATE_MUTATION,
    {
      cartId,
      buyerIdentity: { customerAccessToken },
    },
    { revalidate: false },
  );

  if (data.cartBuyerIdentityUpdate.userErrors.length) {
    console.warn(
      "[auth] cartBuyerIdentityUpdate:",
      data.cartBuyerIdentityUpdate.userErrors,
    );
  }
}

export async function loginCustomer(
  _prev: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  let data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      } | null;
      customerUserErrors: { message: string }[];
    };
  };

  try {
    data = await shopifyFetch(
      CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
      { input: { email, password } },
      { revalidate: false },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Sign-in failed.";
    return { error: msg };
  }

  const errs = data.customerAccessTokenCreate.customerUserErrors;
  if (errs.length) {
    return { error: errs.map((e) => e.message).join(" ") };
  }

  const tokenObj = data.customerAccessTokenCreate.customerAccessToken;
  if (!tokenObj?.accessToken) {
    return { error: "Could not sign in. Check your credentials." };
  }

  await setCustomerTokenCookie(tokenObj.accessToken, tokenObj.expiresAt);
  await attachCartToCustomer(tokenObj.accessToken);

  revalidatePath("/", "layout");
  revalidatePath("/cart");
  redirect("/account");
}

export async function logoutCustomer() {
  const token = await getCustomerAccessToken();
  if (token) {
    try {
      await shopifyFetch(
        CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
        { customerAccessToken: token },
        { revalidate: false },
      );
    } catch {
      /* still clear cookie */
    }
  }

  const c = await cookies();
  c.delete(CUSTOMER_TOKEN_COOKIE);

  revalidatePath("/", "layout");
  revalidatePath("/cart");
  revalidatePath("/account");
  redirect("/");
}
