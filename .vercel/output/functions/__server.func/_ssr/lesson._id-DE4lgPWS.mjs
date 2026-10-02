import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft, h as Check } from "../_libs/lucide-react.mjs";
import { a as useAppStore, c as speakZh, i as cn, r as Route$3 } from "./router-CtxBI353.mjs";
import { n as getVocab } from "./vocab-Ccq9F0k5.mjs";
import { n as pinyinMatches } from "./pinyin-CbC63jpJ.mjs";
import { t as Button } from "./button-BxGEjhHJ.mjs";
import { t as SpeakButton } from "./speak-button-C1X1ILaT.mjs";
import { t as HanziBlock } from "./hanzi-block-B05VmbXt.mjs";
import { a as lessonItems, n as LESSON_BY_ID, s as nextLessonId } from "./curriculum-B_f_rQ7V.mjs";
import { t as Progress } from "./progress-DzzOTu2A.mjs";
import { t as Input } from "./input-eSS7T3S-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lesson._id-DE4lgPWS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GRAMMAR_BY_ID = Object.fromEntries([
	{
		id: "shi-de",
		title: "是 and 的",
		titleZh: "是和的",
		hsk: 1,
		body: "是 (shì) links a subject to a noun: 我是学生. It is not used before adjectives — say 她很高兴, not 她是高兴. 的 (de) marks possession and description: 我的书, 中国的茶. After a pronoun + close relation you may drop 的: 我妈妈.",
		examples: [
			{
				hanzi: "他是医生。",
				pinyin: "Tā shì yīshēng.",
				english: "He is a doctor."
			},
			{
				hanzi: "这是我的电脑。",
				pinyin: "Zhè shì wǒ de diànnǎo.",
				english: "This is my computer."
			},
			{
				hanzi: "天气很好。",
				pinyin: "Tiānqì hěn hǎo.",
				english: "The weather is good. (no 是)",
				note: "Adjectives take 很, not 是."
			}
		]
	},
	{
		id: "ma-ne",
		title: "Questions with 吗 and 呢",
		titleZh: "吗和呢",
		hsk: 1,
		body: "Add 吗 (ma) to a statement to make a yes-no question: 你是学生吗？ Answer with 是 / 不是, or repeat the verb. 呢 (ne) follows a topic already in play: 我很好，你呢？ Question words (谁, 什么, 哪儿, 几) do not take 吗.",
		examples: [
			{
				hanzi: "你喜欢茶吗？",
				pinyin: "Nǐ xǐhuan chá ma?",
				english: "Do you like tea?"
			},
			{
				hanzi: "我不喜欢。你呢？",
				pinyin: "Wǒ bù xǐhuan. Nǐ ne?",
				english: "I don't. And you?"
			},
			{
				hanzi: "他是谁？",
				pinyin: "Tā shì shéi?",
				english: "Who is he? (no 吗)"
			}
		]
	},
	{
		id: "measure",
		title: "Measure words",
		titleZh: "量词",
		hsk: 1,
		body: "Chinese counts nouns with a measure word between number and noun: 一个老师, 三本书, 两个人. 个 (gè) is the general measure. 本 is for bound things (books). 口 for family members. When the number is two before a measure, use 两 not 二: 两杯茶.",
		examples: [
			{
				hanzi: "我有一个朋友。",
				pinyin: "Wǒ yǒu yí ge péngyou.",
				english: "I have one friend."
			},
			{
				hanzi: "她买了三本书。",
				pinyin: "Tā mǎi le sān běn shū.",
				english: "She bought three books."
			},
			{
				hanzi: "请来两杯茶。",
				pinyin: "Qǐng lái liǎng bēi chá.",
				english: "Two cups of tea, please."
			}
		]
	},
	{
		id: "le-aspect",
		title: "了 as completed action",
		titleZh: "了",
		hsk: 1,
		body: "了 (le) after a verb marks a completed event, not past tense as such. 我吃了米饭 — the eating is done. For a simple past habit you may not need 了. A sentence-final 了 often marks a new situation: 他是老师了 (he has become a teacher). Negate completed events with 没 (有), never 不了: 我没吃.",
		examples: [
			{
				hanzi: "我买了苹果。",
				pinyin: "Wǒ mǎi le píngguǒ.",
				english: "I bought apples."
			},
			{
				hanzi: "她昨天没来。",
				pinyin: "Tā zuótiān méi lái.",
				english: "She didn't come yesterday."
			},
			{
				hanzi: "下雨了。",
				pinyin: "Xià yǔ le.",
				english: "It has started raining."
			}
		]
	},
	{
		id: "hui-neng-keyi",
		title: "会, 能, and 可以",
		titleZh: "会、能、可以",
		hsk: 1,
		body: "会 (huì) is learned skill or future 'will': 我会写汉字. 能 (néng) is ability in a situation: 今天我能来. 可以 (kěyǐ) is permission: 我可以坐下吗？ They overlap, but mixing them is a common HSK 1–2 error. 想 is desire, not ability: 我想睡觉.",
		examples: [
			{
				hanzi: "她会说汉语。",
				pinyin: "Tā huì shuō Hànyǔ.",
				english: "She can speak Chinese (knows how)."
			},
			{
				hanzi: "我今天不能去。",
				pinyin: "Wǒ jīntiān bù néng qù.",
				english: "I can't go today (not possible)."
			},
			{
				hanzi: "这儿可以拍照吗？",
				pinyin: "Zhèr kěyǐ pāizhào ma?",
				english: "May one take photos here?"
			}
		]
	},
	{
		id: "zai-location",
		title: "在 for place and progressive",
		titleZh: "在",
		hsk: 1,
		body: "在 + place: 我在北京. Place words often need a localizer: 在桌子上, 在学校里. 在 / 正在 before a verb marks an action in progress: 他在看书. Don't say 我是在北京 for simple location.",
		examples: [
			{
				hanzi: "书在桌子上。",
				pinyin: "Shū zài zhuōzi shàng.",
				english: "The book is on the table."
			},
			{
				hanzi: "妈妈在做饭。",
				pinyin: "Māma zài zuò fàn.",
				english: "Mom is cooking."
			},
			{
				hanzi: "我住在北京。",
				pinyin: "Wǒ zhù zài Běijīng.",
				english: "I live in Beijing."
			}
		]
	},
	{
		id: "bi-compare",
		title: "比 comparisons",
		titleZh: "比",
		hsk: 2,
		body: "A 比 B + adjective: 他比我大. Do not put 很 before the adjective in a 比 sentence. To say 'a bit more', add 一点儿: 今天比昨天冷一点儿. Equality uses 跟/和 … 一样: 我们一样高. Negative: 没有 — 他没有我高.",
		examples: [
			{
				hanzi: "飞机比火车快。",
				pinyin: "Fēijī bǐ huǒchē kuài.",
				english: "Planes are faster than trains."
			},
			{
				hanzi: "今天比昨天冷一点儿。",
				pinyin: "Jīntiān bǐ zuótiān lěng yìdiǎnr.",
				english: "Today is a bit colder than yesterday."
			},
			{
				hanzi: "她没有她姐姐高。",
				pinyin: "Tā méiyǒu tā jiějie gāo.",
				english: "She is not as tall as her older sister."
			}
		]
	},
	{
		id: "de-complement",
		title: "The 得 complement",
		titleZh: "得",
		hsk: 2,
		body: "Verb + 得 + description tells how an action is done: 他说得很好. If the verb has an object, repeat the verb: 他说汉语说得很好, or move the object forward: 汉语他得说得很好. This 得 is unstressed de, not děi (must) or de (的).",
		examples: [
			{
				hanzi: "你写得真好看。",
				pinyin: "Nǐ xiě de zhēn hǎokàn.",
				english: "You write really nicely."
			},
			{
				hanzi: "她跑得很快。",
				pinyin: "Tā pǎo de hěn kuài.",
				english: "She runs fast."
			},
			{
				hanzi: "我汉字写得不好。",
				pinyin: "Wǒ Hànzì xiě de bù hǎo.",
				english: "I don't write characters well."
			}
		]
	},
	{
		id: "guo-experience",
		title: "过 for experience",
		titleZh: "过",
		hsk: 2,
		body: "Verb + 过 (guo) marks that something has been experienced at least once: 我去过中国. Negate with 没: 我没看过那部电影. 过 is not the same as 了 — 了 is a specific completion, 过 is 'ever'. Time words like 过年 are unrelated.",
		examples: [
			{
				hanzi: "你吃过饺子吗？",
				pinyin: "Nǐ chī guo jiǎozi ma?",
				english: "Have you ever eaten jiaozi?"
			},
			{
				hanzi: "我没去过上海。",
				pinyin: "Wǒ méi qù guo Shànghǎi.",
				english: "I have never been to Shanghai."
			},
			{
				hanzi: "他学过一点儿日语。",
				pinyin: "Tā xué guo yìdiǎnr Rìyǔ.",
				english: "He has studied a little Japanese."
			}
		]
	},
	{
		id: "yinwei-suoyi",
		title: "因为 … 所以",
		titleZh: "因为……所以",
		hsk: 2,
		body: "因为 introduces the reason, 所以 the result. You can use either half alone in speech, but both together is the textbook pattern. 因为 comes first. Don't pair 因为 with English-style 'so' twice.",
		examples: [{
			hanzi: "因为下雨，所以我不去。",
			pinyin: "Yīnwèi xià yǔ, suǒyǐ wǒ bú qù.",
			english: "Because it's raining, I'm not going."
		}, {
			hanzi: "他很忙，所以没来。",
			pinyin: "Tā hěn máng, suǒyǐ méi lái.",
			english: "He was busy, so he didn't come."
		}]
	},
	{
		id: "suiran-danshi",
		title: "虽然 … 但是",
		titleZh: "虽然……但是",
		hsk: 2,
		body: "虽然 (although) must be answered by 但是 / 可是 / 还. English drops the 'but'; Chinese keeps it. 虽然很累，但是我还要学习.",
		examples: [{
			hanzi: "虽然贵，但是很好。",
			pinyin: "Suīrán guì, dànshì hěn hǎo.",
			english: "Although expensive, it's good."
		}, {
			hanzi: "虽然他是学生，但是已经工作了。",
			pinyin: "Suīrán tā shì xuéshēng, dànshì yǐjīng gōngzuò le.",
			english: "Although he's a student, he already works."
		}]
	},
	{
		id: "ba-disposal",
		title: "The 把 construction",
		titleZh: "把字句",
		hsk: 3,
		body: "把 takes a known object and puts it before the verb so the verb can show what happens to it. Pattern: Subject + 把 + object + verb + complement. The verb almost always needs a complement (了, 在, 到, result). 请把书给我. You cannot say 我把书看.",
		examples: [
			{
				hanzi: "请把窗户打开。",
				pinyin: "Qǐng bǎ chuānghu dǎ kāi.",
				english: "Please open the window."
			},
			{
				hanzi: "我把护照放在包里了。",
				pinyin: "Wǒ bǎ hùzhào fàng zài bāo lǐ le.",
				english: "I put the passport in the bag."
			},
			{
				hanzi: "他把茶喝完了。",
				pinyin: "Tā bǎ chá hē wán le.",
				english: "He finished the tea."
			}
		]
	},
	{
		id: "bei-passive",
		title: "被 passives",
		titleZh: "被字句",
		hsk: 3,
		body: "被 marks that the subject receives the action, often with an adverse flavour: 书被他拿走了. Agent is optional: 包被偷了. In speech 让 / 叫 can replace 被. Don't overuse 被 — Chinese prefers active sentences.",
		examples: [{
			hanzi: "我的车被他修好了。",
			pinyin: "Wǒ de chē bèi tā xiū hǎo le.",
			english: "My car was repaired by him."
		}, {
			hanzi: "饭被猫吃了。",
			pinyin: "Fàn bèi māo chī le.",
			english: "The food was eaten by the cat."
		}]
	},
	{
		id: "result-comp",
		title: "Result complements",
		titleZh: "结果补语",
		hsk: 3,
		body: "A second verb or adjective after a verb shows the result: 看见 (look and succeed in seeing), 听懂, 做完, 买到, 学会, 记住. Negate with 没: 我没听懂. Potential form uses 得/不: 看不懂, 买得到.",
		examples: [
			{
				hanzi: "我听懂了。",
				pinyin: "Wǒ tīng dǒng le.",
				english: "I understood (by listening)."
			},
			{
				hanzi: "作业做完了吗？",
				pinyin: "Zuòyè zuò wán le ma?",
				english: "Is the homework finished?"
			},
			{
				hanzi: "这个字我看不懂。",
				pinyin: "Zhège zì wǒ kàn bù dǒng.",
				english: "I can't make out this character."
			}
		]
	},
	{
		id: "direction-comp",
		title: "Directional complements",
		titleZh: "趋向补语",
		hsk: 3,
		body: "来 / 去 after a motion verb show direction toward or away from the speaker: 上来, 下去, 进来, 回去. Figurative uses are everywhere: 看起来, 想起来, 用不上. Object placement: 拿出来一本书 or 把书拿出来.",
		examples: [
			{
				hanzi: "请进来。",
				pinyin: "Qǐng jìn lái.",
				english: "Please come in."
			},
			{
				hanzi: "我想不起来他的名字。",
				pinyin: "Wǒ xiǎng bu qǐlái tā de míngzi.",
				english: "I can't recall his name."
			},
			{
				hanzi: "雨下起来了。",
				pinyin: "Yǔ xià qǐlái le.",
				english: "It started raining."
			}
		]
	},
	{
		id: "ruguo-jiu",
		title: "如果 … 就",
		titleZh: "如果……就",
		hsk: 3,
		body: "如果 (if) in the first clause, 就 (then) in the second. 要是 is more colloquial. 就 is often required in Chinese even when English skips 'then'.",
		examples: [{
			hanzi: "如果下雨，我就不去。",
			pinyin: "Rúguǒ xià yǔ, wǒ jiù bú qù.",
			english: "If it rains, I won't go."
		}, {
			hanzi: "要是你有空，就来我家吧。",
			pinyin: "Yàoshi nǐ yǒu kòng, jiù lái wǒ jiā ba.",
			english: "If you're free, come to my place."
		}]
	},
	{
		id: "yue-yue",
		title: "越来越 and 越 … 越",
		titleZh: "越来越",
		hsk: 3,
		body: "越来越 + adjective/verb = increasingly: 汉语越来越难. 越 A 越 B = the more A, the more B: 我越学越喜欢.",
		examples: [{
			hanzi: "天气越来越冷了。",
			pinyin: "Tiānqì yuè lái yuè lěng le.",
			english: "The weather is getting colder."
		}, {
			hanzi: "他越说我越不懂。",
			pinyin: "Tā yuè shuō wǒ yuè bù dǒng.",
			english: "The more he talks, the less I understand."
		}]
	},
	{
		id: "cai-jiu",
		title: "才 versus 就",
		titleZh: "才和就",
		hsk: 3,
		body: "就 marks something earlier or easier than expected: 他七点就来了. 才 marks later or more effort than expected: 他现在才来. Both can mean 'only' in different flavours. This pair is a fluency marker — native speakers feel the complaint or relief in it.",
		examples: [{
			hanzi: "我五岁就会写字了。",
			pinyin: "Wǒ wǔ suì jiù huì xiě zì le.",
			english: "I could write at five (so early)."
		}, {
			hanzi: "她学了三年才会说。",
			pinyin: "Tā xué le sān nián cái huì shuō.",
			english: "Only after three years could she speak."
		}]
	},
	{
		id: "shi-de-focus",
		title: "是 … 的 for focus",
		titleZh: "是……的",
		hsk: 3,
		body: "To emphasize time, place, or manner of a known past event: 我是去年来的, 他是坐火车去的. The event is already established; 是…的 picks out a detail. Don't use it for new information about the future.",
		examples: [{
			hanzi: "我是在北京学的汉语。",
			pinyin: "Wǒ shì zài Běijīng xué de Hànyǔ.",
			english: "It was in Beijing that I studied Chinese."
		}, {
			hanzi: "他们是昨天到的。",
			pinyin: "Tāmen shì zuótiān dào de.",
			english: "They arrived yesterday (that's when)."
		}]
	},
	{
		id: "relative-de",
		title: "Relative clauses with 的",
		titleZh: "的字结构",
		hsk: 4,
		body: "Chinese puts the whole clause before the noun: 我昨天买的书 (the book that I bought yesterday). There is no 'that/which' word besides 的. Long clauses stay in front — this is the opposite of English and a core fluency skill.",
		examples: [{
			hanzi: "他写的文章很有意思。",
			pinyin: "Tā xiě de wénzhāng hěn yǒu yìsi.",
			english: "The article he wrote is interesting."
		}, {
			hanzi: "我认识的那个老师姓王。",
			pinyin: "Wǒ rènshi de nàge lǎoshī xìng Wáng.",
			english: "That teacher I know is surnamed Wang."
		}]
	},
	{
		id: "aspect-vs-tense",
		title: "Aspect, not tense",
		titleZh: "体，不是时态",
		hsk: 4,
		body: "Mandarin does not conjugate for past/present/future. Time is adverbial (昨天, 正在, 会, 要). Aspect particles 了, 过, 着, 在 mark viewpoint: completion, experience, duration, progression. Fluency means choosing aspect, then placing a time word if needed.",
		examples: [
			{
				hanzi: "他看着窗外。",
				pinyin: "Tā kàn zhe chuāng wài.",
				english: "He is looking out the window (ongoing)."
			},
			{
				hanzi: "明天我会给你打电话。",
				pinyin: "Míngtiān wǒ huì gěi nǐ dǎ diànhuà.",
				english: "Tomorrow I will call you."
			},
			{
				hanzi: "我在中国住了三年。",
				pinyin: "Wǒ zài Zhōngguó zhù le sān nián.",
				english: "I lived in China for three years."
			}
		]
	},
	{
		id: "topic-comment",
		title: "Topic-comment order",
		titleZh: "话题—说明",
		hsk: 4,
		body: "Chinese often names a topic first, then comments: 这件事我知道, 北京秋天最美. The topic can be an object, a place, or a whole situation. This is why 把 exists and why subjects go missing. Reading news and essays requires seeing the topic fast.",
		examples: [{
			hanzi: "这个问题，我们明天再谈。",
			pinyin: "Zhège wèntí, wǒmen míngtiān zài tán.",
			english: "This issue — we'll talk tomorrow."
		}, {
			hanzi: "饭我已经吃了。",
			pinyin: "Fàn wǒ yǐjīng chī le.",
			english: "The meal, I've already eaten."
		}]
	},
	{
		id: "register",
		title: "Register: 您, 请, and written style",
		titleZh: "语体",
		hsk: 5,
		body: "Spoken Mandarin prefers short clauses, 就, 那, 然后. Formal written Chinese uses 因此, 然而, 以及, four-character phrases, and fewer pronouns. 您 is polite 'you'. Fluency is switching: order a meal in short speech, write an email with 此致敬礼.",
		examples: [{
			hanzi: "您慢走。",
			pinyin: "Nín màn zǒu.",
			english: "Take care (polite farewell)."
		}, {
			hanzi: "鉴于以上原因，我们决定取消会议。",
			pinyin: "Jiànyú yǐshàng yuányīn, wǒmen juédìng qǔxiāo huìyì.",
			english: "In view of the above, we have decided to cancel the meeting."
		}]
	},
	{
		id: "chengyu-use",
		title: "Using 成语",
		titleZh: "成语",
		hsk: 6,
		body: "Chengyu are four-character classical fossils. Use one per idea, in the right slot, not as decoration. Many are full clauses: 这简直是对牛弹琴. Knowing the story (守株待兔, 画蛇添足) keeps you from misusing them. Overusing them sounds like a textbook; one well-placed idiom sounds native.",
		examples: [{
			hanzi: "学习最怕半途而废。",
			pinyin: "Xuéxí zuì pà bàn tú ér fèi.",
			english: "In study, the fear is giving up halfway."
		}, {
			hanzi: "别画蛇添足，这样就很好。",
			pinyin: "Bié huà shé tiān zú, zhèyàng jiù hěn hǎo.",
			english: "Don't gild the lily — this is already good."
		}]
	}
].map((g) => [g.id, g]));
function LessonPlayer({ lessonId }) {
	const def = LESSON_BY_ID[lessonId];
	const items = (0, import_react.useMemo)(() => lessonItems(lessonId), [lessonId]);
	const [i, setI] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const [earned, setEarned] = (0, import_react.useState)(0);
	const completeLesson = useAppStore((s) => s.completeLesson);
	const addXp = useAppStore((s) => s.addXp);
	const navigate = useNavigate();
	const next = nextLessonId(lessonId);
	if (!def) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "That lesson is not on the path."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/path",
				children: "Back to path"
			})
		})]
	});
	const item = items[i];
	const pct = items.length ? i / items.length * 100 : 0;
	function advance(xp = 0) {
		if (xp) {
			addXp(xp);
			setEarned((e) => e + xp);
		}
		if (i + 1 >= items.length) {
			completeLesson(lessonId, next);
			setDone(true);
		} else setI((n) => n + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col px-4 pb-8 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Back",
					className: "flex size-11 items-center justify-center rounded-md hover:bg-surface",
					onClick: () => navigate({ to: "/path" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate font-display text-sm",
						children: [
							def.titleZh,
							" · ",
							def.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: done ? 100 : pct,
						className: "mt-2"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-xs text-muted",
					children: [
						Math.min(i + 1, items.length),
						"/",
						items.length
					]
				})
			]
		}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Completion, {
			title: def.title,
			titleZh: def.titleZh,
			earned,
			nextId: next
		}) : item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
				item,
				onContinue: advance
			})
		}) : null]
	});
}
function Completion({ title, titleZh, earned, nextId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-16 items-center justify-center rounded-sm bg-primary font-display text-3xl text-primary-fg",
				children: "朱"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl",
				children: titleZh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted",
				children: [title, " is complete."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 tabular-nums text-sm text-muted",
				children: [
					"+",
					earned + 40,
					" XP"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex w-full flex-col gap-2",
				children: [nextId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lesson/$id",
						params: { id: nextId },
						children: "Next lesson"
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/path",
						children: "Path"
					})
				})]
			})
		]
	});
}
function Step({ item, onContinue }) {
	const markKnown = useAppStore((s) => s.markKnown);
	const reviewVocab = useAppStore((s) => s.reviewVocab);
	const showPinyin = useAppStore((s) => s.showPinyin);
	if (item.kind === "tip") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: item.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 leading-relaxed text-muted",
			children: item.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => onContinue(),
			children: "Continue"
		}) })
	] });
	if (item.kind === "teach-tone") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: ["Tone ", item.tone]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl",
			children: item.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: item.contour
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-2",
			children: item.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between rounded-md bg-bg-elevated px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					lang: "zh-CN",
					className: "font-display text-xl",
					children: ex.hanzi
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-sm text-muted",
					children: ex.pinyin
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: ex.hanzi })]
			}, ex.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => onContinue(),
			children: "Continue"
		}) })
	] });
	if (item.kind === "teach-sound") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-4xl",
			children: item.pinyin
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 leading-relaxed text-muted",
			children: item.note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-wrap justify-center gap-2",
			children: item.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => speakZh(ex),
				className: "rounded-md bg-paper px-3 py-2 font-display text-xl text-ink",
				children: ex
			}, ex))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => onContinue(),
			children: "Continue"
		}) })
	] });
	if (item.kind === "teach-vocab") {
		const v = getVocab(item.vocabId);
		if (!v) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HanziBlock, {
				hanzi: v.hanzi,
				pinyin: showPinyin ? v.pinyin : void 0,
				english: v.english,
				size: "xl"
			}),
			v.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mt-6 w-full rounded-md bg-bg-elevated px-4 py-3 text-left",
				onClick: () => speakZh(v.example.hanzi),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						lang: "zh-CN",
						className: "font-display text-lg",
						children: v.example.hanzi
					}),
					showPinyin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: v.example.pinyin
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: v.example.english
					})
				]
			}) : null,
			item.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: item.note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Footer, {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "lg",
					onClick: () => {
						markKnown(v.id);
						onContinue(5);
					},
					children: "I know this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: () => {
						reviewVocab(v.id, 3);
						onContinue(8);
					},
					children: "Continue"
				})]
			})
		] });
	}
	if (item.kind === "grammar") {
		const g = GRAMMAR_BY_ID[item.grammarId];
		if (!g) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted",
				children: "Grammar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl",
				children: g.titleZh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: g.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-relaxed text-muted",
				children: g.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: g.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "w-full rounded-md bg-paper px-4 py-3 text-left text-ink",
					onClick: () => speakZh(ex.hanzi),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							lang: "zh-CN",
							className: "font-display text-lg",
							children: ex.hanzi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70",
							children: ex.pinyin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70",
							children: ex.english
						}),
						ex.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs opacity-60",
							children: ex.note
						}) : null
					]
				}) }, ex.hanzi))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "w-full",
				onClick: () => onContinue(10),
				children: "Continue"
			}) })
		] });
	}
	if (item.kind === "dialogue") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueBlock, {
		lines: item.lines,
		onContinue: () => onContinue(10)
	});
	if (item.kind === "quiz") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizBlock, {
		quiz: item.quiz,
		onResult: (ok) => onContinue(ok ? 12 : 4)
	});
	return null;
}
function Panel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 flex-col",
		children
	});
}
function Footer({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-auto pt-8", className),
		children
	});
}
function DialogueBlock({ lines, onContinue }) {
	const [shown, setShown] = (0, import_react.useState)(1);
	const showPinyin = useAppStore((s) => s.showPinyin);
	const line = lines[shown - 1];
	(0, import_react.useEffect)(() => {
		if (line) speakZh(line.hanzi);
	}, [shown, line]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: "Dialogue"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: lines.slice(0, shown).map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("rounded-lg px-4 py-3", l.speaker === "A" ? "bg-paper text-ink" : "bg-bg-elevated text-fg"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-60",
						children: l.speaker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						lang: "zh-CN",
						className: "font-display text-lg",
						children: l.hanzi
					}),
					showPinyin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-70",
						children: l.pinyin
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-70",
						children: l.english
					})
				]
			}, `${l.hanzi}-${idx}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: shown < lines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => setShown((n) => n + 1),
			children: "Next line"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: onContinue,
			children: "Continue"
		}) })
	] });
}
function QuizBlock({ quiz, onResult }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const recordTone = useAppStore((s) => s.recordTone);
	const recordListen = useAppStore((s) => s.recordListen);
	(0, import_react.useEffect)(() => {
		if (quiz.type === "mc" && quiz.speak) speakZh(quiz.speak);
		if (quiz.type === "tone-pick") speakZh(quiz.speak);
		if (quiz.type === "type" && quiz.speak) speakZh(quiz.speak);
	}, [quiz]);
	if (quiz.type === "match") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBlock, {
		quiz,
		onResult
	});
	if (quiz.type === "type") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBlock, {
		quiz,
		onResult
	});
	const options = quiz.options;
	const correct = quiz.answer;
	const ok = picked === correct;
	function lock() {
		if (picked === null) return;
		setChecked(true);
		if (quiz.type === "tone-pick") recordTone(ok);
		if (quiz.type === "mc" && quiz.speak && !quiz.promptHanzi) recordListen(ok);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: "Check"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl",
			children: quiz.type === "mc" ? quiz.prompt : "Which tone?"
		}),
		quiz.type === "mc" && quiz.promptHanzi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			lang: "zh-CN",
			className: "mt-3 font-display text-4xl",
			children: quiz.promptHanzi
		}) : null,
		quiz.type === "tone-pick" && quiz.hanzi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			lang: "zh-CN",
			className: "mt-3 font-display text-5xl",
			children: quiz.hanzi
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-2",
			children: options.map((opt, idx) => {
				const selected = picked === idx;
				const reveal = checked && (idx === correct || selected);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: checked,
					onClick: () => setPicked(idx),
					className: cn("min-h-12 rounded-md px-4 py-3 text-left text-sm shadow-[var(--shadow-border)] transition-colors duration-150", selected && !checked && "bg-surface", !selected && !checked && "bg-bg-elevated hover:bg-surface", reveal && idx === correct && "bg-success/20 text-fg", reveal && selected && idx !== correct && "bg-primary/20"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 text-xs text-muted",
						children: idx + 1
					}), opt]
				}, opt);
			})
		}),
		checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-4 text-sm", ok ? "text-success" : "text-primary"),
			children: ok ? "Correct." : `It was “${options[correct]}”.`
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: !checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			disabled: picked === null,
			onClick: lock,
			children: "Check"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => onResult(ok),
			children: "Continue"
		}) })
	] });
}
function TypeBlock({ quiz, onResult }) {
	const [value, setValue] = (0, import_react.useState)("");
	const [checked, setChecked] = (0, import_react.useState)(false);
	const ok = quiz.answers.some((a) => pinyinMatches(value, a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: "Type pinyin"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl",
			children: quiz.prompt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mt-6",
			autoCapitalize: "off",
			autoCorrect: "off",
			value,
			onChange: (e) => setValue(e.target.value),
			placeholder: "pinyin",
			onKeyDown: (e) => {
				if (e.key === "Enter" && !checked) setChecked(true);
			}
		}),
		checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-4 text-sm", ok ? "text-success" : "text-primary"),
			children: ok ? "Correct." : `Answer: ${quiz.answers[0]}`
		}) : quiz.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-subtle",
			children: [
				"Starts with “",
				quiz.hint,
				"”"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: !checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			disabled: !value.trim(),
			onClick: () => setChecked(true),
			children: "Check"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => onResult(ok),
			children: "Continue"
		}) })
	] });
}
function MatchBlock({ quiz, onResult }) {
	const left = quiz.pairs.map((p) => p.left);
	const [right] = (0, import_react.useState)(() => [...quiz.pairs.map((p) => p.right)].reverse());
	const [selL, setSelL] = (0, import_react.useState)(null);
	const [matched, setMatched] = (0, import_react.useState)({});
	const [wrong, setWrong] = (0, import_react.useState)(0);
	const map = Object.fromEntries(quiz.pairs.map((p) => [p.left, p.right]));
	const done = Object.keys(matched).length === quiz.pairs.length;
	function pickRight(r) {
		if (!selL || Object.values(matched).includes(r)) return;
		if (map[selL] === r) {
			setMatched((m) => ({
				...m,
				[selL]: r
			}));
			const pair = quiz.pairs.find((p) => p.left === selL);
			if (pair?.speak) speakZh(pair.speak);
		} else setWrong((n) => n + 1);
		setSelL(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: "Match"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl",
			children: "Pair each word"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: left.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: Boolean(matched[l]),
					onClick: () => setSelL(l),
					className: cn("flex h-12 w-full items-center justify-center rounded-md font-display text-xl", matched[l] ? "bg-success/20" : selL === l ? "bg-paper text-ink" : "bg-bg-elevated"),
					children: matched[l] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : l
				}, l))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: right.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: Object.values(matched).includes(r),
					onClick: () => pickRight(r),
					className: cn("flex h-12 w-full items-center justify-center rounded-md px-2 text-sm", Object.values(matched).includes(r) ? "bg-success/20" : "bg-bg-elevated"),
					children: r
				}, r))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			disabled: !done,
			onClick: () => onResult(wrong === 0),
			children: "Continue"
		}) })
	] });
}
function LessonPage() {
	const { id } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonPlayer, { lessonId: id });
}
//#endregion
export { LessonPage as component };
