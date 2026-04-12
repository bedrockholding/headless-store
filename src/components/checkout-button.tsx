type Props = {
  checkoutUrl: string;
};

export function CheckoutButton({ checkoutUrl }: Props) {
  return (
    <a
      href={checkoutUrl}
      className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:w-auto sm:min-w-[200px]"
    >
      Checkout on Shopify
    </a>
  );
}
