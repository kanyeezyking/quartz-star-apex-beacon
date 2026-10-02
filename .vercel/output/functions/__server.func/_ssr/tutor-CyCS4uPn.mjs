import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore, c as speakZh, i as cn } from "./router-CtxBI353.mjs";
import { t as Button } from "./button-BxGEjhHJ.mjs";
import { t as Card } from "./card-DAOMFNzQ.mjs";
import { t as SpeakButton } from "./speak-button-C1X1ILaT.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as Input } from "./input-eSS7T3S-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-CyCS4uPn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCENARIOS = [
	{
		id: "cafe",
		title: "At the teahouse",
		titleZh: "茶馆",
		level: "HSK 1–2",
		setting: "A small teahouse in Beijing. You sit down. The waiter comes over.",
		lines: [
			{
				npc: {
					hanzi: "您好，请问喝点儿什么？",
					pinyin: "Nín hǎo, qǐngwèn hē diǎnr shénme?",
					english: "Hello, what would you like to drink?"
				},
				choices: [
					{
						hanzi: "我喝茶。",
						pinyin: "Wǒ hē chá.",
						english: "I'll have tea.",
						good: true
					},
					{
						hanzi: "我是学生。",
						pinyin: "Wǒ shì xuéshēng.",
						english: "I am a student.",
						good: false
					},
					{
						hanzi: "火车站在哪儿？",
						pinyin: "Huǒchēzhàn zài nǎr?",
						english: "Where is the train station?",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "红茶还是绿茶？",
					pinyin: "Hóngchá háishi lǜchá?",
					english: "Black tea or green tea?"
				},
				choices: [
					{
						hanzi: "绿茶吧，谢谢。",
						pinyin: "Lǜchá ba, xièxie.",
						english: "Green tea, thanks.",
						good: true
					},
					{
						hanzi: "我没有。",
						pinyin: "Wǒ méiyǒu.",
						english: "I don't have any.",
						good: false
					},
					{
						hanzi: "明天见。",
						pinyin: "Míngtiān jiàn.",
						english: "See you tomorrow.",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "好的。您还要别的吗？",
					pinyin: "Hǎo de. Nín hái yào biéde ma?",
					english: "Alright. Anything else?"
				},
				choices: [
					{
						hanzi: "不要了，谢谢。",
						pinyin: "Bú yào le, xièxie.",
						english: "Nothing else, thanks.",
						good: true
					},
					{
						hanzi: "我很冷。",
						pinyin: "Wǒ hěn lěng.",
						english: "I'm cold.",
						good: false
					},
					{
						hanzi: "他是谁？",
						pinyin: "Tā shì shéi?",
						english: "Who is he?",
						good: false
					}
				]
			}
		]
	},
	{
		id: "street",
		title: "Asking the way",
		titleZh: "问路",
		level: "HSK 2–3",
		setting: "You are near a subway entrance and need the bookstore.",
		lines: [
			{
				npc: {
					hanzi: "你好，你找什么？",
					pinyin: "Nǐ hǎo, nǐ zhǎo shénme?",
					english: "Hi, what are you looking for?"
				},
				choices: [
					{
						hanzi: "请问，书店怎么走？",
						pinyin: "Qǐngwèn, shūdiàn zěnme zǒu?",
						english: "Excuse me, how do I get to the bookstore?",
						good: true
					},
					{
						hanzi: "我要吃饭。",
						pinyin: "Wǒ yào chī fàn.",
						english: "I want to eat.",
						good: false
					},
					{
						hanzi: "今天星期二。",
						pinyin: "Jīntiān xīngqī èr.",
						english: "Today is Tuesday.",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "一直往前走，到红绿灯往右拐。",
					pinyin: "Yìzhí wǎng qián zǒu, dào hónglǜdēng wǎng yòu guǎi.",
					english: "Go straight, turn right at the lights."
				},
				choices: [
					{
						hanzi: "远不远？",
						pinyin: "Yuǎn bu yuǎn?",
						english: "Is it far?",
						good: true
					},
					{
						hanzi: "我叫小明。",
						pinyin: "Wǒ jiào Xiǎomíng.",
						english: "My name is Xiaoming.",
						good: false
					},
					{
						hanzi: "苹果多少钱？",
						pinyin: "Píngguǒ duōshao qián?",
						english: "How much are the apples?",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "不远，走五分钟就到。",
					pinyin: "Bù yuǎn, zǒu wǔ fēnzhōng jiù dào.",
					english: "Not far — five minutes' walk."
				},
				choices: [
					{
						hanzi: "太谢谢你了。",
						pinyin: "Tài xièxie nǐ le.",
						english: "Thank you so much.",
						good: true
					},
					{
						hanzi: "我不高兴。",
						pinyin: "Wǒ bù gāoxìng.",
						english: "I'm not happy.",
						good: false
					},
					{
						hanzi: "这是我的猫。",
						pinyin: "Zhè shì wǒ de māo.",
						english: "This is my cat.",
						good: false
					}
				]
			}
		]
	},
	{
		id: "plans",
		title: "Making plans",
		titleZh: "约时间",
		level: "HSK 3",
		setting: "A classmate wants to review together before the exam.",
		lines: [
			{
				npc: {
					hanzi: "你明天有空吗？我们一起复习吧。",
					pinyin: "Nǐ míngtiān yǒu kòng ma? Wǒmen yìqǐ fùxí ba.",
					english: "Are you free tomorrow? Let's review together."
				},
				choices: [
					{
						hanzi: "好啊。什么时候？",
						pinyin: "Hǎo a. Shénme shíhou?",
						english: "Sure. When?",
						good: true
					},
					{
						hanzi: "我不是学生。",
						pinyin: "Wǒ bú shì xuéshēng.",
						english: "I'm not a student.",
						good: false
					},
					{
						hanzi: "火车很贵。",
						pinyin: "Huǒchē hěn guì.",
						english: "Trains are expensive.",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "下午三点，在图书馆门口见。",
					pinyin: "Xiàwǔ sān diǎn, zài túshūguǎn ménkǒu jiàn.",
					english: "3 p.m., at the library entrance."
				},
				choices: [
					{
						hanzi: "如果下雨呢？",
						pinyin: "Rúguǒ xià yǔ ne?",
						english: "What if it rains?",
						good: true
					},
					{
						hanzi: "我吃米饭。",
						pinyin: "Wǒ chī mǐfàn.",
						english: "I eat rice.",
						good: false
					},
					{
						hanzi: "她很漂亮。",
						pinyin: "Tā hěn piàoliang.",
						english: "She is pretty.",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "那我们就在咖啡馆见。我把地址发给你。",
					pinyin: "Nà wǒmen jiù zài kāfēiguǎn jiàn. Wǒ bǎ dìzhǐ fā gěi nǐ.",
					english: "Then let's meet at the cafe. I'll send you the address."
				},
				choices: [
					{
						hanzi: "行，到时候见。",
						pinyin: "Xíng, dào shíhou jiàn.",
						english: "Deal, see you then.",
						good: true
					},
					{
						hanzi: "我不认识你。",
						pinyin: "Wǒ bú rènshi nǐ.",
						english: "I don't know you.",
						good: false
					},
					{
						hanzi: "这不是茶。",
						pinyin: "Zhè bú shì chá.",
						english: "This is not tea.",
						good: false
					}
				]
			}
		]
	},
	{
		id: "work",
		title: "A work conversation",
		titleZh: "工作",
		level: "HSK 4–5",
		setting: "Your manager asks about a delayed report.",
		lines: [
			{
				npc: {
					hanzi: "报告还没交。是不是遇到什么困难了？",
					pinyin: "Bàogào hái méi jiāo. Shì bu shì yùdào shénme kùnnan le?",
					english: "The report isn't in. Did you run into some difficulty?"
				},
				choices: [
					{
						hanzi: "数据还没齐，我正在处理。",
						pinyin: "Shùjù hái méi qí, wǒ zhèngzài chǔlǐ.",
						english: "The data isn't complete yet; I'm handling it.",
						good: true
					},
					{
						hanzi: "我喜欢喝茶。",
						pinyin: "Wǒ xǐhuan hē chá.",
						english: "I like drinking tea.",
						good: false
					},
					{
						hanzi: "今天星期几？",
						pinyin: "Jīntiān xīngqī jǐ?",
						english: "What day is it?",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "那你大概什么时候能完成？",
					pinyin: "Nà nǐ dàgài shénme shíhou néng wánchéng?",
					english: "When can you roughly finish?"
				},
				choices: [
					{
						hanzi: "明天下午之前一定交给你。",
						pinyin: "Míngtiān xiàwǔ zhīqián yídìng jiāo gěi nǐ.",
						english: "I'll definitely get it to you before tomorrow afternoon.",
						good: true
					},
					{
						hanzi: "火车站很远。",
						pinyin: "Huǒchēzhàn hěn yuǎn.",
						english: "The station is far.",
						good: false
					},
					{
						hanzi: "我有一只猫。",
						pinyin: "Wǒ yǒu yì zhī māo.",
						english: "I have a cat.",
						good: false
					}
				]
			},
			{
				npc: {
					hanzi: "好。有问题随时跟我联系。",
					pinyin: "Hǎo. Yǒu wèntí suíshí gēn wǒ liánxì.",
					english: "Alright. Contact me anytime if there's a problem."
				},
				choices: [
					{
						hanzi: "谢谢你的理解，我会尽快。",
						pinyin: "Xièxie nǐ de lǐjiě, wǒ huì jǐnkuài.",
						english: "Thanks for understanding — I'll be as quick as I can.",
						good: true
					},
					{
						hanzi: "不客气。",
						pinyin: "Bú kèqi.",
						english: "You're welcome.",
						good: false
					},
					{
						hanzi: "再见，老师。",
						pinyin: "Zàijiàn, lǎoshī.",
						english: "Goodbye, teacher.",
						good: false
					}
				]
			}
		]
	}
];
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var tutorReply = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7befa45338753a9ffb989d76356267cc82eaeefdddabfa6dd8b13361afd03514"));
function TutorPage() {
	const [tab, setTab] = (0, import_react.useState)("scene");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "对话"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Tutor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Scripted scenes always work. The live tutor uses a model when it is available."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: tab === "scene" ? "paper" : "secondary",
					onClick: () => setTab("scene"),
					children: "Scenes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: tab === "live" ? "paper" : "secondary",
					onClick: () => setTab("live"),
					children: "Live"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: tab === "scene" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scenes, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {})
			})
		]
	});
}
function Scenes() {
	const [id, setId] = (0, import_react.useState)(SCENARIOS[0].id);
	const [step, setStep] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const scene = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
	const line = scene.lines[step];
	const finished = step >= scene.lines.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: SCENARIOS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setId(s.id);
					setStep(0);
					setPicked(null);
				},
				className: cn("rounded-full px-3 py-1 text-xs", s.id === id ? "bg-paper text-ink" : "bg-surface text-muted"),
				children: s.titleZh
			}, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: scene.setting
		}),
		finished || !line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Scene complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Run it again, or open live conversation."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => {
						setStep(0);
						setPicked(null);
					},
					children: "Again"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["Partner · ", scene.level]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							lang: "zh-CN",
							className: "mt-2 font-display text-2xl",
							children: line.npc.hanzi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: line.npc.pinyin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: line.npc.english
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: line.npc.hanzi })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: line.choices.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setPicked(idx);
							speakZh(c.hanzi);
						},
						className: cn("rounded-md px-3 py-3 text-left text-sm shadow-[var(--shadow-border)]", picked === idx ? c.good ? "bg-success/20" : "bg-primary/20" : "bg-bg-elevated hover:bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-lg",
							children: c.hanzi
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: c.english
						})]
					}, c.hanzi))
				}),
				picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => {
						setPicked(null);
						setStep((n) => n + 1);
					},
					children: "Continue"
				}) : null
			]
		})
	] });
}
function Live() {
	const history = useAppStore((s) => s.tutorHistory);
	const pushTutor = useAppStore((s) => s.pushTutor);
	const clearTutor = useAppStore((s) => s.clearTutor);
	const completed = useAppStore((s) => s.completedLessons);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const level = Math.min(6, Math.floor(completed.length / 6));
	async function send() {
		const message = text.trim();
		if (!message || busy) return;
		setText("");
		setError(null);
		pushTutor({
			role: "user",
			text: message
		});
		setBusy(true);
		try {
			const res = await tutorReply({ data: {
				level,
				message,
				history: [...history, {
					role: "user",
					text: message
				}].map((t) => ({
					role: t.role,
					content: t.hanzi ?? t.text
				}))
			} });
			if (!res.ok) setError(res.error === "unavailable" ? "Live tutor is not available here. Use the scenes — they teach the same moves." : "The tutor could not reply. Try again, or switch to a scene.");
			else {
				pushTutor({
					role: "assistant",
					text: res.reply.hanzi,
					hanzi: res.reply.hanzi,
					pinyin: res.reply.pinyin,
					english: res.reply.english,
					correction: res.reply.correction,
					hint: res.reply.hint
				});
				if (res.reply.hanzi) speakZh(res.reply.hanzi);
			}
		} catch {
			setError("The tutor could not reply.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: clearTutor,
				children: "Clear"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 min-h-64 space-y-3",
			children: [
				history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Write in English or Chinese. The tutor answers in Mandarin at your level, with pinyin."
				}) : null,
				history.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("rounded-lg px-4 py-3", t.role === "user" ? "bg-bg-elevated" : "bg-paper text-ink"),
					children: t.hanzi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg",
							children: t.hanzi
						}),
						t.pinyin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70",
							children: t.pinyin
						}) : null,
						t.english ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70",
							children: t.english
						}) : null,
						t.correction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: ["Correction: ", t.correction]
						}) : null,
						t.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70",
							children: t.hint
						}) : null
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.text })
				}, `${t.role}-${idx}`)),
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Thinking…"
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary",
					children: error
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 flex gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				send();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Say something"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy || !text.trim(),
				children: "Send"
			})]
		})
	] });
}
//#endregion
export { TutorPage as component };
