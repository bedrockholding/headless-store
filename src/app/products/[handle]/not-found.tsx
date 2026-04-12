import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-xl font-semibold text-zinc-900">Product not found</h1>
      <p className="mt-2 text-sm text-zinc-600">
        That handle does not match a product in your store.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-zinc-900 underline"
      >
        Back to home
      </Link>
    </div>
  );
}
