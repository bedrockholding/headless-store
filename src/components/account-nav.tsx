import Link from "next/link";

import { getCustomerSession, logoutCustomer } from "@/app/actions/auth";

export async function AccountNav() {
  const customer = await getCustomerSession();

  if (!customer) {
    return (
      <Link
        href="/account/login"
        className="rounded-lg px-2 py-1 hover:bg-zinc-100 hover:text-zinc-900"
      >
        Sign in
      </Link>
    );
  }

  const label =
    customer.firstName?.trim() ||
    customer.email?.split("@")[0] ||
    "Account";

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        className="max-w-[8rem] truncate rounded-lg px-2 py-1 hover:bg-zinc-100 hover:text-zinc-900"
        title={customer.email ?? label}
      >
        {label}
      </Link>
      <form action={logoutCustomer}>
        <button
          type="submit"
          className="rounded-lg px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
