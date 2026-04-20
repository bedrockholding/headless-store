"use client";
type ProgressRewardsClientProps = {
  highlightColor: string;
  highlightedText: string;
  message: string;
  milestones: any[];
  rewardAmount: number;
  suffixText: string;
  goalAmount: number;
};

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { usePathname } from "next/navigation";
import { ProgressRewards, useGameApi } from "getjacked-components";

const REWARDS_GAMES_PATH = "/rewards/games";



function isRewardsGamesPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === REWARDS_GAMES_PATH ||
    pathname.startsWith(`${REWARDS_GAMES_PATH}/`)
  );
}

type SessionUserShape = { email?: string; userId?: string } | null | undefined;

type ExtendedGameApi = ReturnType<typeof useGameApi> & {
  sessionUser?: SessionUserShape;
};

/** Library runtime includes extra props; published `.d.ts` can lag. */
const ProgressRewardsExtended = ProgressRewards as unknown as ComponentType<
  Record<string, unknown>
>;

/**
 * Full rewards progress (same as games page), shown in the site header on large screens
 * only while on `/rewards/games`.
 */
export function ProgressRewardsClient() {
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";

  const { partnerSettings, sessionUser, rewardAmount } = useGameApi(
    partnerCode,
    email
  ) as ExtendedGameApi;

  useEffect(() => {
    if (!sessionUser) return;
    const next = sessionUser.email || "";
    queueMicrotask(() => {
      setEmail(next);
    });
  }, [sessionUser]);

  const handleFirstMilestoneClaim = () => {
    console.log("First milestone claimed");
  };

  const handleLastMilestoneClaim = () => {
    console.log("Last milestone claimed");
  };

  const handleGenerateDiscountCode = () => {
    setDiscountCode("STORE100");
    console.log("Generate discount code");
  };

  if (!isRewardsGamesPath(pathname)) {
    return null;
  }

  return (
    <div className="hidden min-w-0 max-w-md flex-1 items-center justify-center lg:flex">
      <ProgressRewardsExtended
        className="min-w-0 max-w-sm"
        milestones={partnerSettings?.milestones || []}
        rewardAmount={rewardAmount || 0}
        discountAmount={Number(partnerSettings?.rewardGoal?.discount) || 0}
        goalAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        code={discountCode || ""}
        onCopyWithRedirect={() => {
          console.log("Copy with redirect");
        }}
        onClaimLater={() => {
          console.log("Claim later");
        }}
        redirectUrl="https://example.com/"
        onClaimFirstMilestone={handleFirstMilestoneClaim}
        onClaimLastMilestone={handleLastMilestoneClaim}
        partnerName={partnerName}
        onGenerateDiscountCode={handleGenerateDiscountCode}
      />
    </div>
  );
}
