"use client";
import { useState } from "react";
import { ModalEarning, SectionGames, useGameApi, SectionGameHero, ProgressRewards, useUser} from "getjacked-components";
import { ProgressRewardsClient } from "@/components/progress-rewards-client";

// import { useGameApi } from "getjacked-components/hooks";


export default function GamesPage() {
  const [isEarningModalOpen, setIsEarningModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const partnerCode = "jmdeleon";
  const { games, activities, partnerSettings, loading, rewardAmount, error } = useGameApi(partnerCode,email);
  const handleStartPlaying = () => {
    setIsEarningModalOpen(true);
  }

  const handleSetEmail = (email: string) => { 
    setEmail(email);
  }

  const heroGame = games?.[0];
  const gameList = games?.slice(1);


console.log("games:", games);
console.log("activities:", activities);
console.log("partnerSettings:", partnerSettings);
console.log("rewardAmount:", rewardAmount);

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
      />;
    </section>

    <SectionGameHero
      game={heroGame}
      // ctaLabel={'Play Game'}
      onCtaClick={handleStartPlaying}
    />
    <SectionGames
      onStartGame={handleStartPlaying}
      games={gameList}
      activities={activities}
      loading={loading}
      error={error}
    />
   {isEarningModalOpen && <ModalEarning partnerName="Storefront" onSubmit={handleSetEmail} isOpen={isEarningModalOpen} onClose={() => setIsEarningModalOpen(false)} bundleAmount={160}/>} 
    </div>
  );
}
