"use client";
import { ProgressRewards } from "getjacked-components";
type ProgressRewardsClientProps = {
  highlightColor: string;
  highlightedText: string;
  message: string;
  milestones: any[];
  progress: number;
  suffixText: string;
};
export function ProgressRewardsClient({
  highlightColor,
  highlightedText,
  message,
  milestones,
  progress,
  suffixText,
}: ProgressRewardsClientProps) {
  return (
    <ProgressRewards
      highlightColor={highlightColor}
      highlightedText={highlightedText}
      message={message}
      milestones={milestones}
      progress={progress}
      suffixText={suffixText}
    />
  );
}