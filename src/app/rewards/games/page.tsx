"use client";

import { useEffect, useState } from "react";
import {
  SectionGames,
  SectionGameHero,
  ProgressRewards,
} from "getjacked-components";
import type { ComponentType } from "react";

import { useRewardsGamesApi } from "@/components/rewards-games-api-provider";
import { generateDiscountCode } from "@/lib/generate-discount-code";

/** Library runtime includes extra props; published `.d.ts` can lag. */
const ProgressRewardsExtended = ProgressRewards as unknown as ComponentType<
  Record<string, unknown>
>;

export default function GamesPage() {
  const [discountCode, setDiscountCode] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";

  const {
    games,
    partnerSettings,
    activities,
    loading,
    error,
    sessionUser,
    rewardAmount,
    refetch,
    setProgressEmail,
  } = useRewardsGamesApi();

  /** Fired when the user taps the featured game’s primary CTA in the hero (getjacked-components). */
  const handleHeroCta = () => {
    // TODO: analytics — hero primary CTA
    console.log("Starting to play game...");
  };

  const heroGame = games?.[0];
  const gameList = games?.slice(1);

  useEffect(() => {
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser, activities, partnerSettings]);

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

  return (
    <div>
      <section className="flex items-center justify-center lg:hidden">
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
      </section>

      <SectionGameHero
        partnerCode={partnerCode}
        partnerName={partnerName}
        partnerSettings={partnerSettings}
        game={heroGame}
        onCtaClick={handleHeroCta}
        bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        rewardAmount={Number(rewardAmount) || 0}
        onLogin={(nextEmail) => {
          setProgressEmail(nextEmail);
          console.log("Login with email:", nextEmail);
        }}
        onStartGame={(selectedGame) => {
          console.log("Start Game Clicked!", selectedGame);
        }}
        onSelectedGame={(selectedGame) => {
          console.log("Selected Game!", selectedGame);
        }}
        onGameCTAClick={(selectedGame) => {
          console.log("Game CTA Clicked!", selectedGame);
        }}
        activities={activities}
        maxIncompleteOffers={partnerSettings?.maxIncompleteOffers || 5}
        refetchOffers={refetch}
      />
      <SectionGames
        maxIncompleteOffers={partnerSettings?.maxIncompleteOffers || 5}
        partnerSettings={partnerSettings}
        rewardAmount={Number(rewardAmount) || 0}
        partnerCode={partnerCode}
        partnerName={partnerName}
        bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        onLogin={(nextEmail) => {
          setProgressEmail(nextEmail);
          console.log("Login with email:", nextEmail);
        }}
        onStartGame={(selectedGame) => {
          console.log("Start Game Clicked!", selectedGame);
        }}
        onSelectedGame={(selectedGame) => {
          console.log("Selected Game!", selectedGame);
        }}
        onGameCTAClick={(selectedGame) => {
          console.log("Game CTA Clicked!", selectedGame);
        }}
        onTabChange={(tab) => {
          console.log("Games tab changed:", tab);
        }}
        games={gameList}
        activities={activities}
        loading={loading}
        error={error}
        refetchOffers={refetch}
        discountCode={discountCode}
        onGenerateDiscountCode={handleGenerateDiscountCode}
        redirectUrl="https://example.com/"
      />
    </div>
  );
}
