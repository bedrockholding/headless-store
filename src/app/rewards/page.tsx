"use client";

import { SectionFaq, SectionTestimonials, SectionHero, SectionPartneredGames, SectionSteps, useGameApi } from "getjacked-components";


export default function RewardsPage() {
  return (   
    <div>
      {/* <GetJackedProvider partnerCode="0TSRQK-1Q"> */}
        <SectionHero to="/rewards/games" />
        <SectionPartneredGames  partnerName="storefront" partnerCode="storefront" to="/rewards/games"/>
        <SectionSteps partnerName="storefront" images={["https://test.withrcart.com/goli/step-1-bg.png", "https://test.withrcart.com/goli/step-2-bg.png", "https://test.withrcart.com/goli/step-3-bg.png"]} to="/rewards/games" />
        <SectionFaq partnerCode="storefront" />
        <SectionTestimonials partnerCode="storefront" />
        {/* </GetJackedProvider> */}
    </div>
)}
