let voicesReady = false;

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function initSpeech(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const mark = () => {
    voicesReady = true;
  };
  window.speechSynthesis.addEventListener("voiceschanged", mark);
  if (loadVoices().length) voicesReady = true;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  const zh =
    voices.find((v) => v.lang.toLowerCase() === "zh-cn") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("zh")) ??
    voices.find((v) => /chinese|mandarin|putonghua/i.test(v.name));
  return zh ?? null;
}

export function speakZh(text: string, rate = 0.88): void {
  if (typeof window === "undefined" || !window.speechSynthesis || !text.trim()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = rate;
  u.pitch = 1;
  const voice = pickVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

type RecognitionCtor = new () => SpeechRecognitionLike;

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((ev: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canListen(): boolean {
  return getRecognitionCtor() !== null;
}

export function listenZhOnce(): Promise<string> {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return Promise.reject(new Error("Speech recognition is not available in this browser."));
  return new Promise((resolve, reject) => {
    const rec = new Ctor();
    rec.lang = "zh-CN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (ev) => {
      const transcript = ev.results[0]?.[0]?.transcript ?? "";
      resolve(transcript);
    };
    rec.onerror = (ev) => {
      reject(new Error(ev.error || "Could not hear you."));
    };
    rec.onend = () => {
      /* noop */
    };
    rec.start();
  });
}

export { voicesReady };
