"use client";
import { useState } from "react";
import { EarningModal, GamesSection, useGameApi, GameHeroBanner } from "getjacked-components";

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
    <GameHeroBanner
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
    <GamesSection
      onStartGame={handleStartPlaying}
      games={gameList}
      activities={activities}
      loading={loading}
      error={error}
    />
   {isEarningModalOpen && <EarningModal partnerName="Storefront" onSubmit={handleSetEmail} isOpen={isEarningModalOpen} onClose={() => setIsEarningModalOpen(false)} bundleAmount={160}/>} 
    </div>
  );
}
