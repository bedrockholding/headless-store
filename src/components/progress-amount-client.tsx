"use client";

import { ProgressAmount } from "getjacked-components";

export function ProgressAmountClient({ amount }: { amount: string }) {
  return <ProgressAmount amount={amount} />;
}