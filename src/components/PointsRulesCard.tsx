import { POINTS_RULES } from "@/config/points";

export function PointsRulesCard() {
  return (
    <div className="uni-card-inset px-4 py-3">
      <p className="uni-label">Points</p>
      <ul className="uni-caption mt-2 space-y-1">
        <li>Free GM · +{POINTS_RULES.freeGm} pts</li>
        <li>Paid GM · +{POINTS_RULES.paidGm} pts</li>
        <li>
          Boost active · GM & deploy earn {POINTS_RULES.boostGmMultiplier}× (1
          free/day, ~1h)
        </li>
        <li>Free deploy · +{POINTS_RULES.freeDeploy} pts</li>
        <li>Paid deploy · +{POINTS_RULES.paidDeploy} pts</li>
        <li>
          Referral code redeemed · +{POINTS_RULES.referral} pts each (you &amp;
          friend)
        </li>
      </ul>
    </div>
  );
}
