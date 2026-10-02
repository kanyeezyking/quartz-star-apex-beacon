import type { SrsCard } from "./types";

export function newCard(): SrsCard {
  return {
    ease: 2.5,
    interval: 0,
    reps: 0,
    nextReview: Date.now(),
    lapses: 0,
  };
}

/** SM-2. quality is 0–5. */
export function review(card: SrsCard, quality: number): SrsCard {
  const q = Math.max(0, Math.min(5, quality));
  let { ease, interval, reps, lapses } = card;
  if (q < 3) {
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 6;
    else interval = Math.max(1, Math.round(interval * ease));
    reps += 1;
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  }
  return {
    ease,
    interval,
    reps,
    lapses,
    nextReview: Date.now() + interval * 24 * 60 * 60 * 1000,
  };
}

export function isDue(card: SrsCard, now = Date.now()): boolean {
  return card.nextReview <= now;
}
