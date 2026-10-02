//#region node_modules/.nitro/vite/services/ssr/assets/pinyin-CbC63jpJ.js
var TONE_MARKS = {
	a: [
		"a",
		"ā",
		"á",
		"ǎ",
		"à"
	],
	e: [
		"e",
		"ē",
		"é",
		"ě",
		"è"
	],
	i: [
		"i",
		"ī",
		"í",
		"ǐ",
		"ì"
	],
	o: [
		"o",
		"ō",
		"ó",
		"ǒ",
		"ò"
	],
	u: [
		"u",
		"ū",
		"ú",
		"ǔ",
		"ù"
	],
	ü: [
		"ü",
		"ǖ",
		"ǘ",
		"ǚ",
		"ǜ"
	],
	v: [
		"ü",
		"ǖ",
		"ǘ",
		"ǚ",
		"ǜ"
	]
};
var TONE1 = /[āēīōūǖĀĒĪŌŪǕ]/;
var TONE2 = /[áéíóúǘÁÉÍÓÚǗ]/;
var TONE3 = /[ǎěǐǒǔǚǍĚǏǑǓǙ]/;
var TONE4 = /[àèìòùǜÀÈÌÒÙǛ]/;
function toneOf(pinyin) {
	if (TONE1.test(pinyin)) return 1;
	if (TONE2.test(pinyin)) return 2;
	if (TONE3.test(pinyin)) return 3;
	if (TONE4.test(pinyin)) return 4;
	const numbered = pinyin.match(/[1-5]/);
	if (numbered) return Number(numbered[0]);
	return 5;
}
function stripTones(pinyin) {
	return pinyin.normalize("NFD").replace(/\p{M}/gu, "").replace(/ü/gi, "v").replace(/Ü/g, "v").replace(/[1-5]/g, "").toLowerCase();
}
function normalizePinyin(input) {
	return stripTones(input).replace(/[^a-z]/g, "").replace(/uu/g, "v");
}
function pinyinMatches(input, expected) {
	if (normalizePinyin(input) === normalizePinyin(expected)) return true;
	const numbered = input.toLowerCase().replace(/\s+/g, "");
	return numbered === toNumbered(expected).replace(/\s+/g, "") || numbered === expected.replace(/\s+/g, "").toLowerCase();
}
function toNumbered(pinyin) {
	return pinyin.split(/\s+/).map((syllable) => {
		const tone = toneOf(syllable);
		return `${stripTones(syllable).replace(/v/g, "ü")}${tone}`;
	}).join(" ");
}
function applyTone(syllable, tone) {
	const s = syllable.toLowerCase().replace(/[1-5]/g, "").replace(/v/g, "ü");
	if (tone === 5) return s;
	const vowels = [...s].map((ch, i) => ({
		ch,
		i
	})).filter((x) => "aeiouü".includes(x.ch));
	if (vowels.length === 0) return s;
	let target = vowels[vowels.length - 1];
	const a = vowels.find((v) => v.ch === "a");
	const e = vowels.find((v) => v.ch === "e");
	if (a) target = a;
	else if (e) target = e;
	else if (s.includes("ou")) target = vowels.find((v) => v.ch === "o") ?? target;
	const marks = TONE_MARKS[target.ch];
	if (!marks) return s;
	return s.slice(0, target.i) + marks[tone] + s.slice(target.i + 1);
}
//#endregion
export { pinyinMatches as n, toneOf as r, applyTone as t };
