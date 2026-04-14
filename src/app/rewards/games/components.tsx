"use client";
import { useState } from "react";
import {
  ModalEarning,
  ProgressRewards,
  SectionGameHero,
  SectionGames,
  useApi,
} from "getjacked-components";

// import { useGameApi } from "getjacked-components/hooks";


type GamesComponentProps = {
  updatePartnerData: (data: unknown) => void;
};

export default function GamesComponent({ updatePartnerData }: GamesComponentProps) {
  const [isEarningModalOpen, setIsEarningModalOpen] = useState(false);

  const { games, activities, loading, error } = useApi("storefront", email);
  
  
  const handleStartPlaying = () => {
    setIsEarningModalOpen(true);
  }

  const handleSetEmail = (email: string) => {
    updatePartnerData(email);
  };
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
      />
    </section>

    {heroGame?.imageSrc ? (
      <SectionGameHero
        backgroundImageSrc={heroGame.imageSrc}
        backgroundImageMobileSrc={heroGame.imageSrc}
        backgroundImageAlt={heroGame.title ?? "Game hero"}
        gameImageSrc={heroGame.imageSrc}
        gameImageAlt={heroGame.title ?? "Game hero"}
        title={heroGame.title ?? ""}
        description={heroGame.description ?? ""}
        ctaLabel="Play Game"
        onCtaClick={handleStartPlaying}
      />
    ) : null}
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
