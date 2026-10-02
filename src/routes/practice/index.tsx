import { createFileRoute, Link } from "@tanstack/react-router";
import { Ear, Keyboard, Mic, PenTool, Search, Volume2 } from "lucide-react";
import { searchVocab } from "@/data/vocab";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "@/components/speak-button";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/practice/")({ component: PracticeHub });

const MODES = [
  { mode: "cards", title: "Flashcards", titleZh: "单词", blurb: "Spaced review of words you have met.", icon: Keyboard },
  { mode: "tones", title: "Tones", titleZh: "声调", blurb: "Minimal pairs and contour identification.", icon: Volume2 },
  { mode: "listen", title: "Listening", titleZh: "听力", blurb: "Hear a sentence, choose the meaning.", icon: Ear },
  { mode: "write", title: "Characters", titleZh: "汉字", blurb: "Stroke order, then write from memory.", icon: PenTool },
  { mode: "speak", title: "Speaking", titleZh: "口语", blurb: "Say the line. The browser listens.", icon: Mic },
  { mode: "read", title: "Reading", titleZh: "阅读", blurb: "Graded passages with tap-to-gloss.", icon: Search },
  { mode: "pinyin", title: "Pinyin chart", titleZh: "拼音表", blurb: "Every syllable, click to hear.", icon: Volume2 },
] as const;

function PracticeHub() {
  const [q, setQ] = useState("");
  const due = useAppStore(
    (s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length,
  );
  const hits = useMemo(() => searchVocab(q), [q]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Drill</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Practice</h1>
      <p className="mt-2 text-muted">
        {due > 0 ? `${due} reviews due. ` : "Nothing is due. "}
        Drill the skill that is slipping.
      </p>

      <div className="mt-6">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search hanzi, pinyin, English"
        />
        {hits.length > 0 ? (
          <ul className="mt-2 divide-y divide-border rounded-lg bg-surface shadow-[var(--shadow-border)]">
            {hits.map((v) => (
              <li key={v.id} className="flex items-center gap-3 px-3 py-2">
                <span lang="zh-CN" className="w-16 font-display text-xl">
                  {v.hanzi}
                </span>
                <span className="flex-1 text-sm">
                  <span className="block">{v.pinyin}</span>
                  <span className="text-muted">{v.english}</span>
                </span>
                <SpeakButton text={v.hanzi} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.mode} to="/practice/$mode" params={{ mode: m.mode }}>
              <Card className="h-full p-4 transition-colors duration-150 hover:bg-bg-elevated">
                <Icon className="size-4 text-muted" />
                <h2 className="mt-3 font-display text-xl">
                  {m.titleZh} <span className="text-base text-muted">{m.title}</span>
                </h2>
                <p className="mt-1 text-sm text-muted">{m.blurb}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
