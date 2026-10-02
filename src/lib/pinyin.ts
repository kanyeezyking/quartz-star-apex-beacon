const TONE_MARKS: Record<string, string[]> = {
  a: ["a", "ā", "á", "ǎ", "à"],
  e: ["e", "ē", "é", "ě", "è"],
  i: ["i", "ī", "í", "ǐ", "ì"],
  o: ["o", "ō", "ó", "ǒ", "ò"],
  u: ["u", "ū", "ú", "ǔ", "ù"],
  ü: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
  v: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
};

const TONE1 = /[āēīōūǖĀĒĪŌŪǕ]/;
const TONE2 = /[áéíóúǘÁÉÍÓÚǗ]/;
const TONE3 = /[ǎěǐǒǔǚǍĚǏǑǓǙ]/;
const TONE4 = /[àèìòùǜÀÈÌÒÙǛ]/;

export function toneOf(pinyin: string): 1 | 2 | 3 | 4 | 5 {
  if (TONE1.test(pinyin)) return 1;
  if (TONE2.test(pinyin)) return 2;
  if (TONE3.test(pinyin)) return 3;
  if (TONE4.test(pinyin)) return 4;
  const numbered = pinyin.match(/[1-5]/);
  if (numbered) return Number(numbered[0]) as 1 | 2 | 3 | 4 | 5;
  return 5;
}

export function stripTones(pinyin: string): string {
  return pinyin
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ü/gi, "v")
    .replace(/Ü/g, "v")
    .replace(/[1-5]/g, "")
    .toLowerCase();
}

export function normalizePinyin(input: string): string {
  return stripTones(input)
    .replace(/[^a-z]/g, "")
    .replace(/uu/g, "v");
}

export function pinyinMatches(input: string, expected: string): boolean {
  const a = normalizePinyin(input);
  const b = normalizePinyin(expected);
  if (a === b) return true;
  const numbered = input.toLowerCase().replace(/\s+/g, "");
  const expectedNumbered = toNumbered(expected).replace(/\s+/g, "");
  return numbered === expectedNumbered || numbered === expected.replace(/\s+/g, "").toLowerCase();
}

export function toNumbered(pinyin: string): string {
  return pinyin
    .split(/\s+/)
    .map((syllable) => {
      const tone = toneOf(syllable);
      const base = stripTones(syllable).replace(/v/g, "ü");
      return `${base}${tone}`;
    })
    .join(" ");
}

export function applyTone(syllable: string, tone: 1 | 2 | 3 | 4 | 5): string {
  const s = syllable.toLowerCase().replace(/[1-5]/g, "").replace(/v/g, "ü");
  if (tone === 5) return s;
  const vowels = [...s].map((ch, i) => ({ ch, i })).filter((x) => "aeiouü".includes(x.ch));
  if (vowels.length === 0) return s;
  let target = vowels[vowels.length - 1]!;
  const a = vowels.find((v) => v.ch === "a");
  const e = vowels.find((v) => v.ch === "e");
  if (a) target = a;
  else if (e) target = e;
  else if (s.includes("ou")) target = vowels.find((v) => v.ch === "o") ?? target;
  const marks = TONE_MARKS[target.ch];
  if (!marks) return s;
  return s.slice(0, target.i) + marks[tone] + s.slice(target.i + 1);
}

export function splitPinyin(pinyin: string): string[] {
  return pinyin.trim().split(/\s+/).filter(Boolean);
}
