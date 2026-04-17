"use client";
import { ProgressRewards } from "getjacked-components";
type ProgressRewardsClientProps = {
  highlightColor: string;
  highlightedText: string;
  message: string;
  milestones: any[];
  progress: number;
  suffixText: string;
  totalReward: number;
};
export function ProgressRewardsClient({
  highlightColor,
  highlightedText,
  message,
  milestones,
  progress,
  suffixText,
  totalReward
}: ProgressRewardsClientProps) {
  return (
    <ProgressRewards
      totalReward={totalReward}
      highlightColor={highlightColor}
      highlightedText={highlightedText}
      message={message}
      milestones={milestones}
      progress={progress}
      suffixText={suffixText}
      partnerName={"Storefront"}
    />
  );
}