"use client";

import { SectionFaq, SectionTestimonials, SectionHero, SectionPartneredGames, SectionSteps, useGameApi } from "getjacked-components";
import { useEffect, useState } from "react";


export default function RewardsPage() {
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";

  const { partnerSettings, activities, sessionUser } = useGameApi(partnerCode, email);

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
    }
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser, activities, partnerSettings]);

  return (
    <div>
        <SectionHero 
        bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        to="/rewards/games" 
        onCTAClick={() => {
          // User tapped the main hero CTA (usually “start” / “see games”); navigation to `to` is handled inside the component.
          // TODO: analytics — rewards_hero_cta_click
          console.log("CTA Clicked!");
        }}
        />
        <SectionPartneredGames  
          partnerName={partnerName} 
          partnerCode={partnerCode} 
          email={email}
          to="/rewards/games"
          bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
          onLogin={(nextEmail) => {
            // User completed email/login in the partnered-games strip; keep React state in sync so useGameApi(partnerCode, email) updates.
            // TODO: analytics — identify / login_completed (source: rewards_partnered_games)
            setEmail(nextEmail);
            console.log("Login with email:", nextEmail);
          }}
          onStartGame={(selectedGame) => {
            // User started an offer from the carousel (install / play). `selectedGame` is the offer object from getjacked-components.
            // TODO: analytics — game_start (source: rewards_partnered_games)
            console.log("Start Game Clicked!", selectedGame);
          }}
          onSelectedGame={(selectedGame) => {
            // User selected or focused a game tile without necessarily starting it.
            // TODO: analytics — game_selected (source: rewards_partnered_games)
            console.log("Selected Game!", selectedGame);
          }}
          onBrowse={() => {
            // “Browse all games” (or equivalent) — user intent to see the full list / games route.
            // TODO: analytics — browse_all_games_click (source: rewards_partnered_games)
            console.log("Browse All Games Clicked!");
          }}
          onGameCTAClick={(selectedGame) => {
            // Secondary CTA on a game tile (not the same as onStartGame in every layout).
            // TODO: analytics — game_cta_click (source: rewards_partnered_games)
            console.log("Game CTA Clicked!", selectedGame);
          }}
          onLeft={() => {
            // Carousel / slider moved to the previous game(s).
            // TODO: analytics — partnered_games_carousel_prev
            console.log("Partnered games carousel left");
          }}
          onRight={() => {
            // Carousel / slider moved to the next game(s).
            // TODO: analytics — partnered_games_carousel_next
            console.log("Partnered games carousel right");
          }}
        />
        <SectionSteps 
          partnerName={partnerName} 
          images={["https://test.withrcart.com/goli/step-1-bg.png", "https://test.withrcart.com/goli/step-2-bg.png", "https://test.withrcart.com/goli/step-3-bg.png"]} 
          to="/rewards/games"
          onCTAClick={() => {
            // User tapped the steps section CTA (journey / “how it works”); `to` is handled inside the component.
            // TODO: analytics — rewards_steps_cta_click
            console.log("Steps CTA Clicked!");
          }}  
        />
        <SectionFaq partnerCode={partnerCode} />
        <SectionTestimonials partnerCode={partnerCode} />
    </div>
  );
}
