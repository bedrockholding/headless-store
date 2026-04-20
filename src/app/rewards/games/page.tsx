"use client";
import { useEffect, useState } from "react";
import { SectionGames, useGameApi,  SectionGameHero, ProgressRewards } from "getjacked-components";

export default function GamesPage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";
  const { games, partnerSettings, activities, loading, error, sessionUser, rewardAmount } =
    useGameApi(partnerCode, email);

  /** Fired when the user taps the featured game’s primary CTA in the hero (getjacked-components). */
  const handleHeroCta = () => {
    // TODO: analytics — hero primary CTA
    console.log("Starting to play game...");
  };

  const heroGame = games?.[0];
  const gameList = games?.slice(1);

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
      setUserId(sessionUser.userId || "");
    }
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser, activities, partnerSettings]);

  const handleFirstMilestoneClaim = () => {
    //Add tracking here and internal logic.
    console.log("First milestone claimed");
  }

  const handleLastMilestoneClaim = () => {
    //Add tracking here and internal logic.
    console.log("Last milestone claimed");
  }

  const handleCopyWithRedirect = () => {
    //Add tracking here and internal logic.
    console.log("Copy with redirect");
  }

  const handleClaimLater = () => {
    //Add tracking here and internal logic.
    console.log("Claim later");
  }

  const handleGenerateDiscountCode = () => {
    //Add tracking here and internal logic.
    setDiscountCode("STORE100");
    console.log("Generate discount code");
  }
  return (
    <div>
    <section className="flex items-center justify-center">
      <ProgressRewards
        milestones={partnerSettings?.milestones || []}
        progress={rewardAmount || 0}
        totalReward={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        discountAmount = {Number(partnerSettings?.rewardGoal?.discount) || 0}
        goalAmount = {Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        code={discountCode || ""}
        onCopyWithRedirect={() => {
          //Add tracking here and internal logic.
          console.log("Copy with redirect");
        }}
        onClaimLater={() => {
          //Add tracking here and internal logic.
          console.log("Claim later");
        }}
        redirectUrl = "https://example.com/"
        onClaimFirstMilestone={handleFirstMilestoneClaim}
        // onFirstMilestoneReward={handleFirstMilestoneReward}
        onClaimLastMilestone={handleLastMilestoneClaim}
        partnerName={partnerName}
        onGenerateDiscountCode={handleGenerateDiscountCode}
      />
    </section>

    <SectionGameHero
      userId={userId}
      email={email}
      partnerCode={partnerCode}
      partnerName={partnerName}
      game={heroGame}
      onCtaClick={handleHeroCta}
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      rewardAmount={Number(rewardAmount) || 0}
      onLogin={(nextEmail) => {
        // User finished email/login in the hero flow; sync React state so useGameApi(partnerCode, email) refetches with the new identity.
        // TODO: analytics — identify / login_completed (source: hero)
        setEmail(nextEmail);
        console.log("Login with email:", nextEmail);
      }}
      onStartGame={(selectedGame) => {
        // User chose to start the featured offer from the hero (e.g. install / play flow). `selectedGame` is the offer payload from the library.
        // TODO: analytics — game_start (source: hero)
        console.log("Start Game Clicked!", selectedGame);
      }}
      onSelectedGame={(selectedGame) => {
        // User focused or selected the featured game without necessarily starting it (library-specific interaction).
        // TODO: analytics — game_selected (source: hero)
        console.log("Selected Game!", selectedGame);
      }}
      onGameCTAClick={(selectedGame) => {
        // Secondary CTA on the game card in the hero (e.g. “details” / alternate action), not the same as onCtaClick in all themes.
        // TODO: analytics — game_cta_click (source: hero)
        console.log("Game CTA Clicked!", selectedGame);
      }}
      activities={activities}
      maxIncompleteOffers={partnerSettings?.maxIncompleteOffers || 0}
    />
    <SectionGames
      maxIncompleteOffers={partnerSettings?.maxIncompleteOffers || 0}
      userId={userId}
      email={email}
      partnerSettings={partnerSettings}
      rewardAmount={Number(rewardAmount) || 0}
      partnerCode={partnerCode}
      partnerName={partnerName}
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      onLogin={(nextEmail) => {
        // Same as hero: email/login from the games grid or modals owned by SectionGames.
        // TODO: analytics — identify / login_completed (source: games)
        setEmail(nextEmail);
        console.log("Login with email:", nextEmail);
      }}
      onStartGame={(selectedGame) => {
        // User started an offer from the list / activities area (not necessarily the hero game).
        // TODO: analytics — game_start (source: games)
        console.log("Start Game Clicked!", selectedGame);
      }}
      onSelectedGame={(selectedGame) => {
        // User highlighted or selected a game in the grid before starting.
        // TODO: analytics — game_selected (source: games)
        console.log("Selected Game!", selectedGame);
      }}
      onGameCTAClick={(selectedGame) => {
        // Extra CTA on a game row/card in SectionGames.
        // TODO: analytics — game_cta_click (source: games)
        console.log("Game CTA Clicked!", selectedGame);
      }}
      onTabChange={(tab) => {
        // Switches between e.g. “all games” vs “activities” inside SectionGames.
        // TODO: analytics — games_tab_change
        console.log("Games tab changed:", tab);
      }}
      games={gameList}
      activities={activities}
      loading={loading}
      error={error}
    />
    </div>
  );
}
