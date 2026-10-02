import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore } from "./router-CtxBI353.mjs";
import { t as VOCAB } from "./vocab-Ccq9F0k5.mjs";
import { t as Button } from "./button-BxGEjhHJ.mjs";
import { t as Card } from "./card-DAOMFNzQ.mjs";
import { i as bandLabel, r as UNITS, t as LESSONS } from "./curriculum-B_f_rQ7V.mjs";
import { t as Progress } from "./progress-DzzOTu2A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CDyg1vA7.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	const xp = useAppStore((s) => s.xp);
	const streak = useAppStore((s) => s.streak);
	const dailyGoal = useAppStore((s) => s.dailyGoal);
	const setDailyGoal = useAppStore((s) => s.setDailyGoal);
	const completed = useAppStore((s) => s.completedLessons);
	const known = useAppStore((s) => s.knownVocab);
	const toneCorrect = useAppStore((s) => s.toneCorrect);
	const toneTotal = useAppStore((s) => s.toneTotal);
	const writeCorrect = useAppStore((s) => s.writeCorrect);
	const writeTotal = useAppStore((s) => s.writeTotal);
	const listenCorrect = useAppStore((s) => s.listenCorrect);
	const listenTotal = useAppStore((s) => s.listenTotal);
	const showPinyin = useAppStore((s) => s.showPinyin);
	const togglePinyin = useAppStore((s) => s.togglePinyin);
	const rate = useAppStore((s) => s.rate);
	const setRate = useAppStore((s) => s.setRate);
	const pct = (n, d) => d ? Math.round(n / d * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "功课"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Progress"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Kept on this device. No account required."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "XP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: xp
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Streak"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: [streak, "d"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Lessons"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: [completed.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base text-muted",
								children: ["/", LESSONS.length]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Words known"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: [known.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base text-muted",
								children: ["/", VOCAB.length]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Bands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: UNITS.map((u) => {
						const ids = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);
						const done = ids.filter((id) => completed.includes(id)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								u.titleZh,
								" · ",
								bandLabel(u.band)
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [
									done,
									"/",
									ids.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: ids.length ? done / ids.length * 100 : 0 })] }, u.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skill, {
						label: "Tones",
						value: pct(toneCorrect, toneTotal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skill, {
						label: "Listening",
						value: pct(listenCorrect, listenTotal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skill, {
						label: "Writing",
						value: pct(writeCorrect, writeTotal)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Show pinyin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: showPinyin ? "paper" : "secondary",
								onClick: togglePinyin,
								children: showPinyin ? "On" : "Off"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Speech rate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: rate.toFixed(2)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .6,
							max: 1.1,
							step: .05,
							value: rate,
							onChange: (e) => setRate(Number(e.target.value)),
							className: "mt-2 w-full accent-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily XP goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: dailyGoal
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: [
								30,
								50,
								80,
								120
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: dailyGoal === n ? "default" : "secondary",
								onClick: () => setDailyGoal(n),
								children: n
							}, n))
						})] })
					]
				})]
			})
		]
	});
}
function Skill({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-display text-2xl tabular-nums",
				children: [value, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value,
				className: "mt-3"
			})
		]
	});
}
//#endregion
export { ProgressPage as component };
