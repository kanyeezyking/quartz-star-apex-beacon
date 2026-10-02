import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SCENARIOS } from "@/data/scenarios";
import { tutorReply } from "@/lib/ai";
import { speakZh } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tutor")({ component: TutorPage });

function TutorPage() {
  const [tab, setTab] = useState<"scene" | "live">("scene");
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">对话</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Tutor</h1>
      <p className="mt-2 text-muted">
        Scripted scenes always work. The live tutor uses a model when it is available.
      </p>
      <div className="mt-6 flex gap-2">
        <Button size="sm" variant={tab === "scene" ? "paper" : "secondary"} onClick={() => setTab("scene")}>
          Scenes
        </Button>
        <Button size="sm" variant={tab === "live" ? "paper" : "secondary"} onClick={() => setTab("live")}>
          Live
        </Button>
      </div>
      <div className="mt-6">{tab === "scene" ? <Scenes /> : <Live />}</div>
    </main>
  );
}

function Scenes() {
  const [id, setId] = useState(SCENARIOS[0]!.id);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const scene = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]!;
  const line = scene.lines[step];
  const finished = step >= scene.lines.length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setId(s.id);
              setStep(0);
              setPicked(null);
            }}
            className={cn(
              "rounded-full px-3 py-1 text-xs",
              s.id === id ? "bg-paper text-ink" : "bg-surface text-muted",
            )}
          >
            {s.titleZh}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">{scene.setting}</p>
      {finished || !line ? (
        <Card className="mt-6 p-5">
          <h2 className="font-display text-2xl">Scene complete</h2>
          <p className="mt-2 text-sm text-muted">Run it again, or open live conversation.</p>
          <Button className="mt-4" onClick={() => { setStep(0); setPicked(null); }}>
            Again
          </Button>
        </Card>
      ) : (
        <Card className="mt-6 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted">Partner · {scene.level}</p>
              <p lang="zh-CN" className="mt-2 font-display text-2xl">
                {line.npc.hanzi}
              </p>
              <p className="text-sm text-muted">{line.npc.pinyin}</p>
              <p className="text-sm text-muted">{line.npc.english}</p>
            </div>
            <SpeakButton text={line.npc.hanzi} />
          </div>
          <div className="mt-5 grid gap-2">
            {line.choices.map((c, idx) => (
              <button
                key={c.hanzi}
                type="button"
                onClick={() => {
                  setPicked(idx);
                  speakZh(c.hanzi);
                }}
                className={cn(
                  "rounded-md px-3 py-3 text-left text-sm shadow-[var(--shadow-border)]",
                  picked === idx
                    ? c.good
                      ? "bg-success/20"
                      : "bg-primary/20"
                    : "bg-bg-elevated hover:bg-surface",
                )}
              >
                <span className="block font-display text-lg">{c.hanzi}</span>
                <span className="text-muted">{c.english}</span>
              </button>
            ))}
          </div>
          {picked !== null ? (
            <Button
              className="mt-4 w-full"
              onClick={() => {
                setPicked(null);
                setStep((n) => n + 1);
              }}
            >
              Continue
            </Button>
          ) : null}
        </Card>
      )}
    </div>
  );
}

function Live() {
  const history = useAppStore((s) => s.tutorHistory);
  const pushTutor = useAppStore((s) => s.pushTutor);
  const clearTutor = useAppStore((s) => s.clearTutor);
  const completed = useAppStore((s) => s.completedLessons);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const level = Math.min(6, Math.floor(completed.length / 6));

  async function send() {
    const message = text.trim();
    if (!message || busy) return;
    setText("");
    setError(null);
    pushTutor({ role: "user", text: message });
    setBusy(true);
    try {
      const res = await tutorReply({
        data: {
          level,
          message,
          history: [...history, { role: "user", text: message }].map((t) => ({
            role: t.role,
            content: t.hanzi ?? t.text,
          })),
        },
      });
      if (!res.ok) {
        setError(
          res.error === "unavailable"
            ? "Live tutor is not available here. Use the scenes — they teach the same moves."
            : "The tutor could not reply. Try again, or switch to a scene.",
        );
      } else {
        pushTutor({
          role: "assistant",
          text: res.reply.hanzi,
          hanzi: res.reply.hanzi,
          pinyin: res.reply.pinyin,
          english: res.reply.english,
          correction: res.reply.correction,
          hint: res.reply.hint,
        });
        if (res.reply.hanzi) speakZh(res.reply.hanzi);
      }
    } catch {
      setError("The tutor could not reply.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        <Button size="sm" variant="ghost" onClick={clearTutor}>
          Clear
        </Button>
      </div>
      <div className="mt-2 min-h-64 space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-muted">
            Write in English or Chinese. The tutor answers in Mandarin at your level, with pinyin.
          </p>
        ) : null}
        {history.map((t, idx) => (
          <div
            key={`${t.role}-${idx}`}
            className={cn(
              "rounded-lg px-4 py-3",
              t.role === "user" ? "bg-bg-elevated" : "bg-paper text-ink",
            )}
          >
            {t.hanzi ? (
              <>
                <p className="font-display text-lg">{t.hanzi}</p>
                {t.pinyin ? <p className="text-sm opacity-70">{t.pinyin}</p> : null}
                {t.english ? <p className="text-sm opacity-70">{t.english}</p> : null}
                {t.correction ? <p className="mt-2 text-sm">Correction: {t.correction}</p> : null}
                {t.hint ? <p className="text-sm opacity-70">{t.hint}</p> : null}
              </>
            ) : (
              <p>{t.text}</p>
            )}
          </div>
        ))}
        {busy ? <p className="text-sm text-muted">Thinking…</p> : null}
        {error ? <p className="text-sm text-primary">{error}</p> : null}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something"
        />
        <Button type="submit" disabled={busy || !text.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
