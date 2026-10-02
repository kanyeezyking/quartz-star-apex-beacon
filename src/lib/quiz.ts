import { getVocab } from "@/data/vocab";
import { toneOf } from "./pinyin";
import type { LessonDef, LessonItem, QuizItem, Vocab } from "./types";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number): () => number {
  let a = seed || 1;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

function distractors(target: Vocab, pool: Vocab[], n: number, rand: () => number): Vocab[] {
  const others = pool.filter((v) => v.id !== target.id && v.english !== target.english);
  return shuffle(others, rand).slice(0, n);
}

function mc(
  prompt: string,
  correct: string,
  wrong: string[],
  extra: Partial<QuizItem> & { type?: never } = {},
  rand: () => number,
): QuizItem {
  const options = shuffle([correct, ...wrong], rand);
  return {
    type: "mc",
    prompt,
    options,
    answer: options.indexOf(correct),
    ...extra,
  };
}

export function quizzesForVocab(vocab: Vocab[], lessonId: string): LessonItem[] {
  const usable = vocab.filter(Boolean);
  if (usable.length === 0) return [];
  const rand = rng(hash(lessonId));
  const items: LessonItem[] = [];
  const pick = shuffle(usable, rand);

  for (const word of pick.slice(0, Math.min(4, pick.length))) {
    const wrong = distractors(word, usable, 3, rand).map((w) => w.english);
    while (wrong.length < 3) wrong.push("to rest");
    items.push({
      kind: "quiz",
      quiz: mc(`What does ${word.hanzi} mean?`, word.english, wrong, { promptHanzi: word.hanzi, speak: word.hanzi }, rand),
    });
  }

  for (const word of pick.slice(0, Math.min(3, pick.length))) {
    const wrong = distractors(word, usable, 3, rand).map((w) => w.hanzi);
    while (wrong.length < 3) wrong.push("是");
    items.push({
      kind: "quiz",
      quiz: mc(word.english, word.hanzi, wrong, { speak: word.hanzi }, rand),
    });
  }

  for (const word of pick.slice(0, Math.min(3, pick.length))) {
    items.push({
      kind: "quiz",
      quiz: {
        type: "type",
        prompt: `Type pinyin for ${word.hanzi}`,
        speak: word.hanzi,
        answers: [word.pinyin],
        hint: word.pinyin.charAt(0),
      },
    });
  }

  for (const word of pick.slice(0, Math.min(2, pick.length))) {
    const wrong = distractors(word, usable, 3, rand).map((w) => w.english);
    while (wrong.length < 3) wrong.push("tomorrow");
    items.push({
      kind: "quiz",
      quiz: mc("Listen, then choose the meaning.", word.english, wrong, { speak: word.hanzi }, rand),
    });
  }

  for (const word of pick.slice(0, Math.min(2, pick.length))) {
    const t = toneOf(word.pinyin.split(/\s+/)[0] ?? word.pinyin);
    const labels = ["1st · high level", "2nd · rising", "3rd · dipping", "4th · falling", "neutral"];
    items.push({
      kind: "quiz",
      quiz: {
        type: "tone-pick",
        speak: word.hanzi,
        hanzi: word.hanzi,
        options: labels.slice(0, 4),
        answer: Math.min(t, 4) - 1,
      },
    });
  }

  const matchWords = pick.slice(0, Math.min(4, pick.length));
  if (matchWords.length >= 3) {
    items.push({
      kind: "quiz",
      quiz: {
        type: "match",
        pairs: matchWords.map((w) => ({ left: w.hanzi, right: w.english, speak: w.hanzi })),
      },
    });
  }

  return items;
}

export function expandLesson(def: LessonDef): LessonItem[] {
  if (def.items && def.items.length > 0 && !def.vocabIds?.length) return def.items;
  const items: LessonItem[] = [];
  items.push({ kind: "tip", title: def.title, body: def.intro });
  const vocab = (def.vocabIds ?? []).map((id) => getVocab(id)).filter((v): v is Vocab => Boolean(v));
  for (const v of vocab) {
    items.push({ kind: "teach-vocab", vocabId: v.id });
  }
  if (def.grammarId) items.push({ kind: "grammar", grammarId: def.grammarId });
  if (def.dialogue?.length) items.push({ kind: "dialogue", lines: def.dialogue });
  if (def.items) items.push(...def.items);
  items.push(...quizzesForVocab(vocab, def.id));
  return items;
}
