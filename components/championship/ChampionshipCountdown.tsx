export function ChampionshipCountdown({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}) {
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hrs" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ] as const;

  return (
    <div className="champ-countdown w-full max-w-[28rem] sm:max-w-[32rem]">
      <p className="type-label font-sans text-[0.68rem] uppercase text-white/85">
        Next round ends in
      </p>
      <div className="champ-countdown__units" role="timer" aria-live="polite">
        {units.map((unit) => (
          <div key={unit.label} className="champ-countdown__unit">
            <span className="champ-countdown__value font-sans">{unit.value}</span>
            <span className="champ-countdown__label font-sans">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
