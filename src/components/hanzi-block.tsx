import { SpeakButton } from "@/components/speak-button";
import { cn } from "@/lib/utils";

export function HanziBlock({
  hanzi,
  pinyin,
  english,
  showPinyin = true,
  size = "lg",
  speak = true,
}: {
  hanzi: string;
  pinyin?: string;
  english?: string;
  showPinyin?: boolean;
  size?: "md" | "lg" | "xl";
  speak?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-paper text-ink",
          size === "xl" && "min-h-40 w-full max-w-sm px-6 py-8",
          size === "lg" && "min-h-32 w-full max-w-sm px-5 py-6",
          size === "md" && "min-h-24 w-full max-w-xs px-4 py-4",
        )}
      >
        <p
          lang="zh-CN"
          className={cn(
            "font-display leading-none tracking-tight",
            size === "xl" && "text-6xl",
            size === "lg" && "text-5xl",
            size === "md" && "text-3xl",
          )}
        >
          {hanzi}
        </p>
        {speak ? (
          <div className="absolute right-2 top-2">
            <SpeakButton text={hanzi} className="text-ink hover:bg-ink/5" />
          </div>
        ) : null}
      </div>
      {showPinyin && pinyin ? (
        <p className="mt-3 font-sans text-lg text-fg">{pinyin}</p>
      ) : null}
      {english ? <p className="mt-1 text-sm text-muted">{english}</p> : null}
    </div>
  );
}
