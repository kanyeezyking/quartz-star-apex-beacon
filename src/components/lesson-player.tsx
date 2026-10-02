import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GRAMMAR_BY_ID } from "@/data/grammar";
import { lessonItems, LESSON_BY_ID, nextLessonId } from "@/data/curriculum";
import { getVocab } from "@/data/vocab";
import { pinyinMatches } from "@/lib/pinyin";
import { speakZh } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import type { LessonItem, MatchQuiz, QuizItem, TypeQuiz } from "@/lib/types";
import { HanziBlock } from "./hanzi-block";
import { SpeakButton } from "./speak-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

export function LessonPlayer({ lessonId }: { lessonId: string }) {
  const def = LESSON_BY_ID[lessonId];
  const items = useMemo(() => lessonItems(lessonId), [lessonId]);
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState(0);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const addXp = useAppStore((s) => s.addXp);
  const navigate = useNavigate();
  const next = nextLessonId(lessonId);

  if (!def) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-muted">That lesson is not on the path.</p>
        <Button asChild className="mt-4">
          <Link to="/path">Back to path</Link>
        </Button>
      </main>
    );
  }

  const item = items[i];
  const pct = items.length ? (i / items.length) * 100 : 0;

  function advance(xp = 0) {
    if (xp) {
      addXp(xp);
      setEarned((e) => e + xp);
    }
    if (i + 1 >= items.length) {
      completeLesson(lessonId, next);
      setDone(true);
    } else {
      setI((n) => n + 1);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 pb-8 pt-4">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-md hover:bg-surface"
          onClick={() => navigate({ to: "/path" })}
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm">{def.titleZh} · {def.title}</p>
          <Progress value={done ? 100 : pct} className="mt-2" />
        </div>
        <span className="tabular-nums text-xs text-muted">
          {Math.min(i + 1, items.length)}/{items.length}
        </span>
      </header>

      {done ? (
        <Completion title={def.title} titleZh={def.titleZh} earned={earned} nextId={next} />
      ) : item ? (
        <div className="flex flex-1 flex-col">
          <Step item={item} onContinue={advance} />
        </div>
      ) : null}
    </main>
  );
}

function Completion({
  title,
  titleZh,
  earned,
  nextId,
}: {
  title: string;
  titleZh: string;
  earned: number;
  nextId?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <span className="flex size-16 items-center justify-center rounded-sm bg-primary font-display text-3xl text-primary-fg">
        朱
      </span>
      <h1 className="mt-6 font-display text-3xl">{titleZh}</h1>
      <p className="mt-1 text-muted">{title} is complete.</p>
      <p className="mt-4 tabular-nums text-sm text-muted">+{earned + 40} XP</p>
      <div className="mt-8 flex w-full flex-col gap-2">
        {nextId ? (
          <Button asChild size="lg">
            <Link to="/lesson/$id" params={{ id: nextId }}>
              Next lesson
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="secondary" size="lg">
          <Link to="/path">Path</Link>
        </Button>
      </div>
    </div>
  );
}

function Step({
  item,
  onContinue,
}: {
  item: LessonItem;
  onContinue: (xp?: number) => void;
}) {
  const markKnown = useAppStore((s) => s.markKnown);
  const reviewVocab = useAppStore((s) => s.reviewVocab);
  const showPinyin = useAppStore((s) => s.showPinyin);

  if (item.kind === "tip") {
    return (
      <Panel>
        <h2 className="font-display text-2xl">{item.title}</h2>
        <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
        <Footer>
          <Button size="lg" className="w-full" onClick={() => onContinue()}>
            Continue
          </Button>
        </Footer>
      </Panel>
    );
  }

  if (item.kind === "teach-tone") {
    return (
      <Panel>
        <p className="text-xs uppercase tracking-widest text-muted">Tone {item.tone}</p>
        <h2 className="mt-2 font-display text-2xl">{item.name}</h2>
        <p className="mt-2 text-muted">{item.contour}</p>
        <ul className="mt-6 space-y-2">
          {item.examples.map((ex) => (
            <li key={ex.id} className="flex items-center justify-between rounded-md bg-bg-elevated px-3 py-2">
              <span>
                <span lang="zh-CN" className="font-display text-xl">
                  {ex.hanzi}
                </span>
                <span className="ml-2 text-sm text-muted">{ex.pinyin}</span>
              </span>
              <SpeakButton text={ex.hanzi} />
            </li>
          ))}
        </ul>
        <Footer>
          <Button size="lg" className="w-full" onClick={() => onContinue()}>
            Continue
          </Button>
        </Footer>
      </Panel>
    );
  }

  if (item.kind === "teach-sound") {
    return (
      <Panel>
        <p className="font-display text-4xl">{item.pinyin}</p>
        <p className="mt-4 leading-relaxed text-muted">{item.note}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {item.examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => speakZh(ex)}
              className="rounded-md bg-paper px-3 py-2 font-display text-xl text-ink"
            >
              {ex}
            </button>
          ))}
        </div>
        <Footer>
          <Button size="lg" className="w-full" onClick={() => onContinue()}>
            Continue
          </Button>
        </Footer>
      </Panel>
    );
  }

  if (item.kind === "teach-vocab") {
    const v = getVocab(item.vocabId);
    if (!v) return null;
    return (
      <Panel>
        <HanziBlock hanzi={v.hanzi} pinyin={showPinyin ? v.pinyin : undefined} english={v.english} size="xl" />
        {v.example ? (
          <button
            type="button"
            className="mt-6 w-full rounded-md bg-bg-elevated px-4 py-3 text-left"
            onClick={() => speakZh(v.example!.hanzi)}
          >
            <p lang="zh-CN" className="font-display text-lg">
              {v.example.hanzi}
            </p>
            {showPinyin ? <p className="text-sm text-muted">{v.example.pinyin}</p> : null}
            <p className="text-sm text-muted">{v.example.english}</p>
          </button>
        ) : null}
        {item.note ? <p className="mt-4 text-sm text-muted">{item.note}</p> : null}
        <Footer className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              markKnown(v.id);
              onContinue(5);
            }}
          >
            I know this
          </Button>
          <Button
            size="lg"
            onClick={() => {
              reviewVocab(v.id, 3);
              onContinue(8);
            }}
          >
            Continue
          </Button>
        </Footer>
      </Panel>
    );
  }

  if (item.kind === "grammar") {
    const g = GRAMMAR_BY_ID[item.grammarId];
    if (!g) return null;
    return (
      <Panel>
        <p className="text-xs uppercase tracking-widest text-muted">Grammar</p>
        <h2 className="mt-2 font-display text-2xl">{g.titleZh}</h2>
        <p className="text-sm text-muted">{g.title}</p>
        <p className="mt-4 leading-relaxed text-muted">{g.body}</p>
        <ul className="mt-6 space-y-3">
          {g.examples.map((ex) => (
            <li key={ex.hanzi}>
              <button
                type="button"
                className="w-full rounded-md bg-paper px-4 py-3 text-left text-ink"
                onClick={() => speakZh(ex.hanzi)}
              >
                <p lang="zh-CN" className="font-display text-lg">
                  {ex.hanzi}
                </p>
                <p className="text-sm opacity-70">{ex.pinyin}</p>
                <p className="text-sm opacity-70">{ex.english}</p>
                {ex.note ? <p className="mt-1 text-xs opacity-60">{ex.note}</p> : null}
              </button>
            </li>
          ))}
        </ul>
        <Footer>
          <Button size="lg" className="w-full" onClick={() => onContinue(10)}>
            Continue
          </Button>
        </Footer>
      </Panel>
    );
  }

  if (item.kind === "dialogue") {
    return <DialogueBlock lines={item.lines} onContinue={() => onContinue(10)} />;
  }

  if (item.kind === "quiz") {
    return <QuizBlock quiz={item.quiz} onResult={(ok) => onContinue(ok ? 12 : 4)} />;
  }

  return null;
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}

function Footer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-auto pt-8", className)}>{children}</div>;
}

function DialogueBlock({
  lines,
  onContinue,
}: {
  lines: { speaker: string; hanzi: string; pinyin: string; english: string }[];
  onContinue: () => void;
}) {
  const [shown, setShown] = useState(1);
  const showPinyin = useAppStore((s) => s.showPinyin);
  const line = lines[shown - 1];
  useEffect(() => {
    if (line) speakZh(line.hanzi);
  }, [shown, line]);

  return (
    <Panel>
      <p className="text-xs uppercase tracking-widest text-muted">Dialogue</p>
      <ul className="mt-4 space-y-3">
        {lines.slice(0, shown).map((l, idx) => (
          <li
            key={`${l.hanzi}-${idx}`}
            className={cn(
              "rounded-lg px-4 py-3",
              l.speaker === "A" ? "bg-paper text-ink" : "bg-bg-elevated text-fg",
            )}
          >
            <p className="text-xs opacity-60">{l.speaker}</p>
            <p lang="zh-CN" className="font-display text-lg">
              {l.hanzi}
            </p>
            {showPinyin ? <p className="text-sm opacity-70">{l.pinyin}</p> : null}
            <p className="text-sm opacity-70">{l.english}</p>
          </li>
        ))}
      </ul>
      <Footer>
        {shown < lines.length ? (
          <Button size="lg" className="w-full" onClick={() => setShown((n) => n + 1)}>
            Next line
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={onContinue}>
            Continue
          </Button>
        )}
      </Footer>
    </Panel>
  );
}

function QuizBlock({ quiz, onResult }: { quiz: QuizItem; onResult: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const recordTone = useAppStore((s) => s.recordTone);
  const recordListen = useAppStore((s) => s.recordListen);

  useEffect(() => {
    if (quiz.type === "mc" && quiz.speak) speakZh(quiz.speak);
    if (quiz.type === "tone-pick") speakZh(quiz.speak);
    if (quiz.type === "type" && quiz.speak) speakZh(quiz.speak);
  }, [quiz]);

  if (quiz.type === "match") return <MatchBlock quiz={quiz} onResult={onResult} />;
  if (quiz.type === "type") return <TypeBlock quiz={quiz} onResult={onResult} />;

  const options = quiz.options;
  const correct = quiz.answer;
  const ok = picked === correct;

  function lock() {
    if (picked === null) return;
    setChecked(true);
    if (quiz.type === "tone-pick") recordTone(ok);
    if (quiz.type === "mc" && quiz.speak && !quiz.promptHanzi) recordListen(ok);
  }

  return (
    <Panel>
      <p className="text-xs uppercase tracking-widest text-muted">Check</p>
      <h2 className="mt-2 font-display text-2xl">{quiz.type === "mc" ? quiz.prompt : "Which tone?"}</h2>
      {quiz.type === "mc" && quiz.promptHanzi ? (
        <p lang="zh-CN" className="mt-3 font-display text-4xl">
          {quiz.promptHanzi}
        </p>
      ) : null}
      {quiz.type === "tone-pick" && quiz.hanzi ? (
        <p lang="zh-CN" className="mt-3 font-display text-5xl">
          {quiz.hanzi}
        </p>
      ) : null}
      <div className="mt-6 grid gap-2">
        {options.map((opt, idx) => {
          const selected = picked === idx;
          const reveal = checked && (idx === correct || selected);
          return (
            <button
              key={opt}
              type="button"
              disabled={checked}
              onClick={() => setPicked(idx)}
              className={cn(
                "min-h-12 rounded-md px-4 py-3 text-left text-sm shadow-[var(--shadow-border)] transition-colors duration-150",
                selected && !checked && "bg-surface",
                !selected && !checked && "bg-bg-elevated hover:bg-surface",
                reveal && idx === correct && "bg-success/20 text-fg",
                reveal && selected && idx !== correct && "bg-primary/20",
              )}
            >
              <span className="mr-2 text-xs text-muted">{idx + 1}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {checked ? (
        <p className={cn("mt-4 text-sm", ok ? "text-success" : "text-primary")}>
          {ok ? "Correct." : `It was “${options[correct]}”.`}
        </p>
      ) : null}
      <Footer>
        {!checked ? (
          <Button size="lg" className="w-full" disabled={picked === null} onClick={lock}>
            Check
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={() => onResult(ok)}>
            Continue
          </Button>
        )}
      </Footer>
    </Panel>
  );
}

function TypeBlock({ quiz, onResult }: { quiz: TypeQuiz; onResult: (ok: boolean) => void }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const ok = quiz.answers.some((a) => pinyinMatches(value, a));

  return (
    <Panel>
      <p className="text-xs uppercase tracking-widest text-muted">Type pinyin</p>
      <h2 className="mt-2 font-display text-2xl">{quiz.prompt}</h2>
      <Input
        className="mt-6"
        autoCapitalize="off"
        autoCorrect="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="pinyin"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !checked) setChecked(true);
        }}
      />
      {checked ? (
        <p className={cn("mt-4 text-sm", ok ? "text-success" : "text-primary")}>
          {ok ? "Correct." : `Answer: ${quiz.answers[0]}`}
        </p>
      ) : quiz.hint ? (
        <p className="mt-2 text-xs text-subtle">Starts with “{quiz.hint}”</p>
      ) : null}
      <Footer>
        {!checked ? (
          <Button size="lg" className="w-full" disabled={!value.trim()} onClick={() => setChecked(true)}>
            Check
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={() => onResult(ok)}>
            Continue
          </Button>
        )}
      </Footer>
    </Panel>
  );
}

function MatchBlock({ quiz, onResult }: { quiz: MatchQuiz; onResult: (ok: boolean) => void }) {
  const left = quiz.pairs.map((p) => p.left);
  const [right] = useState(() => [...quiz.pairs.map((p) => p.right)].reverse());
  const [selL, setSelL] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState(0);

  const map = Object.fromEntries(quiz.pairs.map((p) => [p.left, p.right]));
  const done = Object.keys(matched).length === quiz.pairs.length;

  function pickRight(r: string) {
    if (!selL || Object.values(matched).includes(r)) return;
    if (map[selL] === r) {
      setMatched((m) => ({ ...m, [selL]: r }));
      const pair = quiz.pairs.find((p) => p.left === selL);
      if (pair?.speak) speakZh(pair.speak);
    } else {
      setWrong((n) => n + 1);
    }
    setSelL(null);
  }

  return (
    <Panel>
      <p className="text-xs uppercase tracking-widest text-muted">Match</p>
      <h2 className="mt-2 font-display text-2xl">Pair each word</h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {left.map((l) => (
            <button
              key={l}
              type="button"
              disabled={Boolean(matched[l])}
              onClick={() => setSelL(l)}
              className={cn(
                "flex h-12 w-full items-center justify-center rounded-md font-display text-xl",
                matched[l] ? "bg-success/20" : selL === l ? "bg-paper text-ink" : "bg-bg-elevated",
              )}
            >
              {matched[l] ? <Check className="size-4" /> : l}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((r) => (
            <button
              key={r}
              type="button"
              disabled={Object.values(matched).includes(r)}
              onClick={() => pickRight(r)}
              className={cn(
                "flex h-12 w-full items-center justify-center rounded-md px-2 text-sm",
                Object.values(matched).includes(r) ? "bg-success/20" : "bg-bg-elevated",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <Footer>
        <Button size="lg" className="w-full" disabled={!done} onClick={() => onResult(wrong === 0)}>
          Continue
        </Button>
      </Footer>
    </Panel>
  );
}
