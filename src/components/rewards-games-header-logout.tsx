"use client";

import { usePathname } from "next/navigation";

import {
  isRewardsGamesPath,
  useRewardsGamesApiOptional,
} from "@/components/rewards-games-api-provider";

/** Games-session logout next to nav progress; only on `/rewards/games` when signed in. */
export function RewardsGamesHeaderLogout() {
  const pathname = usePathname();
  const ctx = useRewardsGamesApiOptional();

  if (!isRewardsGamesPath(pathname) || !ctx?.sessionUser?.email?.trim()) {
    return null;
  }

  const handleClick = () => {
    ctx.setProgressEmail("");
    ctx.userLogout();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="shrink-0 cursor-pointer rounded-md bg-red-500 px-2 py-1.5 text-sm font-medium text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
