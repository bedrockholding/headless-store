"use client";
import { useState } from "react";
import { ModalEarning, SectionGames, useGameApi, SectionGameHero, ProgressRewards, useUser} from "getjacked-components";
import { ProgressRewardsClient } from "@/components/progress-rewards-client";

// import { useGameApi } from "getjacked-components/hooks";


export default function GamesPage() {
  const [isEarningModalOpen, setIsEarningModalOpen] = useState(false);
  
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const { games, activities, partnerSettings, loading, rewardAmount, error } = useGameApi(partnerCode,email);
  
  const handleStartPlaying = () => {
    setIsEarningModalOpen(true);
  }

  const handleSetEmail = (email: string) => { 
    setEmail(email);
    setIsEarningModalOpen(false);
  }

  const heroGame = games?.[0];
  const gameList = games?.slice(1);


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
      email={email}
      partnerCode={partnerCode}
      onLogin={handleSetEmail}
    />
    <SectionGames
      email={email}
      onStartGame={handleStartPlaying}
      games={gameList}
      activities={activities}
      loading={loading}
      error={error}
    />
    </div>
  );
}
