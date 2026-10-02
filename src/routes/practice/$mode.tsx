import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { CharacterWriter } from "@/components/character-writer";
import { HanziBlock } from "@/components/hanzi-block";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PINYIN_CHART } from "@/data/pinyin-chart";
import { PASSAGES } from "@/data/passages";
import { TONE_DRILL, TONE_PAIRS } from "@/data/tones";
import { VOCAB, getVocab } from "@/data/vocab";
import { applyTone } from "@/lib/pinyin";
import { canListen, listenZhOnce, speakZh } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice/$mode")({
  component: PracticeMode,
});

function PracticeMode() {
  const { mode } = Route.useParams();
  if (mode === "cards") return <CardsDrill />;
  if (mode === "tones") return <TonesDrill />;
  if (mode === "listen") return <ListenDrill />;
  if (mode === "write") return <WriteDrill />;
  if (mode === "speak") return <SpeakDrill />;
  if (mode === "read") return <ReadDrill />;
  if (mode === "pinyin") return <PinyinDrill />;
  return (
    <main className="px-4 py-16 text-center">
      <p className="text-muted">Unknown drill.</p>
      <Button asChild className="mt-4">
        <Link to="/practice">Back</Link>
      </Button>
    </main>
  );
}

function Shell({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <Link to="/practice" className="text-sm text-muted hover:text-fg">
        Practice
      </Link>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
      <div className="mt-8">{children}</div>
    </main>
  );
}

function CardsDrill() {
  const srs = useAppStore((s) => s.srs);
  const reviewVocab = useAppStore((s) => s.reviewVocab);
  const addXp = useAppStore((s) => s.addXp);
  const due = useMemo(() => {
    const now = Date.now();
    const ids = Object.entries(srs)
      .filter(([, c]) => c.nextReview <= now)
      .map(([id]) => id);
    if (ids.length) return ids;
    return VOCAB.slice(0, 12).map((v) => v.id);
  }, [srs]);
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const word = getVocab(due[i] ?? "");

  if (!word) {
    return (
      <Shell kicker="单词" title="Flashcards">
        <p className="text-muted">Finish a lesson to load the deck.</p>
      </Shell>
    );
  }

  function grade(q: number) {
    reviewVocab(word!.id, q);
    addXp(q >= 4 ? 8 : 3);
    setReveal(false);
    setI((n) => (n + 1) % due.length);
  }

  return (
    <Shell kicker="单词" title="Flashcards">
      <p className="mb-4 text-sm text-muted">
        Card {i + 1} of {due.length}
      </p>
      <button type="button" className="w-full" onClick={() => setReveal(true)}>
        <HanziBlock
          hanzi={word.hanzi}
          pinyin={reveal ? word.pinyin : undefined}
          english={reveal ? word.english : "Tap to reveal"}
        />
      </button>
      {reveal ? (
        <div className="mt-6 grid grid-cols-3 gap-2">
          <Button variant="secondary" onClick={() => grade(1)}>
            Again
          </Button>
          <Button variant="secondary" onClick={() => grade(3)}>
            Good
          </Button>
          <Button onClick={() => grade(5)}>Easy</Button>
        </div>
      ) : (
        <Button className="mt-6 w-full" variant="paper" onClick={() => setReveal(true)}>
          Reveal
        </Button>
      )}
    </Shell>
  );
}

function TonesDrill() {
  const recordTone = useAppStore((s) => s.recordTone);
  const addXp = useAppStore((s) => s.addXp);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = TONE_DRILL[i % TONE_DRILL.length]!;
  const pair = TONE_PAIRS[i % TONE_PAIRS.length]!;

  function choose(n: number) {
    const ok = n === item.tone;
    setPicked(n);
    recordTone(ok);
    addXp(ok ? 6 : 2);
  }

  return (
    <Shell kicker="声调" title="Tone trainer">
      <Card className="p-5">
        <p className="text-sm text-muted">Listen, then name the contour.</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <p lang="zh-CN" className="font-display text-6xl">
            {item.hanzi}
          </p>
          <SpeakButton text={item.hanzi} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <Button
              key={n}
              variant={picked === n ? (n === item.tone ? "default" : "secondary") : "secondary"}
              onClick={() => choose(n)}
            >
              Tone {n}
            </Button>
          ))}
        </div>
        {picked !== null ? (
          <p className="mt-4 text-sm text-muted">
            {item.pinyin} · {item.english}
          </p>
        ) : null}
        <Button
          className="mt-4 w-full"
          onClick={() => {
            setPicked(null);
            setI((n) => n + 1);
            speakZh(TONE_DRILL[(i + 1) % TONE_DRILL.length]!.hanzi);
          }}
        >
          Next
        </Button>
      </Card>
      <Card className="mt-4 p-5">
        <p className="text-sm text-muted">Minimal pair · {pair.prompt}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[pair.a, pair.b].map((x) => (
            <button
              key={x.hanzi}
              type="button"
              onClick={() => speakZh(x.hanzi)}
              className="rounded-md bg-paper px-3 py-6 text-ink"
            >
              <p className="font-display text-4xl">{x.hanzi}</p>
              <p className="mt-2 text-sm">{x.pinyin}</p>
            </button>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

function ListenDrill() {
  const pool = useMemo(
    () => VOCAB.filter((v) => v.example).slice(0, 80),
    [],
  );
  const recordListen = useAppStore((s) => s.recordListen);
  const addXp = useAppStore((s) => s.addXp);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const target = pool[i % pool.length]!;
  const options = useMemo(() => {
    const others = pool.filter((v) => v.id !== target.id).slice(i, i + 3);
    return [target, ...others].map((v) => v.english);
  }, [i, pool, target]);

  function check(opt: string) {
    setPicked(opt);
    const ok = opt === target.english;
    recordListen(ok);
    addXp(ok ? 8 : 2);
  }

  return (
    <Shell kicker="听力" title="Listening">
      <Button variant="paper" size="lg" className="w-full" onClick={() => speakZh(target.example?.hanzi ?? target.hanzi, 0.8)}>
        Play sentence
      </Button>
      <div className="mt-6 grid gap-2">
        {options.map((opt) => (
          <Button
            key={opt}
            variant={picked === opt ? "default" : "secondary"}
            className="h-auto min-h-11 justify-start whitespace-normal py-3 text-left"
            onClick={() => check(opt)}
          >
            {opt}
          </Button>
        ))}
      </div>
      {picked ? (
        <p className="mt-4 font-display text-lg">
          {target.example?.hanzi}{" "}
          <span className="block text-sm font-sans text-muted">{target.example?.pinyin}</span>
        </p>
      ) : null}
      <Button
        className="mt-6 w-full"
        onClick={() => {
          setPicked(null);
          setI((n) => n + 1);
        }}
      >
        Next
      </Button>
    </Shell>
  );
}

function WriteDrill() {
  const known = useAppStore((s) => s.knownVocab);
  const recordWrite = useAppStore((s) => s.recordWrite);
  const chars = useMemo(() => {
    const fromKnown = known
      .map((id) => getVocab(id)?.hanzi)
      .filter((h): h is string => Boolean(h) && h.length === 1);
    const fallback = ["你", "好", "我", "是", "中", "国", "学", "生", "茶", "水", "人", "大"];
    const list = fromKnown.length ? fromKnown : fallback;
    return [...new Set(list)];
  }, [known]);
  const [i, setI] = useState(0);
  const hanzi = chars[i % chars.length]!;

  return (
    <Shell kicker="汉字" title="Character studio">
      <p className="mb-4 text-center font-display text-2xl">{hanzi}</p>
      <CharacterWriter hanzi={hanzi} onQuiz={(ok) => recordWrite(ok)} />
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {chars.slice(0, 16).map((h, idx) => (
          <button
            key={h}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "size-11 rounded-md font-display text-lg",
              h === hanzi ? "bg-paper text-ink" : "bg-surface",
            )}
          >
            {h}
          </button>
        ))}
      </div>
    </Shell>
  );
}

function SpeakDrill() {
  const pool = VOCAB.filter((v) => v.hsk <= 2).slice(0, 40);
  const [i, setI] = useState(0);
  const [heard, setHeard] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const word = pool[i % pool.length]!;
  const listening = canListen();

  async function rec() {
    setErr(null);
    setBusy(true);
    try {
      const t = await listenZhOnce();
      setHeard(t);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not hear you.");
    } finally {
      setBusy(false);
    }
  }

  const ok = heard
    ? heard.replace(/\s/g, "").includes(word.hanzi) ||
      heard.toLowerCase().includes(word.pinyin.replace(/\s/g, "").slice(0, 3))
    : false;

  return (
    <Shell kicker="口语" title="Speaking">
      <HanziBlock hanzi={word.hanzi} pinyin={word.pinyin} english={word.english} />
      {!listening ? (
        <p className="mt-4 text-sm text-muted">
          Speech recognition is not available in this browser. Play the model, then say it aloud.
        </p>
      ) : (
        <Button className="mt-6 w-full" size="lg" onClick={() => void rec()} disabled={busy}>
          {busy ? "Listening…" : "Tap and speak"}
        </Button>
      )}
      {heard ? (
        <p className={cn("mt-4 text-sm", ok ? "text-success" : "text-muted")}>
          Heard: {heard}
        </p>
      ) : null}
      {err ? <p className="mt-3 text-sm text-primary">{err}</p> : null}
      <Button
        variant="secondary"
        className="mt-6 w-full"
        onClick={() => {
          setHeard(null);
          setI((n) => n + 1);
        }}
      >
        Next word
      </Button>
    </Shell>
  );
}

function ReadDrill() {
  const [id, setId] = useState(PASSAGES[0]!.id);
  const [gloss, setGloss] = useState<(typeof PASSAGES)[0]["tokens"][number] | null>(null);
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const passage = PASSAGES.find((p) => p.id === id) ?? PASSAGES[0]!;
  const question = passage.questions[q] ?? passage.questions[0]!;

  return (
    <Shell kicker="阅读" title="Reading room">
      <div className="mb-4 flex flex-wrap gap-2">
        {PASSAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setId(p.id);
              setGloss(null);
              setQ(0);
              setPicked(null);
            }}
            className={cn(
              "rounded-full px-3 py-1 text-xs",
              p.id === id ? "bg-paper text-ink" : "bg-surface text-muted",
            )}
          >
            {p.titleZh}
          </button>
        ))}
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl">{passage.titleZh}</h2>
          <Badge>HSK {passage.hsk === 0 ? "1" : passage.hsk}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">{passage.title}</p>
        <p className="mt-6 leading-[2.1]">
          {passage.tokens.map((tok, idx) =>
            tok.hanzi === "。" || tok.hanzi === "，" || tok.hanzi === "：" || tok.hanzi === "；" || tok.hanzi === "——" ? (
              <span key={`${tok.hanzi}-${idx}`}>{tok.hanzi}</span>
            ) : (
              <button
                key={`${tok.hanzi}-${idx}`}
                type="button"
                onClick={() => {
                  setGloss(tok);
                  speakZh(tok.hanzi);
                }}
                className="mx-0.5 inline rounded-sm px-0.5 hover:bg-paper hover:text-ink"
              >
                {tok.hanzi}
              </button>
            ),
          )}
        </p>
        {gloss ? (
          <div className="mt-4 rounded-md bg-bg-elevated px-3 py-2 text-sm">
            <span className="font-display text-lg">{gloss.hanzi}</span>
            <span className="ml-2 text-muted">{gloss.pinyin}</span>
            <span className="ml-2">{gloss.english}</span>
          </div>
        ) : (
          <p className="mt-4 text-xs text-subtle">Tap a word for pinyin and meaning.</p>
        )}
      </Card>
      <Card className="mt-4 p-5">
        <p className="text-sm text-muted">Comprehension</p>
        <p className="mt-2 font-medium">{question.prompt}</p>
        <div className="mt-3 grid gap-2">
          {question.options.map((opt, idx) => (
            <Button
              key={opt}
              variant={picked === idx ? (idx === question.answer ? "default" : "secondary") : "secondary"}
              className="h-auto justify-start whitespace-normal py-3 text-left"
              onClick={() => setPicked(idx)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

function PinyinDrill() {
  const [group, setGroup] = useState(PINYIN_CHART[0]!.id);
  const [tone, setTone] = useState<1 | 2 | 3 | 4>(1);
  const g = PINYIN_CHART.find((x) => x.id === group) ?? PINYIN_CHART[0]!;

  return (
    <Shell kicker="拼音表" title="Pinyin chart">
      <div className="flex flex-wrap gap-2">
        {PINYIN_CHART.map((x) => (
          <Button
            key={x.id}
            size="sm"
            variant={x.id === group ? "paper" : "secondary"}
            onClick={() => setGroup(x.id)}
          >
            {x.title}
          </Button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {([1, 2, 3, 4] as const).map((n) => (
          <Button key={n} size="sm" variant={tone === n ? "default" : "secondary"} onClick={() => setTone(n)}>
            Tone {n}
          </Button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="p-1 text-muted" />
              {g.finals.map((f) => (
                <th key={f} className="p-1 text-xs font-medium text-muted">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {g.rows.map((row) => (
              <tr key={row.initial}>
                <th className="p-1 text-xs font-medium text-muted">{row.initial}</th>
                {row.cells.map((cell, idx) => (
                  <td key={`${row.initial}-${g.finals[idx]}`} className="p-0.5">
                    {cell ? (
                      <button
                        type="button"
                        onClick={() => speakZh(applyTone(cell, tone))}
                        className="w-full rounded-sm px-1 py-2 hover:bg-paper hover:text-ink"
                      >
                        {applyTone(cell, tone)}
                      </button>
                    ) : (
                      <span className="block py-2 text-subtle">·</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
