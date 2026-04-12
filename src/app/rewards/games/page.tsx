"use client";
import { useState } from "react";
import { FaqSection, TestimonialsSection, GoliNewHero, TrendingNow, StepsSection, GamesSection, useGameApi } from "getjacked-components";

// import { useGameApi } from "getjacked-components/hooks";


export default function GamesPage() {
  const [email, setEmail] = useState("");
  const { games, activities, loading, error } = useGameApi('storefront', email);

  return (
    <GamesSection
      games={games}
      activities={activities}
      loading={loading}
      error={error}
    />
  );
}
