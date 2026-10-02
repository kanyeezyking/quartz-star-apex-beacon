export type ToneItem = {
  hanzi: string;
  pinyin: string;
  english: string;
  tone: 1 | 2 | 3 | 4 | 5;
};

export const TONE_PAIRS: { prompt: string; a: ToneItem; b: ToneItem }[] = [
  {
    prompt: "mother vs horse",
    a: { hanzi: "妈", pinyin: "mā", english: "mother", tone: 1 },
    b: { hanzi: "马", pinyin: "mǎ", english: "horse", tone: 3 },
  },
  {
    prompt: "hemp vs to scold",
    a: { hanzi: "麻", pinyin: "má", english: "hemp", tone: 2 },
    b: { hanzi: "骂", pinyin: "mà", english: "to scold", tone: 4 },
  },
  {
    prompt: "soup vs to lie down",
    a: { hanzi: "汤", pinyin: "tāng", english: "soup", tone: 1 },
    b: { hanzi: "躺", pinyin: "tǎng", english: "to lie down", tone: 3 },
  },
  {
    prompt: "to buy vs to sell",
    a: { hanzi: "买", pinyin: "mǎi", english: "to buy", tone: 3 },
    b: { hanzi: "卖", pinyin: "mài", english: "to sell", tone: 4 },
  },
  {
    prompt: "ask vs kiss",
    a: { hanzi: "问", pinyin: "wèn", english: "to ask", tone: 4 },
    b: { hanzi: "吻", pinyin: "wěn", english: "to kiss", tone: 3 },
  },
  {
    prompt: "sleep vs feel",
    a: { hanzi: "睡", pinyin: "shuì", english: "to sleep", tone: 4 },
    b: { hanzi: "谁", pinyin: "shéi", english: "who", tone: 2 },
  },
  {
    prompt: "book vs ripe",
    a: { hanzi: "书", pinyin: "shū", english: "book", tone: 1 },
    b: { hanzi: "熟", pinyin: "shú", english: "ripe; familiar", tone: 2 },
  },
  {
    prompt: "ten vs to know",
    a: { hanzi: "十", pinyin: "shí", english: "ten", tone: 2 },
    b: { hanzi: "是", pinyin: "shì", english: "to be", tone: 4 },
  },
];

export const TONE_DRILL: ToneItem[] = [
  { hanzi: "妈", pinyin: "mā", english: "mother", tone: 1 },
  { hanzi: "麻", pinyin: "má", english: "hemp", tone: 2 },
  { hanzi: "马", pinyin: "mǎ", english: "horse", tone: 3 },
  { hanzi: "骂", pinyin: "mà", english: "scold", tone: 4 },
  { hanzi: "八", pinyin: "bā", english: "eight", tone: 1 },
  { hanzi: "拔", pinyin: "bá", english: "to pull", tone: 2 },
  { hanzi: "把", pinyin: "bǎ", english: "ba / grasp", tone: 3 },
  { hanzi: "爸", pinyin: "bà", english: "dad", tone: 4 },
  { hanzi: "喝", pinyin: "hē", english: "to drink", tone: 1 },
  { hanzi: "河", pinyin: "hé", english: "river", tone: 2 },
  { hanzi: "好", pinyin: "hǎo", english: "good", tone: 3 },
  { hanzi: "和", pinyin: "hè", english: "to join in (a song)", tone: 4 },
  { hanzi: "西", pinyin: "xī", english: "west", tone: 1 },
  { hanzi: "习", pinyin: "xí", english: "to practice", tone: 2 },
  { hanzi: "洗", pinyin: "xǐ", english: "to wash", tone: 3 },
  { hanzi: "细", pinyin: "xì", english: "thin; fine", tone: 4 },
  { hanzi: "一", pinyin: "yī", english: "one", tone: 1 },
  { hanzi: "移", pinyin: "yí", english: "to move", tone: 2 },
  { hanzi: "已", pinyin: "yǐ", english: "already", tone: 3 },
  { hanzi: "易", pinyin: "yì", english: "easy", tone: 4 },
];
