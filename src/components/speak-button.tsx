import { Volume2 } from "lucide-react";
import { speakZh } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  className,
  label = "Play audio",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const rate = useAppStore((s) => s.rate);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => speakZh(text, rate)}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-surface",
        className,
      )}
    >
      <Volume2 className="size-5" strokeWidth={1.75} />
    </button>
  );
}
