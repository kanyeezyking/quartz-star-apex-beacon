import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Play, p as Flame } from "../_libs/lucide-react.mjs";
import { a as useAppStore } from "./router-CtxBI353.mjs";
import { t as Button } from "./button-BxGEjhHJ.mjs";
import { t as Card } from "./card-DAOMFNzQ.mjs";
import { i as bandLabel, n as LESSON_BY_ID, r as UNITS, t as LESSONS } from "./curriculum-B_f_rQ7V.mjs";
import { t as Progress } from "./progress-DzzOTu2A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjoBiy7k.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const xp = useAppStore((s) => s.xp);
	const dailyXp = useAppStore((s) => s.dailyXp);
	const dailyGoal = useAppStore((s) => s.dailyGoal);
	const streak = useAppStore((s) => s.streak);
	const currentLessonId = useAppStore((s) => s.currentLessonId);
	const completed = useAppStore((s) => s.completedLessons);
	const due = useAppStore((s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length);
	const current = LESSON_BY_ID[currentLessonId] ?? LESSONS[0];
	const unit = UNITS.find((u) => u.id === current?.unitId);
	if (completed.length === 0 && xp === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.2em] text-muted",
						children: "朱砂"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Cinnabar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Pick up where the ink dried."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Streak",
						value: `${streak}d`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "XP",
						value: String(xp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Due",
						value: String(due)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl tabular-nums",
							children: [dailyXp, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base text-muted",
								children: [
									" / ",
									dailyGoal,
									" XP"
								]
							})]
						}), streak > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-sm text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), streak]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: dailyXp / dailyGoal * 100,
						className: "mt-4"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						children: unit ? `${bandLabel(unit.band)} · ${unit.titleZh}` : "Continue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 font-display text-2xl",
						children: [
							current?.titleZh,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted",
								children: current?.title
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: current?.intro
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "mt-5 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lesson/$id",
							params: { id: current?.id ?? "sounds-tones" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Continue"]
						})
					})
				]
			}),
			due > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Reviews waiting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							due,
							" card",
							due === 1 ? "" : "s",
							" due. Memory lives in the return."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "paper",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice/$mode",
							params: { mode: "cards" },
							children: "Review now"
						})
					})
				]
			}) : null
		]
	});
}
function Welcome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-2xl flex-col justify-center px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-hidden": true,
				className: "pointer-events-none absolute right-4 top-8 select-none font-display text-[9rem] leading-none text-fg/5 md:text-[12rem]",
				children: "朱"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.25em] text-muted",
				children: "朱砂学堂"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl",
				children: "Cinnabar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-lg leading-relaxed text-muted",
				children: "Mandarin to fluency — tones first, then characters, grammar, reading, and speech. A serious path from the first 妈 to essays you can argue with."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lesson/$id",
						params: { id: "sounds-tones" },
						children: "Start from silence"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/place",
						children: "Place me"
					})
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-3 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { Home as component };
