import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { LESSONS, UNITS, bandLabel, lessonsInUnit } from "@/data/curriculum";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/path")({ component: PathPage });

function PathPage() {
  const completed = useAppStore((s) => s.completedLessons);
  const current = useAppStore((s) => s.currentLessonId);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Curriculum</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">The path</h1>
      <p className="mt-2 max-w-md text-muted">
        Eight bands, from the four tones to chengyu. Finish a lesson to open the next.
      </p>

      <div className="mt-10 space-y-10">
        {UNITS.map((unit) => {
          const lessons = lessonsInUnit(unit.id);
          const done = lessons.filter((l) => completed.includes(l.id)).length;
          return (
            <section key={unit.id}>
              <header className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <Badge>{bandLabel(unit.band)}</Badge>
                  <h2 className="mt-2 font-display text-2xl">
                    {unit.titleZh}{" "}
                    <span className="text-lg text-muted">{unit.title}</span>
                  </h2>
                  <p className="mt-1 text-sm text-muted">{unit.blurb}</p>
                </div>
                <p className="tabular-nums text-sm text-subtle">
                  {done}/{lessons.length}
                </p>
              </header>
              <ol className="space-y-2">
                {lessons.map((lesson, idx) => {
                  const i = LESSONS.findIndex((l) => l.id === lesson.id);
                  const prevId = i > 0 ? LESSONS[i - 1]?.id : undefined;
                  const unlocked =
                    completed.includes(lesson.id) ||
                    lesson.id === current ||
                    lesson.id === "sounds-tones" ||
                    (prevId ? completed.includes(prevId) : true);
                  const isDone = completed.includes(lesson.id);
                  return (
                    <li key={lesson.id}>
                      {unlocked ? (
                        <Link
                          to="/lesson/$id"
                          params={{ id: lesson.id }}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150",
                            isDone ? "bg-bg-elevated" : "bg-surface hover:bg-bg-elevated",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 items-center justify-center rounded-sm text-xs tabular-nums",
                              isDone ? "bg-success/20 text-success" : "bg-paper text-ink",
                            )}
                          >
                            {isDone ? <Check className="size-4" /> : idx + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display">
                              {lesson.titleZh}{" "}
                              <span className="text-sm font-sans text-muted">{lesson.title}</span>
                            </span>
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-subtle">
                          <span className="flex size-8 items-center justify-center rounded-sm bg-bg-elevated">
                            <Lock className="size-3.5" />
                          </span>
                          <span className="font-display">
                            {lesson.titleZh}{" "}
                            <span className="text-sm font-sans">{lesson.title}</span>
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
