"use client";

import { SectionFaq, SectionTestimonials, SectionHero, SectionPartneredGames, SectionSteps, useGameApi } from "getjacked-components";
import { useEffect, useState } from "react";


export default function RewardsPage() {
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const partnerName = "Storefront";

  const { partnerSettings, activities, sessionUser} = useGameApi(partnerCode,email);
  const handleLogin = (email: string) => {
    setEmail(email);
  }

  useEffect(() => {
    if (sessionUser) {
      setEmail(sessionUser.email || "");
    }
    console.log("partnerSettings:", partnerSettings);
    console.log("sessionUser:", sessionUser);
    console.log("activities:", activities);
  }, [sessionUser])
  
  return (   
    <div>
      {/* <GetJackedProvider partnerCode="0TSRQK-1Q"> */}
        <SectionHero 
        bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
        to="/rewards/games" />
        <SectionPartneredGames  
          partnerName={partnerName} 
          partnerCode={partnerCode} 
          to="/rewards/games"
          bundleAmount={Number(partnerSettings?.rewardGoal?.thresholdAmount) || 0}
          email={email}
          onLogin={handleLogin}
        />
        <SectionSteps partnerName={partnerName} images={["https://test.withrcart.com/goli/step-1-bg.png", "https://test.withrcart.com/goli/step-2-bg.png", "https://test.withrcart.com/goli/step-3-bg.png"]} to="/rewards/games" />
        <SectionFaq partnerCode={partnerCode} />
        <SectionTestimonials partnerCode={partnerCode} />
        {/* </GetJackedProvider> */}
    </div>
)}
