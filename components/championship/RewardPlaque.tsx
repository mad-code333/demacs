import {
  metalToneForRank,
  TrophyGlyph,
} from "./ChampionshipMarks";

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Premium metallic reward plaque — matches reference footer plate. */
export function RewardPlaque({
  amount,
  rank = 1,
}: {
  amount: number;
  rank?: 1 | 2 | 3;
}) {
  const tone = metalToneForRank(rank);

  return (
    <div className={["champ-plaque", `champ-plaque--${rank}`].join(" ")}>
      <TrophyGlyph tone={tone} className="champ-plaque__trophy shrink-0" />
      <div className="champ-plaque__copy">
        <span className="champ-plaque__label">Reward</span>
        <span className="champ-plaque__amount">${formatMoney(amount)}</span>
      </div>
    </div>
  );
}
