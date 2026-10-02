export type HskLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Vocab = {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  hsk: Exclude<HskLevel, 0>;
  pos: string;
  example?: {
    hanzi: string;
    pinyin: string;
    english: string;
  };
};

export type GrammarPoint = {
  id: string;
  title: string;
  titleZh: string;
  hsk: HskLevel;
  body: string;
  examples: {
    hanzi: string;
    pinyin: string;
    english: string;
    note?: string;
  }[];
};

export type DialogueLine = {
  speaker: string;
  hanzi: string;
  pinyin: string;
  english: string;
};

export type PassageToken = {
  hanzi: string;
  pinyin: string;
  english: string;
  vocabId?: string;
};

export type Passage = {
  id: string;
  title: string;
  titleZh: string;
  hsk: HskLevel;
  tokens: PassageToken[];
  english: string;
  questions: {
    prompt: string;
    options: string[];
    answer: number;
  }[];
};

export type Unit = {
  id: string;
  band: HskLevel;
  title: string;
  titleZh: string;
  blurb: string;
};

export type McQuiz = {
  type: "mc";
  prompt: string;
  promptHanzi?: string;
  speak?: string;
  options: string[];
  answer: number;
  explain?: string;
};

export type TypeQuiz = {
  type: "type";
  prompt: string;
  speak?: string;
  answers: string[];
  hint?: string;
};

export type MatchQuiz = {
  type: "match";
  pairs: { left: string; right: string; speak?: string }[];
};

export type ToneQuiz = {
  type: "tone-pick";
  speak: string;
  hanzi?: string;
  options: string[];
  answer: number;
};

export type QuizItem = McQuiz | TypeQuiz | MatchQuiz | ToneQuiz;

export type LessonItem =
  | { kind: "teach-sound"; pinyin: string; note: string; examples: string[] }
  | { kind: "teach-tone"; tone: number; name: string; contour: string; examples: Vocab[] }
  | { kind: "teach-vocab"; vocabId: string; note?: string }
  | { kind: "grammar"; grammarId: string }
  | { kind: "dialogue"; lines: DialogueLine[] }
  | { kind: "quiz"; quiz: QuizItem }
  | { kind: "tip"; title: string; body: string };

export type LessonDef = {
  id: string;
  unitId: string;
  title: string;
  titleZh: string;
  intro: string;
  vocabIds?: string[];
  grammarId?: string;
  dialogue?: DialogueLine[];
  items?: LessonItem[];
};

export type SrsCard = {
  ease: number;
  interval: number;
  reps: number;
  nextReview: number;
  lapses: number;
};

export type TutorTurn = {
  role: "user" | "assistant";
  text: string;
  hanzi?: string;
  pinyin?: string;
  english?: string;
  correction?: string | null;
  hint?: string;
};
