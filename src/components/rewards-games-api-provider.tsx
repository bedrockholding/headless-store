"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGameApi } from "getjacked-components";

export const REWARDS_GAMES_PATH = "/rewards/games";

export function isRewardsGamesPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === REWARDS_GAMES_PATH ||
    pathname.startsWith(`${REWARDS_GAMES_PATH}/`)
  );
}

type SessionUserShape = { email?: string; userId?: string } | null | undefined;

type CoreGameApi = ReturnType<typeof useGameApi> & {
  sessionUser?: SessionUserShape;
};

export type RewardsGamesApiValue = CoreGameApi & {
  setProgressEmail: (email: string) => void;
};

const RewardsGamesApiContext = createContext<RewardsGamesApiValue | null>(null);

export function useRewardsGamesApi(): RewardsGamesApiValue {
  const ctx = useContext(RewardsGamesApiContext);
  if (!ctx) {
    throw new Error(
      "useRewardsGamesApi must be used within RewardsGamesApiBoundary (see app/layout.tsx)"
    );
  }
  return ctx;
}

export function useRewardsGamesApiOptional(): RewardsGamesApiValue | null {
  return useContext(RewardsGamesApiContext);
}

/** One `useGameApi` instance for the whole `/rewards/games` subtree (header + page). */
export function RewardsGamesApiProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const partnerCode = "storefront";
  const api = useGameApi(partnerCode, email) as CoreGameApi;

  useEffect(() => {
    if (!api.sessionUser) return;
    const next = api.sessionUser.email || "";
    queueMicrotask(() => {
      setEmail(next);
    });
  }, [api.sessionUser]);

  const value: RewardsGamesApiValue = {
    ...api,
    setProgressEmail: setEmail,
  };

  return (
    <RewardsGamesApiContext.Provider value={value}>
      {children}
    </RewardsGamesApiContext.Provider>
  );
}

export function RewardsGamesApiBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (!isRewardsGamesPath(pathname)) {
    return <>{children}</>;
  }
  return <RewardsGamesApiProvider>{children}</RewardsGamesApiProvider>;
}
