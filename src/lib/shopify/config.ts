function normalizeStoreDomain(raw: string): string {
  let d = raw.trim();
  d = d.replace(/^https?:\/\//i, "");
  d = d.replace(/\/.*$/, "");
  return d;
}

export function getShopifyConfig() {
  const storeDomainRaw = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontTokenRaw = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion =
    (process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION ?? "2024-10").trim();

  const storeDomain = storeDomainRaw ? normalizeStoreDomain(storeDomainRaw) : "";
  const storefrontToken = storefrontTokenRaw?.trim() ?? "";

  if (!storeDomain || !storefrontToken) {
    throw new Error(
      "Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }

  return {
    storeDomain,
    storefrontToken,
    apiVersion,
    endpoint: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
  };
}
