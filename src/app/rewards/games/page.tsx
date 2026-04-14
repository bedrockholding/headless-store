"use client";
import { useState } from "react";
import { ModalEarning, SectionGames, useGameApi, SectionGameHero, ProgressRewards } from "getjacked-components";
import { ProgressRewardsClient } from "@/components/progress-rewards-client";

// import { useGameApi } from "getjacked-components/hooks";


export default function GamesPage() {
  const [isEarningModalOpen, setIsEarningModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { games, activities, loading, error } = useGameApi('storefront', email);
  
  const handleStartPlaying = () => {
    setIsEarningModalOpen(true);
  }

  const handleSetEmail = (email: string) => {
    console.log(email);
    setEmail(email);
  }
  const heroGame = games?.[0];
  const gameList = games?.slice(1);

  return (
    <div>
    <section className="flex items-center justify-center py-8">
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
            position: 21,
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
      backgroundImageSrc={heroGame?.imageSrc || ""}
      backgroundImageMobileSrc={heroGame?.imageSrc || ""}
      backgroundImageAlt={heroGame?.title || "Game Hero Banner"}
      gameImageSrc={heroGame?.imageSrc || ""}
      gameImageAlt={heroGame?.title || "Game Hero Banner"}
      title={heroGame?.title || ""}
      description={heroGame?.description || ""}
      ctaLabel={'Play Game'}
      onCtaClick={handleStartPlaying}
      // className,
      // tags,
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
