import { n as getVocab, t as VOCAB } from "./vocab-Ccq9F0k5.mjs";
import { r as toneOf } from "./pinyin-CbC63jpJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/curriculum-B_f_rQ7V.js
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function rng(seed) {
	let a = seed || 1;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(items, rand) {
	const a = [...items];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		const tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a;
}
function distractors(target, pool, n, rand) {
	return shuffle(pool.filter((v) => v.id !== target.id && v.english !== target.english), rand).slice(0, n);
}
function mc(prompt, correct, wrong, extra = {}, rand) {
	const options = shuffle([correct, ...wrong], rand);
	return {
		type: "mc",
		prompt,
		options,
		answer: options.indexOf(correct),
		...extra
	};
}
function quizzesForVocab(vocab, lessonId) {
	const usable = vocab.filter(Boolean);
	if (usable.length === 0) return [];
	const rand = rng(hash(lessonId));
	const items = [];
	const pick = shuffle(usable, rand);
	for (const word of pick.slice(0, Math.min(4, pick.length))) {
		const wrong = distractors(word, usable, 3, rand).map((w) => w.english);
		while (wrong.length < 3) wrong.push("to rest");
		items.push({
			kind: "quiz",
			quiz: mc(`What does ${word.hanzi} mean?`, word.english, wrong, {
				promptHanzi: word.hanzi,
				speak: word.hanzi
			}, rand)
		});
	}
	for (const word of pick.slice(0, Math.min(3, pick.length))) {
		const wrong = distractors(word, usable, 3, rand).map((w) => w.hanzi);
		while (wrong.length < 3) wrong.push("是");
		items.push({
			kind: "quiz",
			quiz: mc(word.english, word.hanzi, wrong, { speak: word.hanzi }, rand)
		});
	}
	for (const word of pick.slice(0, Math.min(3, pick.length))) items.push({
		kind: "quiz",
		quiz: {
			type: "type",
			prompt: `Type pinyin for ${word.hanzi}`,
			speak: word.hanzi,
			answers: [word.pinyin],
			hint: word.pinyin.charAt(0)
		}
	});
	for (const word of pick.slice(0, Math.min(2, pick.length))) {
		const wrong = distractors(word, usable, 3, rand).map((w) => w.english);
		while (wrong.length < 3) wrong.push("tomorrow");
		items.push({
			kind: "quiz",
			quiz: mc("Listen, then choose the meaning.", word.english, wrong, { speak: word.hanzi }, rand)
		});
	}
	for (const word of pick.slice(0, Math.min(2, pick.length))) {
		const t = toneOf(word.pinyin.split(/\s+/)[0] ?? word.pinyin);
		items.push({
			kind: "quiz",
			quiz: {
				type: "tone-pick",
				speak: word.hanzi,
				hanzi: word.hanzi,
				options: [
					"1st · high level",
					"2nd · rising",
					"3rd · dipping",
					"4th · falling",
					"neutral"
				].slice(0, 4),
				answer: Math.min(t, 4) - 1
			}
		});
	}
	const matchWords = pick.slice(0, Math.min(4, pick.length));
	if (matchWords.length >= 3) items.push({
		kind: "quiz",
		quiz: {
			type: "match",
			pairs: matchWords.map((w) => ({
				left: w.hanzi,
				right: w.english,
				speak: w.hanzi
			}))
		}
	});
	return items;
}
function expandLesson(def) {
	if (def.items && def.items.length > 0 && !def.vocabIds?.length) return def.items;
	const items = [];
	items.push({
		kind: "tip",
		title: def.title,
		body: def.intro
	});
	const vocab = (def.vocabIds ?? []).map((id) => getVocab(id)).filter((v) => Boolean(v));
	for (const v of vocab) items.push({
		kind: "teach-vocab",
		vocabId: v.id
	});
	if (def.grammarId) items.push({
		kind: "grammar",
		grammarId: def.grammarId
	});
	if (def.dialogue?.length) items.push({
		kind: "dialogue",
		lines: def.dialogue
	});
	if (def.items) items.push(...def.items);
	items.push(...quizzesForVocab(vocab, def.id));
	return items;
}
var UNITS = [
	{
		id: "sounds",
		band: 0,
		title: "Sounds",
		titleZh: "语音",
		blurb: "Tones, initials, finals. Everything else sits on this."
	},
	{
		id: "hsk1",
		band: 1,
		title: "HSK 1",
		titleZh: "一级",
		blurb: "Survival Mandarin — greet, count, eat, go."
	},
	{
		id: "hsk2",
		band: 2,
		title: "HSK 2",
		titleZh: "二级",
		blurb: "Daily life, comparison, experience, reason."
	},
	{
		id: "hsk3",
		band: 3,
		title: "HSK 3",
		titleZh: "三级",
		blurb: "Independent speech — 把, 被, complements."
	},
	{
		id: "hsk4",
		band: 4,
		title: "HSK 4",
		titleZh: "四级",
		blurb: "Work and argument. Aspect, relative clauses."
	},
	{
		id: "hsk5",
		band: 5,
		title: "HSK 5",
		titleZh: "五级",
		blurb: "Abstract ideas, news, nuance."
	},
	{
		id: "hsk6",
		band: 6,
		title: "HSK 6",
		titleZh: "六级",
		blurb: "Near-native range — thought, style, debate."
	},
	{
		id: "fluency",
		band: 7,
		title: "Fluency",
		titleZh: "融会",
		blurb: "Chengyu, register, and reading like an adult."
	}
];
VOCAB.filter((v) => [
	"ma",
	"mingzi",
	"wo",
	"ni",
	"shi",
	"hao",
	"mai",
	"ma-part"
].includes(v.id));
var soundsTones = [
	{
		kind: "tip",
		title: "Mandarin is a tone language",
		body: "The same syllable with a different pitch contour is a different word. mā 妈 (mother) is not mà 骂 (to scold). You will hear four contours plus a light neutral tone. Train the ear before you chase characters."
	},
	{
		kind: "teach-tone",
		tone: 1,
		name: "First tone",
		contour: "High and level. Hold it like a sung note.",
		examples: VOCAB.filter((v) => [
			"ta-he",
			"ta-she",
			"shu",
			"tianqi"
		].includes(v.id))
	},
	{
		kind: "teach-tone",
		tone: 2,
		name: "Second tone",
		contour: "Rising, like a short English question: 'huh?'",
		examples: VOCAB.filter((v) => [
			"ren",
			"qian",
			"mingtian",
			"shenme"
		].includes(v.id))
	},
	{
		kind: "teach-tone",
		tone: 3,
		name: "Third tone",
		contour: "Low dip. In isolation it falls then rises; before another syllable it often stays low.",
		examples: VOCAB.filter((v) => [
			"wo",
			"ni",
			"hao",
			"shui"
		].includes(v.id))
	},
	{
		kind: "teach-tone",
		tone: 4,
		name: "Fourth tone",
		contour: "Sharp fall, like a command: 'Stop.'",
		examples: VOCAB.filter((v) => [
			"shi",
			"kan",
			"zaijian",
			"kuai"
		].includes(v.id))
	},
	{
		kind: "quiz",
		quiz: {
			type: "tone-pick",
			speak: "妈",
			hanzi: "妈",
			options: [
				"1st · high level",
				"2nd · rising",
				"3rd · dipping",
				"4th · falling"
			],
			answer: 0
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "tone-pick",
			speak: "麻",
			hanzi: "麻",
			options: [
				"1st · high level",
				"2nd · rising",
				"3rd · dipping",
				"4th · falling"
			],
			answer: 1
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "tone-pick",
			speak: "马",
			hanzi: "马",
			options: [
				"1st · high level",
				"2nd · rising",
				"3rd · dipping",
				"4th · falling"
			],
			answer: 2
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "tone-pick",
			speak: "骂",
			hanzi: "骂",
			options: [
				"1st · high level",
				"2nd · rising",
				"3rd · dipping",
				"4th · falling"
			],
			answer: 3
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "Which contour is the fourth tone?",
			options: [
				"High level",
				"Rising",
				"Low dip",
				"Sharp fall"
			],
			answer: 3
		}
	}
];
var soundsSandhi = [
	{
		kind: "tip",
		title: "Tone sandhi",
		body: "Tones change in contact. Two third tones in a row: the first becomes a second. nǐ hǎo is pronounced ní hǎo. 不 is bù, but before a fourth tone it becomes bú: 不是 bú shì. 一 is yī, but yí before a fourth tone (一个 yí ge) and yì before 1st/2nd/3rd (一天 yì tiān)."
	},
	{
		kind: "teach-sound",
		pinyin: "ní hǎo",
		note: "Written nǐ hǎo, spoken ní hǎo. Always write the original third tone.",
		examples: [
			"你好",
			"很好",
			"可以"
		]
	},
	{
		kind: "teach-sound",
		pinyin: "bú shì",
		note: "不 flips to second tone before a fourth tone.",
		examples: [
			"不是",
			"不要",
			"不对"
		]
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "How is 你好 actually pronounced?",
			options: [
				"nǐ hǎo",
				"ní hǎo",
				"nì hǎo",
				"nī hǎo"
			],
			answer: 1,
			speak: "你好"
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "不 before 是 is pronounced…",
			options: [
				"bù",
				"bú",
				"bǔ",
				"bū"
			],
			answer: 1,
			speak: "不是"
		}
	}
];
var soundsInitials = [
	{
		kind: "tip",
		title: "Initials that English does not have",
		body: "zh ch sh r are retroflex — tongue tip curled back. j q x are palatal, with a flat smile, never English j or sh. z c s are dental. q is like a sharp 'ch' with the tongue on the hard palate: qī 七. Distinguishing q / ch / c is a fluency gate."
	},
	{
		kind: "teach-sound",
		pinyin: "zh ch sh r",
		note: "Retroflex series. zhī, chī, shī, rì.",
		examples: [
			"中国",
			"吃",
			"是",
			"日"
		]
	},
	{
		kind: "teach-sound",
		pinyin: "j q x",
		note: "Only before i or ü. Never a heavy English j.",
		examples: [
			"几",
			"七",
			"西",
			"去"
		]
	},
	{
		kind: "teach-sound",
		pinyin: "z c s",
		note: "Dental. c is an aspirated ts, as in 'cats' without the vowel.",
		examples: [
			"字",
			"从",
			"三"
		]
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "Which initial is retroflex?",
			options: [
				"x",
				"q",
				"zh",
				"j"
			],
			answer: 2
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "Listen and choose the syllable.",
			speak: "七",
			options: [
				"cī",
				"chī",
				"qī",
				"xī"
			],
			answer: 2
		}
	}
];
var soundsFinals = [
	{
		kind: "tip",
		title: "Finals and ü",
		body: "ü is the rounded close front vowel — say 'ee' and round the lips. After j q x y it is written u but still pronounced ü: 去 qù, 句 jù, 鱼 yú. After n and l you write ü: 女 nǚ, 绿 lǜ. er is a retroflex final of its own: 二 èr, 哪儿 nǎr."
	},
	{
		kind: "teach-sound",
		pinyin: "ü",
		note: "Written u after j q x y. Written ü after n l.",
		examples: [
			"去",
			"女",
			"绿",
			"鱼"
		]
	},
	{
		kind: "teach-sound",
		pinyin: "ian üan iong",
		note: "ian sounds close to 'yen'. iong is like German 'jung' with a palatal start.",
		examples: [
			"天",
			"远",
			"用"
		]
	},
	{
		kind: "quiz",
		quiz: {
			type: "mc",
			prompt: "The u in 去 is pronounced…",
			speak: "去",
			options: [
				"u as in 'food'",
				"ü (rounded ee)",
				"ou as in 'go'",
				"o as in 'or'"
			],
			answer: 1
		}
	},
	{
		kind: "quiz",
		quiz: {
			type: "type",
			prompt: "Type pinyin for 女",
			speak: "女",
			answers: [
				"nǚ",
				"nv3",
				"nü3"
			],
			hint: "n"
		}
	}
];
function d(speaker, hanzi, pinyin, english) {
	return {
		speaker,
		hanzi,
		pinyin,
		english
	};
}
var LESSONS = [
	{
		id: "sounds-tones",
		unitId: "sounds",
		title: "Four tones",
		titleZh: "四声",
		intro: "Pitch is meaning. Learn the four contours as physical gestures, not decorations.",
		items: soundsTones
	},
	{
		id: "sounds-sandhi",
		unitId: "sounds",
		title: "Sandhi",
		titleZh: "变调",
		intro: "Tones in contact. Third-tone sandhi, 不, and 一.",
		items: soundsSandhi
	},
	{
		id: "sounds-initials",
		unitId: "sounds",
		title: "Initials",
		titleZh: "声母",
		intro: "zh ch sh, j q x, z c s — the three series English speakers mix up.",
		items: soundsInitials
	},
	{
		id: "sounds-finals",
		unitId: "sounds",
		title: "Finals and ü",
		titleZh: "韵母",
		intro: "The vowel that pinyin hides, and a few finals that are not English.",
		items: soundsFinals
	},
	{
		id: "hsk1-hello",
		unitId: "hsk1",
		title: "Hello and thanks",
		titleZh: "你好",
		intro: "The first social formulas. Say them with third-tone sandhi already in the mouth.",
		vocabIds: [
			"nihao",
			"xiexie",
			"bukeqi",
			"duibuqi",
			"meiguanxi",
			"zaijian",
			"qing",
			"wei"
		],
		dialogue: [
			d("A", "你好！", "Nǐ hǎo!", "Hello!"),
			d("B", "你好。请问，你是老师吗？", "Nǐ hǎo. Qǐngwèn, nǐ shì lǎoshī ma?", "Hello. Excuse me, are you a teacher?"),
			d("A", "不是，我是学生。", "Bú shì, wǒ shì xuéshēng.", "No, I'm a student."),
			d("B", "对不起！", "Duìbuqǐ!", "Sorry!"),
			d("A", "没关系。再见。", "Méi guānxi. Zàijiàn.", "It's fine. Goodbye.")
		]
	},
	{
		id: "hsk1-pronouns",
		unitId: "hsk1",
		title: "People and pointing",
		titleZh: "代词",
		intro: "我你他她这那谁. Gender in 他/她 is written, not spoken — both are tā.",
		vocabIds: [
			"wo",
			"ni",
			"ta-he",
			"ta-she",
			"wo-men",
			"zhe",
			"na",
			"shei",
			"shenme"
		],
		grammarId: "ma-ne"
	},
	{
		id: "hsk1-shi",
		unitId: "hsk1",
		title: "To be, to have",
		titleZh: "是和有",
		intro: "是 links nouns. 有 is possession and existence. Adjectives do not take 是.",
		vocabIds: [
			"shi",
			"you",
			"mei",
			"meiyou",
			"bu",
			"hen",
			"de",
			"dou",
			"he"
		],
		grammarId: "shi-de"
	},
	{
		id: "hsk1-numbers",
		unitId: "hsk1",
		title: "Numbers",
		titleZh: "数字",
		intro: "一 to 十, 零, 岁, 个, 本, 块. Two before a measure is 两.",
		vocabIds: [
			"yi",
			"er",
			"san",
			"si",
			"wu",
			"liu",
			"qi",
			"ba",
			"jiu",
			"shi",
			"ling",
			"ge",
			"ben",
			"kuai",
			"sui"
		],
		grammarId: "measure"
	},
	{
		id: "hsk1-family",
		unitId: "hsk1",
		title: "Family",
		titleZh: "家",
		intro: "Close relations often drop 的: 我妈妈, 我爸爸.",
		vocabIds: [
			"jia",
			"baba",
			"mama",
			"erzi",
			"nver",
			"pengyou",
			"mingzi",
			"jiao",
			"ren"
		],
		dialogue: [
			d("A", "你叫什么名字？", "Nǐ jiào shénme míngzi?", "What's your name?"),
			d("B", "我叫王明。你家有几口人？", "Wǒ jiào Wáng Míng. Nǐ jiā yǒu jǐ kǒu rén?", "I'm Wang Ming. How many people in your family?"),
			d("A", "四口人：爸爸、妈妈、姐姐和我。", "Sì kǒu rén: bàba, māma, jiějie hé wǒ.", "Four: dad, mom, older sister and me.")
		]
	},
	{
		id: "hsk1-school",
		unitId: "hsk1",
		title: "School",
		titleZh: "学校",
		intro: "老师学生汉字. 学习 is the verb; 学校 is the place.",
		vocabIds: [
			"laoshi",
			"xuesheng",
			"tongxue",
			"xuexiao",
			"xuexi",
			"shu",
			"hanzi",
			"zi",
			"hanyu",
			"xie",
			"du"
		]
	},
	{
		id: "hsk1-food",
		unitId: "hsk1",
		title: "Food and drink",
		titleZh: "吃喝",
		intro: "请 is 'please' and also 'to treat / invite'. 喝茶 is a social default.",
		vocabIds: [
			"chi",
			"he-drink",
			"shui",
			"cha",
			"cai",
			"mifan",
			"shuiguo",
			"pingguo",
			"fandian",
			"beizi",
			"mai"
		],
		grammarId: "le-aspect",
		dialogue: [
			d("A", "你想喝什么？", "Nǐ xiǎng hē shénme?", "What do you want to drink?"),
			d("B", "我喝茶。你呢？", "Wǒ hē chá. Nǐ ne?", "I'll have tea. And you?"),
			d("A", "我要一杯水。谢谢。", "Wǒ yào yì bēi shuǐ. Xièxie.", "I want a glass of water. Thanks.")
		]
	},
	{
		id: "hsk1-time",
		unitId: "hsk1",
		title: "Time",
		titleZh: "时间",
		intro: "Time words sit before the verb: 我明天去, never 我去明天.",
		vocabIds: [
			"jintian",
			"mingtian",
			"zuotian",
			"nian",
			"yue",
			"xingqi",
			"dian",
			"fen",
			"xianzai",
			"shihou",
			"shangwu",
			"xiawu"
		]
	},
	{
		id: "hsk1-go",
		unitId: "hsk1",
		title: "Going places",
		titleZh: "去",
		intro: "去 + place. 在 + place. 来 toward the speaker, 去 away.",
		vocabIds: [
			"qu",
			"lai",
			"hui-return",
			"zai",
			"beijing",
			"zhongguo",
			"shangdian",
			"yiyuan",
			"huochezhan",
			"feiji",
			"chuzuche",
			"zuo-sit"
		],
		grammarId: "zai-location"
	},
	{
		id: "hsk1-want",
		unitId: "hsk1",
		title: "Want and can",
		titleZh: "想要会能",
		intro: "Desire is 想/要. Skill is 会. Circumstantial ability is 能.",
		vocabIds: [
			"xiang",
			"yao",
			"hui",
			"neng",
			"xihuan",
			"ai",
			"kan",
			"ting",
			"shuo",
			"zuo",
			"gongzuo",
			"shuijiao"
		],
		grammarId: "hui-neng-keyi"
	},
	{
		id: "hsk1-describe",
		unitId: "hsk1",
		title: "Describing",
		titleZh: "形容词",
		intro: "Predicative adjectives take 很, which often means 'is' more than 'very'.",
		vocabIds: [
			"hao",
			"da",
			"xiao",
			"duo",
			"shao",
			"re",
			"leng",
			"gaoxing",
			"piaoliang",
			"shang",
			"xia",
			"li",
			"qianmian",
			"houmian",
			"nar"
		]
	},
	{
		id: "hsk2-family2",
		unitId: "hsk2",
		title: "More people",
		titleZh: "家人",
		intro: "哥哥姐姐弟弟妹妹, polite 您, and 孩子.",
		vocabIds: [
			"gege",
			"jiejie",
			"didi",
			"meimei",
			"haizi",
			"nin",
			"nan",
			"nv",
			"zhangfu",
			"qizi",
			"xing"
		]
	},
	{
		id: "hsk2-daily",
		unitId: "hsk2",
		title: "Daily rhythm",
		titleZh: "每天",
		intro: "起床上班休息. 每 + measure for 'every'.",
		vocabIds: [
			"qichuang",
			"shangban",
			"xiuxi",
			"zaoshang",
			"wanshang",
			"mei-every",
			"mang",
			"lei",
			"kuai-fast",
			"man",
			"yijing",
			"zhengzai"
		]
	},
	{
		id: "hsk2-compare",
		unitId: "hsk2",
		title: "Comparing",
		titleZh: "比",
		intro: "A 比 B + adj. No 很 in the 比 clause.",
		vocabIds: [
			"bi",
			"gui",
			"pianyi",
			"jin",
			"yuan",
			"chang",
			"zui",
			"ye",
			"hai",
			"feichang",
			"zhen"
		],
		grammarId: "bi-compare"
	},
	{
		id: "hsk2-how",
		unitId: "hsk2",
		title: "How well",
		titleZh: "得",
		intro: "Verb + 得 + description. The complement of manner.",
		vocabIds: [
			"de-comp",
			"dong",
			"cuo",
			"dui",
			"haochi",
			"juede",
			"gaosu",
			"wen",
			"wenti",
			"huida"
		],
		grammarId: "de-complement"
	},
	{
		id: "hsk2-been",
		unitId: "hsk2",
		title: "Have you ever",
		titleZh: "过",
		intro: "过 marks experience. 没 + V + 过 for never.",
		vocabIds: [
			"guo",
			"wan",
			"ci",
			"cong",
			"dao",
			"zou",
			"wan-play",
			"lvyou",
			"jichang"
		],
		grammarId: "guo-experience"
	},
	{
		id: "hsk2-reason",
		unitId: "hsk2",
		title: "Because and although",
		titleZh: "因为所以",
		intro: "因为…所以… and 虽然…但是… keep both halves.",
		vocabIds: [
			"yinwei",
			"suoyi",
			"suiran",
			"danshi",
			"weishenme",
			"keneng",
			"keyi",
			"kaishi",
			"zhunbei",
			"kaoshi"
		],
		grammarId: "yinwei-suoyi"
	},
	{
		id: "hsk2-body",
		unitId: "hsk2",
		title: "Body and weather",
		titleZh: "身体",
		intro: "身体, 生病, colors, 晴阴雪.",
		vocabIds: [
			"shenti",
			"shengbing",
			"yao-medicine",
			"yanjing",
			"hong",
			"hei",
			"bai",
			"qing-sunny",
			"yin",
			"xue",
			"tianqi"
		],
		grammarId: "suiran-danshi"
	},
	{
		id: "hsk2-together",
		unitId: "hsk2",
		title: "Together and again",
		titleZh: "一起再",
		intro: "一起, 再, 也, 还, 就. Small adverbs, large meaning.",
		vocabIds: [
			"yiqi",
			"zai-again",
			"jiu-then",
			"gei",
			"rang",
			"zhao",
			"song",
			"jieshao",
			"huanying",
			"kuaile"
		]
	},
	{
		id: "hsk3-ba",
		unitId: "hsk3",
		title: "The 把 sentence",
		titleZh: "把",
		intro: "Move a known object in front of the verb and say what happens to it.",
		vocabIds: [
			"ba-hold",
			"fangzi",
			"dai",
			"huan",
			"na",
			"wan",
			"qilai",
			"jin-enter"
		],
		grammarId: "ba-disposal"
	},
	{
		id: "hsk3-bei",
		unitId: "hsk3",
		title: "The 被 sentence",
		titleZh: "被",
		intro: "Passive, often with a slightly unlucky flavour.",
		vocabIds: [
			"bei-times",
			"huai",
			"wang",
			"jieshu",
			"jiejue",
			"fasheng"
		],
		grammarId: "bei-passive"
	},
	{
		id: "hsk3-result",
		unitId: "hsk3",
		title: "Result complements",
		titleZh: "结果补语",
		intro: "看见 听懂 做完 买到 — the verb names the attempt, the complement names the outcome.",
		vocabIds: [
			"dong",
			"wan",
			"mingbai",
			"qingchu",
			"kanjian",
			"faxian"
		],
		grammarId: "result-comp"
	},
	{
		id: "hsk3-direction",
		unitId: "hsk3",
		title: "Come and go as grammar",
		titleZh: "趋向补语",
		intro: "上来下去起来. Literal motion, then figurative.",
		vocabIds: [
			"qilai",
			"guoji",
			"jin-enter",
			"chu",
			"hui-return",
			"liwu"
		],
		grammarId: "direction-comp"
	},
	{
		id: "hsk3-if",
		unitId: "hsk3",
		title: "If and then",
		titleZh: "如果就",
		intro: "如果…就…. 才 versus 就 for later vs earlier than expected.",
		vocabIds: [
			"ruguo",
			"jiu-then",
			"cai-only",
			"yiding",
			"keneng",
			"dashi"
		],
		grammarId: "ruguo-jiu"
	},
	{
		id: "hsk3-more",
		unitId: "hsk3",
		title: "The more…",
		titleZh: "越来越",
		intro: "越来越 and 越 A 越 B.",
		vocabIds: [
			"yue-more",
			"geng",
			"yiyang",
			"chong",
			"haishi",
			"huo"
		],
		grammarId: "yue-yue"
	},
	{
		id: "hsk3-city",
		unitId: "hsk3",
		title: "City life",
		titleZh: "城市",
		intro: "超市公园银行护照. Independent survival in a Chinese city.",
		vocabIds: [
			"chengshi",
			"chazhao",
			"gongyuan",
			"yinhang",
			"huzhao",
			"ditie",
			"fujin",
			"fangbian"
		]
	},
	{
		id: "hsk3-health",
		unitId: "hsk3",
		title: "Health",
		titleZh: "健康",
		intro: "发烧感冒锻炼. 身体是革命的本钱 — later. For now, describe symptoms.",
		vocabIds: [
			"jiaojie",
			"fanyi",
			"ganjue",
			"duanlian",
			"shulin",
			"lei",
			"yisheng",
			"yao-medicine"
		]
	},
	{
		id: "hsk3-self",
		unitId: "hsk3",
		title: "Self and other",
		titleZh: "自己",
		intro: "自己别人需要选择. Agency in the sentence.",
		vocabIds: [
			"ziji",
			"xuyao",
			"xuanze",
			"nuli",
			"renke",
			"tongyi",
			"renwei",
			"jueding"
		],
		grammarId: "cai-jiu"
	},
	{
		id: "hsk3-culture",
		unitId: "hsk3",
		title: "Culture words",
		titleZh: "文化",
		intro: "历史音乐新闻兴趣. The nouns you need to talk about why you learn.",
		vocabIds: [
			"wenhua",
			"lishi",
			"yinyue",
			"xinwen",
			"xingqu",
			"putonghua",
			"zhongwen",
			"xiongmao"
		],
		grammarId: "shi-de-focus"
	},
	{
		id: "hsk4-work",
		unitId: "hsk4",
		title: "Work and plans",
		titleZh: "工作",
		intro: "安排计划负责. Adult sentences.",
		vocabIds: [
			"anpai",
			"jihua",
			"fuze",
			"renwu",
			"jingyan",
			"nengli",
			"chenggong",
			"jinbu"
		]
	},
	{
		id: "hsk4-society",
		unitId: "hsk4",
		title: "Society",
		titleZh: "社会",
		intro: "经济法律环境政府. Read a simple news lede.",
		vocabIds: [
			"jingji",
			"falv",
			"huanjing",
			"zhengfu",
			"shehui",
			"guoji-intern",
			"fazhan",
			"renkou"
		]
	},
	{
		id: "hsk4-argue",
		unitId: "hsk4",
		title: "Taking a position",
		titleZh: "观点",
		intro: "其实不过因此应该. The glue of paragraph speech.",
		vocabIds: [
			"qifu",
			"buliao",
			"yinxiang",
			"yinggai",
			"wanquan",
			"queshi",
			"jieshi",
			"yishi"
		],
		grammarId: "relative-de"
	},
	{
		id: "hsk4-aspect",
		unitId: "hsk4",
		title: "Time without tense",
		titleZh: "体",
		intro: "Mandarin marks aspect and sets time with adverbs. This is the hinge to fluency.",
		vocabIds: [
			"dangshi",
			"jianglai",
			"chongman",
			"yijing",
			"zhengzai",
			"zhe-ing"
		],
		grammarId: "aspect-vs-tense"
	},
	{
		id: "hsk4-topic",
		unitId: "hsk4",
		title: "Topic first",
		titleZh: "话题",
		intro: "Put the thing you are talking about at the front, then comment.",
		vocabIds: [
			"qita-other",
			"guanyu",
			"qingchu-situation",
			"shiji",
			"mudi",
			"yuanyin-cause"
		],
		grammarId: "topic-comment"
	},
	{
		id: "hsk4-life",
		unitId: "hsk4",
		title: "Life quality",
		titleZh: "生活",
		intro: "生活幸福质量适应. Describe a life, not just a day.",
		vocabIds: [
			"shenghuo",
			"xingge",
			"zhiliang",
			"shiying",
			"shouhuo",
			"liangxin",
			"ganqing",
			"zhunbei"
		]
	},
	{
		id: "hsk5-think",
		unitId: "hsk5",
		title: "Thought verbs",
		titleZh: "思考",
		intro: "考虑分析强调怀疑. Interior life in Chinese.",
		vocabIds: [
			"kaolv",
			"fenxi",
			"qiangdiao",
			"huaiyi",
			"juti",
			"mingxian",
			"yishi-conscious",
			"zhishi"
		]
	},
	{
		id: "hsk5-process",
		unitId: "hsk5",
		title: "Process and result",
		titleZh: "过程",
		intro: "过程结果趋势挑战. How grown-up writing moves.",
		vocabIds: [
			"guocheng",
			"quxiao-trend",
			"tiaoji-cond",
			"xiaolv",
			"shouhuo-harvest",
			"chenggong-degree",
			"houguo",
			"yuanze"
		]
	},
	{
		id: "hsk5-people",
		unitId: "hsk5",
		title: "Character and relation",
		titleZh: "为人",
		intro: "态度谦虚可靠合作. Talk about people without cartoon adjectives.",
		vocabIds: [
			"taidu",
			"qianxu",
			"kexin",
			"heshi",
			"guanxin",
			"zhiye-support",
			"tuijian-rec",
			"pishi-批"
		],
		grammarId: "register"
	},
	{
		id: "hsk5-world",
		unitId: "hsk5",
		title: "The public world",
		titleZh: "公共",
		intro: "社会教育政策文化. A newspaper paragraph.",
		vocabIds: [
			"shehui",
			"jiaoyu",
			"zhengce",
			"wenhua",
			"keji",
			"huanjing",
			"quanli",
			"gongping"
		]
	},
	{
		id: "hsk6-mind",
		unitId: "hsk6",
		title: "Mind",
		titleZh: "思维",
		intro: "思维逻辑观点见解. Argue like an essay.",
		vocabIds: [
			"siwei",
			"luoji",
			"guandian",
			"jianjie",
			"fansi",
			"tuili",
			"zhexue",
			"zhihui"
		]
	},
	{
		id: "hsk6-style",
		unitId: "hsk6",
		title: "Style and spirit",
		titleZh: "精神",
		intro: "含蓄鲜明抽象内涵. What a sentence feels like.",
		vocabIds: [
			"hanxu",
			"xianming",
			"chouxing",
			"neihan",
			"jingshen",
			"xinling",
			"shenmei",
			"youmo-humor"
		]
	},
	{
		id: "hsk6-society",
		unitId: "hsk6",
		title: "Values",
		titleZh: "价值",
		intro: "尊严公平和谐偏见. Adult civic vocabulary.",
		vocabIds: [
			"zunyan",
			"gongping",
			"hemu",
			"pianjian",
			"daode",
			"renxing",
			"qianli",
			"qinfen"
		],
		grammarId: "chengyu-use"
	},
	{
		id: "fluency-chengyu",
		unitId: "fluency",
		title: "Chengyu I",
		titleZh: "成语一",
		intro: "Four characters, one picture. Use them as clauses, not stickers.",
		vocabIds: [
			"huashetianzu",
			"shouzhudaitu",
			"wangyangbulao",
			"bantuerfei",
			"quanliyifu",
			"ruxiangsuisu",
			"jingdizhiwa",
			"duiniutanqin"
		]
	},
	{
		id: "fluency-chengyu2",
		unitId: "fluency",
		title: "Chengyu II",
		titleZh: "成语二",
		intro: "Idioms you can actually say at a dinner table.",
		vocabIds: [
			"mamahuhu",
			"qishangbaxia",
			"yilupingan",
			"xinxiangshicheng",
			"ziyouzizai",
			"jinjinyouwei",
			"aibushishou",
			"shishijiushi",
			"libucongxin",
			"bukesiyi"
		]
	}
];
var LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
function lessonsInUnit(unitId) {
	return LESSONS.filter((l) => l.unitId === unitId);
}
function nextLessonId(id) {
	const i = LESSONS.findIndex((l) => l.id === id);
	return i >= 0 ? LESSONS[i + 1]?.id : void 0;
}
function lessonItems(id) {
	const def = LESSON_BY_ID[id];
	if (!def) return [];
	return expandLesson(def);
}
function bandLabel(band) {
	if (band === 0) return "Sounds";
	if (band === 7) return "Fluency";
	return `HSK ${band}`;
}
//#endregion
export { lessonItems as a, bandLabel as i, LESSON_BY_ID as n, lessonsInUnit as o, UNITS as r, nextLessonId as s, LESSONS as t };
