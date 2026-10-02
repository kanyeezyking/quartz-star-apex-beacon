import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore, c as speakZh, i as cn, n as Route$1, o as canListen, s as listenZhOnce } from "./_ssr/router-CtxBI353.mjs";
import { n as getVocab, t as VOCAB } from "./_ssr/vocab-Ccq9F0k5.mjs";
import { t as applyTone } from "./_ssr/pinyin-CbC63jpJ.mjs";
import { t as Button } from "./_ssr/button-BxGEjhHJ.mjs";
import { t as Card } from "./_ssr/card-DAOMFNzQ.mjs";
import { t as SpeakButton } from "./_ssr/speak-button-C1X1ILaT.mjs";
import { t as HanziBlock } from "./_ssr/hanzi-block-B05VmbXt.mjs";
import { t as Badge } from "./_ssr/badge-ExTn2VfB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_mode-CcDMJzXp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CharacterWriter({ hanzi, onQuiz }) {
	const host = (0, import_react.useRef)(null);
	const writerRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("animate");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const el = host.current;
		if (!el) return;
		el.innerHTML = "";
		setReady(false);
		setError(null);
		import("./_libs/hanzi-writer.mjs").then((n) => n.t).then((mod) => {
			if (cancelled || !host.current) return;
			const writer = mod.default.create(host.current, hanzi, {
				width: 260,
				height: 260,
				padding: 16,
				strokeColor: "#1a1410",
				outlineColor: "#d4c8b8",
				radicalColor: "#c23a2b",
				showHintAfterMisses: 1,
				highlightOnComplete: true
			});
			writerRef.current = writer;
			setReady(true);
			writer.animateCharacter();
		}).catch(() => {
			if (!cancelled) setError("Could not load stroke data for this character.");
		});
		return () => {
			cancelled = true;
			writerRef.current?.cancelQuiz();
			writerRef.current = null;
		};
	}, [hanzi]);
	function animate() {
		setMode("animate");
		writerRef.current?.animateCharacter();
	}
	function quiz() {
		setMode("quiz");
		writerRef.current?.quiz({ onComplete: (summary) => {
			onQuiz?.((summary.totalMistakes ?? 0) <= 2);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex size-[280px] items-center justify-center rounded-lg bg-paper", !ready && "animate-pulse"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: host })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "animate" ? "paper" : "secondary",
					onClick: animate,
					disabled: !ready,
					children: "Animate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "quiz" ? "default" : "secondary",
					onClick: quiz,
					disabled: !ready,
					children: "Write it"
				})]
			})
		]
	});
}
var PINYIN_CHART = [
	{
		id: "open",
		title: "Open finals",
		finals: [
			"a",
			"o",
			"e",
			"ai",
			"ei",
			"ao",
			"ou",
			"an",
			"en",
			"ang",
			"eng",
			"ong"
		],
		rows: [
			{
				initial: "∅",
				cells: [
					"a",
					"o",
					"e",
					"ai",
					"ei",
					"ao",
					"ou",
					"an",
					"en",
					"ang",
					"eng",
					null
				]
			},
			{
				initial: "b",
				cells: [
					"ba",
					"bo",
					null,
					"bai",
					"bei",
					"bao",
					null,
					"ban",
					"ben",
					"bang",
					"beng",
					null
				]
			},
			{
				initial: "p",
				cells: [
					"pa",
					"po",
					null,
					"pai",
					"pei",
					"pao",
					"pou",
					"pan",
					"pen",
					"pang",
					"peng",
					null
				]
			},
			{
				initial: "m",
				cells: [
					"ma",
					"mo",
					"me",
					"mai",
					"mei",
					"mao",
					"mou",
					"man",
					"men",
					"mang",
					"meng",
					null
				]
			},
			{
				initial: "f",
				cells: [
					"fa",
					"fo",
					null,
					null,
					"fei",
					null,
					"fou",
					"fan",
					"fen",
					"fang",
					"feng",
					null
				]
			},
			{
				initial: "d",
				cells: [
					"da",
					null,
					"de",
					"dai",
					"dei",
					"dao",
					"dou",
					"dan",
					"den",
					"dang",
					"deng",
					"dong"
				]
			},
			{
				initial: "t",
				cells: [
					"ta",
					null,
					"te",
					"tai",
					null,
					"tao",
					"tou",
					"tan",
					null,
					"tang",
					"teng",
					"tong"
				]
			},
			{
				initial: "n",
				cells: [
					"na",
					null,
					"ne",
					"nai",
					"nei",
					"nao",
					"nou",
					"nan",
					"nen",
					"nang",
					"neng",
					"nong"
				]
			},
			{
				initial: "l",
				cells: [
					"la",
					"lo",
					"le",
					"lai",
					"lei",
					"lao",
					"lou",
					"lan",
					null,
					"lang",
					"leng",
					"long"
				]
			},
			{
				initial: "g",
				cells: [
					"ga",
					null,
					"ge",
					"gai",
					"gei",
					"gao",
					"gou",
					"gan",
					"gen",
					"gang",
					"geng",
					"gong"
				]
			},
			{
				initial: "k",
				cells: [
					"ka",
					null,
					"ke",
					"kai",
					null,
					"kao",
					"kou",
					"kan",
					"ken",
					"kang",
					"keng",
					"kong"
				]
			},
			{
				initial: "h",
				cells: [
					"ha",
					null,
					"he",
					"hai",
					"hei",
					"hao",
					"hou",
					"han",
					"hen",
					"hang",
					"heng",
					"hong"
				]
			},
			{
				initial: "zh",
				cells: [
					"zha",
					null,
					"zhe",
					"zhai",
					"zhei",
					"zhao",
					"zhou",
					"zhan",
					"zhen",
					"zhang",
					"zheng",
					"zhong"
				]
			},
			{
				initial: "ch",
				cells: [
					"cha",
					null,
					"che",
					"chai",
					null,
					"chao",
					"chou",
					"chan",
					"chen",
					"chang",
					"cheng",
					"chong"
				]
			},
			{
				initial: "sh",
				cells: [
					"sha",
					null,
					"she",
					"shai",
					"shei",
					"shao",
					"shou",
					"shan",
					"shen",
					"shang",
					"sheng",
					null
				]
			},
			{
				initial: "r",
				cells: [
					null,
					null,
					"re",
					null,
					null,
					"rao",
					"rou",
					"ran",
					"ren",
					"rang",
					"reng",
					"rong"
				]
			},
			{
				initial: "z",
				cells: [
					"za",
					null,
					"ze",
					"zai",
					"zei",
					"zao",
					"zou",
					"zan",
					"zen",
					"zang",
					"zeng",
					"zong"
				]
			},
			{
				initial: "c",
				cells: [
					"ca",
					null,
					"ce",
					"cai",
					null,
					"cao",
					"cou",
					"can",
					"cen",
					"cang",
					"ceng",
					"cong"
				]
			},
			{
				initial: "s",
				cells: [
					"sa",
					null,
					"se",
					"sai",
					null,
					"sao",
					"sou",
					"san",
					"sen",
					"sang",
					"seng",
					"song"
				]
			}
		]
	},
	{
		id: "i",
		title: "i finals",
		finals: [
			"i",
			"ia",
			"iao",
			"ie",
			"iu",
			"ian",
			"in",
			"iang",
			"ing",
			"iong"
		],
		rows: [
			{
				initial: "∅",
				cells: [
					"yi",
					"ya",
					"yao",
					"ye",
					"you",
					"yan",
					"yin",
					"yang",
					"ying",
					"yong"
				]
			},
			{
				initial: "b",
				cells: [
					"bi",
					null,
					"biao",
					"bie",
					null,
					"bian",
					"bin",
					null,
					"bing",
					null
				]
			},
			{
				initial: "p",
				cells: [
					"pi",
					null,
					"piao",
					"pie",
					null,
					"pian",
					"pin",
					null,
					"ping",
					null
				]
			},
			{
				initial: "m",
				cells: [
					"mi",
					null,
					"miao",
					"mie",
					"miu",
					"mian",
					"min",
					null,
					"ming",
					null
				]
			},
			{
				initial: "d",
				cells: [
					"di",
					"dia",
					"diao",
					"die",
					"diu",
					"dian",
					null,
					null,
					"ding",
					null
				]
			},
			{
				initial: "t",
				cells: [
					"ti",
					null,
					"tiao",
					"tie",
					null,
					"tian",
					null,
					null,
					"ting",
					null
				]
			},
			{
				initial: "n",
				cells: [
					"ni",
					null,
					"niao",
					"nie",
					"niu",
					"nian",
					"nin",
					"niang",
					"ning",
					null
				]
			},
			{
				initial: "l",
				cells: [
					"li",
					"lia",
					"liao",
					"lie",
					"liu",
					"lian",
					"lin",
					"liang",
					"ling",
					null
				]
			},
			{
				initial: "j",
				cells: [
					"ji",
					"jia",
					"jiao",
					"jie",
					"jiu",
					"jian",
					"jin",
					"jiang",
					"jing",
					"jiong"
				]
			},
			{
				initial: "q",
				cells: [
					"qi",
					"qia",
					"qiao",
					"qie",
					"qiu",
					"qian",
					"qin",
					"qiang",
					"qing",
					"qiong"
				]
			},
			{
				initial: "x",
				cells: [
					"xi",
					"xia",
					"xiao",
					"xie",
					"xiu",
					"xian",
					"xin",
					"xiang",
					"xing",
					"xiong"
				]
			}
		]
	},
	{
		id: "u",
		title: "u finals",
		finals: [
			"u",
			"ua",
			"uo",
			"uai",
			"ui",
			"uan",
			"un",
			"uang"
		],
		rows: [
			{
				initial: "∅",
				cells: [
					"wu",
					"wa",
					"wo",
					"wai",
					"wei",
					"wan",
					"wen",
					"wang"
				]
			},
			{
				initial: "b",
				cells: [
					"bu",
					null,
					null,
					null,
					null,
					null,
					null,
					null
				]
			},
			{
				initial: "p",
				cells: [
					"pu",
					null,
					null,
					null,
					null,
					null,
					null,
					null
				]
			},
			{
				initial: "m",
				cells: [
					"mu",
					null,
					null,
					null,
					null,
					null,
					null,
					null
				]
			},
			{
				initial: "f",
				cells: [
					"fu",
					null,
					null,
					null,
					null,
					null,
					null,
					null
				]
			},
			{
				initial: "d",
				cells: [
					"du",
					null,
					"duo",
					null,
					"dui",
					"duan",
					"dun",
					null
				]
			},
			{
				initial: "t",
				cells: [
					"tu",
					null,
					"tuo",
					null,
					"tui",
					"tuan",
					"tun",
					null
				]
			},
			{
				initial: "n",
				cells: [
					"nu",
					null,
					"nuo",
					null,
					null,
					"nuan",
					"nun",
					null
				]
			},
			{
				initial: "l",
				cells: [
					"lu",
					null,
					"luo",
					null,
					null,
					"luan",
					"lun",
					null
				]
			},
			{
				initial: "g",
				cells: [
					"gu",
					"gua",
					"guo",
					"guai",
					"gui",
					"guan",
					"gun",
					"guang"
				]
			},
			{
				initial: "k",
				cells: [
					"ku",
					"kua",
					"kuo",
					"kuai",
					"kui",
					"kuan",
					"kun",
					"kuang"
				]
			},
			{
				initial: "h",
				cells: [
					"hu",
					"hua",
					"huo",
					"huai",
					"hui",
					"huan",
					"hun",
					"huang"
				]
			},
			{
				initial: "zh",
				cells: [
					"zhu",
					"zhua",
					"zhuo",
					"zhuai",
					"zhui",
					"zhuan",
					"zhun",
					"zhuang"
				]
			},
			{
				initial: "ch",
				cells: [
					"chu",
					"chua",
					"chuo",
					"chuai",
					"chui",
					"chuan",
					"chun",
					"chuang"
				]
			},
			{
				initial: "sh",
				cells: [
					"shu",
					"shua",
					"shuo",
					"shuai",
					"shui",
					"shuan",
					"shun",
					"shuang"
				]
			},
			{
				initial: "r",
				cells: [
					"ru",
					"rua",
					"ruo",
					null,
					"rui",
					"ruan",
					"run",
					null
				]
			},
			{
				initial: "z",
				cells: [
					"zu",
					null,
					"zuo",
					null,
					"zui",
					"zuan",
					"zun",
					null
				]
			},
			{
				initial: "c",
				cells: [
					"cu",
					null,
					"cuo",
					null,
					"cui",
					"cuan",
					"cun",
					null
				]
			},
			{
				initial: "s",
				cells: [
					"su",
					null,
					"suo",
					null,
					"sui",
					"suan",
					"sun",
					null
				]
			}
		]
	},
	{
		id: "v",
		title: "ü finals",
		finals: [
			"ü",
			"üe",
			"üan",
			"ün"
		],
		rows: [
			{
				initial: "∅",
				cells: [
					"yu",
					"yue",
					"yuan",
					"yun"
				]
			},
			{
				initial: "n",
				cells: [
					"nü",
					"nüe",
					null,
					null
				]
			},
			{
				initial: "l",
				cells: [
					"lü",
					"lüe",
					null,
					null
				]
			},
			{
				initial: "j",
				cells: [
					"ju",
					"jue",
					"juan",
					"jun"
				]
			},
			{
				initial: "q",
				cells: [
					"qu",
					"que",
					"quan",
					"qun"
				]
			},
			{
				initial: "x",
				cells: [
					"xu",
					"xue",
					"xuan",
					"xun"
				]
			}
		]
	}
];
function t(hanzi, pinyin, english, vocabId) {
	return {
		hanzi,
		pinyin,
		english,
		vocabId
	};
}
var PASSAGES = [
	{
		id: "p-hsk1-xiaoming",
		title: "Xiaoming's day",
		titleZh: "小明的一天",
		hsk: 1,
		english: "Xiaoming is a student. He is twenty this year. He has an older sister. Today he goes to school. The teacher is very kind. He likes drinking tea.",
		tokens: [
			t("小明", "Xiǎomíng", "Xiaoming"),
			t("是", "shì", "is", "shi"),
			t("学生", "xuéshēng", "student", "xuesheng"),
			t("。", "", ""),
			t("他", "tā", "he", "ta-he"),
			t("今年", "jīnnián", "this year"),
			t("二十", "èrshí", "twenty"),
			t("岁", "suì", "years old", "sui"),
			t("。", "", ""),
			t("他", "tā", "he", "ta-he"),
			t("有", "yǒu", "has", "you"),
			t("一个", "yí ge", "one", "ge"),
			t("姐姐", "jiějie", "older sister", "jiejie"),
			t("。", "", ""),
			t("今天", "jīntiān", "today", "jintian"),
			t("他", "tā", "he", "ta-he"),
			t("去", "qù", "goes", "qu"),
			t("学校", "xuéxiào", "school", "xuexiao"),
			t("。", "", ""),
			t("老师", "lǎoshī", "teacher", "laoshi"),
			t("很", "hěn", "very", "hen"),
			t("好", "hǎo", "good", "hao"),
			t("。", "", ""),
			t("他", "tā", "he", "ta-he"),
			t("喜欢", "xǐhuan", "likes", "xihuan"),
			t("喝", "hē", "drink", "he-drink"),
			t("茶", "chá", "tea", "cha"),
			t("。", "", "")
		],
		questions: [{
			prompt: "What is Xiaoming?",
			options: [
				"A doctor",
				"A student",
				"A teacher",
				"A driver"
			],
			answer: 1
		}, {
			prompt: "What does he like to drink?",
			options: [
				"Coffee",
				"Milk",
				"Tea",
				"Water"
			],
			answer: 2
		}]
	},
	{
		id: "p-hsk2-weekend",
		title: "Weekend plans",
		titleZh: "周末",
		hsk: 2,
		english: "Tomorrow is Saturday. I want to go to Beijing with my older brother. We will take the train. Although it is far, the tickets are cheap. I have already bought two tickets. I hope the weather is sunny.",
		tokens: [
			t("明天", "míngtiān", "tomorrow", "mingtian"),
			t("是", "shì", "is", "shi"),
			t("星期六", "xīngqī liù", "Saturday"),
			t("。", "", ""),
			t("我想", "wǒ xiǎng", "I want", "xiang"),
			t("和", "hé", "with", "he"),
			t("哥哥", "gēge", "older brother", "gege"),
			t("一起", "yìqǐ", "together", "yiqi"),
			t("去", "qù", "go", "qu"),
			t("北京", "Běijīng", "Beijing", "beijing"),
			t("。", "", ""),
			t("我们", "wǒmen", "we", "wo-men"),
			t("坐", "zuò", "take", "zuo-sit"),
			t("火车", "huǒchē", "train"),
			t("。", "", ""),
			t("虽然", "suīrán", "although", "suiran"),
			t("很远", "hěn yuǎn", "very far", "yuan"),
			t("，", "", ""),
			t("但是", "dànshì", "but", "danshi"),
			t("票", "piào", "tickets", "piao"),
			t("很便宜", "hěn piányi", "cheap", "pianyi"),
			t("。", "", ""),
			t("我已经", "wǒ yǐjīng", "I already", "yijing"),
			t("买了", "mǎi le", "bought", "mai"),
			t("两张票", "liǎng zhāng piào", "two tickets"),
			t("。", "", ""),
			t("我希望", "wǒ xīwàng", "I hope", "xiwang"),
			t("天气", "tiānqì", "weather", "tianqi"),
			t("晴", "qíng", "sunny", "qing-sunny"),
			t("。", "", "")
		],
		questions: [{
			prompt: "How will they travel?",
			options: [
				"By plane",
				"By train",
				"By taxi",
				"On foot"
			],
			answer: 1
		}, {
			prompt: "Why is the trip still on, even though it is far?",
			options: [
				"They have a car",
				"Tickets are cheap",
				"Someone will drive",
				"It is nearby"
			],
			answer: 1
		}]
	},
	{
		id: "p-hsk3-lost",
		title: "A forgotten passport",
		titleZh: "护照",
		hsk: 3,
		english: "Yesterday I was going to the airport. I had already put the passport in my bag. When I arrived I discovered it was not there. I called my wife at once. She said I had left it on the table. If she had not helped me, I would have missed the plane.",
		tokens: [
			t("昨天", "zuótiān", "yesterday", "zuotian"),
			t("我要去", "wǒ yào qù", "I was going to"),
			t("机场", "jīchǎng", "airport", "jichang"),
			t("。", "", ""),
			t("我已经", "wǒ yǐjīng", "I already"),
			t("把", "bǎ", "ba", "ba-hold"),
			t("护照", "hùzhào", "passport", "huzhao"),
			t("放在", "fàng zài", "put in", "fangzi"),
			t("包里", "bāo lǐ", "the bag"),
			t("了", "le", "le", "le"),
			t("。", "", ""),
			t("到了以后", "dào le yǐhòu", "after arriving"),
			t("我发现", "wǒ fāxiàn", "I discovered", "faxian"),
			t("护照", "hùzhào", "the passport"),
			t("不在", "bú zài", "was not"),
			t("。", "", ""),
			t("我马上", "wǒ mǎshàng", "I immediately"),
			t("给", "gěi", "to", "gei"),
			t("妻子", "qīzi", "wife", "qizi"),
			t("打电话", "dǎ diànhuà", "called", "dadianhua"),
			t("。", "", ""),
			t("她说", "tā shuō", "she said"),
			t("我把护照", "wǒ bǎ hùzhào", "I (ba) passport"),
			t("忘在", "wàng zài", "left on"),
			t("桌子上", "zhuōzi shàng", "the table"),
			t("了", "le", "le"),
			t("。", "", ""),
			t("如果", "rúguǒ", "if", "ruguo"),
			t("她没帮我", "tā méi bāng wǒ", "she hadn't helped"),
			t("，", "", ""),
			t("我就", "wǒ jiù", "I then"),
			t("赶不上", "gǎnbushàng", "wouldn't catch"),
			t("飞机", "fēijī", "the plane", "feiji"),
			t("了", "le", "le"),
			t("。", "", "")
		],
		questions: [{
			prompt: "Where was the passport?",
			options: [
				"In the bag",
				"At the airport",
				"On the table",
				"With a friend"
			],
			answer: 2
		}, {
			prompt: "Which grammar does 把护照放在包里 illustrate?",
			options: [
				"Passive 被",
				"Disposal 把",
				"Experiential 过",
				"Comparison 比"
			],
			answer: 1
		}]
	},
	{
		id: "p-hsk4-city",
		title: "A city changing",
		titleZh: "变化",
		hsk: 4,
		english: "This city is developing very fast. In the past the streets were quiet; now there are always traffic jams. Some people feel this is progress, others think the environment is getting worse. As for me, I hope development and quality of life can both be considered.",
		tokens: [
			t("这座城市", "zhè zuò chéngshì", "this city"),
			t("发展", "fāzhǎn", "develops", "fazhan"),
			t("很快", "hěn kuài", "fast"),
			t("。", "", ""),
			t("过去", "guòqù", "in the past", "guoji"),
			t("街道", "jiēdào", "the streets", "jiedao"),
			t("很安静", "hěn ānjìng", "were quiet"),
			t("，", "", ""),
			t("现在", "xiànzài", "now", "xianzai"),
			t("常常", "chángcháng", "often"),
			t("堵车", "dǔ chē", "jam", "du"),
			t("。", "", ""),
			t("有的人", "yǒude rén", "some people"),
			t("觉得", "juéde", "feel", "juede"),
			t("这是", "zhè shì", "this is"),
			t("进步", "jìnbù", "progress", "jinbu"),
			t("，", "", ""),
			t("也有人", "yě yǒu rén", "others"),
			t("认为", "rènwéi", "think", "renwei"),
			t("环境", "huánjìng", "the environment", "huanjing"),
			t("越来越差", "yuè lái yuè chà", "is getting worse"),
			t("。", "", ""),
			t("对我来说", "duì wǒ lái shuō", "as for me"),
			t("，", "", ""),
			t("我希望", "wǒ xīwàng", "I hope"),
			t("发展", "fāzhǎn", "development"),
			t("和", "hé", "and"),
			t("生活", "shēnghuó", "life", "shenghuo"),
			t("质量", "zhìliàng", "quality", "zhiliang"),
			t("都能", "dōu néng", "both can"),
			t("被考虑", "bèi kǎolǜ", "be considered"),
			t("。", "", "")
		],
		questions: [{
			prompt: "What contrast does the writer draw?",
			options: [
				"Old quiet streets vs. current congestion",
				"Village vs. farmland",
				"School vs. office",
				"Winter vs. summer"
			],
			answer: 0
		}, {
			prompt: "The writer's own hope is that…",
			options: [
				"The city stops growing",
				"Only the economy matters",
				"Development and life quality are both weighed",
				"Everyone moves away"
			],
			answer: 2
		}]
	},
	{
		id: "p-hsk5-study",
		title: "On method",
		titleZh: "方法",
		hsk: 5,
		english: "Many people treat language as a pile of words to memorize. That attitude is not reliable. Language is a process: you have to keep contact with real speech, analyze your own mistakes, and not be afraid of looking foolish. Efficiency does not come from more hours alone, but from whether each hour has a clear aim.",
		tokens: [
			t("很多人", "hěn duō rén", "many people"),
			t("把语言", "bǎ yǔyán", "treat language"),
			t("当成", "dàngchéng", "as"),
			t("一堆", "yì duī", "a pile of"),
			t("要背的词", "yào bèi de cí", "words to memorize"),
			t("。", "", ""),
			t("这种", "zhè zhǒng", "this kind of"),
			t("态度", "tàidu", "attitude", "taidu"),
			t("并不可靠", "bìng bù kěkào", "is not reliable", "kexin"),
			t("。", "", ""),
			t("语言是", "yǔyán shì", "language is"),
			t("一个过程", "yí ge guòchéng", "a process", "guocheng"),
			t("：", "", ""),
			t("你得", "nǐ děi", "you must"),
			t("不断", "búduàn", "continuously"),
			t("接触", "jiēchù", "contact", "jiezhe"),
			t("真实的话", "zhēnshí de huà", "real speech"),
			t("，", "", ""),
			t("分析", "fēnxī", "analyze", "fenxi"),
			t("自己的错误", "zìjǐ de cuòwù", "your own mistakes"),
			t("，", "", ""),
			t("也不要", "yě bú yào", "and don't"),
			t("怕", "pà", "fear"),
			t("显得可笑", "xiǎnde kěxiào", "looking foolish"),
			t("。", "", ""),
			t("效率", "xiàolǜ", "efficiency", "xiaolv"),
			t("不只来自", "bù zhǐ láizì", "does not only come from"),
			t("时间的长短", "shíjiān de chángduǎn", "how long you spend"),
			t("，", "", ""),
			t("而在于", "ér zàiyú", "but in whether"),
			t("每个小时", "měi ge xiǎoshí", "each hour"),
			t("有没有", "yǒu méiyǒu", "has or not"),
			t("明确的目标", "míngquè de mùbiāo", "a clear aim", "mingxian"),
			t("。", "", "")
		],
		questions: [{
			prompt: "What does the writer reject?",
			options: [
				"Speaking with people",
				"Treating language as a memorization pile",
				"Having a goal",
				"Analyzing mistakes"
			],
			answer: 1
		}, {
			prompt: "Efficiency, here, depends on…",
			options: [
				"Talent",
				"A clear aim for each hour",
				"Living in Beijing",
				"A large vocabulary list"
			],
			answer: 1
		}]
	},
	{
		id: "p-hsk6-quiet",
		title: "A reserved humor",
		titleZh: "含蓄",
		hsk: 6,
		english: "Chinese classical aesthetics often prizes what is held back. A poem does not explain itself; a painting leaves empty space. This is not emptiness for its own sake, but a trust that the reader's mind will complete the work. In conversation the same instinct appears as understatement — a kind of humor that never insists on being seen.",
		tokens: [
			t("中国古典审美", "Zhōngguó gǔdiǎn shěnměi", "Chinese classical aesthetics"),
			t("往往", "wǎngwǎng", "often", "wangzhan"),
			t("看重", "kànzhòng", "values"),
			t("含蓄", "hánxù", "reserve", "hanxu"),
			t("。", "", ""),
			t("诗", "shī", "a poem"),
			t("并不自我解释", "bìng bù zìwǒ jiěshì", "does not explain itself"),
			t("；", "", ""),
			t("画", "huà", "a painting"),
			t("留下", "liú xià", "leaves"),
			t("空白", "kòngbái", "empty space"),
			t("。", "", ""),
			t("这不是", "zhè bú shì", "this is not"),
			t("为空白而空白", "wèi kòngbái ér kòngbái", "emptiness for its own sake"),
			t("，", "", ""),
			t("而是", "ér shì", "but rather"),
			t("一种信任", "yì zhǒng xìnrèn", "a trust"),
			t("：", "", ""),
			t("读者的思维", "dúzhě de sīwéi", "the reader's mind", "siwei"),
			t("会把作品", "huì bǎ zuòpǐn", "will take the work"),
			t("完成", "wánchéng", "and complete it"),
			t("。", "", ""),
			t("在谈话里", "zài tánhuà lǐ", "in conversation"),
			t("，", "", ""),
			t("同样的直觉", "tóngyàng de zhíjué", "the same instinct"),
			t("表现为", "biǎoxiàn wéi", "appears as"),
			t("轻描淡写", "qīngmiáo-dànxiě", "understatement"),
			t("——", "", ""),
			t("一种", "yì zhǒng", "a kind of"),
			t("从不强调自己", "cóng bù qiángdiào zìjǐ", "that never insists"),
			t("被看见的幽默", "bèi kànjiàn de yōumò", "on being seen — humor", "youmo-humor"),
			t("。", "", "")
		],
		questions: [{
			prompt: "Empty space in a painting is described as…",
			options: [
				"A technical mistake",
				"Trust that the viewer completes the work",
				"A modern invention",
				"A sign of haste"
			],
			answer: 1
		}, {
			prompt: "The humor named at the end is…",
			options: [
				"Loud and comic",
				"Satirical only",
				"Understated",
				"Borrowed from English"
			],
			answer: 2
		}]
	}
];
var TONE_PAIRS = [
	{
		prompt: "mother vs horse",
		a: {
			hanzi: "妈",
			pinyin: "mā",
			english: "mother",
			tone: 1
		},
		b: {
			hanzi: "马",
			pinyin: "mǎ",
			english: "horse",
			tone: 3
		}
	},
	{
		prompt: "hemp vs to scold",
		a: {
			hanzi: "麻",
			pinyin: "má",
			english: "hemp",
			tone: 2
		},
		b: {
			hanzi: "骂",
			pinyin: "mà",
			english: "to scold",
			tone: 4
		}
	},
	{
		prompt: "soup vs to lie down",
		a: {
			hanzi: "汤",
			pinyin: "tāng",
			english: "soup",
			tone: 1
		},
		b: {
			hanzi: "躺",
			pinyin: "tǎng",
			english: "to lie down",
			tone: 3
		}
	},
	{
		prompt: "to buy vs to sell",
		a: {
			hanzi: "买",
			pinyin: "mǎi",
			english: "to buy",
			tone: 3
		},
		b: {
			hanzi: "卖",
			pinyin: "mài",
			english: "to sell",
			tone: 4
		}
	},
	{
		prompt: "ask vs kiss",
		a: {
			hanzi: "问",
			pinyin: "wèn",
			english: "to ask",
			tone: 4
		},
		b: {
			hanzi: "吻",
			pinyin: "wěn",
			english: "to kiss",
			tone: 3
		}
	},
	{
		prompt: "sleep vs feel",
		a: {
			hanzi: "睡",
			pinyin: "shuì",
			english: "to sleep",
			tone: 4
		},
		b: {
			hanzi: "谁",
			pinyin: "shéi",
			english: "who",
			tone: 2
		}
	},
	{
		prompt: "book vs ripe",
		a: {
			hanzi: "书",
			pinyin: "shū",
			english: "book",
			tone: 1
		},
		b: {
			hanzi: "熟",
			pinyin: "shú",
			english: "ripe; familiar",
			tone: 2
		}
	},
	{
		prompt: "ten vs to know",
		a: {
			hanzi: "十",
			pinyin: "shí",
			english: "ten",
			tone: 2
		},
		b: {
			hanzi: "是",
			pinyin: "shì",
			english: "to be",
			tone: 4
		}
	}
];
var TONE_DRILL = [
	{
		hanzi: "妈",
		pinyin: "mā",
		english: "mother",
		tone: 1
	},
	{
		hanzi: "麻",
		pinyin: "má",
		english: "hemp",
		tone: 2
	},
	{
		hanzi: "马",
		pinyin: "mǎ",
		english: "horse",
		tone: 3
	},
	{
		hanzi: "骂",
		pinyin: "mà",
		english: "scold",
		tone: 4
	},
	{
		hanzi: "八",
		pinyin: "bā",
		english: "eight",
		tone: 1
	},
	{
		hanzi: "拔",
		pinyin: "bá",
		english: "to pull",
		tone: 2
	},
	{
		hanzi: "把",
		pinyin: "bǎ",
		english: "ba / grasp",
		tone: 3
	},
	{
		hanzi: "爸",
		pinyin: "bà",
		english: "dad",
		tone: 4
	},
	{
		hanzi: "喝",
		pinyin: "hē",
		english: "to drink",
		tone: 1
	},
	{
		hanzi: "河",
		pinyin: "hé",
		english: "river",
		tone: 2
	},
	{
		hanzi: "好",
		pinyin: "hǎo",
		english: "good",
		tone: 3
	},
	{
		hanzi: "和",
		pinyin: "hè",
		english: "to join in (a song)",
		tone: 4
	},
	{
		hanzi: "西",
		pinyin: "xī",
		english: "west",
		tone: 1
	},
	{
		hanzi: "习",
		pinyin: "xí",
		english: "to practice",
		tone: 2
	},
	{
		hanzi: "洗",
		pinyin: "xǐ",
		english: "to wash",
		tone: 3
	},
	{
		hanzi: "细",
		pinyin: "xì",
		english: "thin; fine",
		tone: 4
	},
	{
		hanzi: "一",
		pinyin: "yī",
		english: "one",
		tone: 1
	},
	{
		hanzi: "移",
		pinyin: "yí",
		english: "to move",
		tone: 2
	},
	{
		hanzi: "已",
		pinyin: "yǐ",
		english: "already",
		tone: 3
	},
	{
		hanzi: "易",
		pinyin: "yì",
		english: "easy",
		tone: 4
	}
];
function PracticeMode() {
	const { mode } = Route$1.useParams();
	if (mode === "cards") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardsDrill, {});
	if (mode === "tones") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TonesDrill, {});
	if (mode === "listen") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenDrill, {});
	if (mode === "write") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteDrill, {});
	if (mode === "speak") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakDrill, {});
	if (mode === "read") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadDrill, {});
	if (mode === "pinyin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinyinDrill, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Unknown drill."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/practice",
				children: "Back"
			})
		})]
	});
}
function Shell({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/practice",
				className: "text-sm text-muted hover:text-fg",
				children: "Practice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-[0.2em] text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			})
		]
	});
}
function CardsDrill() {
	const srs = useAppStore((s) => s.srs);
	const reviewVocab = useAppStore((s) => s.reviewVocab);
	const addXp = useAppStore((s) => s.addXp);
	const due = (0, import_react.useMemo)(() => {
		const now = Date.now();
		const ids = Object.entries(srs).filter(([, c]) => c.nextReview <= now).map(([id]) => id);
		if (ids.length) return ids;
		return VOCAB.slice(0, 12).map((v) => v.id);
	}, [srs]);
	const [i, setI] = (0, import_react.useState)(0);
	const [reveal, setReveal] = (0, import_react.useState)(false);
	const word = getVocab(due[i] ?? "");
	if (!word) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		kicker: "单词",
		title: "Flashcards",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Finish a lesson to load the deck."
		})
	});
	function grade(q) {
		reviewVocab(word.id, q);
		addXp(q >= 4 ? 8 : 3);
		setReveal(false);
		setI((n) => (n + 1) % due.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "单词",
		title: "Flashcards",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					"Card ",
					i + 1,
					" of ",
					due.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "w-full",
				onClick: () => setReveal(true),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HanziBlock, {
					hanzi: word.hanzi,
					pinyin: reveal ? word.pinyin : void 0,
					english: reveal ? word.english : "Tap to reveal"
				})
			}),
			reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => grade(1),
						children: "Again"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => grade(3),
						children: "Good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => grade(5),
						children: "Easy"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				variant: "paper",
				onClick: () => setReveal(true),
				children: "Reveal"
			})
		]
	});
}
function TonesDrill() {
	const recordTone = useAppStore((s) => s.recordTone);
	const addXp = useAppStore((s) => s.addXp);
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const item = TONE_DRILL[i % TONE_DRILL.length];
	const pair = TONE_PAIRS[i % TONE_PAIRS.length];
	function choose(n) {
		const ok = n === item.tone;
		setPicked(n);
		recordTone(ok);
		addXp(ok ? 6 : 2);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "声调",
		title: "Tone trainer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Listen, then name the contour."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						lang: "zh-CN",
						className: "font-display text-6xl",
						children: item.hanzi
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: item.hanzi })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-2",
					children: [
						1,
						2,
						3,
						4
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: picked === n ? n === item.tone ? "default" : "secondary" : "secondary",
						onClick: () => choose(n),
						children: ["Tone ", n]
					}, n))
				}),
				picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						item.pinyin,
						" · ",
						item.english
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => {
						setPicked(null);
						setI((n) => n + 1);
						speakZh(TONE_DRILL[(i + 1) % TONE_DRILL.length].hanzi);
					},
					children: "Next"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Minimal pair · ", pair.prompt]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [pair.a, pair.b].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => speakZh(x.hanzi),
					className: "rounded-md bg-paper px-3 py-6 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl",
						children: x.hanzi
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: x.pinyin
					})]
				}, x.hanzi))
			})]
		})]
	});
}
function ListenDrill() {
	const pool = (0, import_react.useMemo)(() => VOCAB.filter((v) => v.example).slice(0, 80), []);
	const recordListen = useAppStore((s) => s.recordListen);
	const addXp = useAppStore((s) => s.addXp);
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const target = pool[i % pool.length];
	const options = (0, import_react.useMemo)(() => {
		const others = pool.filter((v) => v.id !== target.id).slice(i, i + 3);
		return [target, ...others].map((v) => v.english);
	}, [
		i,
		pool,
		target
	]);
	function check(opt) {
		setPicked(opt);
		const ok = opt === target.english;
		recordListen(ok);
		addXp(ok ? 8 : 2);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "听力",
		title: "Listening",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "paper",
				size: "lg",
				className: "w-full",
				onClick: () => speakZh(target.example?.hanzi ?? target.hanzi, .8),
				children: "Play sentence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-2",
				children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: picked === opt ? "default" : "secondary",
					className: "h-auto min-h-11 justify-start whitespace-normal py-3 text-left",
					onClick: () => check(opt),
					children: opt
				}, opt))
			}),
			picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-display text-lg",
				children: [
					target.example?.hanzi,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-sans text-muted",
						children: target.example?.pinyin
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				onClick: () => {
					setPicked(null);
					setI((n) => n + 1);
				},
				children: "Next"
			})
		]
	});
}
function WriteDrill() {
	const known = useAppStore((s) => s.knownVocab);
	const recordWrite = useAppStore((s) => s.recordWrite);
	const chars = (0, import_react.useMemo)(() => {
		const fromKnown = known.map((id) => getVocab(id)?.hanzi).filter((h) => Boolean(h) && h.length === 1);
		const list = fromKnown.length ? fromKnown : [
			"你",
			"好",
			"我",
			"是",
			"中",
			"国",
			"学",
			"生",
			"茶",
			"水",
			"人",
			"大"
		];
		return [...new Set(list)];
	}, [known]);
	const [i, setI] = (0, import_react.useState)(0);
	const hanzi = chars[i % chars.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "汉字",
		title: "Character studio",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-center font-display text-2xl",
				children: hanzi
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterWriter, {
				hanzi,
				onQuiz: (ok) => recordWrite(ok)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-2",
				children: chars.slice(0, 16).map((h, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setI(idx),
					className: cn("size-11 rounded-md font-display text-lg", h === hanzi ? "bg-paper text-ink" : "bg-surface"),
					children: h
				}, h))
			})
		]
	});
}
function SpeakDrill() {
	const pool = VOCAB.filter((v) => v.hsk <= 2).slice(0, 40);
	const [i, setI] = (0, import_react.useState)(0);
	const [heard, setHeard] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const word = pool[i % pool.length];
	const listening = canListen();
	async function rec() {
		setErr(null);
		setBusy(true);
		try {
			const t = await listenZhOnce();
			setHeard(t);
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Could not hear you.");
		} finally {
			setBusy(false);
		}
	}
	const ok = heard ? heard.replace(/\s/g, "").includes(word.hanzi) || heard.toLowerCase().includes(word.pinyin.replace(/\s/g, "").slice(0, 3)) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "口语",
		title: "Speaking",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HanziBlock, {
				hanzi: word.hanzi,
				pinyin: word.pinyin,
				english: word.english
			}),
			!listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Speech recognition is not available in this browser. Play the model, then say it aloud."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				size: "lg",
				onClick: () => void rec(),
				disabled: busy,
				children: busy ? "Listening…" : "Tap and speak"
			}),
			heard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-4 text-sm", ok ? "text-success" : "text-muted"),
				children: ["Heard: ", heard]
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-primary",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "mt-6 w-full",
				onClick: () => {
					setHeard(null);
					setI((n) => n + 1);
				},
				children: "Next word"
			})
		]
	});
}
function ReadDrill() {
	const [id, setId] = (0, import_react.useState)(PASSAGES[0].id);
	const [gloss, setGloss] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const passage = PASSAGES.find((p) => p.id === id) ?? PASSAGES[0];
	const question = passage.questions[q] ?? passage.questions[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "阅读",
		title: "Reading room",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: PASSAGES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setId(p.id);
						setGloss(null);
						setQ(0);
						setPicked(null);
					},
					className: cn("rounded-full px-3 py-1 text-xs", p.id === id ? "bg-paper text-ink" : "bg-surface text-muted"),
					children: p.titleZh
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: passage.titleZh
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["HSK ", passage.hsk === 0 ? "1" : passage.hsk] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: passage.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 leading-[2.1]",
						children: passage.tokens.map((tok, idx) => tok.hanzi === "。" || tok.hanzi === "，" || tok.hanzi === "：" || tok.hanzi === "；" || tok.hanzi === "——" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tok.hanzi }, `${tok.hanzi}-${idx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setGloss(tok);
								speakZh(tok.hanzi);
							},
							className: "mx-0.5 inline rounded-sm px-0.5 hover:bg-paper hover:text-ink",
							children: tok.hanzi
						}, `${tok.hanzi}-${idx}`))
					}),
					gloss ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-md bg-bg-elevated px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg",
								children: gloss.hanzi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-muted",
								children: gloss.pinyin
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2",
								children: gloss.english
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-subtle",
						children: "Tap a word for pinyin and meaning."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Comprehension"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: question.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: question.options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: picked === idx ? idx === question.answer ? "default" : "secondary" : "secondary",
							className: "h-auto justify-start whitespace-normal py-3 text-left",
							onClick: () => setPicked(idx),
							children: opt
						}, opt))
					})
				]
			})
		]
	});
}
function PinyinDrill() {
	const [group, setGroup] = (0, import_react.useState)(PINYIN_CHART[0].id);
	const [tone, setTone] = (0, import_react.useState)(1);
	const g = PINYIN_CHART.find((x) => x.id === group) ?? PINYIN_CHART[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		kicker: "拼音表",
		title: "Pinyin chart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PINYIN_CHART.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: x.id === group ? "paper" : "secondary",
					onClick: () => setGroup(x.id),
					children: x.title
				}, x.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2",
				children: [
					1,
					2,
					3,
					4
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: tone === n ? "default" : "secondary",
					onClick: () => setTone(n),
					children: ["Tone ", n]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] border-collapse text-center text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-1 text-muted" }), g.finals.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-1 text-xs font-medium text-muted",
						children: f
					}, f))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: g.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-1 text-xs font-medium text-muted",
						children: row.initial
					}), row.cells.map((cell, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-0.5",
						children: cell ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => speakZh(applyTone(cell, tone)),
							className: "w-full rounded-sm px-1 py-2 hover:bg-paper hover:text-ink",
							children: applyTone(cell, tone)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block py-2 text-subtle",
							children: "·"
						})
					}, `${row.initial}-${g.finals[idx]}`))] }, row.initial)) })]
				})
			})
		]
	});
}
//#endregion
export { PracticeMode as component };
