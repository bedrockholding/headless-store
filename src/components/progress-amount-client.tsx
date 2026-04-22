"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import type { iPartnerSettings } from "getjacked-components";
import { ProgressAmount, ProgressRewards, useGameApi } from "getjacked-components";
import { generateDiscountCode } from "@/lib/generate-discount-code";
import {
  isBundleGoldNavState,
  milestonesWithDerivedEarnedStatus,
} from "@/lib/reward-milestones";

const REWARDS_GAMES_PATH = "/rewards/games";

function isRewardsGamesPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === REWARDS_GAMES_PATH ||
    pathname.startsWith(`${REWARDS_GAMES_PATH}/`)
  );
}

const ProgressRewardsExtended = ProgressRewards as unknown as ComponentType<
  Record<string, unknown>
>;

type SessionLike = { email?: string | null } | null | undefined;

function NavProgressBody({
  rewardAmount,
  partnerSettings,
  sessionUser,
  partnerName = "Storefront",
}: {
  rewardAmount: number;
  partnerSettings: iPartnerSettings | undefined;
  sessionUser: SessionLike;
  partnerName?: string;
}) {
  const [discountCode, setDiscountCode] = useState("");

  const milestones = useMemo(
    () =>
      milestonesWithDerivedEarnedStatus(
        partnerSettings?.milestones ?? undefined,
        rewardAmount || 0
      ),
    [partnerSettings?.milestones, rewardAmount]
  );

  const bundleGoldNav =
    !!sessionUser?.email?.trim() && isBundleGoldNavState(milestones);

  const goalAmount = Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0;
  const discountNum = Number(partnerSettings?.rewardGoal?.discount) || 0;

  const goldRewards = (
    <ProgressRewardsExtended
      className="min-w-0 w-full max-w-[280px] shrink-0"
      milestones={milestones}
      rewardAmount={rewardAmount || 0}
      discountAmount={discountNum}
      goalAmount={goalAmount}
      code={discountCode || ""}
      onCopyWithRedirect={() => {
        console.log("Copy with redirect");
      }}
      onClaimLater={() => {
        console.log("Claim later");
      }}
      redirectUrl="https://example.com/"
      onClaimFirstMilestone={() => {
        console.log("First milestone claimed");
      }}
      onClaimLastMilestone={() => {
        console.log("Last milestone claimed");
      }}
      partnerName={partnerName}
      onGenerateDiscountCode={() => {
        setDiscountCode(generateDiscountCode());
        console.log("Generate discount code (header nav)");
      }}
    />
  );

  if (!sessionUser?.email?.trim()) {
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
            thresholdAmount={Number(
              partnerSettings?.rewardGoal?.thresholdAmount || 0
            )}
          />
        </div>
      </>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:justify-end">
      <div
        className={
          bundleGoldNav
            ? "flex justify-end lg:hidden"
            : "flex justify-end"
        }
      >
        <ProgressAmount
          amount={rewardAmount ? rewardAmount.toString() : "0"}
          thresholdAmount={Number(
            partnerSettings?.rewardGoal?.thresholdAmount || 0
          )}
        />
      </div>
      {bundleGoldNav ? (
        <div className="hidden w-full min-w-0 justify-end lg:flex">{goldRewards}</div>
      ) : null}
    </div>
  );
}

function RewardsGamesProgressAmount() {
  const { rewardAmount, sessionUser, partnerSettings } = useGameApi(
    "storefront",
    ""
  );

  return (
    <NavProgressBody
      rewardAmount={rewardAmount || 0}
      partnerSettings={partnerSettings}
      sessionUser={sessionUser}
    />
  );
}

export function ProgressAmountClient() {
  const pathname = usePathname();
  const onRewardsGames = isRewardsGamesPath(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return null;
  }

  if (!onRewardsGames) {
    return (
      <a
        href="/rewards/games"
        className="hidden items-center bg-black py-2.5 px-3 text-[14px] font-bold text-white hover:opacity-90 sm:inline-flex"
      >
        Start Earning Now
      </a>
    );
  }

  return <RewardsGamesProgressAmount />;
}
