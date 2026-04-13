"use client";

import { ProgressRewards } from "getjacked-components";

export function ProgressRewardsClient({ highlightColor, highlightedText, message, milestones, progress, suffixText }: { highlightColor: string; highlightedText: string; message: string; milestones: any[]; progress: number; suffixText: string }) {
  return <ProgressRewards
  highlightColor="#d22730"
  highlightedText="$20 away "
  message="You're"
  milestones={[
    {
      claimButton: {
        visible: false
      },
      icon: 'dollar',
      id: '1',
      label: 'Surprise Gift',
      position: 21,
      status: 'locked'
    },
    {
      claimButton: {
        visible: false
      },
      icon: 'gift',
      id: '2',
      label: '$160 Storefront Bundle',
      position: 95,
      status: 'locked'
    }
  ]}
  progress={5}
  suffixText="from a surprise gift!"
/>;
}