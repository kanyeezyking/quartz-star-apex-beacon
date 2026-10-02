import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Play } from "lucide-react";
import { LESSON_BY_ID, LESSONS, UNITS, bandLabel } from "@/data/curriculum";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const xp = useAppStore((s) => s.xp);
  const dailyXp = useAppStore((s) => s.dailyXp);
  const dailyGoal = useAppStore((s) => s.dailyGoal);
  const streak = useAppStore((s) => s.streak);
  const currentLessonId = useAppStore((s) => s.currentLessonId);
  const completed = useAppStore((s) => s.completedLessons);
  const due = useAppStore(
    (s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length,
  );
  const current = LESSON_BY_ID[currentLessonId] ?? LESSONS[0];
  const unit = UNITS.find((u) => u.id === current?.unitId);
  const isNew = completed.length === 0 && xp === 0;

  if (isNew) return <Welcome />;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">朱砂</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Cinnabar</h1>
        <p className="mt-2 text-muted">Pick up where the ink dried.</p>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat label="Streak" value={`${streak}d`} />
        <Stat label="XP" value={String(xp)} />
        <Stat label="Due" value={String(due)} />
      </div>

      <Card className="mb-4 p-5">
        <p className="text-xs uppercase tracking-widest text-muted">Today</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="font-display text-2xl tabular-nums">
            {dailyXp}
            <span className="text-base text-muted"> / {dailyGoal} XP</span>
          </p>
          {streak > 0 ? (
            <span className="flex items-center gap-1 text-sm text-primary">
              <Flame className="size-4" />
              {streak}
            </span>
          ) : null}
        </div>
        <Progress value={(dailyXp / dailyGoal) * 100} className="mt-4" />
      </Card>

      <Card className="mb-4 p-5">
        <p className="text-xs uppercase tracking-widest text-muted">
          {unit ? `${bandLabel(unit.band)} · ${unit.titleZh}` : "Continue"}
        </p>
        <h2 className="mt-2 font-display text-2xl">
          {current?.titleZh}{" "}
          <span className="text-lg text-muted">{current?.title}</span>
        </h2>
        <p className="mt-2 text-sm text-muted">{current?.intro}</p>
        <Button asChild size="lg" className="mt-5 w-full">
          <Link to="/lesson/$id" params={{ id: current?.id ?? "sounds-tones" }}>
            <Play className="size-4" />
            Continue
          </Link>
        </Button>
      </Card>

      {due > 0 ? (
        <Card className="p-5">
          <h2 className="font-display text-xl">Reviews waiting</h2>
          <p className="mt-1 text-sm text-muted">
            {due} card{due === 1 ? "" : "s"} due. Memory lives in the return.
          </p>
          <Button asChild variant="paper" className="mt-4">
            <Link to="/practice/$mode" params={{ mode: "cards" }}>Review now</Link>
          </Button>
        </Card>
      ) : null}
    </main>
  );
}

function Welcome() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-2xl flex-col justify-center px-4 py-10">
      <p
        aria-hidden
        className="pointer-events-none absolute right-4 top-8 select-none font-display text-[9rem] leading-none text-fg/5 md:text-[12rem]"
      >
        朱
      </p>
      <p className="text-xs uppercase tracking-[0.25em] text-muted">朱砂学堂</p>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        Cinnabar
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
        Mandarin to fluency — tones first, then characters, grammar, reading, and speech.
        A serious path from the first 妈 to essays you can argue with.
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/lesson/$id" params={{ id: "sounds-tones" }}>
            Start from silence
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link to="/place">Place me</Link>
        </Button>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3 shadow-[var(--shadow-border)]">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
    </div>
  );
}
