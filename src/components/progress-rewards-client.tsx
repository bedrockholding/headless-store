"use client";
import { ProgressRewards } from "getjacked-components";
type ProgressRewardsClientProps = {
  highlightColor: string;
  highlightedText: string;
  message: string;
  milestones: any[];
  rewardAmount: number;
  suffixText: string;
  goalAmount: number;
};
export function ProgressRewardsClient({
  highlightColor,
  highlightedText,
  message,
  milestones,
  rewardAmount,
  suffixText,
  goalAmount
}: ProgressRewardsClientProps) {
  return (
    <ProgressRewards
      goalAmount={goalAmount}
      highlightColor={highlightColor}
      highlightedText={highlightedText}
      message={message}
      milestones={milestones}
      rewardAmount={rewardAmount}
      suffixText={suffixText}
      partnerName={"Storefront"}
    />
  );
}