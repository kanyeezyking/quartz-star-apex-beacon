import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore, c as speakZh, i as cn } from "./router-CtxBI353.mjs";
import { t as Button } from "./button-BxGEjhHJ.mjs";
import { t as LESSONS } from "./curriculum-B_f_rQ7V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/place-v0_lqQyI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLACEMENT = [
	{
		prompt: "Which is the first tone?",
		options: [
			"Rising",
			"High level",
			"Sharp fall",
			"Low dip"
		],
		answer: 1,
		band: 0
	},
	{
		prompt: "你好 is pronounced…",
		speak: "你好",
		options: [
			"nǐ hǎo",
			"ní hǎo (sandhi)",
			"nì hào",
			"nī hāo"
		],
		answer: 1,
		band: 0
	},
	{
		prompt: "What does 谢谢 mean?",
		speak: "谢谢",
		options: [
			"Hello",
			"Sorry",
			"Thank you",
			"Please"
		],
		answer: 2,
		band: 1
	},
	{
		prompt: "Choose the correct sentence.",
		options: [
			"她是高兴。",
			"她很高兴。",
			"她高兴是。",
			"是她高兴很。"
		],
		answer: 1,
		band: 1
	},
	{
		prompt: "两 is used…",
		options: [
			"In phone numbers",
			"Before a measure word for 'two'",
			"For the date only",
			"Instead of 十"
		],
		answer: 1,
		band: 1
	},
	{
		prompt: "我去过北京 means…",
		speak: "我去过北京",
		options: [
			"I am going to Beijing",
			"I went to Beijing yesterday",
			"I have been to Beijing",
			"I will go to Beijing"
		],
		answer: 2,
		band: 2
	},
	{
		prompt: "A 比 B 大 — what must you not add?",
		options: [
			"A time word",
			"很",
			"A noun",
			"比"
		],
		answer: 1,
		band: 2
	},
	{
		prompt: "虽然… must be paired with…",
		options: [
			"所以",
			"因为",
			"但是 / 可是",
			"还是"
		],
		answer: 2,
		band: 2
	},
	{
		prompt: "请把书给我 is an example of…",
		speak: "请把书给我",
		options: [
			"被 passive",
			"把 disposal",
			"比 comparison",
			"过 experience"
		],
		answer: 1,
		band: 3
	},
	{
		prompt: "听不懂 means…",
		speak: "听不懂",
		options: [
			"I don't want to listen",
			"I can't understand by listening",
			"Please speak",
			"I heard it"
		],
		answer: 1,
		band: 3
	},
	{
		prompt: "他现在才来 suggests the speaker feels he is…",
		speak: "他现在才来",
		options: [
			"Early",
			"On time",
			"Later than expected",
			"Not coming"
		],
		answer: 2,
		band: 3
	},
	{
		prompt: "我昨天买的书 — the clause 我昨天买的 is…",
		options: [
			"A result complement",
			"A relative clause before the noun",
			"A passive",
			"A comparison"
		],
		answer: 1,
		band: 4
	},
	{
		prompt: "Mandarin marks past events primarily with…",
		options: [
			"Verb endings",
			"Time words + aspect (了/过)",
			"A future auxiliary only",
			"Gender agreement"
		],
		answer: 1,
		band: 4
	},
	{
		prompt: "效率 here is closest to…",
		speak: "效率",
		options: [
			"Emotion",
			"Efficiency",
			"Excuse",
			"Exit"
		],
		answer: 1,
		band: 5
	},
	{
		prompt: "既然来了，就好好学。 既然 means…",
		speak: "既然来了，就好好学。",
		options: [
			"If perhaps",
			"Since / now that",
			"Although",
			"In order to"
		],
		answer: 1,
		band: 5
	},
	{
		prompt: "含蓄 as an aesthetic is closest to…",
		speak: "含蓄",
		options: [
			"Loud display",
			"Reserve; what is held back",
			"Anger",
			"Speed"
		],
		answer: 1,
		band: 6
	}
];
function PlacePage() {
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const setPlacement = useAppStore((s) => s.setPlacement);
	const unlockUpTo = useAppStore((s) => s.unlockUpTo);
	const navigate = useNavigate();
	const q = PLACEMENT[i];
	function lock() {
		if (picked === null) return;
		const ok = picked === q.answer;
		setChecked(true);
		if (ok) setScore((s) => s + 1);
	}
	function next() {
		if (i + 1 >= PLACEMENT.length) {
			setFinished(true);
			return;
		}
		setI((n) => n + 1);
		setPicked(null);
		setChecked(false);
	}
	function place() {
		const ratio = score / PLACEMENT.length;
		let band = 0;
		if (ratio >= .9) band = 5;
		else if (ratio >= .75) band = 4;
		else if (ratio >= .6) band = 3;
		else if (ratio >= .45) band = 2;
		else if (ratio >= .3) band = 1;
		setPlacement(band);
		const start = LESSONS.find((l) => {
			if (band === 0) return l.unitId === "sounds";
			if (band === 7) return l.unitId === "fluency";
			return l.unitId === `hsk${band}`;
		}) ?? LESSONS[0];
		const before = LESSONS.slice(0, LESSONS.findIndex((l) => l.id === start.id));
		unlockUpTo(before.map((l) => l.id), start.id);
		navigate({
			to: "/lesson/$id",
			params: { id: start.id }
		});
	}
	if (finished) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[70dvh] max-w-lg flex-col justify-center px-4 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Placement"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-4xl",
				children: [
					score,
					" / ",
					PLACEMENT.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "We'll open the path at a band that still has friction — fluency is not a skip."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "mt-8",
				onClick: place,
				children: "Start there"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Not now"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: [
					"Placement · ",
					i + 1,
					"/",
					PLACEMENT.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-2xl",
				children: q.prompt
			}),
			q.speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "paper",
				className: "mt-4",
				onClick: () => speakZh(q.speak),
				children: "Play"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-2",
				children: q.options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: checked,
					onClick: () => setPicked(idx),
					className: cn("min-h-12 rounded-md px-4 py-3 text-left text-sm shadow-[var(--shadow-border)]", picked === idx && !checked && "bg-surface", picked !== idx && !checked && "bg-bg-elevated", checked && idx === q.answer && "bg-success/20", checked && picked === idx && idx !== q.answer && "bg-primary/20"),
					children: opt
				}, opt))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: !checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "w-full",
					disabled: picked === null,
					onClick: lock,
					children: "Check"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "w-full",
					onClick: next,
					children: "Continue"
				})
			})
		]
	});
}
//#endregion
export { PlacePage as component };
