import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCustomerSession, logoutCustomer } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const customer = await getCustomerSession();
  if (!customer) {
    redirect("/account/login");
  }

  const display =
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    customer.email ||
    "Account";

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Your account</h1>
      <p className="mt-2 text-lg text-zinc-800">{display}</p>
      {customer.email ? (
        <p className="mt-1 text-sm text-zinc-600">{customer.email}</p>
      ) : null}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Continue shopping
        </Link>
        <form action={logoutCustomer}>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50 sm:w-auto"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
