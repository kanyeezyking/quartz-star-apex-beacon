export type ScenarioLine = {
  npc: { hanzi: string; pinyin: string; english: string };
  choices: { hanzi: string; pinyin: string; english: string; good: boolean }[];
};

export type Scenario = {
  id: string;
  title: string;
  titleZh: string;
  level: string;
  setting: string;
  lines: ScenarioLine[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    title: "At the teahouse",
    titleZh: "茶馆",
    level: "HSK 1–2",
    setting: "A small teahouse in Beijing. You sit down. The waiter comes over.",
    lines: [
      {
        npc: { hanzi: "您好，请问喝点儿什么？", pinyin: "Nín hǎo, qǐngwèn hē diǎnr shénme?", english: "Hello, what would you like to drink?" },
        choices: [
          { hanzi: "我喝茶。", pinyin: "Wǒ hē chá.", english: "I'll have tea.", good: true },
          { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", english: "I am a student.", good: false },
          { hanzi: "火车站在哪儿？", pinyin: "Huǒchēzhàn zài nǎr?", english: "Where is the train station?", good: false },
        ],
      },
      {
        npc: { hanzi: "红茶还是绿茶？", pinyin: "Hóngchá háishi lǜchá?", english: "Black tea or green tea?" },
        choices: [
          { hanzi: "绿茶吧，谢谢。", pinyin: "Lǜchá ba, xièxie.", english: "Green tea, thanks.", good: true },
          { hanzi: "我没有。", pinyin: "Wǒ méiyǒu.", english: "I don't have any.", good: false },
          { hanzi: "明天见。", pinyin: "Míngtiān jiàn.", english: "See you tomorrow.", good: false },
        ],
      },
      {
        npc: { hanzi: "好的。您还要别的吗？", pinyin: "Hǎo de. Nín hái yào biéde ma?", english: "Alright. Anything else?" },
        choices: [
          { hanzi: "不要了，谢谢。", pinyin: "Bú yào le, xièxie.", english: "Nothing else, thanks.", good: true },
          { hanzi: "我很冷。", pinyin: "Wǒ hěn lěng.", english: "I'm cold.", good: false },
          { hanzi: "他是谁？", pinyin: "Tā shì shéi?", english: "Who is he?", good: false },
        ],
      },
    ],
  },
  {
    id: "street",
    title: "Asking the way",
    titleZh: "问路",
    level: "HSK 2–3",
    setting: "You are near a subway entrance and need the bookstore.",
    lines: [
      {
        npc: { hanzi: "你好，你找什么？", pinyin: "Nǐ hǎo, nǐ zhǎo shénme?", english: "Hi, what are you looking for?" },
        choices: [
          { hanzi: "请问，书店怎么走？", pinyin: "Qǐngwèn, shūdiàn zěnme zǒu?", english: "Excuse me, how do I get to the bookstore?", good: true },
          { hanzi: "我要吃饭。", pinyin: "Wǒ yào chī fàn.", english: "I want to eat.", good: false },
          { hanzi: "今天星期二。", pinyin: "Jīntiān xīngqī èr.", english: "Today is Tuesday.", good: false },
        ],
      },
      {
        npc: { hanzi: "一直往前走，到红绿灯往右拐。", pinyin: "Yìzhí wǎng qián zǒu, dào hónglǜdēng wǎng yòu guǎi.", english: "Go straight, turn right at the lights." },
        choices: [
          { hanzi: "远不远？", pinyin: "Yuǎn bu yuǎn?", english: "Is it far?", good: true },
          { hanzi: "我叫小明。", pinyin: "Wǒ jiào Xiǎomíng.", english: "My name is Xiaoming.", good: false },
          { hanzi: "苹果多少钱？", pinyin: "Píngguǒ duōshao qián?", english: "How much are the apples?", good: false },
        ],
      },
      {
        npc: { hanzi: "不远，走五分钟就到。", pinyin: "Bù yuǎn, zǒu wǔ fēnzhōng jiù dào.", english: "Not far — five minutes' walk." },
        choices: [
          { hanzi: "太谢谢你了。", pinyin: "Tài xièxie nǐ le.", english: "Thank you so much.", good: true },
          { hanzi: "我不高兴。", pinyin: "Wǒ bù gāoxìng.", english: "I'm not happy.", good: false },
          { hanzi: "这是我的猫。", pinyin: "Zhè shì wǒ de māo.", english: "This is my cat.", good: false },
        ],
      },
    ],
  },
  {
    id: "plans",
    title: "Making plans",
    titleZh: "约时间",
    level: "HSK 3",
    setting: "A classmate wants to review together before the exam.",
    lines: [
      {
        npc: { hanzi: "你明天有空吗？我们一起复习吧。", pinyin: "Nǐ míngtiān yǒu kòng ma? Wǒmen yìqǐ fùxí ba.", english: "Are you free tomorrow? Let's review together." },
        choices: [
          { hanzi: "好啊。什么时候？", pinyin: "Hǎo a. Shénme shíhou?", english: "Sure. When?", good: true },
          { hanzi: "我不是学生。", pinyin: "Wǒ bú shì xuéshēng.", english: "I'm not a student.", good: false },
          { hanzi: "火车很贵。", pinyin: "Huǒchē hěn guì.", english: "Trains are expensive.", good: false },
        ],
      },
      {
        npc: { hanzi: "下午三点，在图书馆门口见。", pinyin: "Xiàwǔ sān diǎn, zài túshūguǎn ménkǒu jiàn.", english: "3 p.m., at the library entrance." },
        choices: [
          { hanzi: "如果下雨呢？", pinyin: "Rúguǒ xià yǔ ne?", english: "What if it rains?", good: true },
          { hanzi: "我吃米饭。", pinyin: "Wǒ chī mǐfàn.", english: "I eat rice.", good: false },
          { hanzi: "她很漂亮。", pinyin: "Tā hěn piàoliang.", english: "She is pretty.", good: false },
        ],
      },
      {
        npc: { hanzi: "那我们就在咖啡馆见。我把地址发给你。", pinyin: "Nà wǒmen jiù zài kāfēiguǎn jiàn. Wǒ bǎ dìzhǐ fā gěi nǐ.", english: "Then let's meet at the cafe. I'll send you the address." },
        choices: [
          { hanzi: "行，到时候见。", pinyin: "Xíng, dào shíhou jiàn.", english: "Deal, see you then.", good: true },
          { hanzi: "我不认识你。", pinyin: "Wǒ bú rènshi nǐ.", english: "I don't know you.", good: false },
          { hanzi: "这不是茶。", pinyin: "Zhè bú shì chá.", english: "This is not tea.", good: false },
        ],
      },
    ],
  },
  {
    id: "work",
    title: "A work conversation",
    titleZh: "工作",
    level: "HSK 4–5",
    setting: "Your manager asks about a delayed report.",
    lines: [
      {
        npc: { hanzi: "报告还没交。是不是遇到什么困难了？", pinyin: "Bàogào hái méi jiāo. Shì bu shì yùdào shénme kùnnan le?", english: "The report isn't in. Did you run into some difficulty?" },
        choices: [
          { hanzi: "数据还没齐，我正在处理。", pinyin: "Shùjù hái méi qí, wǒ zhèngzài chǔlǐ.", english: "The data isn't complete yet; I'm handling it.", good: true },
          { hanzi: "我喜欢喝茶。", pinyin: "Wǒ xǐhuan hē chá.", english: "I like drinking tea.", good: false },
          { hanzi: "今天星期几？", pinyin: "Jīntiān xīngqī jǐ?", english: "What day is it?", good: false },
        ],
      },
      {
        npc: { hanzi: "那你大概什么时候能完成？", pinyin: "Nà nǐ dàgài shénme shíhou néng wánchéng?", english: "When can you roughly finish?" },
        choices: [
          { hanzi: "明天下午之前一定交给你。", pinyin: "Míngtiān xiàwǔ zhīqián yídìng jiāo gěi nǐ.", english: "I'll definitely get it to you before tomorrow afternoon.", good: true },
          { hanzi: "火车站很远。", pinyin: "Huǒchēzhàn hěn yuǎn.", english: "The station is far.", good: false },
          { hanzi: "我有一只猫。", pinyin: "Wǒ yǒu yì zhī māo.", english: "I have a cat.", good: false },
        ],
      },
      {
        npc: { hanzi: "好。有问题随时跟我联系。", pinyin: "Hǎo. Yǒu wèntí suíshí gēn wǒ liánxì.", english: "Alright. Contact me anytime if there's a problem." },
        choices: [
          { hanzi: "谢谢你的理解，我会尽快。", pinyin: "Xièxie nǐ de lǐjiě, wǒ huì jǐnkuài.", english: "Thanks for understanding — I'll be as quick as I can.", good: true },
          { hanzi: "不客气。", pinyin: "Bú kèqi.", english: "You're welcome.", good: false },
          { hanzi: "再见，老师。", pinyin: "Zàijiàn, lǎoshī.", english: "Goodbye, teacher.", good: false },
        ],
      },
    ],
  },
];
