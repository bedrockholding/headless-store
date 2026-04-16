"use client";

import { ProgressAmount, useGameApi } from "getjacked-components";

export function ProgressAmountClient() {

  const partnerCode = "storefront";
  const { rewardAmount, sessionUser } = useGameApi(partnerCode, "");

  if (!sessionUser.email) {
    return (
    <>
      <a href="/rewards" className="text-[14px] font-bold text-white bg-black hover:opacity-90 py-2.5 p-3 hidden sm:inline-flex items-center">
        Start Earning Now
      </a>
      <div className="inline-flex sm:hidden"><ProgressAmount amount={rewardAmount ? rewardAmount.toString() : "0"} /></div>
    </>
    )
  }else {
    return <ProgressAmount amount={rewardAmount ? rewardAmount.toString() : "0"} />;
  }


}