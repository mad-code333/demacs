/** Calendar month boundaries for the public leaderboard (API + UI countdown). */

export const LEADERBOARD_TIME_ZONE = "Europe/Berlin";

export function berlinWallTime(instant: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(instant);
  const v = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? NaN);
  return {
    y: v("year"),
    mo: v("month"),
    d: v("day"),
    h: v("hour"),
    m: v("minute"),
    s: v("second"),
  };
}

function wallTimeBefore(
  w: ReturnType<typeof berlinWallTime>,
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  s: number,
): boolean {
  if (w.y !== y) return w.y < y;
  if (w.mo !== mo) return w.mo < mo;
  if (w.d !== d) return w.d < d;
  if (w.h !== h) return w.h < h;
  if (w.m !== mi) return w.m < mi;
  return w.s < s;
}

/** First UTC instant when Berlin reads `y`-`mo`-`d` 00:00:00. */
export function startOfBerlinCivilDayUTC(y: number, mo: number, d: number): Date {
  let lo = Date.UTC(y, mo - 1, d - 1, 8, 0, 0);
  let hi = Date.UTC(y, mo - 1, d + 1, 16, 0, 0);
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const w = berlinWallTime(new Date(mid));
    if (!wallTimeBefore(w, y, mo, d, 0, 0, 0)) hi = mid;
    else lo = mid + 1;
  }
  return new Date(lo);
}

/** Month-to-date in Europe/Berlin through the current instant (UTC ISO end). */
export function defaultBerlinMonthRange() {
  const now = new Date();
  const w = berlinWallTime(now);
  const start = startOfBerlinCivilDayUTC(w.y, w.mo, 1);
  return { startDate: start.toISOString(), endDate: now.toISOString() };
}

/** First instant of the next calendar month in Europe/Berlin (countdown target). */
export function getNextBerlinPeriodEnd(): Date {
  const now = new Date();
  const w = berlinWallTime(now);
  let y = w.y;
  let mo = w.mo + 1;
  if (mo > 12) {
    mo = 1;
    y += 1;
  }
  return startOfBerlinCivilDayUTC(y, mo, 1);
}

export function berlinYearMonthKey(instant: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(instant);
  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const m = parts.find((p) => p.type === "month")?.value ?? "";
  return `${y}-${m}`;
}
