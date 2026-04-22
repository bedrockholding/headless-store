import type { iOfferMilestone } from "getjacked-components";

function milestoneThreshold(m: iOfferMilestone): number | null {
  if (typeof m.targetAmount === "number" && m.targetAmount > 0) {
    return m.targetAmount;
  }
  if (typeof m.price === "number" && m.price > 0) {
    return m.price;
  }
  return null;
}


 //Aligns milestone `status` with `rewardAmount` when the API still returns `"locked"`.
 //`ProgressRewards` only wires the claim action when `status === "earned"`.
 
export function milestonesWithDerivedEarnedStatus(
  milestones: iOfferMilestone[] | null | undefined,
  rewardAmount: number
): iOfferMilestone[] {
  if (!milestones?.length) return [];

  return milestones.map((m) => {
    if (m.status === "claimed" || m.status === "earned") {
      return m;
    }

    const threshold = milestoneThreshold(m);
    if (threshold != null && rewardAmount >= threshold) {
      return { ...m, status: "earned" };
    }

    return m;
  });
}

//Second milestone `ProgressRewards` uses this for the bundle / gold CTA.
export function isBundleGoldNavState(milestones: iOfferMilestone[]): boolean {
  const second = milestones[1];
  return (
    !!second &&
    (second.status === "earned" || second.status === "claimed")
  );
}
