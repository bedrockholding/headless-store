"use client";

import { SectionFaq, SectionTestimonials, SectionHero, SectionPartneredGames, SectionSteps, useGameApi } from "getjacked-components";
import { useEffect, useState } from "react";


export default function RewardsPage() {
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";

  const { partnerSettings, activities, sessionUser} = useGameApi(partnerCode,email);

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
    }
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser,activities,partnerSettings])

  return (   
    <div>
        <SectionHero 
        bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        to="/rewards/games" 
        onCTAClick={() => {
          /*add tracking*/
          console.log("CTA Clicked!");
        }}
        />
        <SectionPartneredGames  
          partnerName={partnerName} 
          partnerCode={partnerCode} 
          email={email}
          activities={activities}
          maxIncompleteOffers={partnerSettings?.maxIncompleteOffers || 0}
          to="/rewards/games"
          bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
          onLogin={(email) => {
            /*add tracking Here*/
            setEmail(email);
            console.log("Login with email:", email);
          }}
          onSelectedGame={(selectedGame) => {
            /*add tracking*/
            console.log("Selected Game!", selectedGame);
          }}
          onBrowse={() => {
            /*add tracking*/
            console.log("Browse All Games Clicked!");
          }}
          onGameCTAClick={(selectedGame) => {
            /*add tracking*/
            //for logged in users, this will redirect to play store or app store based on the platform.
            console.log("Game CTA Clicked!", selectedGame);
          }}
          onLeft={() => {
            /*add tracking*/
            console.log("Partnered games carousel left");
          }}
          onRight={() => {
            /*add tracking*/
            console.log("Partnered games carousel right");
          }}
        />
        <SectionSteps 
          partnerName={partnerName} 
          images={["https://test.withrcart.com/goli/step-1-bg.png", "https://test.withrcart.com/goli/step-2-bg.png", "https://test.withrcart.com/goli/step-3-bg.png"]} 
          to="/rewards/games"
          onCTAClick={() => {
            /*add tracking*/
            console.log("Steps CTA Clicked!");
          }}  
        />
        <SectionFaq partnerCode={partnerCode} />
        <SectionTestimonials partnerCode={partnerCode} />
    </div>
)}
