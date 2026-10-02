import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Check, u as Lock } from "../_libs/lucide-react.mjs";
import { a as useAppStore, i as cn } from "./router-CtxBI353.mjs";
import { t as Badge } from "./badge-ExTn2VfB.mjs";
import { i as bandLabel, o as lessonsInUnit, r as UNITS, t as LESSONS } from "./curriculum-B_f_rQ7V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-CFRqpYQC.js
var import_jsx_runtime = require_jsx_runtime();
function PathPage() {
	const completed = useAppStore((s) => s.completedLessons);
	const current = useAppStore((s) => s.currentLessonId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Curriculum"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "The path"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-muted",
				children: "Eight bands, from the four tones to chengyu. Finish a lesson to open the next."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-10",
				children: UNITS.map((unit) => {
					const lessons = lessonsInUnit(unit.id);
					const done = lessons.filter((l) => completed.includes(l.id)).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-4 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: bandLabel(unit.band) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-2 font-display text-2xl",
								children: [
									unit.titleZh,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg text-muted",
										children: unit.title
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: unit.blurb
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-subtle",
							children: [
								done,
								"/",
								lessons.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: lessons.map((lesson, idx) => {
							const i = LESSONS.findIndex((l) => l.id === lesson.id);
							const prevId = i > 0 ? LESSONS[i - 1]?.id : void 0;
							const unlocked = completed.includes(lesson.id) || lesson.id === current || lesson.id === "sounds-tones" || (prevId ? completed.includes(prevId) : true);
							const isDone = completed.includes(lesson.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lesson/$id",
								params: { id: lesson.id },
								className: cn("flex items-center gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", isDone ? "bg-bg-elevated" : "bg-surface hover:bg-bg-elevated"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-8 items-center justify-center rounded-sm text-xs tabular-nums", isDone ? "bg-success/20 text-success" : "bg-paper text-ink"),
									children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : idx + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate font-display",
										children: [
											lesson.titleZh,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-sans text-muted",
												children: lesson.title
											})
										]
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg px-4 py-3 text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 items-center justify-center rounded-sm bg-bg-elevated",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display",
									children: [
										lesson.titleZh,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-sans",
											children: lesson.title
										})
									]
								})]
							}) }, lesson.id);
						})
					})] }, unit.id);
				})
			})
		]
	});
}
//#endregion
export { PathPage as component };
