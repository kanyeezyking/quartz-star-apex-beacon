import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PLACEMENT } from "@/data/placement";
import { LESSONS } from "@/data/curriculum";
import { speakZh } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import type { HskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/place")({ component: PlacePage });

function PlacePage() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const setPlacement = useAppStore((s) => s.setPlacement);
  const unlockUpTo = useAppStore((s) => s.unlockUpTo);
  const navigate = useNavigate();
  const q = PLACEMENT[i]!;

  function lock() {
    if (picked === null) return;
    const ok = picked === q.answer;
    setChecked(true);
    if (ok) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= PLACEMENT.length) {
      setFinished(true);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
    setChecked(false);
  }

  function place() {
    const ratio = score / PLACEMENT.length;
    let band: HskLevel = 0;
    if (ratio >= 0.9) band = 5;
    else if (ratio >= 0.75) band = 4;
    else if (ratio >= 0.6) band = 3;
    else if (ratio >= 0.45) band = 2;
    else if (ratio >= 0.3) band = 1;
    setPlacement(band);
    const start =
      LESSONS.find((l) => {
        if (band === 0) return l.unitId === "sounds";
        if (band === 7) return l.unitId === "fluency";
        return l.unitId === `hsk${band}`;
      }) ?? LESSONS[0]!;
    const before = LESSONS.slice(0, LESSONS.findIndex((l) => l.id === start.id));
    unlockUpTo(before.map((l) => l.id), start.id);
    void navigate({ to: "/lesson/$id", params: { id: start.id } });
  }

  if (finished) {
    return (
      <main className="mx-auto flex min-h-[70dvh] max-w-lg flex-col justify-center px-4 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Placement</p>
        <h1 className="mt-3 font-display text-4xl">{score} / {PLACEMENT.length}</h1>
        <p className="mt-3 text-muted">
          We'll open the path at a band that still has friction — fluency is not a skip.
        </p>
        <Button size="lg" className="mt-8" onClick={place}>
          Start there
        </Button>
        <Button asChild variant="ghost" className="mt-2">
          <Link to="/">Not now</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        Placement · {i + 1}/{PLACEMENT.length}
      </p>
      <h1 className="mt-4 font-display text-2xl">{q.prompt}</h1>
      {q.speak ? (
        <Button variant="paper" className="mt-4" onClick={() => speakZh(q.speak!)}>
          Play
        </Button>
      ) : null}
      <div className="mt-6 grid gap-2">
        {q.options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            disabled={checked}
            onClick={() => setPicked(idx)}
            className={cn(
              "min-h-12 rounded-md px-4 py-3 text-left text-sm shadow-[var(--shadow-border)]",
              picked === idx && !checked && "bg-surface",
              picked !== idx && !checked && "bg-bg-elevated",
              checked && idx === q.answer && "bg-success/20",
              checked && picked === idx && idx !== q.answer && "bg-primary/20",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {!checked ? (
          <Button size="lg" className="w-full" disabled={picked === null} onClick={lock}>
            Check
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={next}>
            Continue
          </Button>
        )}
      </div>
    </main>
  );
}
