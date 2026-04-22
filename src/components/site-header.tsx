import Link from "next/link";
import { AccountNav } from "@/components/account-nav";
import { getCartLineCount } from "@/app/actions/cart";
import { ProgressAmountClient } from "@/components/progress-amount-client";
import { ProgressRewardsClient } from "@/components/progress-rewards-client";
import { LogoutButton } from "@/components/logout-button";

export async function SiteHeader() {
  const count = await getCartLineCount();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 lg:h-24 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900"
        >
          Storefront
          <LogoutButton />
        </Link>
        <ProgressRewardsClient />
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-700 sm:gap-4">
           <AccountNav />
          <Link href="/rewards" className="hover:text-zinc-900">
            Rewards
          </Link>
          {/*<Link href="/rewards/games" className="hover:text-zinc-900">
            Games
          </Link>
          <Link href="/search" className="hover:text-zinc-900">
            Search
          </Link> */}
          <div
            className="flex min-w-0 max-w-[min(20rem,calc(100vw-14rem))] shrink-0 flex-col items-end justify-center self-center lg:max-w-[18rem]"
            data-site-header-nav-progress
          >
            <ProgressAmountClient />
          </div>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={`Cart${count ? `, ${count} items` : ""}`}
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
