# Shopify headless storefront (Next.js)

Minimal [Next.js App Router](https://nextjs.org/docs/app) storefront that loads catalog and cart data from the [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL). Styling uses [Tailwind CSS v4](https://tailwindcss.com/). Cart state is tied to an HTTP-only cookie; checkout sends shoppers to Shopify-hosted checkout.

## Prerequisites

- Node.js 20+
- A Shopify store with at least one product
- A **Headless** or custom app with the **Storefront API** enabled and a **Storefront API access token**

## Setup

1. **Clone / open this folder** and install dependencies:

   ```bash
   npm install
   ```

2. **Create a Storefront API token** in Shopify Admin:

   - **Settings → Apps and sales channels → Develop apps** (enable custom app development if prompted)
   - Create an app → **Configure Storefront API** → enable the scopes you need (for this demo, defaults that allow reading products and creating carts are enough)
   - **Install** the app and copy the **Storefront API access token**

3. **Environment variables** — copy the example file and fill in your store:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Store domain, e.g. `your-store.myshopify.com` (no `https://`) |
   | `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token (server-only; never expose as `NEXT_PUBLIC_`) |
   | `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION` | Optional. Defaults to `2024-10`. |

4. **Run the dev server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. **Production build**:

   ```bash
   npm run build
   npm start
   ```

## What’s included

| Area | Implementation |
|------|------------------|
| **Home** | Product grid (image, title, price), ISR-style revalidation (`revalidate: 60`) |
| **Product** | Gallery, HTML description, variant select, add to cart |
| **Cart** | Lines, quantity (+/−), remove, subtotal, **Checkout** → `cart.checkoutUrl` |
| **Search** | `/search?q=` uses the Storefront API `products` query argument |
| **Images** | `next/image` + `cdn.shopify.com` in `next.config.ts` |
| **State** | React hooks + server actions; cart id in `shopifyCartId` cookie |

## Project structure

```
src/
  app/                 # App Router routes, layouts, loading & error UI
  app/actions/cart.ts  # Server actions: add / update / remove lines, cookie
  components/          # UI pieces (grid, gallery, cart line, header, …)
  lib/shopify/         # Config, GraphQL strings, typed fetch helper, data loaders
```

## Notes

- **Checkout** is always on Shopify (`checkoutUrl` from the Cart object). No custom payments in this repo.
- If the Storefront API returns errors (wrong token, CORS, etc.), check the terminal or the root `error.tsx` boundary.
- Product URLs use the Shopify **handle**: `/products/[handle]`.

## License

Use freely in your own projects.
