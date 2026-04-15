"use client";
import { useEffect, useState } from "react";
import { SectionGames, useGameApi, SectionGameHero, ProgressRewards, useUser} from "getjacked-components";
import { ProgressRewardsClient } from "@/components/progress-rewards-client";

// import { useGameApi } from "getjacked-components/hooks";


export default function GamesPage() {
  
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const { games, activities, partnerSettings, loading, rewardAmount, error , sessionUser} = useGameApi(partnerCode,email);
  
  const handleStartPlaying = () => {
    /*add tracking*/
    console.log("Starting to play game...");
  }

  const handleSetEmail = (email: string) => { 
    setEmail(email);
  }

  const heroGame = games?.[0];
  const gameList = games?.slice(1);

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
    }
    console.log("partnerSettings:", partnerSettings);
  }, [sessionUser])
  
  return (
    <div>
    <section className="flex items-center justify-center">
      <ProgressRewards
        highlightColor="#d22730"
        highlightedText="$20 away "
        message="You're"
        milestones={[
          {
            claimButton: {
              visible: false
            },
            icon: 'dollar',
            id: '1',
            label: 'Surprise Gift',
            position: 21, // Todo: must be dynamic based on reward Amount
            status: 'locked'
          },
          {
            claimButton: {
              visible: false
            },
            icon: 'gift',
            id: '2',
            label: '$160 Storefront Bundle',
            position: 95,
            status: 'locked'
          }
        ]}
        progress={5}
        suffixText="from a surprise gift!"
      />
    </section>

    <SectionGameHero
      game={heroGame}
      onCtaClick={handleStartPlaying}
      partnerName="Storefront"
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      email={email}
      partnerCode={partnerCode}
      onLogin={handleSetEmail}
    />
    <SectionGames
      email={email}
      partnerCode={partnerCode}
      onLogin={handleSetEmail}
      bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
      onStartGame={handleStartPlaying}
      games={gameList}
      activities={activities}
      loading={loading}
      error={error}
    />
    </div>
  );
}
