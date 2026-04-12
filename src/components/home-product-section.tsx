import { getProducts } from "@/lib/shopify/data";

import { ProductGrid } from "./product-grid";

export async function HomeProductSection() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
