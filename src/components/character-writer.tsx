import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Writer = {
  animateCharacter: () => Promise<unknown>;
  quiz: (opts?: {
    onComplete?: (summary: { totalMistakes: number }) => void;
  }) => void;
  cancelQuiz: () => void;
};

export function CharacterWriter({
  hanzi,
  onQuiz,
}: {
  hanzi: string;
  onQuiz?: (ok: boolean) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const writerRef = useRef<Writer | null>(null);
  const [mode, setMode] = useState<"animate" | "quiz">("animate");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = host.current;
    if (!el) return;
    el.innerHTML = "";
    setReady(false);
    setError(null);
    void import("hanzi-writer")
      .then((mod) => {
        if (cancelled || !host.current) return;
        const HanziWriter = mod.default;
        const writer = HanziWriter.create(host.current, hanzi, {
          width: 260,
          height: 260,
          padding: 16,
          strokeColor: "#1a1410",
          outlineColor: "#d4c8b8",
          radicalColor: "#c23a2b",
          showHintAfterMisses: 1,
          highlightOnComplete: true,
        }) as unknown as Writer;
        writerRef.current = writer;
        setReady(true);
        void writer.animateCharacter();
      })
      .catch(() => {
        if (!cancelled) setError("Could not load stroke data for this character.");
      });
    return () => {
      cancelled = true;
      writerRef.current?.cancelQuiz();
      writerRef.current = null;
    };
  }, [hanzi]);

  function animate() {
    setMode("animate");
    void writerRef.current?.animateCharacter();
  }

  function quiz() {
    setMode("quiz");
    writerRef.current?.quiz({
      onComplete: (summary) => {
        onQuiz?.((summary.totalMistakes ?? 0) <= 2);
      },
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          "flex size-[280px] items-center justify-center rounded-lg bg-paper",
          !ready && "animate-pulse",
        )}
      >
        <div ref={host} />
      </div>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <div className="flex gap-2">
        <Button variant={mode === "animate" ? "paper" : "secondary"} onClick={animate} disabled={!ready}>
          Animate
        </Button>
        <Button variant={mode === "quiz" ? "default" : "secondary"} onClick={quiz} disabled={!ready}>
          Write it
        </Button>
      </div>
    </div>
  );
}
