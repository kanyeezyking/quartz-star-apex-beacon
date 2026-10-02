export type PlaceQ = {
  prompt: string;
  speak?: string;
  options: string[];
  answer: number;
  band: number;
};

export const PLACEMENT: PlaceQ[] = [
  {
    prompt: "Which is the first tone?",
    options: ["Rising", "High level", "Sharp fall", "Low dip"],
    answer: 1,
    band: 0,
  },
  {
    prompt: "你好 is pronounced…",
    speak: "你好",
    options: ["nǐ hǎo", "ní hǎo (sandhi)", "nì hào", "nī hāo"],
    answer: 1,
    band: 0,
  },
  {
    prompt: "What does 谢谢 mean?",
    speak: "谢谢",
    options: ["Hello", "Sorry", "Thank you", "Please"],
    answer: 2,
    band: 1,
  },
  {
    prompt: "Choose the correct sentence.",
    options: ["她是高兴。", "她很高兴。", "她高兴是。", "是她高兴很。"],
    answer: 1,
    band: 1,
  },
  {
    prompt: "两 is used…",
    options: ["In phone numbers", "Before a measure word for 'two'", "For the date only", "Instead of 十"],
    answer: 1,
    band: 1,
  },
  {
    prompt: "我去过北京 means…",
    speak: "我去过北京",
    options: ["I am going to Beijing", "I went to Beijing yesterday", "I have been to Beijing", "I will go to Beijing"],
    answer: 2,
    band: 2,
  },
  {
    prompt: "A 比 B 大 — what must you not add?",
    options: ["A time word", "很", "A noun", "比"],
    answer: 1,
    band: 2,
  },
  {
    prompt: "虽然… must be paired with…",
    options: ["所以", "因为", "但是 / 可是", "还是"],
    answer: 2,
    band: 2,
  },
  {
    prompt: "请把书给我 is an example of…",
    speak: "请把书给我",
    options: ["被 passive", "把 disposal", "比 comparison", "过 experience"],
    answer: 1,
    band: 3,
  },
  {
    prompt: "听不懂 means…",
    speak: "听不懂",
    options: ["I don't want to listen", "I can't understand by listening", "Please speak", "I heard it"],
    answer: 1,
    band: 3,
  },
  {
    prompt: "他现在才来 suggests the speaker feels he is…",
    speak: "他现在才来",
    options: ["Early", "On time", "Later than expected", "Not coming"],
    answer: 2,
    band: 3,
  },
  {
    prompt: "我昨天买的书 — the clause 我昨天买的 is…",
    options: ["A result complement", "A relative clause before the noun", "A passive", "A comparison"],
    answer: 1,
    band: 4,
  },
  {
    prompt: "Mandarin marks past events primarily with…",
    options: ["Verb endings", "Time words + aspect (了/过)", "A future auxiliary only", "Gender agreement"],
    answer: 1,
    band: 4,
  },
  {
    prompt: "效率 here is closest to…",
    speak: "效率",
    options: ["Emotion", "Efficiency", "Excuse", "Exit"],
    answer: 1,
    band: 5,
  },
  {
    prompt: "既然来了，就好好学。 既然 means…",
    speak: "既然来了，就好好学。",
    options: ["If perhaps", "Since / now that", "Although", "In order to"],
    answer: 1,
    band: 5,
  },
  {
    prompt: "含蓄 as an aesthetic is closest to…",
    speak: "含蓄",
    options: ["Loud display", "Reserve; what is held back", "Anger", "Speed"],
    answer: 1,
    band: 6,
  },
];
