"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { usePathname } from "next/navigation";
import { ProgressRewards } from "getjacked-components";

import {
  isRewardsGamesPath,
  useRewardsGamesApiOptional,
} from "@/components/rewards-games-api-provider";
import { generateDiscountCode } from "@/lib/generate-discount-code";
import {
  isBundleGoldNavState,
  milestonesWithDerivedEarnedStatus,
} from "@/lib/reward-milestones";

type SessionUserShape = { email?: string; userId?: string } | null | undefined;

const ProgressRewardsExtended = ProgressRewards as unknown as ComponentType<
  Record<string, unknown>
>;

export function ProgressRewardsClient() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const partnerName = "Storefront";

  const ctx = useRewardsGamesApiOptional();

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  const partnerSettings = ctx?.partnerSettings;
  const sessionUser = ctx?.sessionUser as SessionUserShape | undefined;
  const rewardAmount = ctx?.rewardAmount ?? 0;

  const milestones = useMemo(
    () =>
      milestonesWithDerivedEarnedStatus(
        partnerSettings?.milestones ?? undefined,
        rewardAmount || 0
      ),
    [partnerSettings?.milestones, rewardAmount]
  );

  const bundleGoldNav =
    isBundleGoldNavState(milestones) &&
    !!(sessionUser as SessionUserShape)?.email?.trim();

  const handleFirstMilestoneClaim = () => {
    console.log("First milestone claimed");
  };

  const handleLastMilestoneClaim = () => {
    console.log("Last milestone claimed");
  };

  const handleGenerateDiscountCode = () => {
    setDiscountCode(generateDiscountCode());
    console.log("Generate discount code");
  };

  if (!mounted || !isRewardsGamesPath(pathname) || !ctx) {
    return null;
  }

  return (
    <div
      className={
        bundleGoldNav
          ? "hidden"
          : "hidden min-w-0 max-w-md flex-1 items-center justify-center lg:flex"
      }
    >
      <ProgressRewardsExtended
        className="min-w-0 max-w-sm"
        milestones={milestones}
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
