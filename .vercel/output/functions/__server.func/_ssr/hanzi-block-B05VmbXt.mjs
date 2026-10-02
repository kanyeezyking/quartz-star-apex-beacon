import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./router-CtxBI353.mjs";
import { t as SpeakButton } from "./speak-button-C1X1ILaT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hanzi-block-B05VmbXt.js
var import_jsx_runtime = require_jsx_runtime();
function HanziBlock({ hanzi, pinyin, english, showPinyin = true, size = "lg", speak = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative flex items-center justify-center rounded-lg bg-paper text-ink", size === "xl" && "min-h-40 w-full max-w-sm px-6 py-8", size === "lg" && "min-h-32 w-full max-w-sm px-5 py-6", size === "md" && "min-h-24 w-full max-w-xs px-4 py-4"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					lang: "zh-CN",
					className: cn("font-display leading-none tracking-tight", size === "xl" && "text-6xl", size === "lg" && "text-5xl", size === "md" && "text-3xl"),
					children: hanzi
				}), speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-2 top-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						text: hanzi,
						className: "text-ink hover:bg-ink/5"
					})
				}) : null]
			}),
			showPinyin && pinyin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-sans text-lg text-fg",
				children: pinyin
			}) : null,
			english ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: english
			}) : null
		]
	});
}
//#endregion
export { HanziBlock as t };
