import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Volume2 } from "../_libs/lucide-react.mjs";
import { a as useAppStore, c as speakZh, i as cn } from "./router-CtxBI353.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-button-C1X1ILaT.js
var import_jsx_runtime = require_jsx_runtime();
function SpeakButton({ text, className, label = "Play audio" }) {
	const rate = useAppStore((s) => s.rate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick: () => speakZh(text, rate),
		className: cn("inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-surface", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
			className: "size-5",
			strokeWidth: 1.75
		})
	});
}
//#endregion
export { SpeakButton as t };
