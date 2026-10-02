import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./router-CtxBI353.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-ExTn2VfB.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "muted" && "bg-surface text-muted shadow-[var(--shadow-border)]", tone === "primary" && "bg-primary/15 text-primary", tone === "success" && "bg-success/15 text-success", tone === "paper" && "bg-paper text-ink", className),
		children
	});
}
//#endregion
export { Badge as t };
