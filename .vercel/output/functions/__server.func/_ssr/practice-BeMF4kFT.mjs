import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Mic, d as Keyboard, m as Ear, r as Search, s as PenTool, t as Volume2 } from "../_libs/lucide-react.mjs";
import { a as useAppStore } from "./router-CtxBI353.mjs";
import { r as searchVocab } from "./vocab-Ccq9F0k5.mjs";
import { t as Card } from "./card-DAOMFNzQ.mjs";
import { t as SpeakButton } from "./speak-button-C1X1ILaT.mjs";
import { t as Input } from "./input-eSS7T3S-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-BeMF4kFT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	{
		mode: "cards",
		title: "Flashcards",
		titleZh: "单词",
		blurb: "Spaced review of words you have met.",
		icon: Keyboard
	},
	{
		mode: "tones",
		title: "Tones",
		titleZh: "声调",
		blurb: "Minimal pairs and contour identification.",
		icon: Volume2
	},
	{
		mode: "listen",
		title: "Listening",
		titleZh: "听力",
		blurb: "Hear a sentence, choose the meaning.",
		icon: Ear
	},
	{
		mode: "write",
		title: "Characters",
		titleZh: "汉字",
		blurb: "Stroke order, then write from memory.",
		icon: PenTool
	},
	{
		mode: "speak",
		title: "Speaking",
		titleZh: "口语",
		blurb: "Say the line. The browser listens.",
		icon: Mic
	},
	{
		mode: "read",
		title: "Reading",
		titleZh: "阅读",
		blurb: "Graded passages with tap-to-gloss.",
		icon: Search
	},
	{
		mode: "pinyin",
		title: "Pinyin chart",
		titleZh: "拼音表",
		blurb: "Every syllable, click to hear.",
		icon: Volume2
	}
];
function PracticeHub() {
	const [q, setQ] = (0, import_react.useState)("");
	const due = useAppStore((s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length);
	const hits = (0, import_react.useMemo)(() => searchVocab(q), [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Drill"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Practice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [due > 0 ? `${due} reviews due. ` : "Nothing is due. ", "Drill the skill that is slipping."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search hanzi, pinyin, English"
				}), hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-border rounded-lg bg-surface shadow-[var(--shadow-border)]",
					children: hits.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								lang: "zh-CN",
								className: "w-16 font-display text-xl",
								children: v.hanzi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: v.pinyin
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: v.english
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: v.hanzi })
						]
					}, v.id))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2",
				children: MODES.map((m) => {
					const Icon = m.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/practice/$mode",
						params: { mode: m.mode },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "h-full p-4 transition-colors duration-150 hover:bg-bg-elevated",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-3 font-display text-xl",
									children: [
										m.titleZh,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base text-muted",
											children: m.title
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: m.blurb
								})
							]
						})
					}, m.mode);
				})
			})
		]
	});
}
//#endregion
export { PracticeHub as component };
