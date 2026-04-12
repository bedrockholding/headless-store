export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: Money;
  };
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Money;
  image: ShopifyImage | null;
};

export type ProductDetail = {
  id: string;
  title: string;
  descriptionHtml: string;
  images: { node: ShopifyImage }[];
  options: { name: string; values: string[] }[];
  variants: { node: ProductVariant }[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: ShopifyImage | null;
    product: { title: string; handle: string };
    price: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: { node: CartLine }[];
};
