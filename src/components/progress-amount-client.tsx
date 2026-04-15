"use client";

import { ProgressAmount, useGameApi } from "getjacked-components";

export function ProgressAmountClient() {

  const partnerCode = "jmdeleon";
  const { rewardAmount } = useGameApi(partnerCode);

  return <ProgressAmount amount={rewardAmount ? rewardAmount.toString() : "0"} />;
}