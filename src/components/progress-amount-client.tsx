"use client";

import { usePathname } from "next/navigation";
import { ProgressAmount, useGameApi } from "getjacked-components";

const REWARDS_GAMES_PATH = "/rewards/games";

function isRewardsGamesPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === REWARDS_GAMES_PATH ||
    pathname.startsWith(`${REWARDS_GAMES_PATH}/`)
  );
}

/** `useGameApi` + `ProgressAmount` only run when this subtree is mounted (rewards/games). */
function RewardsGamesProgressAmount() {
  const partnerCode = "storefront";
  const { rewardAmount, sessionUser, partnerSettings } = useGameApi(partnerCode, "");

  if (!sessionUser?.email) {
    return (
      <>
        <a
          href="/rewards"
          className="hidden items-center bg-black py-2.5 p-3 text-[14px] font-bold text-white hover:opacity-90 sm:inline-flex"
        >
          Start Earning Now
        </a>
        <div className="inline-flex sm:hidden">
          <ProgressAmount
            amount={rewardAmount ? rewardAmount.toString() : "0"}
            thresholdAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount || 0)}
          />
        </div>
      </>
    );
  }

  return (
    <ProgressAmount amount={rewardAmount ? rewardAmount.toString() : "0"} thresholdAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount || 0)} />
  );
}

export function ProgressAmountClient() {
  const pathname = usePathname();
  const onRewardsGames = isRewardsGamesPath(pathname);

  if (!onRewardsGames) {
    return (
      <a
        href="/rewards/games"
        className="items-center bg-black py-2.5 px-3 text-[14px] font-bold text-white hover:opacity-90 hidden sm:inline-flex"
      >
        Start Earning Now
      </a>
    );
  }

  return <RewardsGamesProgressAmount />;
}
