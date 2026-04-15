"use client";

import { SectionFaq, SectionTestimonials, SectionHero, SectionPartneredGames, SectionSteps, useGameApi } from "getjacked-components";
import { useState } from "react";


export default function RewardsPage() {
  const [email, setEmail] = useState("");

  const handleLogin = (email: string) => {
    setEmail(email);
  }
  
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
