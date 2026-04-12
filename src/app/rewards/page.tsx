"use client";

import { HeroSection, FaqSection, TestimonialsSection, GoliNewHero, TrendingNow, StepsSection, useGameApi } from "getjacked-components";


export default function RewardsPage() {
  return (   
    <div>
      {/* <GetJackedProvider partnerCode="0TSRQK-1Q"> */}
        <GoliNewHero to="/rewards/games" />
        <TrendingNow  partnerCode="storefront" to="/rewards/games"/>
        <StepsSection partnerName="storefront" images={["https://test.withrcart.com/goli/step-1-bg.png", "https://test.withrcart.com/goli/step-2-bg.png", "https://test.withrcart.com/goli/step-3-bg.png"]} to="/rewards/games" />
        <FaqSection  />
        <TestimonialsSection  />
        {/* </GetJackedProvider> */}
    </div>
    
  )
}
