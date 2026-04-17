"use client";
import { useEffect, useState } from "react";
import { SectionGames, useGameApi,  SectionGameHero, ProgressRewards } from "getjacked-components";

export default function GamesPage() {
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const { games, partnerSettings, activities, loading, error, sessionUser, rewardAmount } = useGameApi(
    partnerCode,
    email
  );

  const handleHeroCta = () => {
    /*add tracking*/
    console.log("Starting to play game...");
  };

  const heroGame = games?.[0];
  const gameList = games?.slice(1);

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
    }
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser, activities, partnerSettings]);
  
  console.log("sessionUser:", sessionUser);
  console.log("activities:", activities);  

  const handleFirstMilestoneClaim = () => {
    //Add tracking here and internal logic.
    console.log("First milestone claimed");
  }

  const handleLastMilestoneClaim = () => {
    //Add tracking here and internal logic.
    console.log("Last milestone claimed");
  }
  
  return (
    <div>
    <section className="flex items-center justify-center">
      <ProgressRewards
        milestones={partnerSettings?.milestones || []}
        progress={rewardAmount || 0}
        totalReward={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        onClaimFirstMilestone={handleFirstMilestoneClaim}
        onClaimLastMilestone={handleLastMilestoneClaim}
      />
    </section>

    <SectionGameHero
      game={heroGame}
      onCtaClick={handleHeroCta}
      partnerName="Storefront"
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      email={email}
      partnerCode={partnerCode}
      onLogin={(nextEmail) => {
        /*add tracking Here*/
        setEmail(nextEmail);
        console.log("Login with email:", nextEmail);
      }}
      onStartGame={(selectedGame) => {
        /*add tracking Game starting*/
        console.log("Start Game Clicked!", selectedGame);
      }}
      onSelectedGame={(selectedGame) => {
        /*add tracking*/
        console.log("Selected Game!", selectedGame);
      }}
      onGameCTAClick={(selectedGame) => {
        /*add tracking*/
        console.log("Game CTA Clicked!", selectedGame);
      }}
    />
    <SectionGames
      email={email}
      partnerCode={partnerCode}
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      onLogin={(nextEmail) => {
        /*add tracking Here*/
        setEmail(nextEmail);
        console.log("Login with email:", nextEmail);
      }}
      onStartGame={(selectedGame) => {
        /*add tracking Game starting*/
        console.log("Start Game Clicked!", selectedGame);
      }}
      onSelectedGame={(selectedGame) => {
        /*add tracking*/
        console.log("Selected Game!", selectedGame);
      }}
      onGameCTAClick={(selectedGame) => {
        /*add tracking*/
        console.log("Game CTA Clicked!", selectedGame);
      }}
      onTabChange={(tab) => {
        /*add tracking*/
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
