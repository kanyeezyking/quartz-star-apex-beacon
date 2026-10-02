import { createFileRoute } from "@tanstack/react-router";
import { LESSONS, UNITS, bandLabel } from "@/data/curriculum";
import { VOCAB } from "@/data/vocab";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const dailyGoal = useAppStore((s) => s.dailyGoal);
  const setDailyGoal = useAppStore((s) => s.setDailyGoal);
  const completed = useAppStore((s) => s.completedLessons);
  const known = useAppStore((s) => s.knownVocab);
  const toneCorrect = useAppStore((s) => s.toneCorrect);
  const toneTotal = useAppStore((s) => s.toneTotal);
  const writeCorrect = useAppStore((s) => s.writeCorrect);
  const writeTotal = useAppStore((s) => s.writeTotal);
  const listenCorrect = useAppStore((s) => s.listenCorrect);
  const listenTotal = useAppStore((s) => s.listenTotal);
  const showPinyin = useAppStore((s) => s.showPinyin);
  const togglePinyin = useAppStore((s) => s.togglePinyin);
  const rate = useAppStore((s) => s.rate);
  const setRate = useAppStore((s) => s.setRate);

  const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">功课</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Progress</h1>
      <p className="mt-2 text-muted">Kept on this device. No account required.</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted">XP</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{xp}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted">Streak</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{streak}d</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted">Lessons</p>
          <p className="mt-1 font-display text-3xl tabular-nums">
            {completed.length}
            <span className="text-base text-muted">/{LESSONS.length}</span>
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted">Words known</p>
          <p className="mt-1 font-display text-3xl tabular-nums">
            {known.length}
            <span className="text-base text-muted">/{VOCAB.length}</span>
          </p>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Bands</h2>
        <ul className="mt-4 space-y-4">
          {UNITS.map((u) => {
            const ids = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);
            const done = ids.filter((id) => completed.includes(id)).length;
            return (
              <li key={u.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>
                    {u.titleZh} · {bandLabel(u.band)}
                  </span>
                  <span className="tabular-nums text-muted">
                    {done}/{ids.length}
                  </span>
                </div>
                <Progress value={ids.length ? (done / ids.length) * 100 : 0} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <Skill label="Tones" value={pct(toneCorrect, toneTotal)} />
        <Skill label="Listening" value={pct(listenCorrect, listenTotal)} />
        <Skill label="Writing" value={pct(writeCorrect, writeTotal)} />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Settings</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm">Show pinyin</span>
            <Button size="sm" variant={showPinyin ? "paper" : "secondary"} onClick={togglePinyin}>
              {showPinyin ? "On" : "Off"}
            </Button>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Speech rate</span>
              <span className="tabular-nums text-muted">{rate.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.6}
              max={1.1}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Daily XP goal</span>
              <span className="tabular-nums text-muted">{dailyGoal}</span>
            </div>
            <div className="mt-2 flex gap-2">
              {[30, 50, 80, 120].map((n) => (
                <Button key={n} size="sm" variant={dailyGoal === n ? "default" : "secondary"} onClick={() => setDailyGoal(n)}>
                  {n}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Skill({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}%</p>
      <Progress value={value} className="mt-3" />
    </Card>
  );
}
