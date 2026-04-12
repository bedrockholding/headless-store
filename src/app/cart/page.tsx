import Link from "next/link";

import { getCartForSession } from "@/app/actions/cart";
import { CartLineItem } from "@/components/cart-line-item";
import { CheckoutButton } from "@/components/checkout-button";
import { formatMoney } from "@/lib/format-money";

export default async function CartPage() {
  const cart = await getCartForSession();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Your cart</h1>
        <p className="mt-2 text-zinc-600">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart.cost.subtotalAmount;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Your cart</h1>
      <ul className="mt-6">
        {cart.lines.map(({ node }) => (
          <CartLineItem key={node.id} line={node} />
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-zinc-900">
          Subtotal{" "}
          <span className="tabular-nums">{formatMoney(subtotal)}</span>
        </p>
        <CheckoutButton checkoutUrl={cart.checkoutUrl} />
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 sm:text-left">
        You will complete payment on Shopify&apos;s secure checkout.
      </p>
    </div>
  );
}
