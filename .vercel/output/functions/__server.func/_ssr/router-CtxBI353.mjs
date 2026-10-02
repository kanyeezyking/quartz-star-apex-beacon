import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Repeat, f as House, g as BookOpen, i as Route, l as MessageCircle, n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CtxBI353.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function loadVoices() {
	if (typeof window === "undefined" || !window.speechSynthesis) return [];
	return window.speechSynthesis.getVoices();
}
function initSpeech() {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	const mark = () => {};
	window.speechSynthesis.addEventListener("voiceschanged", mark);
	if (loadVoices().length);
}
function pickVoice() {
	const voices = loadVoices();
	return voices.find((v) => v.lang.toLowerCase() === "zh-cn") ?? voices.find((v) => v.lang.toLowerCase().startsWith("zh")) ?? voices.find((v) => /chinese|mandarin|putonghua/i.test(v.name)) ?? null;
}
function speakZh(text, rate = .88) {
	if (typeof window === "undefined" || !window.speechSynthesis || !text.trim()) return;
	window.speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text);
	u.lang = "zh-CN";
	u.rate = rate;
	u.pitch = 1;
	const voice = pickVoice();
	if (voice) u.voice = voice;
	window.speechSynthesis.speak(u);
}
function getRecognitionCtor() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function canListen() {
	return getRecognitionCtor() !== null;
}
function listenZhOnce() {
	const Ctor = getRecognitionCtor();
	if (!Ctor) return Promise.reject(/* @__PURE__ */ new Error("Speech recognition is not available in this browser."));
	return new Promise((resolve, reject) => {
		const rec = new Ctor();
		rec.lang = "zh-CN";
		rec.continuous = false;
		rec.interimResults = false;
		rec.maxAlternatives = 3;
		rec.onresult = (ev) => {
			resolve(ev.results[0]?.[0]?.transcript ?? "");
		};
		rec.onerror = (ev) => {
			reject(new Error(ev.error || "Could not hear you."));
		};
		rec.onend = () => {};
		rec.start();
	});
}
function newCard() {
	return {
		ease: 2.5,
		interval: 0,
		reps: 0,
		nextReview: Date.now(),
		lapses: 0
	};
}
/** SM-2. quality is 0–5. */
function review(card, quality) {
	const q = Math.max(0, Math.min(5, quality));
	let { ease, interval, reps, lapses } = card;
	if (q < 3) {
		reps = 0;
		interval = 1;
		lapses += 1;
	} else {
		if (reps === 0) interval = 1;
		else if (reps === 1) interval = 6;
		else interval = Math.max(1, Math.round(interval * ease));
		reps += 1;
		ease = Math.max(1.3, ease + (.1 - (5 - q) * (.08 + (5 - q) * .02)));
	}
	return {
		ease,
		interval,
		reps,
		lapses,
		nextReview: Date.now() + interval * 24 * 60 * 60 * 1e3
	};
}
function isDue(card, now = Date.now()) {
	return card.nextReview <= now;
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function yesterdayKey() {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - 1);
	return todayKey(d);
}
var emptyStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useAppStore = create()(persist((set, get) => ({
	hydrated: false,
	xp: 0,
	dailyXp: 0,
	dailyGoal: 50,
	streak: 0,
	lastStudyDate: null,
	completedLessons: [],
	currentLessonId: "sounds-tones",
	placementBand: null,
	srs: {},
	knownVocab: [],
	toneCorrect: 0,
	toneTotal: 0,
	writeCorrect: 0,
	writeTotal: 0,
	listenCorrect: 0,
	listenTotal: 0,
	tutorHistory: [],
	rate: .88,
	showPinyin: true,
	markHydrated: () => set({ hydrated: true }),
	addXp: (amount) => {
		const today = todayKey();
		const { lastStudyDate, streak, dailyXp, xp } = get();
		let nextStreak = streak;
		let nextDaily = dailyXp;
		if (lastStudyDate === today) nextDaily += amount;
		else if (lastStudyDate === yesterdayKey()) {
			nextStreak = streak + 1;
			nextDaily = amount;
		} else {
			nextStreak = 1;
			nextDaily = amount;
		}
		set({
			xp: xp + amount,
			dailyXp: nextDaily,
			streak: nextStreak,
			lastStudyDate: today
		});
	},
	completeLesson: (id, nextId) => {
		const { completedLessons, addXp } = get();
		if (!completedLessons.includes(id)) {
			set({
				completedLessons: [...completedLessons, id],
				currentLessonId: nextId ?? id
			});
			addXp(40);
		} else if (nextId) set({ currentLessonId: nextId });
	},
	setCurrentLesson: (id) => set({ currentLessonId: id }),
	setPlacement: (band) => set({ placementBand: band }),
	reviewVocab: (id, quality) => {
		const srs = { ...get().srs };
		srs[id] = review(srs[id] ?? newCard(), quality);
		set({ srs });
		if (quality >= 4 && !get().knownVocab.includes(id)) set({ knownVocab: [...get().knownVocab, id] });
	},
	markKnown: (id) => {
		const srs = { ...get().srs };
		srs[id] = review(srs[id] ?? newCard(), 5);
		set({
			srs,
			knownVocab: get().knownVocab.includes(id) ? get().knownVocab : [...get().knownVocab, id]
		});
	},
	recordTone: (ok) => set({
		toneTotal: get().toneTotal + 1,
		toneCorrect: get().toneCorrect + (ok ? 1 : 0)
	}),
	recordWrite: (ok) => set({
		writeTotal: get().writeTotal + 1,
		writeCorrect: get().writeCorrect + (ok ? 1 : 0)
	}),
	recordListen: (ok) => set({
		listenTotal: get().listenTotal + 1,
		listenCorrect: get().listenCorrect + (ok ? 1 : 0)
	}),
	setDailyGoal: (n) => set({ dailyGoal: n }),
	setRate: (n) => set({ rate: n }),
	togglePinyin: () => set({ showPinyin: !get().showPinyin }),
	pushTutor: (turn) => set({ tutorHistory: [...get().tutorHistory, turn].slice(-40) }),
	clearTutor: () => set({ tutorHistory: [] }),
	unlockUpTo: (ids, current) => {
		set({
			completedLessons: [.../* @__PURE__ */ new Set([...get().completedLessons, ...ids])],
			currentLessonId: current
		});
	},
	dueIds: () => {
		const { srs } = get();
		return Object.entries(srs).filter(([, card]) => isDue(card)).map(([id]) => id);
	}
}), {
	name: "cinnabar-progress",
	storage: createJSONStorage(() => typeof window === "undefined" ? emptyStorage : localStorage),
	skipHydration: true,
	partialize: (s) => ({
		xp: s.xp,
		dailyXp: s.dailyXp,
		dailyGoal: s.dailyGoal,
		streak: s.streak,
		lastStudyDate: s.lastStudyDate,
		completedLessons: s.completedLessons,
		currentLessonId: s.currentLessonId,
		placementBand: s.placementBand,
		srs: s.srs,
		knownVocab: s.knownVocab,
		toneCorrect: s.toneCorrect,
		toneTotal: s.toneTotal,
		writeCorrect: s.writeCorrect,
		writeTotal: s.writeTotal,
		listenCorrect: s.listenCorrect,
		listenTotal: s.listenTotal,
		tutorHistory: s.tutorHistory,
		rate: s.rate,
		showPinyin: s.showPinyin
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/path",
		label: "Path",
		icon: Route
	},
	{
		to: "/practice",
		label: "Practice",
		icon: Repeat
	},
	{
		to: "/tutor",
		label: "Tutor",
		icon: MessageCircle
	},
	{
		to: "/progress",
		label: "Progress",
		icon: BookOpen
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const due = useAppStore((s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length);
	const hydrated = useAppStore((s) => s.hydrated);
	(0, import_react.useEffect)(() => {
		useAppStore.persist.rehydrate().then(() => {
			useAppStore.getState().markHydrated();
		});
		initSpeech();
	}, []);
	const hideNav = pathname.startsWith("/lesson/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain pointer-events-none absolute inset-0 opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-border bg-bg-elevated px-4 py-6 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-3 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-fg",
							children: "朱"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-lg leading-none",
							children: "Cinnabar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "朱砂"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4",
										strokeWidth: 1.75
									}),
									item.label,
									item.to === "/practice" && due > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto tabular-nums text-xs text-primary",
										children: due
									}) : null
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 text-xs text-subtle",
						children: "Mandarin to fluency"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("relative md:pl-56", !hideNav && "pb-20 md:pb-0"),
				children: !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-dvh items-center justify-center text-muted",
					children: "Loading"
				}) : children
			}),
			!hideNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg-elevated/95 backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-fg" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: 1.75
								}), item.to === "/practice" && due > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-2 -top-1 size-1.5 rounded-full bg-primary" }) : null]
							}), item.label]
						}) }, item.to);
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center"
			})
		]
	});
}
var styles_default = "/assets/styles-Bt4CnwQf.css";
var APP_NAME = "Cinnabar";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Cinnabar — Mandarin to fluency. Tones, characters, HSK, and conversation."
			},
			{
				name: "theme-color",
				content: "#12100e"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-BjoBiy7k.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./path-CFRqpYQC.mjs");
var Route$7 = createFileRoute("/path")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./place-v0_lqQyI.mjs");
var Route$6 = createFileRoute("/place")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./progress-CDyg1vA7.mjs");
var Route$5 = createFileRoute("/progress")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tutor-CyCS4uPn.mjs");
var Route$4 = createFileRoute("/tutor")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./lesson._id-DE4lgPWS.mjs");
var Route$3 = createFileRoute("/lesson/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./practice-BeMF4kFT.mjs");
var Route$2 = createFileRoute("/practice/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_mode-CcDMJzXp.mjs");
var Route$1 = createFileRoute("/practice/$mode")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var PathRoute = Route$7.update({
	id: "/path",
	path: "/path",
	getParentRoute: () => Route$9
});
var PlaceRoute = Route$6.update({
	id: "/place",
	path: "/place",
	getParentRoute: () => Route$9
});
var ProgressRoute = Route$5.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$9
});
var TutorRoute = Route$4.update({
	id: "/tutor",
	path: "/tutor",
	getParentRoute: () => Route$9
});
var LessonIdRoute = Route$3.update({
	id: "/lesson/$id",
	path: "/lesson/$id",
	getParentRoute: () => Route$9
});
var PracticeIndexRoute = Route$2.update({
	id: "/practice/",
	path: "/practice/",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	IndexRoute,
	PathRoute,
	PlaceRoute,
	ProgressRoute,
	TutorRoute,
	LessonIdRoute,
	PracticeModeRoute: Route$1.update({
		id: "/practice/$mode",
		path: "/practice/$mode",
		getParentRoute: () => Route$9
	}),
	PracticeIndexRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useAppStore as a, speakZh as c, cn as i, Route$1 as n, canListen as o, Route$3 as r, listenZhOnce as s, router_exports as t };
