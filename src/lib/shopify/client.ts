import "server-only";

import { getShopifyConfig } from "./config";

type ShopifyRequestOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: ShopifyRequestOptions = {},
): Promise<T> {
  const { endpoint, storefrontToken } = getShopifyConfig();

  const useNoStore = options.revalidate === false;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: useNoStore ? "no-store" : "default",
    ...(useNoStore
      ? {}
      : {
          next: {
            ...(typeof options.revalidate === "number"
              ? { revalidate: options.revalidate }
              : {}),
            ...(options.tags?.length ? { tags: options.tags } : {}),
          },
        }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const text = await res.text();
      if (text) {
        try {
          const errJson = JSON.parse(text) as { errors?: string };
          detail =
            typeof errJson.errors === "string" ? errJson.errors : text.slice(0, 200);
        } catch {
          detail = text.slice(0, 200);
        }
      }
    } catch {
      /* ignore */
    }

    if (res.status === 401) {
      throw new Error(
        [
          "Shopify returned 401 Unauthorized. Usually this means:",
          "• SHOPIFY_STOREFRONT_ACCESS_TOKEN is not a Storefront API token (Admin tokens like shpat_… will not work).",
          "• In Shopify Admin: Settings → Apps → your custom app → API credentials → copy the Storefront API access token.",
          "• The app must have Storefront API enabled; reinstall after changing scopes if needed.",
          "• NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN must be the myshopify.com hostname (e.g. your-store.myshopify.com), no https://.",
          detail ? `Response: ${detail}` : "",
        ]
          .filter(Boolean)
          .join(" "),
      );
    }

    throw new Error(
      `Shopify API error: ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`,
    );
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("Empty response from Shopify");
  }

  return json.data;
}
