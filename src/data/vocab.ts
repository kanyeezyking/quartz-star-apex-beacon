import type { Vocab } from "@/lib/types";

function parse(raw: string): Vocab[] {
  const seen = new Set<string>();
  const out: Vocab[] = [];
  for (const line of raw.trim().split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [id, hanzi, pinyin, english, hsk, pos, exH, exP, exE] = t.split("|");
    if (!id || !hanzi || !pinyin || !english || !hsk || !pos) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      hanzi,
      pinyin,
      english,
      hsk: Number(hsk) as Vocab["hsk"],
      pos,
      example:
        exH && exP && exE
          ? { hanzi: exH, pinyin: exP, english: exE }
          : undefined,
    });
  }
  return out;
}

const RAW = `
# HSK 1
wo|我|wǒ|I; me|1|pron|我是学生。|Wǒ shì xuéshēng.|I am a student.
ni|你|nǐ|you|1|pron|你好吗？|Nǐ hǎo ma?|How are you?
ta-he|他|tā|he; him|1|pron|他是老师。|Tā shì lǎoshī.|He is a teacher.
ta-she|她|tā|she; her|1|pron|她很高兴。|Tā hěn gāoxìng.|She is happy.
wo-men|我们|wǒmen|we; us|1|pron|我们去学校。|Wǒmen qù xuéxiào.|We go to school.
zhe|这|zhè|this|1|pron|这是我的书。|Zhè shì wǒ de shū.|This is my book.
na|那|nà|that|1|pron|那是猫。|Nà shì māo.|That is a cat.
na-which|哪|nǎ|which|1|pron|你喜欢哪个？|Nǐ xǐhuan nǎ ge?|Which one do you like?
shei|谁|shéi|who|1|pron|他是谁？|Tā shì shéi?|Who is he?
shenme|什么|shénme|what|1|pron|这是什么？|Zhè shì shénme?|What is this?
zenme|怎么|zěnme|how|1|adv|这个字怎么写？|Zhège zì zěnme xiě?|How do you write this character?
zenmeyang|怎么样|zěnmeyàng|how is it; how about|1|pron|今天怎么样？|Jīntiān zěnmeyàng?|How is today?
duoshao|多少|duōshao|how much; how many|1|pron|这个多少钱？|Zhège duōshao qián?|How much is this?
ji|几|jǐ|how many; several|1|num|你几岁？|Nǐ jǐ suì?|How old are you?
ma|吗|ma|yes-no question particle|1|part|你是学生吗？|Nǐ shì xuéshēng ma?|Are you a student?
ne|呢|ne|and...?; particle|1|part|我很好，你呢？|Wǒ hěn hǎo, nǐ ne?|I'm fine, and you?
de|的|de|possessive / attributive particle|1|part|这是我的电脑。|Zhè shì wǒ de diànnǎo.|This is my computer.
le|了|le|completed action / change of state|1|part|我吃了米饭。|Wǒ chī le mǐfàn.|I ate rice.
shi|是|shì|to be|1|v|她是医生。|Tā shì yīshēng.|She is a doctor.
you|有|yǒu|to have; there is|1|v|我有一个朋友。|Wǒ yǒu yí ge péngyou.|I have a friend.
mei|没|méi|not (past / have)|1|adv|我没有猫。|Wǒ méiyǒu māo.|I don't have a cat.
meiyou|没有|méiyǒu|do not have; did not|1|v|他没有钱。|Tā méiyǒu qián.|He has no money.
bu|不|bù|not|1|adv|我不是老师。|Wǒ bú shì lǎoshī.|I am not a teacher.
hen|很|hěn|very|1|adv|天气很好。|Tiānqì hěn hǎo.|The weather is very good.
tai|太|tài|too; extremely|1|adv|太冷了。|Tài lěng le.|It's too cold.
dou|都|dōu|all; both|1|adv|我们都喜欢茶。|Wǒmen dōu xǐhuan chá.|We all like tea.
he|和|hé|and|1|conj|我和妈妈去商店。|Wǒ hé māma qù shāngdiàn.|Mom and I go to the store.
zai|在|zài|at; in; on|1|prep|我在北京。|Wǒ zài Běijīng.|I am in Beijing.
ai|爱|ài|to love|1|v|我爱我的家。|Wǒ ài wǒ de jiā.|I love my family.
xihuan|喜欢|xǐhuan|to like|1|v|我喜欢喝茶。|Wǒ xǐhuan hē chá.|I like drinking tea.
yao|要|yào|to want; going to|1|v|我要水。|Wǒ yào shuǐ.|I want water.
xiang|想|xiǎng|to think; to want to|1|v|我想睡觉。|Wǒ xiǎng shuìjiào.|I want to sleep.
hui|会|huì|can; will; know how|1|v|我会写汉字。|Wǒ huì xiě Hànzì.|I can write Chinese characters.
neng|能|néng|can; be able to|1|v|你能来吗？|Nǐ néng lái ma?|Can you come?
qu|去|qù|to go|1|v|我去医院。|Wǒ qù yīyuàn.|I go to the hospital.
lai|来|lái|to come|1|v|请过来。|Qǐng guò lái.|Please come over.
hui-return|回|huí|to return|1|v|我回家。|Wǒ huí jiā.|I'm going home.
chi|吃|chī|to eat|1|v|他吃饭了。|Tā chī fàn le.|He ate.
he-drink|喝|hē|to drink|1|v|请喝茶。|Qǐng hē chá.|Please have some tea.
kan|看|kàn|to look; to watch; to read|1|v|我看电影。|Wǒ kàn diànyǐng.|I watch a movie.
kanjian|看见|kànjiàn|to see|1|v|我看见一只狗。|Wǒ kànjiàn yì zhī gǒu.|I see a dog.
ting|听|tīng|to listen|1|v|请听我说。|Qǐng tīng wǒ shuō.|Please listen to me.
shuo|说|shuō|to speak; to say|1|v|她说汉语。|Tā shuō Hànyǔ.|She speaks Chinese.
du|读|dú|to read|1|v|我读书。|Wǒ dú shū.|I read books.
xie|写|xiě|to write|1|v|请写你的名字。|Qǐng xiě nǐ de míngzi.|Please write your name.
mai|买|mǎi|to buy|1|v|我买苹果。|Wǒ mǎi píngguǒ.|I buy apples.
kai|开|kāi|to open; to drive; to start|1|v|请开车。|Qǐng kāi chē.|Please drive.
zuo-sit|坐|zuò|to sit; to take (transport)|1|v|请坐。|Qǐng zuò.|Please sit.
zuo|做|zuò|to do; to make|1|v|你做什么工作？|Nǐ zuò shénme gōngzuò?|What work do you do?
zhu|住|zhù|to live; to stay|1|v|我住在北京。|Wǒ zhù zài Běijīng.|I live in Beijing.
jiao|叫|jiào|to be called; to call|1|v|我叫小明。|Wǒ jiào Xiǎomíng.|My name is Xiaoming.
qing|请|qǐng|please; to invite|1|v|请问，这是什么？|Qǐngwèn, zhè shì shénme?|Excuse me, what is this?
xuexi|学习|xuéxí|to study|1|v|我在学习汉语。|Wǒ zài xuéxí Hànyǔ.|I am studying Chinese.
gongzuo|工作|gōngzuò|to work; job|1|n|他在医院工作。|Tā zài yīyuàn gōngzuò.|He works at a hospital.
shuijiao|睡觉|shuìjiào|to sleep|1|v|我想睡觉。|Wǒ xiǎng shuìjiào.|I want to sleep.
dadianhua|打电话|dǎ diànhuà|to make a phone call|1|v|我给妈妈打电话。|Wǒ gěi māma dǎ diànhuà.|I call my mom.
xiayu|下雨|xià yǔ|to rain|1|v|今天下雨。|Jīntiān xià yǔ.|It is raining today.
renshi|认识|rènshi|to know (someone); to recognize|1|v|很高兴认识你。|Hěn gāoxìng rènshi nǐ.|Nice to meet you.
xiexie|谢谢|xièxie|thank you|1|v|谢谢你的茶。|Xièxie nǐ de chá.|Thank you for the tea.
bukeqi|不客气|bú kèqi|you're welcome|1|ph|谢谢！不客气。|Xièxie! Bú kèqi.|Thanks! You're welcome.
duibuqi|对不起|duìbuqǐ|sorry|1|ph|对不起，我来晚了。|Duìbuqǐ, wǒ lái wǎn le.|Sorry, I came late.
meiguanxi|没关系|méi guānxi|it's all right|1|ph|对不起。没关系。|Duìbuqǐ. Méi guanxi.|Sorry. It's fine.
zaijian|再见|zàijiàn|goodbye|1|ph|明天见，再见。|Míngtiān jiàn, zàijiàn.|See you tomorrow, goodbye.
nihao|你好|nǐ hǎo|hello|1|ph|你好，我是老师。|Nǐ hǎo, wǒ shì lǎoshī.|Hello, I am a teacher.
mingzi|名字|míngzi|name|1|n|你叫什么名字？|Nǐ jiào shénme míngzi?|What is your name?
pengyou|朋友|péngyou|friend|1|n|他是我的朋友。|Tā shì wǒ de péngyou.|He is my friend.
jia|家|jiā|home; family|1|n|我家不大。|Wǒ jiā bú dà.|My home is not big.
baba|爸爸|bàba|dad|1|n|我爸爸是医生。|Wǒ bàba shì yīshēng.|My dad is a doctor.
mama|妈妈|māma|mom|1|n|妈妈在做饭。|Māma zài zuò fàn.|Mom is cooking.
erzi|儿子|érzi|son|1|n|她有一个儿子。|Tā yǒu yí ge érzi.|She has a son.
nver|女儿|nǚ'ér|daughter|1|n|我女儿八岁。|Wǒ nǚ'ér bā suì.|My daughter is eight.
laoshi|老师|lǎoshī|teacher|1|n|王老师很好。|Wáng lǎoshī hěn hǎo.|Teacher Wang is very nice.
xuesheng|学生|xuéshēng|student|1|n|我们是学生。|Wǒmen shì xuéshēng.|We are students.
tongxue|同学|tóngxué|classmate|1|n|她是我的同学。|Tā shì wǒ de tóngxué.|She is my classmate.
yisheng|医生|yīshēng|doctor|1|n|医生在医院。|Yīshēng zài yīyuàn.|The doctor is at the hospital.
xiansheng|先生|xiānsheng|Mr.; husband|1|n|王先生，您好。|Wáng xiānsheng, nín hǎo.|Hello, Mr. Wang.
xiaojie|小姐|xiǎojie|Miss; young lady|1|n|李小姐是老师。|Lǐ xiǎojie shì lǎoshī.|Miss Li is a teacher.
zhongguo|中国|Zhōngguó|China|1|n|我爱中国。|Wǒ ài Zhōngguó.|I love China.
beijing|北京|Běijīng|Beijing|1|n|北京很大。|Běijīng hěn dà.|Beijing is big.
xuexiao|学校|xuéxiào|school|1|n|学校在前面。|Xuéxiào zài qiánmiàn.|The school is ahead.
shangdian|商店|shāngdiàn|shop|1|n|商店里有苹果。|Shāngdiàn lǐ yǒu píngguǒ.|There are apples in the shop.
yiyuan|医院|yīyuàn|hospital|1|n|他去医院了。|Tā qù yīyuàn le.|He went to the hospital.
huochezhan|火车站|huǒchēzhàn|train station|1|n|火车站在哪儿？|Huǒchēzhàn zài nǎr?|Where is the train station?
feiji|飞机|fēijī|airplane|1|n|飞机很大。|Fēijī hěn dà.|The plane is big.
chuzuche|出租车|chūzūchē|taxi|1|n|我坐出租车。|Wǒ zuò chūzūchē.|I take a taxi.
yifu|衣服|yīfu|clothes|1|n|这件衣服很漂亮。|Zhè jiàn yīfu hěn piàoliang.|This piece of clothing is pretty.
shui|水|shuǐ|water|1|n|请给我一杯水。|Qǐng gěi wǒ yì bēi shuǐ.|Please give me a glass of water.
cha|茶|chá|tea|1|n|中国茶很好喝。|Zhōngguó chá hěn hǎohē.|Chinese tea is delicious.
cai|菜|cài|dish; vegetable|1|n|这个菜太热了。|Zhège cài tài rè le.|This dish is too hot.
mifan|米饭|mǐfàn|cooked rice|1|n|我爱吃米饭。|Wǒ ài chī mǐfàn.|I love eating rice.
shuiguo|水果|shuǐguǒ|fruit|1|n|水果多少钱？|Shuǐguǒ duōshao qián?|How much is the fruit?
pingguo|苹果|píngguǒ|apple|1|n|我买三个苹果。|Wǒ mǎi sān ge píngguǒ.|I buy three apples.
fandian|饭店|fàndiàn|restaurant; hotel|1|n|我们去饭店吃饭。|Wǒmen qù fàndiàn chī fàn.|We go to a restaurant to eat.
beizi|杯子|bēizi|cup; glass|1|n|杯子里有茶。|Bēizi lǐ yǒu chá.|There is tea in the cup.
qian|钱|qián|money|1|n|我没有钱。|Wǒ méiyǒu qián.|I have no money.
kuai|块|kuài|yuan (colloquial); piece|1|m|这个十块钱。|Zhège shí kuài qián.|This is ten yuan.
nian|年|nián|year|1|n|今年我二十岁。|Jīnnián wǒ èrshí suì.|I am twenty this year.
yue|月|yuè|month; moon|1|n|九月很热。|Jiǔ yuè hěn rè.|September is hot.
hao-date|号|hào|date; number|1|n|今天几号？|Jīntiān jǐ hào?|What's today's date?
ri|日|rì|day; sun|1|n|三日是星期一。|Sān rì shì xīngqī yī.|The 3rd is Monday.
xingqi|星期|xīngqī|week|1|n|星期三我工作。|Xīngqī sān wǒ gōngzuò.|I work on Wednesday.
jintian|今天|jīntiān|today|1|n|今天天气很好。|Jīntiān tiānqì hěn hǎo.|The weather is nice today.
mingtian|明天|míngtiān|tomorrow|1|n|明天见。|Míngtiān jiàn.|See you tomorrow.
zuotian|昨天|zuótiān|yesterday|1|n|昨天我在家。|Zuótiān wǒ zài jiā.|Yesterday I was at home.
dian|点|diǎn|o'clock; a bit|1|n|现在三点。|Xiànzài sān diǎn.|It is three o'clock.
fen|分钟|fēnzhōng|minute|1|n|五分钟以后。|Wǔ fēnzhōng yǐhòu.|In five minutes.
xianzai|现在|xiànzài|now|1|n|我现在很忙。|Wǒ xiànzài hěn máng.|I am busy now.
shihou|时候|shíhou|time; moment|1|n|什么时候去？|Shénme shíhou qù?|When do we go?
shangwu|上午|shàngwǔ|morning|1|n|上午我学习。|Shàngwǔ wǒ xuéxí.|I study in the morning.
zhongwu|中午|zhōngwǔ|noon|1|n|中午吃饭。|Zhōngwǔ chī fàn.|Eat at noon.
xiawu|下午|xiàwǔ|afternoon|1|n|下午下雨。|Xiàwǔ xià yǔ.|It rains in the afternoon.
tianqi|天气|tiānqì|weather|1|n|今天天气怎么样？|Jīntiān tiānqì zěnmeyàng?|How is the weather today?
diannao|电脑|diànnǎo|computer|1|n|我的电脑很小。|Wǒ de diànnǎo hěn xiǎo.|My computer is small.
dianshi|电视|diànshì|television|1|n|他在看电视。|Tā zài kàn diànshì.|He is watching TV.
dianying|电影|diànyǐng|movie|1|n|我们去看电影。|Wǒmen qù kàn diànyǐng.|We go watch a movie.
dongxi|东西|dōngxi|thing|1|n|这是什么东西？|Zhè shì shénme dōngxi?|What is this thing?
shu|书|shū|book|1|n|这本书很好。|Zhè běn shū hěn hǎo.|This book is good.
hanzi|汉字|Hànzì|Chinese character|1|n|汉字很难写。|Hànzì hěn nán xiě.|Chinese characters are hard to write.
zi|字|zì|character; word|1|n|这个字是什么？|Zhège zì shì shénme?|What is this character?
hanyu|汉语|Hànyǔ|Chinese language|1|n|我爱学汉语。|Wǒ ài xué Hànyǔ.|I love learning Chinese.
mao|猫|māo|cat|1|n|猫在桌子上。|Māo zài zhuōzi shàng.|The cat is on the table.
gou|狗|gǒu|dog|1|n|狗很大。|Gǒu hěn dà.|The dog is big.
zhuozi|桌子|zhuōzi|table|1|n|书在桌子上。|Shū zài zhuōzi shàng.|The book is on the table.
yizi|椅子|yǐzi|chair|1|n|请坐这把椅子。|Qǐng zuò zhè bǎ yǐzi.|Please sit in this chair.
ren|人|rén|person; people|1|n|家里有三个人。|Jiā lǐ yǒu sān ge rén.|There are three people at home.
hao|好|hǎo|good|1|adj|这个菜很好吃。|Zhège cài hěn hǎochī.|This dish is delicious.
da|大|dà|big|1|adj|北京很大。|Běijīng hěn dà.|Beijing is big.
xiao|小|xiǎo|small|1|adj|小猫很漂亮。|Xiǎo māo hěn piàoliang.|The kitten is pretty.
duo|多|duō|many; much|1|adj|人很多。|Rén hěn duō.|There are many people.
shao|少|shǎo|few; little|1|adj|我的钱很少。|Wǒ de qián hěn shǎo.|I have little money.
re|热|rè|hot|1|adj|今天很热。|Jīntiān hěn rè.|Today is hot.
leng|冷|lěng|cold|1|adj|北京的冬天很冷。|Běijīng de dōngtiān hěn lěng.|Winter in Beijing is cold.
gaoxing|高兴|gāoxìng|happy|1|adj|认识你我很高兴。|Rènshi nǐ wǒ hěn gāoxìng.|I'm happy to meet you.
piaoliang|漂亮|piàoliang|beautiful|1|adj|她很漂亮。|Tā hěn piàoliang.|She is beautiful.
shang|上|shàng|on; above; previous|1|n|书在桌子上。|Shū zài zhuōzi shàng.|The book is on the table.
xia|下|xià|under; next; below|1|n|猫在椅子下。|Māo zài yǐzi xià.|The cat is under the chair.
li|里|lǐ|inside|1|n|学校里有学生。|Xuéxiào lǐ yǒu xuéshēng.|There are students in the school.
qianmian|前面|qiánmiàn|in front|1|n|商店在前面。|Shāngdiàn zài qiánmiàn.|The shop is in front.
houmian|后面|hòumiàn|behind|1|n|他在我后面。|Tā zài wǒ hòumiàn.|He is behind me.
nar|哪儿|nǎr|where|1|pron|你在哪儿？|Nǐ zài nǎr?|Where are you?
yidianr|一点儿|yìdiǎnr|a little|1|n|我会说一点儿汉语。|Wǒ huì shuō yìdiǎnr Hànyǔ.|I can speak a little Chinese.
ge|个|gè|general measure word|1|m|一个老师，两个学生。|Yí ge lǎoshī, liǎng ge xuéshēng.|One teacher, two students.
ben|本|běn|measure word for books|1|m|我有三本书。|Wǒ yǒu sān běn shū.|I have three books.
xie-some|些|xiē|some|1|m|这些苹果很好。|Zhèxiē píngguǒ hěn hǎo.|These apples are good.
sui|岁|suì|years old|1|m|我二十五岁。|Wǒ èrshíwǔ suì.|I am twenty-five.
yi|一|yī|one|1|num|一个杯子。|Yí ge bēizi.|One cup.
er|二|èr|two|1|num|二月很冷。|Èr yuè hěn lěng.|February is cold.
san|三|sān|three|1|num|三个人。|Sān ge rén.|Three people.
si|四|sì|four|1|num|现在四点。|Xiànzài sì diǎn.|It is four o'clock.
wu|五|wǔ|five|1|num|五块钱。|Wǔ kuài qián.|Five yuan.
liu|六|liù|six|1|num|星期六我在家。|Xīngqī liù wǒ zài jiā.|I'm at home on Saturday.
qi|七|qī|seven|1|num|七月很热。|Qī yuè hěn rè.|July is hot.
ba|八|bā|eight|1|num|我八点睡觉。|Wǒ bā diǎn shuìjiào.|I sleep at eight.
jiu|九|jiǔ|nine|1|num|九个人。|Jiǔ ge rén.|Nine people.
shi|十|shí|ten|1|num|十个汉字。|Shí ge Hànzì.|Ten characters.
ling|零|líng|zero|1|num|现在三点零五分。|Xiànzài sān diǎn líng wǔ fēn.|It is 3:05.
wei|喂|wèi|hello (on the phone)|1|int|喂，你是谁？|Wèi, nǐ shì shéi?|Hello, who is this?
ditie|地铁|dìtiě|subway|3|n|坐地铁很方便。|Zuò dìtiě hěn fāngbiàn.|Taking the subway is convenient.

# HSK 2
ba-part|吧|ba|suggestion particle|2|part|我们走吧。|Wǒmen zǒu ba.|Let's go.
bai|白|bái|white|2|adj|白猫很漂亮。|Bái māo hěn piàoliang.|The white cat is pretty.
bai-hundred|百|bǎi|hundred|2|num|一百块钱。|Yìbǎi kuài qián.|One hundred yuan.
bangzhu|帮助|bāngzhù|to help|2|v|请帮助我。|Qǐng bāngzhù wǒ.|Please help me.
bi|比|bǐ|compared with|2|prep|他比我大。|Tā bǐ wǒ dà.|He is older than me.
bie|别|bié|don't|2|adv|别说话。|Bié shuōhuà.|Don't talk.
chang|长|cháng|long|2|adj|这条路很长。|Zhè tiáo lù hěn cháng.|This road is long.
changge|唱歌|chàng gē|to sing|2|v|她喜欢唱歌。|Tā xǐhuan chàng gē.|She likes to sing.
chu|出|chū|to go out|2|v|我出去了。|Wǒ chū qù le.|I went out.
chuan|穿|chuān|to wear|2|v|今天穿什么衣服？|Jīntiān chuān shénme yīfu?|What will you wear today?
ci|次|cì|time (occurrence)|2|m|我去过两次。|Wǒ qù guo liǎng cì.|I have been twice.
cong|从|cóng|from|2|prep|我从北京来。|Wǒ cóng Běijīng lái.|I come from Beijing.
cuo|错|cuò|wrong|2|adj|对不起，我错了。|Duìbuqǐ, wǒ cuò le.|Sorry, I was wrong.
dao|到|dào|to arrive; to|2|v|我们到学校了。|Wǒmen dào xuéxiào le.|We arrived at school.
de-comp|得|de|structural particle (complement)|2|part|他汉语说得很好。|Tā Hànyǔ shuō de hěn hǎo.|He speaks Chinese very well.
deng|等|děng|to wait|2|v|请等我五分钟。|Qǐng děng wǒ wǔ fēnzhōng.|Please wait five minutes.
didi|弟弟|dìdi|younger brother|2|n|我弟弟十岁。|Wǒ dìdi shí suì.|My younger brother is ten.
diyi|第一|dì yī|first|2|num|这是第一课。|Zhè shì dì yī kè.|This is lesson one.
dong|懂|dǒng|to understand|2|v|你懂吗？|Nǐ dǒng ma?|Do you understand?
dui|对|duì|right; towards|2|adj|你说得对。|Nǐ shuō de duì.|You are right.
fangjian|房间|fángjiān|room|2|n|房间里有桌子。|Fángjiān lǐ yǒu zhuōzi.|There is a table in the room.
feichang|非常|fēicháng|extremely|2|adv|我非常高兴。|Wǒ fēicháng gāoxìng.|I am extremely happy.
gaosu|告诉|gàosu|to tell|2|v|请告诉我。|Qǐng gàosu wǒ.|Please tell me.
gege|哥哥|gēge|older brother|2|n|哥哥在工作。|Gēge zài gōngzuò.|Older brother is working.
gei|给|gěi|to give; for|2|v|给我那本书。|Gěi wǒ nà běn shū.|Give me that book.
gonggongqiche|公共汽车|gōnggòng qìchē|bus|2|n|我坐公共汽车去。|Wǒ zuò gōnggòng qìchē qù.|I go by bus.
gongsi|公司|gōngsī|company|2|n|她在公司工作。|Tā zài gōngsī gōngzuò.|She works at a company.
gui|贵|guì|expensive|2|adj|这件衣服太贵了。|Zhè jiàn yīfu tài guì le.|This clothing is too expensive.
guo|过|guo|experiential aspect|2|part|我去过中国。|Wǒ qù guo Zhōngguó.|I have been to China.
hai|还|hái|still; also|2|adv|我还想喝茶。|Wǒ hái xiǎng hē chá.|I still want to drink tea.
haizi|孩子|háizi|child|2|n|孩子们在学习。|Háizimen zài xuéxí.|The children are studying.
haochi|好吃|hǎochī|tasty|2|adj|中国菜很好吃。|Zhōngguó cài hěn hǎochī.|Chinese food is delicious.
hei|黑|hēi|black|2|adj|黑猫在哪儿？|Hēi māo zài nǎr?|Where is the black cat?
hong|红|hóng|red|2|adj|红苹果很好看。|Hóng píngguǒ hěn hǎokàn.|Red apples look nice.
huanying|欢迎|huānyíng|to welcome|2|v|欢迎来中国。|Huānyíng lái Zhōngguó.|Welcome to China.
huida|回答|huídá|to answer|2|v|请回答这个问题。|Qǐng huídá zhège wèntí.|Please answer this question.
jichang|机场|jīchǎng|airport|2|n|机场离这儿远吗？|Jīchǎng lí zhèr yuǎn ma?|Is the airport far from here?
jidan|鸡蛋|jīdàn|egg|2|n|我早饭吃鸡蛋。|Wǒ zǎofàn chī jīdàn.|I eat eggs for breakfast.
jian|件|jiàn|measure word for clothes / matters|2|m|一件衣服。|Yí jiàn yīfu.|One piece of clothing.
jiaoshi|教室|jiàoshì|classroom|2|n|学生在教室里。|Xuéshēng zài jiàoshì lǐ.|Students are in the classroom.
jiejie|姐姐|jiějie|older sister|2|n|姐姐很漂亮。|Jiějie hěn piàoliang.|Older sister is pretty.
jieshao|介绍|jièshào|to introduce|2|v|我来介绍一下。|Wǒ lái jièshào yíxià.|Let me introduce.
jin|近|jìn|near|2|adj|商店很近。|Shāngdiàn hěn jìn.|The shop is nearby.
jin-enter|进|jìn|to enter|2|v|请进。|Qǐng jìn.|Please come in.
jiu-then|就|jiù|then; right away|2|adv|我现在就去。|Wǒ xiànzài jiù qù.|I'll go right now.
juede|觉得|juéde|to feel; to think|2|v|我觉得很好。|Wǒ juéde hěn hǎo.|I think it's good.
kafei|咖啡|kāfēi|coffee|2|n|我想喝咖啡。|Wǒ xiǎng hē kāfēi.|I want to drink coffee.
kaishi|开始|kāishǐ|to begin|2|v|我们开始上课。|Wǒmen kāishǐ shàng kè.|We begin class.
kaoshi|考试|kǎoshì|exam; to take an exam|2|n|明天有考试。|Míngtiān yǒu kǎoshì.|There is an exam tomorrow.
keneng|可能|kěnéng|maybe; possible|2|adv|他可能不来。|Tā kěnéng bù lái.|He might not come.
keyi|可以|kěyǐ|may; can|2|v|我可以坐下吗？|Wǒ kěyǐ zuò xià ma?|May I sit down?
ke|课|kè|lesson; class|2|n|这节课很有意思。|Zhè jié kè hěn yǒu yìsi.|This class is interesting.
kuai-fast|快|kuài|fast; soon|2|adj|火车很快。|Huǒchē hěn kuài.|The train is fast.
kuaile|快乐|kuàilè|happy|2|adj|生日快乐！|Shēngrì kuàilè!|Happy birthday!
lei|累|lèi|tired|2|adj|工作以后我很累。|Gōngzuò yǐhòu wǒ hěn lèi.|I am tired after work.
li-from|离|lí|away from|2|prep|家离学校不远。|Jiā lí xuéxiào bù yuǎn.|Home is not far from school.
liang|两|liǎng|two (used with measures)|2|num|两个人。|Liǎng ge rén.|Two people.
lu|路|lù|road|2|n|这条路很长。|Zhè tiáo lù hěn cháng.|This road is long.
lvyou|旅游|lǚyóu|to travel|2|v|我想去中国旅游。|Wǒ xiǎng qù Zhōngguó lǚyóu.|I want to travel in China.
mai-sell|卖|mài|to sell|2|v|这家商店卖茶。|Zhè jiā shāngdiàn mài chá.|This shop sells tea.
man|慢|màn|slow|2|adj|请说慢一点儿。|Qǐng shuō màn yìdiǎnr.|Please speak a bit slower.
mang|忙|máng|busy|2|adj|今天我很忙。|Jīntiān wǒ hěn máng.|I am busy today.
mei-every|每|měi|every|2|pron|每天我学习汉语。|Měi tiān wǒ xuéxí Hànyǔ.|I study Chinese every day.
meimei|妹妹|mèimei|younger sister|2|n|妹妹在唱歌。|Mèimei zài chàng gē.|Younger sister is singing.
men|门|mén|door|2|n|请关门。|Qǐng guān mén.|Please close the door.
miantiao|面条|miàntiáo|noodles|2|n|我喜欢吃面条。|Wǒ xǐhuan chī miàntiáo.|I like eating noodles.
nan|男|nán|male|2|adj|那个男人是老师。|Nàge nánrén shì lǎoshī.|That man is a teacher.
nin|您|nín|you (polite)|2|pron|您好，先生。|Nín hǎo, xiānsheng.|Hello, sir.
niunai|牛奶|niúnǎi|milk|2|n|孩子喝牛奶。|Háizi hē niúnǎi.|The child drinks milk.
nv|女|nǚ|female|2|adj|那个女人是医生。|Nàge nǚrén shì yīshēng.|That woman is a doctor.
pangbian|旁边|pángbiān|beside|2|n|猫在桌子旁边。|Māo zài zhuōzi pángbiān.|The cat is beside the table.
paobu|跑步|pǎo bù|to run; to jog|2|v|早上我跑步。|Zǎoshang wǒ pǎo bù.|I jog in the morning.
pianyi|便宜|piányi|cheap|2|adj|这些苹果很便宜。|Zhèxiē píngguǒ hěn piányi.|These apples are cheap.
piao|票|piào|ticket|2|n|我买两张票。|Wǒ mǎi liǎng zhāng piào.|I buy two tickets.
qizi|妻子|qīzi|wife|2|n|我的妻子是老师。|Wǒ de qīzi shì lǎoshī.|My wife is a teacher.
qichuang|起床|qǐ chuáng|to get up|2|v|我七点起床。|Wǒ qī diǎn qǐ chuáng.|I get up at seven.
qian-thousand|千|qiān|thousand|2|num|一千块钱。|Yìqiān kuài qián.|One thousand yuan.
qing-sunny|晴|qíng|sunny|2|adj|今天晴天。|Jīntiān qíngtiān.|Today is sunny.
qunian|去年|qùnián|last year|2|n|去年我去了北京。|Qùnián wǒ qù le Běijīng.|Last year I went to Beijing.
rang|让|ràng|to let; to make|2|v|让我想一想。|Ràng wǒ xiǎng yi xiǎng.|Let me think.
shangban|上班|shàng bān|to go to work|2|v|爸爸八点上班。|Bàba bā diǎn shàng bān.|Dad goes to work at eight.
shenti|身体|shēntǐ|body; health|2|n|你身体好吗？|Nǐ shēntǐ hǎo ma?|How is your health?
shengbing|生病|shēng bìng|to fall ill|2|v|他生病了。|Tā shēng bìng le.|He got sick.
shengri|生日|shēngrì|birthday|2|n|今天是我的生日。|Jīntiān shì wǒ de shēngrì.|Today is my birthday.
shijian|时间|shíjiān|time|2|n|你有时间吗？|Nǐ yǒu shíjiān ma?|Do you have time?
shiqing|事情|shìqing|matter; affair|2|n|我有一点儿事情。|Wǒ yǒu yìdiǎnr shìqing.|I have something to do.
shouji|手机|shǒujī|mobile phone|2|n|我的手机在哪儿？|Wǒ de shǒujī zài nǎr?|Where is my phone?
shuohua|说话|shuō huà|to talk|2|v|请不要说话。|Qǐng bú yào shuō huà.|Please don't talk.
song|送|sòng|to give; to see off|2|v|我送你一本书。|Wǒ sòng nǐ yì běn shū.|I'll give you a book.
suiran|虽然|suīrán|although|2|conj|虽然很累，我还要学习。|Suīrán hěn lèi, wǒ hái yào xuéxí.|Although tired, I still study.
danshi|但是|dànshì|but|2|conj|我想去，但是没有时间。|Wǒ xiǎng qù, dànshì méiyǒu shíjiān.|I want to go, but I have no time.
ta-it|它|tā|it|2|pron|它是我的狗。|Tā shì wǒ de gǒu.|It is my dog.
ti|踢|tī|to kick|2|v|他喜欢踢足球。|Tā xǐhuan tī zúqiú.|He likes to play football.
tiao|题|tí|question; topic|2|n|这道题很难。|Zhè dào tí hěn nán.|This question is hard.
tiaowu|跳舞|tiào wǔ|to dance|2|v|她会跳舞。|Tā huì tiào wǔ.|She can dance.
wai|外|wài|outside|2|n|猫在门外。|Māo zài mén wài.|The cat is outside the door.
wan|完|wán|to finish|2|v|我做完了。|Wǒ zuò wán le.|I finished.
wan-play|玩|wán|to play|2|v|孩子们在玩。|Háizimen zài wán.|The children are playing.
wanshang|晚上|wǎnshang|evening|2|n|晚上见。|Wǎnshang jiàn.|See you in the evening.
weishenme|为什么|wèishénme|why|2|pron|你为什么学汉语？|Nǐ wèishénme xué Hànyǔ?|Why do you study Chinese?
wen|问|wèn|to ask|2|v|我想问一个问题。|Wǒ xiǎng wèn yí ge wèntí.|I want to ask a question.
wenti|问题|wèntí|question; problem|2|n|这是个大问题。|Zhè shì ge dà wèntí.|This is a big problem.
xigua|西瓜|xīguā|watermelon|2|n|夏天吃西瓜。|Xiàtiān chī xīguā.|Eat watermelon in summer.
xiwang|希望|xīwàng|to hope|2|v|我希望明天晴天。|Wǒ xīwàng míngtiān qíngtiān.|I hope tomorrow is sunny.
xi|洗|xǐ|to wash|2|v|我去洗手。|Wǒ qù xǐ shǒu.|I'm going to wash my hands.
xiaoshi|小时|xiǎoshí|hour|2|n|我学习了两个小时。|Wǒ xuéxí le liǎng ge xiǎoshí.|I studied for two hours.
xiao-laugh|笑|xiào|to laugh; smile|2|v|她笑了。|Tā xiào le.|She smiled.
xin|新|xīn|new|2|adj|我买了新衣服。|Wǒ mǎi le xīn yīfu.|I bought new clothes.
xing|姓|xìng|surname; to be surnamed|2|v|我姓王。|Wǒ xìng Wáng.|My surname is Wang.
xiuxi|休息|xiūxi|to rest|2|v|你休息一下吧。|Nǐ xiūxi yíxià ba.|Take a rest.
xue|雪|xuě|snow|2|n|北京下雪了。|Běijīng xià xuě le.|It snowed in Beijing.
yanse|颜色|yánsè|color|2|n|你喜欢什么颜色？|Nǐ xǐhuan shénme yánsè?|What color do you like?
yanjing|眼睛|yǎnjing|eye|2|n|她的眼睛很大。|Tā de yǎnjing hěn dà.|Her eyes are big.
yangrou|羊肉|yángròu|mutton|2|n|羊肉很好吃。|Yángròu hěn hǎochī.|Mutton is delicious.
yao-medicine|药|yào|medicine|2|n|生病了要吃药。|Shēng bìng le yào chī yào.|When sick you take medicine.
ye|也|yě|also|2|adv|我也是学生。|Wǒ yě shì xuéshēng.|I am also a student.
yiqi|一起|yìqǐ|together|2|adv|我们一起去吧。|Wǒmen yìqǐ qù ba.|Let's go together.
yixia|一下|yíxià|a bit; once|2|adv|请看一下。|Qǐng kàn yíxià.|Please take a look.
yijing|已经|yǐjīng|already|2|adv|我已经吃了。|Wǒ yǐjīng chī le.|I have already eaten.
yisi|意思|yìsi|meaning|2|n|这个字是什么意思？|Zhège zì shì shénme yìsi?|What does this character mean?
yinwei|因为|yīnwèi|because|2|conj|因为下雨，我不去。|Yīnwèi xià yǔ, wǒ bú qù.|Because it's raining, I'm not going.
suoyi|所以|suǒyǐ|so; therefore|2|conj|我很累，所以早睡。|Wǒ hěn lèi, suǒyǐ zǎo shuì.|I'm tired, so I sleep early.
yin|阴|yīn|overcast|2|adj|今天阴天。|Jīntiān yīntiān.|Today is overcast.
youyong|游泳|yóu yǒng|to swim|2|v|夏天我喜欢游泳。|Xiàtiān wǒ xǐhuan yóu yǒng.|I like swimming in summer.
youbian|右边|yòubian|right side|2|n|医院在右边。|Yīyuàn zài yòubian.|The hospital is on the right.
yu|鱼|yú|fish|2|n|这条鱼很大。|Zhè tiáo yú hěn dà.|This fish is big.
yuan|远|yuǎn|far|2|adj|火车站很远。|Huǒchēzhàn hěn yuǎn.|The train station is far.
yundong|运动|yùndòng|sport; to exercise|2|n|跑步是运动。|Pǎo bù shì yùndòng.|Running is exercise.
zai-again|再|zài|again|2|adv|请再说一次。|Qǐng zài shuō yí cì.|Please say it again.
zaoshang|早上|zǎoshang|early morning|2|n|早上我喝茶。|Zǎoshang wǒ hē chá.|I drink tea in the morning.
zhangfu|丈夫|zhàngfu|husband|2|n|她的丈夫是医生。|Tā de zhàngfu shì yīshēng.|Her husband is a doctor.
zhao|找|zhǎo|to look for|2|v|我在找我的手机。|Wǒ zài zhǎo wǒ de shǒujī.|I'm looking for my phone.
zhe-ing|着|zhe|aspect particle (ongoing)|2|part|他看着我。|Tā kàn zhe wǒ.|He is looking at me.
zhen|真|zhēn|really|2|adv|这菜真好吃。|Zhè cài zhēn hǎochī.|This dish is really tasty.
zhengzai|正在|zhèngzài|in the middle of|2|adv|我正在学习。|Wǒ zhèngzài xuéxí.|I am studying right now.
zhidao|知道|zhīdào|to know|2|v|我不知道。|Wǒ bù zhīdào.|I don't know.
zhunbei|准备|zhǔnbèi|to prepare|2|v|我准备考试。|Wǒ zhǔnbèi kǎoshì.|I am preparing for the exam.
zou|走|zǒu|to walk; to leave|2|v|我们走吧。|Wǒmen zǒu ba.|Let's go.
zui|最|zuì|most|2|adv|这是最好的茶。|Zhè shì zuì hǎo de chá.|This is the best tea.
zuobian|左边|zuǒbian|left side|2|n|银行在左边。|Yínháng zài zuǒbian.|The bank is on the left.

# HSK 3
ah|啊|a|modal particle|3|part|真好啊！|Zhēn hǎo a!|How nice!
ba-hold|把|bǎ|ba-construction / grasp|3|prep|请把书给我。|Qǐng bǎ shū gěi wǒ.|Please give me the book.
ban|班|bān|class; work shift|3|n|我们班有二十人。|Wǒmen bān yǒu èrshí rén.|Our class has twenty people.
banfa|办法|bànfǎ|method; way|3|n|有什么办法？|Yǒu shénme bànfǎ?|Is there a way?
bangongshi|办公室|bàngōngshì|office|3|n|老师在办公室。|Lǎoshī zài bàngōngshì.|The teacher is in the office.
ban|半|bàn|half|3|num|现在一点半。|Xiànzài yì diǎn bàn.|It is half past one.
bang|帮忙|bāng máng|to help|3|v|你能帮我忙吗？|Nǐ néng bāng wǒ máng ma?|Can you help me?
bao|包|bāo|bag; to wrap|3|n|我的包很重。|Wǒ de bāo hěn zhòng.|My bag is heavy.
bao-thin|饱|bǎo|full (from eating)|3|adj|我吃饱了。|Wǒ chī bǎo le.|I'm full.
beizi-quilt|被子|bèizi|quilt|3|n|冬天的被子很厚。|Dōngtiān de bèizi hěn hòu.|Winter quilts are thick.
bei|北方|běifāng|north|3|n|北方很冷。|Běifāng hěn lěng.|The north is cold.
bei-times|被|bèi|passive marker|3|prep|书被他拿走了。|Shū bèi tā ná zǒu le.|The book was taken by him.
biye|毕业|bì yè|to graduate|3|v|我明年毕业。|Wǒ míngnián bì yè.|I graduate next year.
bian|遍|biàn|time (for actions)|3|m|请再说一遍。|Qǐng zài shuō yí biàn.|Please say it once more.
biaoshi|表示|biǎoshì|to express|3|v|我表示同意。|Wǒ biǎoshì tóngyì.|I express agreement.
bingqilin|冰淇淋|bīngqílín|ice cream|3|n|夏天吃冰淇淋。|Xiàtiān chī bīngqílín.|Eat ice cream in summer.
bozi|瓶子|píngzi|bottle|3|n|瓶子里有水。|Píngzi lǐ yǒu shuǐ.|There is water in the bottle.
bushi|不但|búdàn|not only|3|conj|他不但会汉语，还会日语。|Tā búdàn huì Hànyǔ, hái huì Rìyǔ.|He speaks not only Chinese but also Japanese.
eryie|而且|érqiě|but also|3|conj|而且他写得很好。|Érqiě tā xiě de hěn hǎo.|And he writes well too.
cai-only|才|cái|only then; not until|3|adv|他现在才来。|Tā xiànzài cái lái.|He only just arrived.
cai-menu|菜单|càidān|menu|3|n|请给我菜单。|Qǐng gěi wǒ càidān.|Please give me the menu.
canjia|参加|cānjiā|to participate|3|v|我想参加这个班。|Wǒ xiǎng cānjiā zhège bān.|I want to join this class.
cao|草|cǎo|grass|3|n|公园里有草。|Gōngyuán lǐ yǒu cǎo.|There is grass in the park.
ceng|层|céng|floor; layer|3|m|我家在三层。|Wǒ jiā zài sān céng.|My home is on the third floor.
cha-differ|差|chà|to differ; not good enough|3|adj|我的汉语还差得很远。|Wǒ de Hànyǔ hái chà de hěn yuǎn.|My Chinese still has a long way to go.
chazhao|超市|chāoshì|supermarket|3|n|我去超市买菜。|Wǒ qù chāoshì mǎi cài.|I go to the supermarket to buy food.
chenyi|衬衫|chènshān|shirt|3|n|这件衬衫很便宜。|Zhè jiàn chènshān hěn piányi.|This shirt is cheap.
chengshi|城市|chéngshì|city|3|n|北京是一个大城市。|Běijīng shì yí ge dà chéngshì.|Beijing is a big city.
chuzhong|成绩|chéngjì|grade; result|3|n|他的成绩很好。|Tā de chéngjì hěn hǎo.|His grades are good.
chuzhong-late|迟到|chídào|to arrive late|3|v|对不起，我迟到了。|Duìbuqǐ, wǒ chídào le.|Sorry, I am late.
chong|除了|chúle|except; besides|3|prep|除了汉语，我还学历史。|Chúle Hànyǔ, wǒ hái xué lìshǐ.|Besides Chinese I also study history.
chuan-boat|船|chuán|boat|3|n|我们坐船去。|Wǒmen zuò chuán qù.|We go by boat.
chun|春|chūn|spring|3|n|春天来了。|Chūntiān lái le.|Spring has come.
ci-word|词|cí|word|3|n|这个词什么意思？|Zhège cí shénme yìsi?|What does this word mean?
ci-dictionary|词典|cídiǎn|dictionary|3|n|请查词典。|Qǐng chá cídiǎn.|Please check the dictionary.
congming|聪明|cōngming|smart|3|adj|这个孩子很聪明。|Zhège háizi hěn cōngming.|This child is smart.
dashi|打算|dǎsuàn|to plan|3|v|你打算什么时候去？|Nǐ dǎsuàn shénme shíhou qù?|When do you plan to go?
dai|带|dài|to bring; to take|3|v|请带你的书。|Qǐng dài nǐ de shū.|Please bring your book.
danxin|担心|dānxīn|to worry|3|v|别担心。|Bié dānxīn.|Don't worry.
dongtian|冬天|dōngtiān|winter|3|n|冬天很冷。|Dōngtiān hěn lěng.|Winter is cold.
dongwu|动物|dòngwù|animal|3|n|猫是动物。|Māo shì dòngwù.|A cat is an animal.
duan|短|duǎn|short|3|adj|这条裙子太短了。|Zhè tiáo qúnzi tài duǎn le.|This skirt is too short.
duanxin|短信|duǎnxìn|text message|3|n|我发了一条短信。|Wǒ fā le yì tiáo duǎnxìn.|I sent a text.
duanlian|锻炼|duànliàn|to work out|3|v|我每天锻炼。|Wǒ měi tiān duànliàn.|I work out every day.
duoshao-how|多么|duōme|how (exclamative)|3|adv|多么漂亮的花！|Duōme piàoliang de huā!|What a beautiful flower!
erduo|耳朵|ěrduo|ear|3|n|我的耳朵有点儿疼。|Wǒ de ěrduo yǒudiǎnr téng.|My ear hurts a bit.
fa|发|fā|to send; to emit|3|v|请发电子邮件。|Qǐng fā diànzǐ yóujiàn.|Please send an email.
fanyi|发烧|fāshāo|to have a fever|3|v|他发烧了。|Tā fāshāo le.|He has a fever.
faxian|发现|fāxiàn|to discover|3|v|我发现一个问题。|Wǒ fāxiàn yí ge wèntí.|I discovered a problem.
fangbian|方便|fāngbiàn|convenient|3|adj|坐地铁很方便。|Zuò dìtiě hěn fāngbiàn.|Taking the subway is convenient.
fangzi|放|fàng|to put; to release|3|v|把书放在桌子上。|Bǎ shū fàng zài zhuōzi shàng.|Put the book on the table.
fei|放心|fàngxīn|to rest assured|3|v|请放心。|Qǐng fàngxīn.|Please rest assured.
fen-divide|分|fēn|to divide; minute; point|3|v|我们分一下。|Wǒmen fēn yíxià.|Let's divide it.
fujin|附近|fùjìn|nearby|3|n|附近有商店吗？|Fùjìn yǒu shāngdiàn ma?|Is there a shop nearby?
fuwu|复习|fùxí|to review|3|v|考试前要复习。|Kǎoshì qián yào fùxí.|Review before the exam.
ganjing|干净|gānjìng|clean|3|adj|房间很干净。|Fángjiān hěn gānjìng.|The room is clean.
ganjue|感冒|gǎnmào|a cold; to catch a cold|3|n|我感冒了。|Wǒ gǎnmào le.|I have a cold.
ganxie|感兴趣|gǎn xìngqù|to be interested in|3|v|我对历史感兴趣。|Wǒ duì lìshǐ gǎn xìngqù.|I am interested in history.
gangcai|刚才|gāngcái|just now|3|n|他刚才走了。|Tā gāngcái zǒu le.|He just left.
gaodu|个子|gèzi|height (of a person)|3|n|他个子很高。|Tā gèzi hěn gāo.|He is tall.
gen|跟|gēn|with|3|prep|我跟朋友去看电影。|Wǒ gēn péngyou qù kàn diànyǐng.|I go to the movies with a friend.
genju|根据|gēnjù|according to|3|prep|根据老师的话。|Gēnjù lǎoshī de huà.|According to the teacher.
geng|更|gèng|even more|3|adv|今天比昨天更冷。|Jīntiān bǐ zuótiān gèng lěng.|Today is even colder than yesterday.
gongyuan|公园|gōngyuán|park|3|n|我们去公园走走。|Wǒmen qù gōngyuán zǒu zou.|Let's walk in the park.
gushi|故事|gùshi|story|3|n|妈妈讲了一个故事。|Māma jiǎng le yí ge gùshi.|Mom told a story.
guanyu|关于|guānyú|about; regarding|3|prep|这是关于中国的书。|Zhè shì guānyú Zhōngguó de shū.|This is a book about China.
guoji|过去|guòqù|past; to go over|3|n|过去我不喜欢喝茶。|Guòqù wǒ bù xǐhuan hē chá.|In the past I didn't like tea.
haishi|还是|háishi|or (in questions)|3|conj|你喝茶还是咖啡？|Nǐ hē chá háishi kāfēi?|Do you drink tea or coffee?
haipa|害怕|hàipà|to be afraid|3|v|孩子害怕狗。|Háizi hàipà gǒu.|The child is afraid of dogs.
heishi|黑板|hēibǎn|blackboard|3|n|请看黑板。|Qǐng kàn hēibǎn.|Please look at the blackboard.
hou|后来|hòulái|afterwards|3|n|后来他去了北京。|Hòulái tā qù le Běijīng.|Afterwards he went to Beijing.
huzhao|护照|hùzhào|passport|3|n|护照在包里。|Hùzhào zài bāo lǐ.|The passport is in the bag.
hua|花|huā|flower; to spend|3|n|这些花很漂亮。|Zhèxiē huā hěn piàoliang.|These flowers are pretty.
hua-spend|画|huà|to draw; a painting|3|v|她会画画。|Tā huì huà huà.|She can draw.
huai|坏|huài|bad; broken|3|adj|这个电脑坏了。|Zhège diànnǎo huài le.|This computer is broken.
huanjing|环境|huánjìng|environment|3|n|这里的环境很好。|Zhèlǐ de huánjìng hěn hǎo.|The environment here is good.
huan|换|huàn|to change; to exchange|3|v|我想换一件衣服。|Wǒ xiǎng huàn yí jiàn yīfu.|I want to change clothes.
huang|黄|huáng|yellow|3|adj|黄叶子落了。|Huáng yèzi luò le.|The yellow leaves fell.
huiyi|会议|huìyì|meeting|3|n|下午有一个会议。|Xiàwǔ yǒu yí ge huìyì.|There is a meeting this afternoon.
huo|或者|huòzhě|or (in statements)|3|conj|喝茶或者喝水都可以。|Hē chá huòzhě hē shuǐ dōu kěyǐ.|Tea or water are both fine.
ji-almost|几乎|jīhū|almost|3|adv|我几乎忘了。|Wǒ jīhū wàng le.|I almost forgot.
jihui|机会|jīhuì|opportunity|3|n|这是一个好机会。|Zhè shì yí ge hǎo jīhuì.|This is a good opportunity.
ji-remember|极|jí|extremely|3|adv|好极了！|Hǎo jí le!|Excellent!
jijie|季节|jìjié|season|3|n|我最喜欢的季节是秋天。|Wǒ zuì xǐhuan de jìjié shì qiūtiān.|My favorite season is autumn.
jiancha|检查|jiǎnchá|to inspect; to check|3|v|医生检查了身体。|Yīshēng jiǎnchá le shēntǐ.|The doctor checked the body.
jianyi|简单|jiǎndān|simple|3|adj|这个问题很简单。|Zhège wèntí hěn jiǎndān.|This question is simple.
jiaojie|健康|jiànkāng|health; healthy|3|n|身体健康最重要。|Shēntǐ jiànkāng zuì zhòngyào.|Health is most important.
jiang|讲|jiǎng|to speak; to explain|3|v|老师在讲语法。|Lǎoshī zài jiǎng yǔfǎ.|The teacher is explaining grammar.
jiao-teach|教|jiāo|to teach|3|v|她教汉语。|Tā jiāo Hànyǔ.|She teaches Chinese.
jiao-foot|脚|jiǎo|foot|3|n|我的脚有点儿疼。|Wǒ de jiǎo yǒudiǎnr téng.|My foot hurts a bit.
jiao-connect|接|jiē|to receive; to pick up|3|v|我去机场接你。|Wǒ qù jīchǎng jiē nǐ.|I'll pick you up at the airport.
jiedao|街道|jiēdào|street|3|n|这条街道很安静。|Zhè tiáo jiēdào hěn ānjìng.|This street is quiet.
jiehun|结婚|jié hūn|to marry|3|v|他们去年结婚了。|Tāmen qùnián jié hūn le.|They got married last year.
jieshu|结束|jiéshù|to end|3|v|课结束了。|Kè jiéshù le.|Class is over.
jiejue|解决|jiějué|to solve|3|v|我们要解决这个问题。|Wǒmen yào jiějué zhège wèntí.|We need to solve this problem.
jie-borrow|借|jiè|to borrow; to lend|3|v|我可以借你的书吗？|Wǒ kěyǐ jiè nǐ de shū ma?|May I borrow your book?
jingcai|经常|jīngcháng|often|3|adv|我经常去公园。|Wǒ jīngcháng qù gōngyuán.|I often go to the park.
jingli|经过|jīngguò|to pass; to go through|3|v|我每天经过这家商店。|Wǒ měi tiān jīngguò zhè jiā shāngdiàn.|I pass this shop every day.
jingli-manager|经理|jīnglǐ|manager|3|n|请找经理。|Qǐng zhǎo jīnglǐ.|Please get the manager.
jiu-long|久|jiǔ|for a long time|3|adj|好久不见。|Hǎo jiǔ bú jiàn.|Long time no see.
jiu-old|旧|jiù|old (not new)|3|adj|这是旧衣服。|Zhè shì jiù yīfu.|These are old clothes.
jueding|句子|jùzi|sentence|3|n|请写一个句子。|Qǐng xiě yí ge jùzi.|Please write a sentence.
kaoju|决定|juédìng|to decide|3|v|我决定学汉语。|Wǒ juédìng xué Hànyǔ.|I decided to study Chinese.
keai|可爱|kě'ài|cute|3|adj|这只猫很可爱。|Zhè zhī māo hěn kě'ài.|This cat is cute.
keqi|客气|kèqi|polite|3|adj|别客气。|Bié kèqi.|Don't be so polite.
kongtiao|空调|kōngtiáo|air conditioner|3|n|请开空调。|Qǐng kāi kōngtiáo.|Please turn on the air conditioner.
kou|口|kǒu|mouth; measure for people|3|n|家里有三口人。|Jiā lǐ yǒu sān kǒu rén.|There are three people in the family.
kuer|哭|kū|to cry|3|v|孩子哭了。|Háizi kū le.|The child cried.
kuaizi|筷子|kuàizi|chopsticks|3|n|中国人用筷子吃饭。|Zhōngguó rén yòng kuàizi chī fàn.|Chinese people eat with chopsticks.
lan|蓝|lán|blue|3|adj|天很蓝。|Tiān hěn lán.|The sky is very blue.
lao|老|lǎo|old (age)|3|adj|我爷爷很老了。|Wǒ yéye hěn lǎo le.|My grandpa is very old.
liwu|离开|líkāi|to leave|3|v|他昨天离开了北京。|Tā zuótiān líkāi le Běijīng.|He left Beijing yesterday.
liwu-gift|礼物|lǐwù|gift|3|n|这是给你的礼物。|Zhè shì gěi nǐ de lǐwù.|This is a gift for you.
lishi|历史|lìshǐ|history|3|n|中国历史很长。|Zhōngguó lìshǐ hěn cháng.|Chinese history is very long.
lian|脸|liǎn|face|3|n|请洗脸。|Qǐng xǐ liǎn.|Please wash your face.
lianxi|练习|liànxí|to practice; exercise|3|v|每天练习说汉语。|Měi tiān liànxí shuō Hànyǔ.|Practice speaking Chinese every day.
liang-bright|亮|liàng|bright|3|adj|房间很亮。|Fángjiān hěn liàng.|The room is bright.
lv|绿|lǜ|green|3|adj|绿树很多。|Lǜ shù hěn duō.|There are many green trees.
mafan|麻烦|máfan|troublesome; to trouble|3|adj|太麻烦你了。|Tài máfan nǐ le.|Sorry to trouble you.
mao-hat|马|mǎ|horse|3|n|那匹马跑得很快。|Nà pǐ mǎ pǎo de hěn kuài.|That horse runs fast.
manyi|满意|mǎnyì|satisfied|3|adj|我对这个很满意。|Wǒ duì zhège hěn mǎnyì.|I am satisfied with this.
maozi|帽子|màozi|hat|3|n|冬天戴帽子。|Dōngtiān dài màozi.|Wear a hat in winter.
mi|米|mǐ|meter; rice|3|m|这间房有二十米长。|Zhè jiān fáng yǒu èrshí mǐ cháng.|This room is twenty meters long.
mianbao|面包|miànbāo|bread|3|n|早饭我吃面包。|Zǎofàn wǒ chī miànbāo.|I eat bread for breakfast.
mingbai|明白|míngbai|to understand|3|v|我明白了。|Wǒ míngbai le.|I understand.
nati|拿|ná|to take; to hold|3|v|请拿着。|Qǐng ná zhe.|Please hold this.
nainai|奶奶|nǎinai|paternal grandmother|3|n|奶奶在家。|Nǎinai zài jiā.|Grandma is at home.
nandao|南|nán|south|3|n|南方很热。|Nánfāng hěn rè.|The south is hot.
nan|难|nán|difficult|3|adj|汉语不难。|Hànyǔ bù nán.|Chinese is not hard.
nianqing|年轻|niánqīng|young|3|adj|她还很年轻。|Tā hái hěn niánqīng.|She is still young.
niao|鸟|niǎo|bird|3|n|树上有一只鸟。|Shù shàng yǒu yì zhī niǎo.|There is a bird in the tree.
nuli|努力|nǔlì|to work hard|3|adv|他学习很努力。|Tā xuéxí hěn nǔlì.|He studies hard.
pashan|爬山|pá shān|to climb a mountain|3|v|周末我们去爬山。|Zhōumò wǒmen qù pá shān.|We go hiking on the weekend.
panguo|盘子|pánzi|plate|3|n|盘子里有鱼。|Pánzi lǐ yǒu yú.|There is fish on the plate.
pangbian-fat|胖|pàng|fat|3|adj|这只猫有点儿胖。|Zhè zhī māo yǒudiǎnr pàng.|This cat is a bit fat.
piju|皮鞋|píxié|leather shoes|3|n|这双皮鞋很贵。|Zhè shuāng píxié hěn guì.|These leather shoes are expensive.
pijiul|啤酒|píjiǔ|beer|3|n|他不喝啤酒。|Tā bù hē píjiǔ.|He doesn't drink beer.
putao|葡萄|pútao|grape|3|n|葡萄很甜。|Pútao hěn tián.|The grapes are sweet.
putonghua|普通话|Pǔtōnghuà|Mandarin|3|n|请说普通话。|Qǐng shuō Pǔtōnghuà.|Please speak Mandarin.
qita|其他|qítā|other|3|pron|还有其他人吗？|Hái yǒu qítā rén ma?|Are there other people?
qihou|奇怪|qíguài|strange|3|adj|这件事有点儿奇怪。|Zhè jiàn shì yǒudiǎnr qíguài.|This matter is a bit strange.
qishen|骑|qí|to ride|3|v|我骑自行车去学校。|Wǒ qí zìxíngchē qù xuéxiào.|I ride a bike to school.
qifei|起飞|qǐfēi|to take off (plane)|3|v|飞机马上起飞。|Fēijī mǎshàng qǐfēi.|The plane is taking off soon.
qilai|起来|qǐlái|up; to start|3|v|请站起来。|Qǐng zhàn qǐlái.|Please stand up.
qingchu|清楚|qīngchu|clear|3|adj|我说得清楚吗？|Wǒ shuō de qīngchu ma?|Did I say it clearly?
qiu|秋|qiū|autumn|3|n|秋天树叶黄了。|Qiūtiān shùyè huáng le.|Leaves turn yellow in autumn.
qunzi|裙子|qúnzi|skirt|3|n|她穿着红裙子。|Tā chuān zhe hóng qúnzi.|She is wearing a red skirt.
ranhou|然后|ránhòu|then; afterwards|3|conj|先洗手，然后吃饭。|Xiān xǐ shǒu, ránhòu chī fàn.|Wash hands first, then eat.
reqing|热情|rèqíng|warm; enthusiastic|3|adj|中国人很热情。|Zhōngguórén hěn rèqíng.|Chinese people are warm.
renwei|认为|rènwéi|to think; to consider|3|v|我认为这个办法好。|Wǒ rènwéi zhège bànfǎ hǎo.|I think this method is good.
renke|认真|rènzhēn|serious; conscientious|3|adj|他工作很认真。|Tā gōngzuò hěn rènzhēn.|He works conscientiously.
rongyi|容易|róngyì|easy|3|adj|这课很容易。|Zhè kè hěn róngyì.|This lesson is easy.
ruguo|如果|rúguǒ|if|3|conj|如果下雨，我就不去。|Rúguǒ xià yǔ, wǒ jiù bú qù.|If it rains, I won't go.
san-umbrella|伞|sǎn|umbrella|3|n|下雨要带伞。|Xià yǔ yào dài sǎn.|Bring an umbrella when it rains.
shangwang|上网|shàng wǎng|to go online|3|v|晚上我上网。|Wǎnshang wǒ shàng wǎng.|I go online in the evening.
shengyin|声音|shēngyīn|sound; voice|3|n|她的声音很好听。|Tā de shēngyīn hěn hǎotīng.|Her voice is pleasant.
shijie|世界|shìjiè|world|3|n|世界很大。|Shìjiè hěn dà.|The world is big.
shou|瘦|shòu|thin|3|adj|那匹马很瘦。|Nà pǐ mǎ hěn shòu.|That horse is thin.
shulin|舒服|shūfu|comfortable|3|adj|这把椅子很舒服。|Zhè bǎ yǐzi hěn shūfu.|This chair is comfortable.
shu|树|shù|tree|3|n|公园里有很多树。|Gōngyuán lǐ yǒu hěn duō shù.|There are many trees in the park.
shuji|数学|shùxué|mathematics|3|n|我不太喜欢数学。|Wǒ bú tài xǐhuan shùxué.|I don't really like math.
shuai|刷|shuā|to brush; to swipe|3|v|刷牙了吗？|Shuā yá le ma?|Have you brushed your teeth?
shuijiao-double|双|shuāng|pair|3|m|一双筷子。|Yì shuāng kuàizi.|A pair of chopsticks.
shuiping|水平|shuǐpíng|level; standard|3|n|我的汉语水平还不高。|Wǒ de Hànyǔ shuǐpíng hái bù gāo.|My Chinese level is not high yet.
siji|司机|sījī|driver|3|n|出租车司机很热情。|Chūzūchē sījī hěn rèqíng.|The taxi driver is warm.
taiyang|太阳|tàiyáng|sun|3|n|太阳出来了。|Tàiyáng chū lái le.|The sun came out.
tiao-strip|条|tiáo|measure word for long things|3|m|一条路，一条鱼。|Yì tiáo lù, yì tiáo yú.|A road, a fish.
tian-sweet|甜|tián|sweet|3|adj|西瓜很甜。|Xīguā hěn tián.|The watermelon is sweet.
tizhong|特别|tèbié|especially|3|adv|我特别喜欢这首歌。|Wǒ tèbié xǐhuan zhè shǒu gē.|I especially like this song.
tongyi|同意|tóngyì|to agree|3|v|我同意你的办法。|Wǒ tóngyì nǐ de bànfǎ.|I agree with your method.
tongku|痛苦|tòngkǔ|painful|3|adj|分手是痛苦的。|Fēnshǒu shì tòngkǔ de.|Breaking up is painful.
tou|头|tóu|head|3|n|我头疼。|Wǒ tóu téng.|I have a headache.
tufa|突然|tūrán|suddenly|3|adv|天突然下雨了。|Tiān tūrán xià yǔ le.|It suddenly rained.
tushuguan|图书馆|túshūguǎn|library|3|n|我在图书馆学习。|Wǒ zài túshūguǎn xuéxí.|I study in the library.
tui|腿|tuǐ|leg|3|n|跑完以后腿很累。|Pǎo wán yǐhòu tuǐ hěn lèi.|After running my legs are tired.
wan-bowl|碗|wǎn|bowl|3|n|一碗米饭。|Yì wǎn mǐfàn.|A bowl of rice.
wan-ten-thousand|万|wàn|ten thousand|3|num|一万块钱。|Yí wàn kuài qián.|Ten thousand yuan.
wang|忘记|wàngjì|to forget|3|v|别忘记带护照。|Bié wàngjì dài hùzhào.|Don't forget to bring your passport.
wei-for|为|wèi|for; because of|3|prep|我为你高兴。|Wǒ wèi nǐ gāoxìng.|I am happy for you.
weile|为了|wèile|in order to|3|prep|为了学汉语，我来中国。|Wèile xué Hànyǔ, wǒ lái Zhōngguó.|I came to China to study Chinese.
wei-position|位|wèi|polite measure for people|3|m|三位老师。|Sān wèi lǎoshī.|Three teachers.
wenhua|文化|wénhuà|culture|3|n|中国文化很有意思。|Zhōngguó wénhuà hěn yǒu yìsi.|Chinese culture is interesting.
west|西|xī|west|3|n|太阳从西边落下。|Tàiyáng cóng xībian luò xià.|The sun sets in the west.
xiguan|习惯|xíguàn|habit; to be used to|3|n|早起是好习惯。|Zǎo qǐ shì hǎo xíguàn.|Getting up early is a good habit.
xiadao|洗手间|xǐshǒujiān|restroom|3|n|洗手间在哪儿？|Xǐshǒujiān zài nǎr?|Where is the restroom?
xia|夏|xià|summer|3|n|夏天很热。|Xiàtiān hěn rè.|Summer is hot.
xian|先|xiān|first|3|adv|你先请。|Nǐ xiān qǐng.|After you.
xiangxin|相信|xiāngxìn|to believe|3|v|我相信你。|Wǒ xiāngxìn nǐ.|I believe you.
xiangdao|香蕉|xiāngjiāo|banana|3|n|香蕉很甜。|Xiāngjiāo hěn tián.|Bananas are sweet.
xiang-toward|向|xiàng|towards|3|prep|向左走。|Xiàng zuǒ zǒu.|Go left.
xiaoxi|像|xiàng|to resemble; like|3|v|他像他爸爸。|Tā xiàng tā bàba.|He looks like his dad.
xiaoxi-news|小心|xiǎoxīn|to be careful|3|v|过马路要小心。|Guò mǎlù yào xiǎoxīn.|Be careful crossing the street.
xiaozhang|校长|xiàozhǎng|principal|3|n|校长在开会。|Xiàozhǎng zài kāi huì.|The principal is in a meeting.
xinwen|新闻|xīnwén|news|3|n|我每天看新闻。|Wǒ měi tiān kàn xīnwén.|I watch the news every day.
xinxin|新鲜|xīnxiān|fresh|3|adj|这些水果很新鲜。|Zhèxiē shuǐguǒ hěn xīnxiān.|These fruits are fresh.
xinyong|信用卡|xìnyòngkǎ|credit card|3|n|我用信用卡付钱。|Wǒ yòng xìnyòngkǎ fù qián.|I pay with a credit card.
xingqiji|行李箱|xínglixiāng|suitcase|3|n|行李箱太重了。|Xínglixiāng tài zhòng le.|The suitcase is too heavy.
xingqu|兴趣|xìngqù|interest|3|n|我对音乐有兴趣。|Wǒ duì yīnyuè yǒu xìngqù.|I have an interest in music.
xiongmao|熊猫|xióngmāo|panda|3|n|熊猫是中国的。|Xióngmāo shì Zhōngguó de.|Pandas are from China.
xuyao|需要|xūyào|to need|3|v|我需要帮助。|Wǒ xūyào bāngzhù.|I need help.
xuanze|选择|xuǎnzé|to choose|3|v|你选择哪一个？|Nǐ xuǎnzé nǎ yí ge?|Which one do you choose?
yaoqiu|要求|yāoqiú|to require; a demand|3|v|老师要求我们复习。|Lǎoshī yāoqiú wǒmen fùxí.|The teacher requires us to review.
yezi|爷爷|yéye|paternal grandfather|3|n|爷爷讲故事。|Yéye jiǎng gùshi.|Grandpa tells stories.
yijing-already|一般|yìbān|generally; ordinary|3|adv|我一般七点起床。|Wǒ yìbān qī diǎn qǐ chuáng.|I generally get up at seven.
yibian|一边|yìbiān|at the same time|3|adv|他一边吃饭一边看电视。|Tā yìbiān chī fàn yìbiān kàn diànshì.|He eats while watching TV.
yiding|一定|yídìng|certainly|3|adv|我一定来。|Wǒ yídìng lái.|I will certainly come.
yiqi-together|一共|yígòng|in total|3|adv|一共十个人。|Yígòng shí ge rén.|Ten people in total.
yihou|一会儿|yíhuìr|a little while|3|n|请等一会儿。|Qǐng děng yíhuìr.|Please wait a moment.
yiyang|一样|yíyàng|the same|3|adj|我们一样高。|Wǒmen yíyàng gāo.|We are the same height.
yihou-after|以后|yǐhòu|after; later|3|n|吃饭以后去散步。|Chī fàn yǐhòu qù sànbù.|Go for a walk after eating.
yiqian|以前|yǐqián|before; previously|3|n|以前我不会说汉语。|Yǐqián wǒ bú huì shuō Hànyǔ.|I couldn't speak Chinese before.
yisheng-music|以为|yǐwéi|to assume (wrongly)|3|v|我以为你不来了。|Wǒ yǐwéi nǐ bù lái le.|I thought you weren't coming.
yinyue|音乐|yīnyuè|music|3|n|我喜欢中国音乐。|Wǒ xǐhuan Zhōngguó yīnyuè.|I like Chinese music.
yinhang|银行|yínháng|bank|3|n|银行在左边。|Yínháng zài zuǒbian.|The bank is on the left.
yingxiang|影响|yǐngxiǎng|influence; to affect|3|v|天气影响了我的计划。|Tiānqì yǐngxiǎng le wǒ de jìhuà.|The weather affected my plan.
yong|用|yòng|to use|3|v|用筷子吃饭。|Yòng kuàizi chī fàn.|Eat with chopsticks.
youyuan|游戏|yóuxì|game|3|n|孩子们在玩游戏。|Háizimen zài wán yóuxì.|The children are playing a game.
youyong-useful|有名|yǒumíng|famous|3|adj|这家饭店很有名。|Zhè jiā fàndiàn hěn yǒumíng.|This restaurant is famous.
yuyan|又|yòu|again (past)|3|adv|他又迟到了。|Tā yòu chídào le.|He was late again.
yuyan-lang|遇到|yùdào|to run into|3|v|我在路上遇到老师。|Wǒ zài lù shàng yùdào lǎoshī.|I ran into the teacher on the way.
yuanlai|原来|yuánlái|originally; so it turns out|3|adv|原来是你！|Yuánlái shì nǐ!|So it was you!
yuanliang|愿意|yuànyì|to be willing|3|v|你愿意帮忙吗？|Nǐ yuànyì bāng máng ma?|Are you willing to help?
yuelai|月亮|yuèliang|moon|3|n|今晚的月亮很亮。|Jīn wǎn de yuèliang hěn liàng.|Tonight's moon is bright.
yue-more|越|yuè|the more...|3|adv|我越学越喜欢汉语。|Wǒ yuè xué yuè xǐhuan Hànyǔ.|The more I study Chinese, the more I like it.
yun|站|zhàn|to stand; station|3|v|请站起来。|Qǐng zhàn qǐlái.|Please stand up.
zhang|长|zhǎng|to grow|3|v|孩子长高了。|Háizi zhǎng gāo le.|The child has grown taller.
zhaoji|着急|zháojí|anxious|3|adj|别着急。|Bié zháojí.|Don't worry.
zhao-care|照顾|zhàogù|to look after|3|v|她照顾孩子。|Tā zhàogù háizi.|She looks after the child.
zhaopian|照片|zhàopiàn|photograph|3|n|这是我家的照片。|Zhè shì wǒ jiā de zhàopiàn.|This is a photo of my family.
zhaoxiangji|照相机|zhàoxiàngjī|camera|3|n|我带了照相机。|Wǒ dài le zhàoxiàngjī.|I brought a camera.
zhi-only|只|zhǐ|only|3|adv|我只有五块钱。|Wǒ zhǐ yǒu wǔ kuài qián.|I only have five yuan.
zhiyao|只有|zhǐyǒu|only if / only have|3|conj|只有努力才能进步。|Zhǐyǒu nǔlì cái néng jìnbù.|Only by working hard can you improve.
zhongjian|中间|zhōngjiān|middle|3|n|他坐在中间。|Tā zuò zài zhōngjiān.|He sits in the middle.
zhongwen|中文|Zhōngwén|Chinese language (written/spoken)|3|n|我在学中文。|Wǒ zài xué Zhōngwén.|I am studying Chinese.
zhongyao|终于|zhōngyú|finally|3|adv|我终于明白了。|Wǒ zhōngyú míngbai le.|I finally understand.
zhongyao-imp|重要|zhòngyào|important|3|adj|身体健康很重要。|Shēntǐ jiànkāng hěn zhòngyào.|Health is important.
zhoumo|周末|zhōumò|weekend|3|n|周末你做什么？|Zhōumò nǐ zuò shénme?|What do you do on the weekend?
zhuyi|主要|zhǔyào|main|3|adj|主要问题是时间。|Zhǔyào wèntí shì shíjiān.|The main problem is time.
zhuyi-attend|注意|zhùyì|to pay attention|3|v|请注意听。|Qǐng zhùyì tīng.|Please pay attention and listen.
ziji|自己|zìjǐ|oneself|3|pron|我自己做。|Wǒ zìjǐ zuò.|I'll do it myself.
zixin|自行车|zìxíngchē|bicycle|3|n|我骑自行车上班。|Wǒ qí zìxíngchē shàng bān.|I bike to work.
zongshi|总是|zǒngshì|always|3|adv|他总是很忙。|Tā zǒngshì hěn máng.|He is always busy.
zui-mouth|嘴|zuǐ|mouth|3|n|闭上嘴。|Bì shàng zuǐ.|Close your mouth.
zuihou|最后|zuìhòu|finally; last|3|n|最后一课。|Zuìhòu yì kè.|The last lesson.
zuijin|最近|zuìjìn|recently|3|n|你最近怎么样？|Nǐ zuìjìn zěnmeyàng?|How have you been recently?
zuoye|作业|zuòyè|homework|3|n|我做完作业了。|Wǒ zuò wán zuòyè le.|I finished my homework.

# HSK 4
anpai|安排|ānpái|to arrange|4|v|我来安排会议。|Wǒ lái ānpái huìyì.|I'll arrange the meeting.
anzhong|安全|ānquán|safe; safety|4|n|注意安全。|Zhùyì ānquán.|Pay attention to safety.
biaozhun|标准|biāozhǔn|standard|4|n|请用标准普通话。|Qǐng yòng biāozhǔn Pǔtōnghuà.|Please use standard Mandarin.
biaoshi-form|表示|biǎoshì|to indicate|4|v|这表示同意。|Zhè biǎoshì tóngyì.|This indicates agreement.
biaoyan|表演|biǎoyǎn|to perform|4|v|她在表演舞蹈。|Tā zài biǎoyǎn wǔdǎo.|She is performing a dance.
bici|并且|bìngqiě|and also|4|conj|他聪明并且努力。|Tā cōngming bìngqiě nǔlì.|He is smart and also hardworking.
buliao|不过|búguò|however|4|conj|我想去，不过太远了。|Wǒ xiǎng qù, búguò tài yuǎn le.|I want to go, however it's too far.
bushi-not|不仅|bùjǐn|not only|4|conj|这不仅是工作，也是兴趣。|Zhè bùjǐn shì gōngzuò, yě shì xìngqù.|This is not only work, it is also an interest.
caiqu|采取|cǎiqǔ|to adopt (a measure)|4|v|我们采取这个办法。|Wǒmen cǎiqǔ zhège bànfǎ.|We adopt this method.
cankao|参观|cānguān|to visit (a place)|4|v|我们参观了博物馆。|Wǒmen cānguān le bówùguǎn.|We visited the museum.
caochang|差不多|chàbuduō|almost; about the same|4|adv|我们差不多同时到。|Wǒmen chàbuduō tóngshí dào.|We arrived at almost the same time.
chenggong|成功|chénggōng|success; successful|4|n|祝贺你成功。|Zhùhè nǐ chénggōng.|Congratulations on your success.
chengwei|成为|chéngwéi|to become|4|v|他成为了医生。|Tā chéngwéi le yīshēng.|He became a doctor.
chongfen|重新|chóngxīn|again; anew|4|adv|请重新说一遍。|Qǐng chóngxīn shuō yí biàn.|Please say it again.
chongman|从来|cónglái|always (with 不/没: never)|4|adv|我从来没去过。|Wǒ cónglái méi qù guo.|I have never been.
cunzai|存|cún|to save; to deposit|4|v|把钱存在银行。|Bǎ qián cún zài yínháng.|Deposit the money in the bank.
cuowu|错误|cuòwù|error|4|n|这是一个错误。|Zhè shì yí ge cuòwù.|This is a mistake.
daola|达到|dádào|to reach; to achieve|4|v|我们达到了目标。|Wǒmen dádào le mùbiāo.|We reached the goal.
dashi-ambassador|大约|dayuē|approximately|4|adv|大约三点到。|Dàyuē sān diǎn dào.|Arrive at about three.
dai-treat|戴|dài|to wear (hat, glasses)|4|v|他戴着眼镜。|Tā dài zhe yǎnjìng.|He is wearing glasses.
dang|当|dāng|to be; when|4|v|当老师不容易。|Dāng lǎoshī bù róngyì.|Being a teacher is not easy.
dangshi|当时|dāngshí|at that time|4|n|当时我还小。|Dāngshí wǒ hái xiǎo.|I was still young then.
daoqian|道歉|dàoqiàn|to apologize|4|v|我向你道歉。|Wǒ xiàng nǐ dàoqiàn.|I apologize to you.
dilian|得|děi|must; have to|4|v|我得走了。|Wǒ děi zǒu le.|I have to go.
dengdai|等待|děngdài|to wait for|4|v|请等待一会儿。|Qǐng děngdài yíhuìr.|Please wait a moment.
di|低|dī|low|4|adj|声音太低了。|Shēngyīn tài dī le.|The voice is too low.
diqiu|掉|diào|to fall; to drop|4|v|笔掉了。|Bǐ diào le.|The pen fell.
du|堵车|dǔ chē|traffic jam|4|v|路上堵车。|Lù shàng dǔ chē.|There's a jam on the road.
duanlian-while|而|ér|and; yet|4|conj|他高而瘦。|Tā gāo ér shòu.|He is tall and thin.
fasheng|发生|fāshēng|to happen|4|v|刚才发生了什么？|Gāngcái fāshēng le shénme?|What just happened?
fazhan|发展|fāzhǎn|to develop|4|v|城市发展很快。|Chéngshì fāzhǎn hěn kuài.|The city is developing fast.
falv|法律|fǎlǜ|law|4|n|每个人都要遵守法律。|Měi ge rén dōu yào zūnshǒu fǎlǜ.|Everyone must obey the law.
fangshi|方式|fāngshì|way; method|4|n|用这种方式学习。|Yòng zhè zhǒng fāngshì xuéxí.|Study this way.
fenxiang|丰富|fēngfù|rich; abundant|4|adj|他的经验很丰富。|Tā de jīngyàn hěn fēngfù.|His experience is rich.
fuwu-service|符合|fúhé|to accord with|4|v|这符合要求。|Zhè fúhé yāoqiú.|This meets the requirements.
fuwu-wait|富|fù|rich|4|adj|他不觉得自己富。|Tā bù juéde zìjǐ fù.|He doesn't feel rich.
fuze|负责|fùzé|to be responsible|4|v|谁负责这件事？|Shéi fùzé zhè jiàn shì?|Who is responsible for this?
gaibian|改变|gǎibiàn|to change|4|v|我想改变这个习惯。|Wǒ xiǎng gǎibiàn zhège xíguàn.|I want to change this habit.
ganqing|感谢|gǎnxiè|to thank|4|v|感谢你的帮助。|Gǎnxiè nǐ de bāngzhù.|Thank you for your help.
ganmao|刚|gāng|just now; just|4|adv|他刚到。|Tā gāng dào.|He just arrived.
gaodu-high|高|gāo|tall; high|4|adj|那座山很高。|Nà zuò shān hěn gāo.|That mountain is high.
gaoxing-communicate|沟通|gōutōng|to communicate|4|v|我们需要沟通。|Wǒmen xūyào gōutōng.|We need to communicate.
guanxi|挂|guà|to hang; to hang up|4|v|他把衣服挂上。|Tā bǎ yīfu gua shàng.|He hung up the clothes.
guanjian|关键|guānjiàn|key; crucial|4|n|关键是坚持。|Guānjiàn shì jiānchí.|The key is persistence.
guangguang|广告|guǎnggào|advertisement|4|n|别相信那个广告。|Bié xiāngxìn nàge guǎnggào.|Don't believe that ad.
guangbo|广播|guǎngbō|broadcast|4|n|我听新闻广播。|Wǒ tīng xīnwén-guǎngbō.|I listen to the news broadcast.
guoji-intern|国际|guójì|international|4|adj|这是一家国际公司。|Zhè shì yì jiā  guójì gōngsī.|This is an international company.
hai-ocean|海洋|hǎiyáng|ocean|4|n|海洋很大。|Hǎiyáng hěn dà.|The ocean is vast.
heping|和平|hépíng|peace|4|n|我们都爱和平。|Wǒmen dōu ài hépíng.|We all love peace.
hushi|互相|hùxiāng|mutually|4|adv|我们应该互相帮助。|Wǒmen yīnggāi hùxiāng bāngzhù.|We should help each other.
huanjing-protect|环境|huánjìng|environment|4|n|保护环境很重要。|Bǎohù huánjìng hěn zhòngyào.|Protecting the environment is important.
huodong|活动|huódòng|activity|4|n|周末有很多活动。|Zhōumò yǒu hěn duō huódòng.|There are many activities on the weekend.
jichu|基础|jīchǔ|foundation|4|n|发音是汉语的基础。|Fāyīn shì Hànyǔ de jīchǔ.|Pronunciation is the foundation of Chinese.
jihua|计划|jìhuà|plan|4|n|你有什么计划？|Nǐ yǒu shénme jìhuà?|What is your plan?
jishu|技术|jìshù|technology; skill|4|n|他的技术很好。|Tā de jìshù hěn hǎo.|His skill is excellent.
jiazhi|价格|jiàgé|price|4|n|价格有点儿高。|Jiàgé yǒudiǎnr gāo.|The price is a bit high.
jianchi|坚持|jiānchí|to persist|4|v|坚持每天练习。|Jiānchí měi tiān liànxí.|Persist in practicing every day.
jianzhu|建议|jiànyì|suggestion; to suggest|4|n|我有一个建议。|Wǒ yǒu yí ge jiànyì.|I have a suggestion.
jianglai|将来|jiānglái|the future|4|n|将来我想去中国工作。|Jiānglái wǒ xiǎng qù Zhōngguó gōngzuò.|In the future I want to work in China.
jiaoao|交|jiāo|to hand over; to make (friends)|4|v|我们交个朋友吧。|Wǒmen jiāo ge péngyou ba.|Let's be friends.
jieshi|解释|jiěshì|to explain|4|v|请解释一下。|Qǐng jiěshì yíxià.|Please explain.
jieshou|接受|jiēshòu|to accept|4|v|我接受你的建议。|Wǒ jiēshòu nǐ de jiànyì.|I accept your suggestion.
jinbu|进步|jìnbù|progress|4|n|你的汉语进步了。|Nǐ de Hànyǔ jìnbù le.|Your Chinese has improved.
jingji|经济|jīngjì|economy|4|n|中国经济发展很快。|Zhōngguó jīngjì fāzhǎn hěn kuài.|China's economy is developing fast.
jingyan|经验|jīngyàn|experience|4|n|他有很多经验。|Tā yǒu hěn duō jīngyàn.|He has a lot of experience.
jingzheng|竞争|jìngzhēng|competition|4|n|这个工作竞争很激烈。|Zhège gōngzuò jìngzhēng hěn jīliè.|Competition for this job is fierce.
jiu-then2|究竟|jiūjìng|actually; after all|4|adv|他究竟是谁？|Tā jiūjìng shì shéi?|Who is he actually?
juedui|拒绝|jùjué|to refuse|4|v|他拒绝了这个工作。|Tā jùjué le zhège gōngzuò.|He refused this job.
juede-abs|绝对|juéduì|absolutely|4|adv|这绝对不是我的错。|Zhè juéduì bú shì wǒ de cuò.|This is absolutely not my fault.
kehu|可惜|kěxī|it's a pity|4|adj|真可惜。|Zhēn kěxī.|What a pity.
kexue|科学|kēxué|science|4|n|他对科学感兴趣。|Tā duì kēxué gǎn xìngqù.|He is interested in science.
kenengxing|困难|kùnnan|difficulty|4|n|遇到困难不要放弃。|Yùdào kùnnan bú yào fàngqì.|Don't give up when you meet difficulties.
langfei|浪费|làngfèi|to waste|4|v|不要浪费时间。|Bú yào làngfèi shíjiān.|Don't waste time.
liyou|离开|líkāi|to leave|4|v|火车就要离开了。|Huǒchē jiù yào líkāi le.|The train is about to leave.
liyou-reason|理由|lǐyóu|reason|4|n|你有什么理由？|Nǐ yǒu shénme lǐyóu?|What reason do you have?
liji|理解|lǐjiě|to understand|4|v|我完全理解。|Wǒ wánquán lǐjiě.|I fully understand.
liliang|力量|lìliàng|strength|4|n|团结就是力量。|Tuánjié jiù shì lìliàng.|Unity is strength.
liangxin|联系|liánxì|to contact|4|v|请跟我联系。|Qǐng gēn wǒ liánxì.|Please contact me.
liangkuai|凉快|liángkuai|cool (weather)|4|adj|秋天很凉快。|Qiūtiān hěn liángkuai.|Autumn is cool.
lingdao|另外|lìngwài|in addition|4|conj|另外，我们还要复习。|Lìngwài, wǒmen hái yào fùxí.|In addition, we still need to review.
mafan-trouble|麻烦|máfan|trouble|4|n|给你添麻烦了。|Gěi nǐ tiān máfan le.|Sorry for the trouble.
manzu|满足|mǎnzú|to satisfy|4|v|他不满足于现在的生活。|Tā bù mǎnzú yú xiànzài de shēnghuó.|He is not satisfied with his current life.
mianlin|美丽|měilì|beautiful|4|adj|西湖很美丽。|Xī Hú hěn měilì.|West Lake is beautiful.
mudi|目的|mùdì|purpose|4|n|你来中国的目的是什么？|Nǐ lái Zhōngguó de mùdì shì shénme?|What is your purpose in coming to China?
nengli|能力|nénglì|ability|4|n|他的工作能力很强。|Tā de gōngzuò nénglì hěn qiáng.|His work ability is strong.
nianqing-age|年龄|niánlíng|age|4|n|请问您的年龄？|Qǐngwèn nín de niánlíng?|May I ask your age?
nongmin|弄|nòng|to do; to handle|4|v|我弄好了。|Wǒ nòng hǎo le.|I've got it done.
pai|陪|péi|to accompany|4|v|我陪你去医院。|Wǒ péi nǐ qù yīyuàn.|I'll go with you to the hospital.
pishi|篇|piān|measure word for articles|4|m|这篇文章很好。|Zhè piān wénzhāng hěn hǎo.|This article is good.
pingjia|便宜|piányi|inexpensive|4|adj|价格很便宜。|Jiàgé hěn piányi.|The price is inexpensive.
qifu|其实|qíshí|actually|4|adv|其实我早就知道了。|Qíshí wǒ zǎo jiù zhīdào le.|Actually I already knew.
qita-other|其中|qízhōng|among; of which|4|n|其中有三个是学生。|Qízhōng yǒu sān ge shì xuéshēng.|Among them three are students.
qihou-climate|气候|qìhòu|climate|4|n|北京的气候怎么样？|Běijīng de qìhòu zěnmeyàng?|How is Beijing's climate?
qingchu-situation|情况|qíngkuàng|situation|4|n|现在情况怎么样？|Xiànzài qíngkuàng zěnmeyàng?|How is the situation now?
quxiao|取消|qǔxiāo|to cancel|4|v|会议取消了。|Huìyì qǔxiāo le.|The meeting was cancelled.
queshi|确实|quèshí|indeed|4|adv|他确实很努力。|Tā quèshí hěn nǔlì.|He is indeed hardworking.
renwu|任务|rènwu|task|4|n|今天的任务很重。|Jīntiān de rènwu hěn zhòng.|Today's task is heavy.
renkou|人口|rénkǒu|population|4|n|中国人口很多。|Zhōngguó rénkǒu hěn duō.|China has a large population.
shenghuo|生活|shēnghuó|life|4|n|我喜欢现在的生活。|Wǒ xǐhuan xiànzài de shēnghuó.|I like my current life.
shengqi|省|shěng|province; to save|4|n|他来自南方的一个省。|Tā láizì nánfāng de yí ge shěng.|He comes from a southern province.
shiji|实际|shíjì|actual|4|adj|实际情况不是这样。|Shíjì qíngkuàng bú shì zhèyàng.|The actual situation is not like this.
shichang|市场|shìchǎng|market|4|n|早上去市场买菜。|Zǎoshang qù shìchǎng mǎi cài.|Go to the market in the morning for food.
shiying|适应|shìyìng|to adapt|4|v|我还在适应这里的生活。|Wǒ hái zài shìyìng zhèlǐ de shēnghuó.|I am still adapting to life here.
shouhuo|收入|shōurù|income|4|n|他的收入不高。|Tā de shōurù bù gāo.|His income is not high.
shouji-collect|收拾|shōushi|to tidy up|4|v|请收拾房间。|Qǐng shōushi fángjiān.|Please tidy the room.
shuzhi|数字|shùzì|number; digit|4|n|请看这些数字。|Qǐng kàn zhèxiē shùzì.|Please look at these numbers.
shuaitui|顺利|shùnlì|smooth; successful|4|adj|旅行很顺利。|Lǚxíng hěn shùnlì.|The trip went smoothly.
shunbian|顺便|shùnbiàn|in passing|4|adv|你顺便帮我买茶吧。|Nǐ shùnbiàn bāng wǒ mǎi chá ba.|Pick up tea for me while you're at it.
tang|谈|tán|to talk; to discuss|4|v|我们谈谈这个问题。|Wǒmen tán tan zhège wèntí.|Let's talk about this issue.
teshu|提|tí|to raise; to mention|4|v|他提出了一个问题。|Tā tíchū le yí ge wèntí.|He raised a question.
tiaoji|条件|tiáojiàn|condition|4|n|工作条件很好。|Gōngzuò tiáojiàn hěn hǎo.|The working conditions are good.
tingzhi|停止|tíngzhǐ|to stop|4|v|雨停止了。|Yǔ tíngzhǐ le.|The rain stopped.
tongguo|通过|tōngguò|to pass; through|4|v|我通过了考试。|Wǒ tōngguò le kǎoshì.|I passed the exam.
tongqing|同情|tóngqíng|to sympathize|4|v|我很同情他。|Wǒ hěn tóngqíng tā.|I sympathize with him.
tuiguang|推|tuī|to push|4|v|请把门推开。|Qǐng bǎ mén tuī kāi.|Please push the door open.
tuijian|推迟|tuīchí|to postpone|4|v|会议推迟了。|Huìyì tuīchí le.|The meeting was postponed.
wanquan|完全|wánquán|completely|4|adv|我完全同意。|Wǒ wánquán tóngyì.|I completely agree.
wangzhan|往往|wǎngwǎng|often|4|adv|他往往迟到。|Tā wǎngwǎng chídào.|He is often late.
weixian|危险|wēixiǎn|dangerous|4|adj|过马路很危险。|Guò mǎlù hěn wēixiǎn.|Crossing the street is dangerous.
wenxue|温度|wēndù|temperature|4|n|今天温度很高。|Jīntiān wēndù hěn gāo.|The temperature is high today.
wenzhang|文章|wénzhāng|article; essay|4|n|这篇文章写得真好。|Zhè piān wénzhāng xiě de zhēn hǎo.|This essay is really well written.
wuran|污染|wūrǎn|pollution|4|n|空气污染很严重。|Kōngqì wūrǎn hěn yánzhòng.|Air pollution is serious.
wu-without|无|wú|without; not have|4|v|无能为力。|Wú néng wéi lì.|Powerless to help.
xiguan-detail|吸引|xīyǐn|to attract|4|v|这个故事吸引了我。|Zhège gùshi xīyǐn le wǒ.|This story attracted me.
xianjin|现代|xiàndài|modern|4|adj|这是一座现代城市。|Zhè shì yí zuò xiàndài chéngshì.|This is a modern city.
xiangfa|想法|xiǎngfǎ|idea|4|n|我有一个想法。|Wǒ yǒu yí ge xiǎngfǎ.|I have an idea.
xiaoguo|效果|xiàoguǒ|effect|4|n|这个办法效果很好。|Zhège bànfǎ xiàoguǒ hěn hǎo.|This method is effective.
xinshui|信心|xìnxīn|confidence|4|n|我对自己有信心。|Wǒ duì zìjǐ yǒu xìnxīn.|I have confidence in myself.
xingwei|行为|xíngwéi|behavior|4|n|他的行为不对。|Tā de xíngwéi bú duì.|His behavior is wrong.
xingge|幸福|xìngfú|happiness; happy|4|n|祝你幸福。|Zhù nǐ xìngfú.|I wish you happiness.
xingzhi|性质|xìngzhì|nature; quality|4|n|问题的性质变了。|Wèntí de xìngzhì biàn le.|The nature of the problem changed.
xiu|修|xiū|to repair|4|v|谁能修这个电脑？|Shéi néng xiū zhège diànnǎo?|Who can repair this computer?
xuanbu|宣布|xuānbù|to announce|4|v|老师宣布考试开始。|Lǎoshī xuānbù kǎoshì kāishǐ.|The teacher announced the exam had started.
yanjiu|研究|yánjiū|to research|4|v|他研究中国历史。|Tā yánjiū Zhōngguó lìshǐ.|He researches Chinese history.
yishi|意见|yìjiàn|opinion|4|n|你有什么意见？|Nǐ yǒu shénme yìjiàn?|What is your opinion?
yishu|艺术|yìshù|art|4|n|书法是一种艺术。|Shūfǎ shì yì zhǒng yìshù.|Calligraphy is an art.
yinxiang|因此|yīncǐ|therefore|4|conj|下雨了，因此我不去。|Xià yǔ le, yīncǐ wǒ bú qù.|It is raining, therefore I'm not going.
yinxiang-impress|印象|yìnxiàng|impression|4|n|北京给我留下了深印象。|Běijīng gěi wǒ liú xià le shēn yìnxiàng.|Beijing left a deep impression on me.
yinggai|应该|yīnggāi|should|4|v|你应该多练习。|Nǐ yīnggāi duō liànxí.|You should practice more.
yingxiang-inf|赢|yíng|to win|4|v|我们赢了。|Wǒmen yíng le.|We won.
yongyuan|永远|yǒngyuǎn|forever|4|adv|我永远记得你。|Wǒ yǒngyuǎn jìde nǐ.|I will remember you forever.
youhao|友好|yǒuhǎo|friendly|4|adj|他们很友好。|Tāmen hěn yǒuhǎo.|They are friendly.
youmo|幽默|yōumò|humorous|4|adj|他说话很幽默。|Tā shuōhuà hěn yōumò.|He speaks humorously.
youxiu|优秀|yōuxiù|outstanding|4|adj|她是优秀的学生。|Tā shì yōuxiù de xuéshēng.|She is an outstanding student.
yuqi|于是|yúshì|thereupon; so|4|conj|天下雨了，于是我们回家。|Tiān xià yǔ le, yúshì wǒmen huí jiā.|It rained, so we went home.
yuanyin|幽默|yōumò|humor|4|n|他很有幽默。|Tā hěn yǒu yōumò.|He has a lot of humor.
yuanyin-cause|原因|yuányīn|reason; cause|4|n|失败的原因是什么？|Shībài de yuányīn shì shénme?|What is the reason for the failure?
yue-read|阅读|yuèdú|to read|4|v|我喜欢阅读中文小说。|Wǒ xǐhuan yuèdú Zhōngwén xiǎoshuō.|I like reading Chinese novels.
yunxu|允许|yǔnxǔ|to allow|4|v|这里不允许抽烟。|Zhèlǐ bù yǔnxǔ chōuyān.|Smoking is not allowed here.
zhengfu|政府|zhèngfǔ|government|4|n|这是政府的决定。|Zhè shì zhèngfǔ de juédìng.|This is the government's decision.
zhengzhi|政治|zhèngzhì|politics|4|n|他不太关心政治。|Tā bú tài  guānxīn zhèngzhì.|He doesn't care much about politics.
zhengque|正确|zhèngquè|correct|4|adj|这个答案是正确的。|Zhège dá'àn shì zhèngquè de.|This answer is correct.
zhengming|证明|zhèngmíng|to prove; proof|4|v|你能证明吗？|Nǐ néng zhèngmíng ma?|Can you prove it?
zhiye|职业|zhíyè|profession|4|n|你的职业是什么？|Nǐ de zhíyè shì shénme?|What is your profession?
zhiliang|质量|zhìliàng|quality|4|n|这些茶的质量很好。|Zhèxiē chá de zhìliàng hěn hǎo.|The quality of this tea is excellent.
zhiye-at-least|至少|zhìshǎo|at least|4|adv|至少等十分钟。|Zhìshǎo děng shí fēnzhōng.|Wait at least ten minutes.
zhongyao-zhong|重点|zhòngdiǎn|key point|4|n|今天的重点是语法。|Jīntiān de zhòngdiǎn shì yǔfǎ.|Today's focus is grammar.
zhongshi|重视|zhòngshì|to attach importance to|4|v|他很重视健康。|Tā hěn zhòngshì jiànkāng.|He attaches great importance to health.
zhouwei|周围|zhōuwéi|surroundings|4|n|周围很安静。|Zhōuwéi hěn ānjìng.|The surroundings are quiet.
zhuyi-attention|主意|zhǔyi|idea|4|n|这是个好主意。|Zhè shì ge hǎo zhǔyi.|That's a good idea.
zhuanjia|专门|zhuānmén|specially|4|adv|我专门来看你。|Wǒ zhuānmén lái kàn nǐ.|I came specially to see you.
zhuan|转|zhuǎn|to turn; to transfer|4|v|请往左转。|Qǐng wǎng zuǒ zhuǎn.|Please turn left.
zunzhong|尊重|zūnzhòng|to respect|4|v|我们应该互相尊重。|Wǒmen yīnggāi hùxiāng zūnzhòng.|We should respect each other.
zuizhong|总结|zǒngjié|to summarize|4|v|请总结一下这课。|Qǐng zǒngjié yíxià zhè kè.|Please summarize this lesson.

# HSK 5
aihao|爱护|àihù|to cherish; to take care of|5|v|请爱护公物。|Qǐng àihù gōngwù.|Please take care of public property.
anzhuang|安慰|ānwèi|to comfort|5|v|她安慰了孩子。|Tā ānwèi le háizi.|She comforted the child.
baohan|包括|bāokuò|to include|5|v|价格包括早餐。|Jiàgé bāokuò zǎocān.|The price includes breakfast.
baozheng|保持|bǎochí|to keep; to maintain|5|v|保持冷静。|Bǎochí lěngjìng.|Stay calm.
baomi|保密|bǎomì|to keep secret|5|v|这件事请保密。|Zhè jiàn shì qǐng bǎomì.|Please keep this secret.
baogao|报告|bàogào|report|5|n|他做了一个报告。|Tā zuò le yí ge bàogào.|He gave a report.
beishang|悲观|bēiguān|pessimistic|5|adj|不要太悲观。|Bú yào tài bēiguān.|Don't be too pessimistic.
bibing|毕竟|bìjìng|after all|5|adv|他毕竟还年轻。|Tā bìjìng hái niánqīng.|He is young after all.
bici-each|彼此|bǐcǐ|each other|5|pron|彼此理解很重要。|Bǐcǐ lǐjiě hěn zhòngyào.|Mutual understanding is important.
biaozhi|避免|bìmiǎn|to avoid|5|v|避免犯同样的错误。|Bìmiǎn fàn tóngyàng de cuòwù.|Avoid making the same mistake.
bici-necessary|必要|bìyào|necessary|5|adj|没有必要着急。|Méiyǒu bìyào zháojí.|There's no need to worry.
buliao-un|不足|bùzú|insufficient|5|adj|准备不足。|Zhǔnbèi bùzú.|Preparation is insufficient.
caichan|财产|cáichǎn|property|5|n|保护个人财产。|Bǎohù gèrén cáichǎn.|Protect personal property.
canyu|采访|cǎifǎng|to interview|5|v|记者采访了老师。|Jìzhě cǎifǎng le lǎoshī.|The reporter interviewed the teacher.
canyu-join|采取|cǎiqǔ|to adopt|5|v|采取新措施。|Cǎiqǔ xīn cuòshī.|Adopt new measures.
chenwei|称赞|chēngzàn|to praise|5|v|老师称赞了学生。|Lǎoshī chēngzàn le xuéshēng.|The teacher praised the student.
chenggong-degree|程度|chéngdù|degree; extent|5|n|紧张到这种程度。|Jǐnzhāng dào zhè zhǒng chéngdù.|Nervous to this extent.
chongman-full|充满|chōngmǎn|to be full of|5|v|心里充满希望。|Xīn lǐ chōngmǎn xīwàng.|The heart is full of hope.
chongtu|重复|chóngfù|to repeat|5|v|请不要重复同样的话。|Qǐng bú yào chóngfù tóngyàng de huà.|Please don't repeat the same words.
chuli|处理|chǔlǐ|to handle|5|v|这件事我来处理。|Zhè jiàn shì wǒ lái chǔlǐ.|I'll handle this matter.
chuangzao|创造|chuàngzào|to create|5|v|他创造了新方法。|Tā chuàngzào le xīn fāngfǎ.|He created a new method.
cichu|此外|cǐwài|besides|5|conj|此外，我们还要练习听力。|Cǐwài, wǒmen hái yào liànxí tīnglì.|Besides that, we still need to practice listening.
daibiao|代表|dàibiǎo|to represent; representative|5|v|他代表我们发言。|Tā dàibiǎo wǒmen fāyán.|He speaks on our behalf.
daodu|到达|dàodá|to arrive|5|v|飞机准时到达。|Fēijī zhǔnshí dàodá.|The plane arrived on time.
dengdai-wait|等待|děngdài|to await|5|v|我们在等待消息。|Wǒmen zài děngdài xiāoxi.|We are waiting for news.
diduan|对待|duìdài|to treat|5|v|要平等对待每个人。|Yào píngděng duìdài měi ge rén.|Treat everyone equally.
fanrong|发表|fābiǎo|to publish; to deliver|5|v|他发表了自己的意见。|Tā fābiǎo le zìjǐ de yìjiàn.|He expressed his opinion.
fanwei|范围|fànwéi|scope; range|5|n|这不在我的工作范围。|Zhè bú zài wǒ de gōngzuò fànwéi.|This is outside my job scope.
fangemian|反而|fǎn'ér|on the contrary|5|adv|越休息反而越累。|Yuè xiūxi fǎn'ér yuè lèi.|The more I rest, the more tired I feel.
fangfa|仿佛|fǎngfú|as if|5|adv|他仿佛不认识我。|Tā fǎngfú bú rènshi wǒ.|He acted as if he didn't know me.
fei-cost|费用|fèiyòng|cost; expense|5|n|旅行的费用不低。|Lǚxíng de fèiyòng bù dī.|Travel costs are not low.
fenxi|分析|fēnxī|to analyze|5|v|我们来分析原因。|Wǒmen lái fēnxī yuányīn.|Let's analyze the cause.
fengge|风格|fēnggé|style|5|n|他的写作风格很特别。|Tā de xiězuò fēnggé hěn tèbié.|His writing style is distinctive.
fengxian|风险|fēngxiǎn|risk|5|n|这件事有风险。|Zhè jiàn shì yǒu fēngxiǎn.|This matter carries risk.
fuhe|付出|fùchū|to put in; to pay|5|v|没有付出就没有收获。|Méiyǒu fùchū jiù méiyǒu shōuhuò.|No effort, no reward.
fuwu-complex|复杂|fùzá|complicated|5|adj|这个问题很复杂。|Zhège wèntí hěn fùzá.|This problem is complicated.
gailv|改进|gǎijìn|to improve|5|v|我们需要改进方法。|Wǒmen xūyào gǎijìn fāngfǎ.|We need to improve the method.
ganqing-feel|感受|gǎnshòu|to feel; a feeling|5|v|我能感受他的紧张。|Wǒ néng gǎnshòu tā de jǐnzhāng.|I can feel his nervousness.
gexing|个人|gèrén|individual; personal|5|n|这是我的个人意见。|Zhè shì wǒ de gèrén yìjiàn.|This is my personal opinion.
gongxian|贡献|gòngxiàn|contribution|5|n|他对汉语教学有贡献。|Tā duì Hànyǔ jiàoxué yǒu gòngxiàn.|He has contributed to Chinese teaching.
guanxin|关心|guānxīn|to be concerned about|5|v|老师很关心学生。|Lǎoshī hěn  guānxīn xuéshēng.|The teacher cares about the students.
guocheng|过程|guòchéng|process|5|n|学习是一个过程。|Xuéxí shì yí ge  guòchéng.|Learning is a process.
hege|合格|hégé|qualified|5|adj|他的发音很合格。|Tā de fāyīn hěn hégé.|His pronunciation is up to standard.
heshi|合作|hézuò|to cooperate|5|v|我们合作得很好。|Wǒmen hézuò de hěn hǎo.|We cooperate well.
houguo|后果|hòuguǒ|consequence|5|n|你要想想后果。|Nǐ yào xiǎng xiang hòuguǒ.|You should think about the consequences.
hushi-ignore|忽视|hūshì|to neglect|5|v|不要忽视基础。|Bú yào hūshì jīchǔ.|Don't neglect the basics.
huaiyi|怀疑|huáiyí|to doubt|5|v|我怀疑这个说法。|Wǒ huáiyí zhège shuōfǎ.|I doubt this claim.
huifu|恢复|huīfù|to recover|5|v|他已经恢复健康。|Tā yǐjīng huīfù jiànkāng.|He has already recovered.
jibei|几乎|jīhū|nearly|5|adv|我几乎每天都练习。|Wǒ jīhū měi tiān dōu liànxí.|I practice nearly every day.
jilu|记录|jìlù|to record; a record|5|v|请记录这些生词。|Qǐng jìlù zhèxiē shēngcí.|Please record these new words.
jishu-skill|继续|jìxù|to continue|5|v|请继续说。|Qǐng jìxù shuō.|Please continue speaking.
jiaru|既然|jìrán|since; now that|5|conj|既然来了，就好好学。|Jìrán lái le, jiù hǎohāo xué.|Since you're here, study well.
jiaoyu|教育|jiàoyù|education|5|n|教育改变命运。|Jiàoyù gǎibiàn mìngyùn.|Education changes destiny.
jiezhe|接触|jiēchù|to come into contact with|5|v|我很少接触这类书。|Wǒ hěn shǎo jiēchù zhè lèi shū.|I rarely come into contact with this kind of book.
jiezhe-then|接着|jiēzhe|then; to carry on|5|adv|你先说，我接着说。|Nǐ xiān shuō, wǒ jiēzhe shuō.|You speak first, then I'll continue.
jinzhang|尽量|jǐnliàng|to the best of one's ability|5|adv|请尽量说汉语。|Qǐng jǐnliàng shuō Hànyǔ.|Please speak Chinese as much as you can.
jinzhang-nervous|紧张|jǐnzhāng|nervous; tight|5|adj|考试前我很紧张。|Kǎoshì qián wǒ hěn jǐnzhāng.|I'm nervous before exams.
jingcai-splendid|精彩|jīngcǎi|brilliant; splendid|5|adj|这场表演很精彩。|Zhè chǎng biǎoyǎn hěn jīngcǎi.|This performance was splendid.
jingzheng-compete|竞争|jìngzhēng|to compete|5|v|他们在竞争这个职位。|Tāmen zài jìngzhēng zhège zhíwèi.|They are competing for this position.
jiudu|究竟|jiūjìng|in the end|5|adv|你究竟想做什么？|Nǐ jiūjìng xiǎng zuò shénme?|What do you actually want to do?
juede-aware|觉得|juéde|to feel|5|v|我觉得有点儿冷。|Wǒ juéde yǒudiǎnr lěng.|I feel a bit cold.
juti|具体|jùtǐ|concrete; specific|5|adj|请说得具体一点儿。|Qǐng shuō de jùtǐ yìdiǎnr.|Please be more specific.
kaolv|考虑|kǎolǜ|to consider|5|v|让我考虑一下。|Ràng wǒ kǎolǜ yíxià.|Let me think it over.
kongzhi|控制|kòngzhì|to control|5|v|他控制不住自己的情绪。|Tā kòngzhì bú zhù zìjǐ de qíngxù.|He can't control his emotions.
kexin|可靠|kěkào|reliable|5|adj|他是个可靠的人。|Tā shì ge kěkào de rén.|He is a reliable person.
keneng-maybe|可能|kěnéng|possible|5|adj|这完全可能。|Zhè wánquán kěnéng.|This is entirely possible.
laodong|劳动|láodòng|labor|5|n|热爱劳动。|Rè'ài láodòng.|Love labor.
liliang-reason|理论|lǐlùn|theory|5|n|理论要联系实际。|Lǐlùn yào liánxì shíjì.|Theory should connect to practice.
liji-imm|立刻|lìkè|immediately|5|adv|请立刻过来。|Qǐng lìkè  guò lái.|Please come over immediately.
linghuo|灵活|línghuó|flexible|5|adj|这个计划很灵活。|Zhège jìhuà hěn línghuó.|This plan is flexible.
maodun|矛盾|máodùn|contradiction|5|n|他们的说法有矛盾。|Tāmen de shuōfǎ yǒu máodùn.|Their accounts contradict.
mianlin-face|面临|miànlín|to face; to be confronted with|5|v|我们面临新的挑战。|Wǒmen miànlín xīn de tiǎozhàn.|We face a new challenge.
mingxian|明确|míngquè|clear; explicit|5|adj|目标必须明确。|Mùbiāo bìxū míngquè.|The goal must be clear.
neirong|内容|nèiróng|content|5|n|这课的内容很多。|Zhè kè de nèiróng hěn duō.|This lesson has a lot of content.
nengyuan|能源|néngyuán|energy (resources)|5|n|我们要节约能源。|Wǒmen yào jiéyuē néngyuán.|We should save energy.
peiyang|培养|péiyǎng|to cultivate|5|v|培养好习惯。|Péiyǎng hǎo xíguàn.|Cultivate good habits.
pishi-批|批评|pīpíng|to criticize|5|v|老师批评了他。|Lǎoshī pīpíng le tā.|The teacher criticized him.
pingjia-eval|评价|píngjià|to evaluate|5|v|如何评价这本书？|Rúhé píngjià zhè běn shū?|How do you evaluate this book?
qiangdiao|强调|qiángdiào|to emphasize|5|v|老师强调了声调的重要。|Lǎoshī qiángdiào le shēngdiào de zhòngyào.|The teacher emphasized the importance of tones.
qihou-atm|气氛|qìfēn|atmosphere|5|n|教室里的气氛很好。|Jiàoshì lǐ de qìfēn hěn hǎo.|The atmosphere in the classroom is good.
qianxu|谦虚|qiānxū|modest|5|adj|他很谦虚。|Tā hěn qiānxū.|He is modest.
qingchu-clear|清楚|qīngchu|clear|5|adj|我听不清楚。|Wǒ tīng bù qīngchu.|I can't hear clearly.
quxiao-trend|趋势|qūshì|trend|5|n|这是一个新趋势。|Zhè shì yí ge xīn qūshì.|This is a new trend.
qubie|区别|qūbié|difference|5|n|这两个词有什么区别？|Zhè liǎng ge cí yǒu shénme qūbié?|What's the difference between these two words?
quanli|权利|quánlì|right (entitlement)|5|n|每个人都有学习的权利。|Měi ge rén dōu yǒu xuéxí de quánlì.|Everyone has the right to learn.
queshao|缺乏|quēfá|to lack|5|v|他缺乏经验。|Tā quēfá jīngyàn.|He lacks experience.
renke-identify|认识|rènshi|understanding|5|n|我对这个问题有新的认识。|Wǒ duì zhège wèntí yǒu xīn de rènshi.|I have a new understanding of this issue.
rongren|仍然|réngrán|still|5|adv|他仍然在学习。|Tā réngrán zài xuéxí.|He is still studying.
ruanjian|软件|ruǎnjiàn|software|5|n|这个软件很好用。|Zhège ruǎnjiàn hěn hǎoyòng.|This software is easy to use.
shangliang|商量|shāngliang|to discuss; to consult|5|v|我们商量一下。|Wǒmen shāngliang yíxià.|Let's discuss it.
shehui|社会|shèhuì|society|5|n|语言和社会有密切关系。|Yǔyán hé shèhuì yǒu mìqiè  guānxì.|Language and society are closely related.
shenke|深刻|shēnkè|profound|5|adj|这给我留下了深刻印象。|Zhè gěi wǒ liú xià le shēnkè yìnxiàng.|This left a profound impression on me.
shengming|生命|shēngmìng|life (biological)|5|n|生命只有一次。|Shēngmìng zhǐ yǒu yí cì.|You only live once.
shishi|事实|shìshí|fact|5|n|事实就是这样。|Shìshí jiù shì zhèyàng.|Those are the facts.
shiyong|适合|shìhé|to suit|5|v|这个方法适合初学者。|Zhège fāngfǎ shìhé chūxuézhě.|This method suits beginners.
shouhuo-harvest|收获|shōuhuò|harvest; gain|5|n|这次旅行收获很大。|Zhè cì lǚxíng shōuhuò hěn dà.|I gained a lot from this trip.
shunxu|顺序|shùnxù|order; sequence|5|n|请按顺序排队。|Qǐng àn shùnxù pái duì.|Please line up in order.
taidu|态度|tàidu|attitude|5|n|学习态度很重要。|Xuéxí tàidu hěn zhòngyào.|Study attitude is important.
tezheng|特点|tèdiǎn|characteristic|5|n|汉语的特点是声调。|Hànyǔ de tèdiǎn shì shēngdiào.|A characteristic of Chinese is tones.
tiaoji-cond|挑战|tiǎozhàn|challenge|5|n|学汉字是一个挑战。|Xué Hànzì shì yí ge tiǎozhàn.|Learning characters is a challenge.
tongyi-unify|统一|tǒngyī|to unify|5|v|意见还不统一。|Yìjiàn hái bù tǒngyī.|Opinions are not yet unified.
tuijian-rec|推荐|tuījiàn|to recommend|5|v|我推荐这本书。|Wǒ tuījiàn zhè běn shū.|I recommend this book.
tuoxie|妥协|tuǒxié|to compromise|5|v|双方都做了妥协。|Shuāngfāng dōu zuò le tuǒxié.|Both sides compromised.
wanmei|完美|wánměi|perfect|5|adj|没有完美的计划。|Méiyǒu wánměi de jìhuà.|There is no perfect plan.
weida|伟大|wěidà|great|5|adj|这是一项伟大的工程。|Zhè shì yí xiàng wěidà de  gōngchéng.|This is a great project.
wenxue-lit|文学|wénxué|literature|5|n|他喜欢中国文学。|Tā xǐhuan Zhōngguó wénxué.|He likes Chinese literature.
wuran-matter|无论|wúlùn|no matter|5|conj|无论多难，我都要坚持。|Wúlùn duō nán, wǒ dōu yào jiānchí.|No matter how hard, I will persist.
xianzhi|限制|xiànzhì|to limit|5|v|时间有限制。|Shíjiān yǒu xiànzhì.|There is a time limit.
xiangshou|享受|xiǎngshòu|to enjoy|5|v|享受学习的过程。|Xiǎngshòu xuéxí de  guòchéng.|Enjoy the process of learning.
xiaolv|效率|xiàolǜ|efficiency|5|n|这样学习效率更高。|Zhèyàng xuéxí xiàolǜ gèng gāo.|Studying this way is more efficient.
xinlai|心理|xīnlǐ|psychology; mindset|5|n|考试心理很重要。|Kǎoshì xīnlǐ hěn zhòngyào.|Exam mindset is important.
xingcheng|形成|xíngchéng|to form|5|v|好习惯是慢慢形成的。|Hǎo xíguàn shì mànmàn xíngchéng de.|Good habits form slowly.
xuanze-item|宣布|xuānbù|to announce|5|v|结果还没宣布。|Jiéguǒ hái méi xuānbù.|The result hasn't been announced yet.
yanli|严厉|yánlì|strict; severe|5|adj|这位老师很严厉。|Zhè wèi lǎoshī hěn yánlì.|This teacher is strict.
yishi-conscious|意识|yìshí|awareness|5|n|环保意识越来越强。|Huánbǎo yìshí yuè lái yuè qiáng.|Environmental awareness is growing.
yishu-art|意义|yìyì|meaning; significance|5|n|这件事很有意义。|Zhè jiàn shì hěn yǒu yìyì.|This matter is very meaningful.
yinxiang-due|由于|yóuyú|due to|5|prep|由于下雨，活动取消了。|Yóuyú xià yǔ, huódòng qǔxiāo le.|Due to rain, the event was cancelled.
youhui|优惠|yōuhuì|preferential; a discount|5|n|现在买有优惠。|Xiànzài mǎi yǒu yōuhuì.|There's a discount if you buy now.
youyue|优势|yōushì|advantage|5|n|他的优势是发音。|Tā de yōushì shì fāyīn.|His advantage is pronunciation.
yuqi-expect|预测|yùcè|to predict|5|v|谁能预测明天的天气？|Shéi néng yùcè míngtiān de tiānqì?|Who can predict tomorrow's weather?
yuanze|原则|yuánzé|principle|5|n|这是我的原则。|Zhè shì wǒ de yuánzé.|This is my principle.
zhengce|政策|zhèngcè|policy|5|n|这是新的教育政策。|Zhè shì xīn de jiàoyù zhèngcè.|This is a new education policy.
zhengming-prove|证据|zhèngjù|evidence|5|n|你有证据吗？|Nǐ yǒu zhèngjù ma?|Do you have evidence?
zhiye-support|支持|zhīchí|to support|5|v|我支持你的决定。|Wǒ zhīchí nǐ de juédìng.|I support your decision.
zhishi|知识|zhīshi|knowledge|5|n|知识改变命运。|Zhīshi gǎibiàn mìngyùn.|Knowledge changes destiny.
zhiyuan|志愿|zhìyuàn|aspiration; volunteer|5|n|他有当老师的志愿。|Tā yǒu dāng lǎoshī de zhìyuàn.|He aspires to be a teacher.
zhuyao-theme|主题|zhǔtí|theme|5|n|这篇文章的主题是什么？|Zhè piān wénzhāng de zhǔtí shì shénme?|What is the theme of this article?
zhuanye|专业|zhuānyè|major; specialized|5|n|我的专业是中文。|Wǒ de zhuānyè shì Zhōngwén.|My major is Chinese.
zunzhong-obey|遵守|zūnshǒu|to abide by|5|v|请遵守规则。|Qǐng zūnshǒu  guīzé.|Please follow the rules.

# HSK 6
baolu|暴露|bàolù|to expose|6|v|问题暴露出来了。|Wèntí bàolù chū lái le.|The problem was exposed.
benzhi|本质|běnzhì|essence|6|n|抓住问题的本质。|Zhuāzhù wèntí de běnzhì.|Grasp the essence of the problem.
bianlun|辩论|biànlùn|debate|6|n|他们在进行辩论。|Tāmen zài jìnxíng biànlùn.|They are holding a debate.
bolan|波澜|bōlán|great waves; unrest|6|n|心里起了波澜。|Xīn lǐ qǐ le bōlán.|Waves rose in the heart.
caihua|才华|cáihuá|talent|6|n|她很有才华。|Tā hěn yǒu cáihuá.|She is very talented.
chenmo|沉默|chénmò|silent|6|adj|他沉默了一会儿。|Tā chénmò le yíhuìr.|He was silent for a moment.
chongtu-conflict|冲突|chōngtū|conflict|6|n|他们之间有冲突。|Tāmen zhījiān yǒu chōngtū.|There is conflict between them.
chouxing|抽象|chōuxiàng|abstract|6|adj|这个概念太抽象了。|Zhège gàiniàn tài chōuxiàng le.|This concept is too abstract.
chuangxin|创新|chuàngxīn|innovation|6|n|教育需要创新。|Jiàoyù xūyào chuàngxīn.|Education needs innovation.
cuowei|促使|cùshǐ|to spur; to prompt|6|v|这件事促使我反思。|Zhè jiàn shì cùshǐ wǒ fǎnsī.|This prompted me to reflect.
daode|道德|dàodé|morality|6|n|这是道德问题。|Zhè shì dàodé wèntí.|This is a moral issue.
diyi-resist|抵抗|dǐkàng|to resist|6|v|身体在抵抗疾病。|Shēntǐ zài dǐkàng jíbìng.|The body is resisting illness.
dongji|动机|dòngjī|motive|6|n|他的动机不纯。|Tā de dòngjī bù chún.|His motive is not pure.
duocai|独裁|dúcái|dictatorship|6|n|人民反对独裁。|Rénmín fǎnduì dúcái.|The people oppose dictatorship.
fansi|反思|fǎnsī|to reflect|6|v|我们应该反思自己的学习方法。|Wǒmen yīnggāi fǎnsī zìjǐ de xuéxí fāngfǎ.|We should reflect on our study methods.
fengci|讽刺|fěngcì|to satirize|6|v|他用小说讽刺社会。|Tā yòng xiǎoshuō fěngcì shèhuì.|He satirizes society in his novels.
ganran|感染|gǎnrǎn|to infect; to move (emotionally)|6|v|他的热情感染了大家。|Tā de rèqíng gǎnrǎn le dàjiā.|His enthusiasm moved everyone.
gangling|纲领|gānglǐng|guiding principle|6|n|这是行动纲领。|Zhè shì xíngdòng gānglǐng.|This is a plan of action.
gongping|公平|gōngpíng|fair|6|adj|比赛应该公平。|Bǐsài yīnggāi  gōngpíng.|Competitions should be fair.
guandian|观点|guāndiǎn|point of view|6|n|我不同意这个观点。|Wǒ bù tóngyì zhège  guāndiǎn.|I disagree with this view.
hanxu|含蓄|hánxù|implicit; reserved|6|adj|他的表达很含蓄。|Tā de biǎodá hěn hánxù.|His expression is reserved.
hemu|和谐|héxié|harmonious|6|adj|我们希望社会和谐。|Wǒmen xīwàng shèhuì héxié.|We hope for a harmonious society.
hongwei|宏观|hóngguān|macro|6|adj|从宏观角度看。|Cóng hóngguān jiǎodù kàn.|Look at it from a macro angle.
jianjie|见解|jiànjiě|insight; view|6|n|他很有见解。|Tā hěn yǒu jiànjiě.|He has real insight.
jingshen|精神|jīngshén|spirit; mind|6|n|保持良好的精神状态。|Bǎochí liánghǎo de jīngshén zhuàngtài.|Keep a good state of mind.
keji|科技|kējì|science and technology|6|n|科技改变生活。|Kējì gǎibiàn shēnghuó.|Technology changes life.
linghun|灵魂|línghún|soul|6|n|音乐是一个民族的灵魂。|Yīnyuè shì yí ge mínzú de línghún.|Music is the soul of a people.
luoji|逻辑|luójí|logic|6|n|他的逻辑很清楚。|Tā de luójí hěn qīngchu.|His logic is clear.
maodun-conflict|迈进|màijìn|to stride forward|6|v|汉语学习又迈进了一步。|Hànyǔ xuéxí yòu màijìn le yí bù.|Chinese study has taken another stride.
mingan|敏感|mǐngǎn|sensitive|6|adj|他对批评很敏感。|Tā duì pīpíng hěn mǐngǎn.|He is sensitive to criticism.
neihan|内涵|nèihán|connotation; substance|6|n|这篇文章内涵丰富。|Zhè piān wénzhāng nèihán fēngfù.|This essay has rich substance.
pianjian|偏见|piānjiàn|prejudice|6|n|不要有偏见。|Bú yào yǒu piānjiàn.|Don't be prejudiced.
qianli|潜力|qiánlì|potential|6|n|这个学生很有潜力。|Zhège xuéshēng hěn yǒu qiánlì.|This student has a lot of potential.
qinfen|勤奋|qínfèn|diligent|6|adj|勤奋是成功的基础。|Qínfèn shì chénggōng de jīchǔ.|Diligence is the foundation of success.
renxing|人性|rénxìng|human nature|6|n|文学常常探讨人性。|Wénxué chángcháng tàntǎo rénxìng.|Literature often explores human nature.
shenmei|审美|shěnměi|aesthetics|6|n|书法能培养审美。|Shūfǎ néng péiyǎng shěnměi.|Calligraphy can cultivate aesthetics.
shenke-deep|深奥|shēn'ào|profound; abstruse|6|adj|这本哲学书很深奥。|Zhè běn zhéxué shū hěn shēn'ào.|This philosophy book is abstruse.
shishi-implement|实施|shíshī|to implement|6|v|新政策已经实施。|Xīn zhèngcè yǐjīng shíshī.|The new policy has been implemented.
siwei|思维|sīwéi|thinking; thought|6|n|学语言也是学一种思维。|Xué yǔyán yě shì xué yì zhǒng sīwéi.|Learning a language is also learning a way of thinking.
suoyang|素养|sùyǎng|cultivation; quality|6|n|提高文化素养。|Tígāo wénhuà sùyǎng.|Raise cultural cultivation.
tansuo|探索|tànsuǒ|to explore|6|v|他一直在探索新方法。|Tā yìzhí zài tànsuǒ xīn fāngfǎ.|He keeps exploring new methods.
tixi|体系|tǐxì|system|6|n|汉语有自己的语法体系。|Hànyǔ yǒu zìjǐ de yǔfǎ tǐxì.|Chinese has its own grammar system.
tuili|推理|tuīlǐ|reasoning; inference|6|n|这只是推理，不是事实。|Zhè zhǐ shì tuīlǐ, bú shì shìshí.|This is only inference, not fact.
weibo|微观|wēiguān|micro|6|adj|从微观角度分析。|Cóng wēiguān jiǎodù fēnxī.|Analyze from a micro angle.
xianming|鲜明|xiānmíng|distinct; striking|6|adj|他的观点很鲜明。|Tā de  guāndiǎn hěn xiānmíng.|His view is distinctive.
xinling|心灵|xīnlíng|heart; soul|6|n|音乐能安慰心灵。|Yīnyuè néng ānwèi xīnlíng.|Music can comfort the soul.
xunhuan|循环|xúnhuán|cycle; to circulate|6|n|这是一个恶性循环。|Zhè shì yí ge èxìng xúnhuán.|This is a vicious cycle.
yishi-ideol|意识形态|yìshí xíngtài|ideology|6|n|不要被意识形态束缚。|Bú yào bèi yìshí xíngtài shùfù.|Don't be bound by ideology.
yinyu|隐喻|yǐnyù|metaphor|6|n|古诗里常有隐喻。|Gǔshī lǐ cháng yǒu yǐnyù.|Classical poems often contain metaphors.
youmo-humor|幽默|yōumò|humor|6|n|含蓄的幽默更有味道。|Hánxù de yōumò gèng yǒu wèidao.|Reserved humor has more flavor.
zhexue|哲学|zhéxué|philosophy|6|n|他在大学学哲学。|Tā zài dàxué xué zhéxué.|He studies philosophy at university.
zhendi|阵地|zhèndì|position; front|6|n|文化是思想的阵地。|Wénhuà shì sīxiǎng de zhèndì.|Culture is a battleground of ideas.
zhihui|智慧|zhìhuì|wisdom|6|n|老人有生活的智慧。|Lǎorén yǒu shēnghuó de zhìhuì.|Elders have the wisdom of life.
zhuanzhe|转折|zhuǎnzhé|turning point|6|n|那是他人生的转折。|Nà shì tā rénshēng de zhuǎnzhé.|That was a turning point in his life.
zunyan|尊严|zūnyán|dignity|6|n|人要有尊严地活着。|Rén yào yǒu zūnyán de huózhe.|People should live with dignity.

# Fluency — chéngyǔ
huashetianzu|画蛇添足|huà shé tiān zú|to gild the lily; ruin by overdoing|7|idiom|别画蛇添足，这样就很好。|Bié huà shé tiān zú, zhèyàng jiù hěn hǎo.|Don't overdo it — it's already good.
shouzhudaitu|守株待兔|shǒu zhū dài tù|to wait passively for a windfall|7|idiom|学习不能守株待兔。|Xuéxí bù néng shǒu zhū dài tù.|You can't just wait for progress to come.
wangyangbulao|亡羊补牢|wáng yáng bǔ láo|better late than never; mend the fold after the sheep is lost|7|idiom|现在改还来得及，亡羊补牢。|Xiànzài gǎi hái láidejí, wáng yáng bǔ láo.|It's not too late to fix it.
yijianshuangdiao|一箭双雕|yí jiàn shuāng diāo|to kill two birds with one stone|7|idiom|这次旅行一箭双雕：观光又练汉语。|Zhè cì lǚxíng yí jiàn shuāng diāo:  guānguāng yòu liàn Hànyǔ.|This trip does both: sightseeing and Chinese practice.
ruxiangsuisu|入乡随俗|rù xiāng suí sú|when in Rome, do as the Romans do|7|idiom|在中国要入乡随俗。|Zài Zhōngguó yào rù xiāng suí sú.|In China, follow local customs.
bantuerfei|半途而废|bàn tú ér fèi|to give up halfway|7|idiom|学语言最怕半途而废。|Xué yǔyán zuì pà bàn tú ér fèi.|The worst thing in language learning is quitting halfway.
quanliyifu|全力以赴|quán lì yǐ fù|to go all out|7|idiom|考试前他全力以赴。|Kǎoshì qián tā quán lì yǐ fù.|He went all out before the exam.
bukesiyi|不可思议|bù kě sī yì|unbelievable|7|idiom|他一年就过了 HSK 六级，真是不可思议。|Tā yì nián jiù guò le HSK liù jí, zhēn shì bù kě sī yì.|He passed HSK 6 in a year — unbelievable.
shunqiziran|顺其自然|shùn qí zìrán|to let nature take its course|7|idiom|有时候要顺其自然。|Yǒu shíhou yào shùn qí zìrán.|Sometimes you have to let things take their course.
xuezhongsongtan|雪中送炭|xuě zhōng sòng tàn|to help someone in their hour of need|7|idiom|朋友在我困难时帮忙，真是雪中送炭。|Péngyou zài wǒ kùnnan shí bāng máng, zhēn shì xuě zhōng sòng tàn.|Friends helping in hardship is true timely aid.
duiniutanqin|对牛弹琴|duì niú tán qín|to cast pearls before swine|7|idiom|跟不想听的人解释，简直是对牛弹琴。|Gēn bù xiǎng tīng de rén jiěshì, jiǎnzhí shì duì niú tán qín.|Explaining to someone who won't listen is wasted.
jingdizhiwa|井底之蛙|jǐng dǐ zhī wā|a person of narrow views|7|idiom|走出去看看，别做井底之蛙。|Zǒu chū qù kàn kan, bié zuò jǐng dǐ zhī wā.|Go out and see the world — don't be a frog in a well.
koushixinfei|口是心非|kǒu shì xīn fēi|to say one thing and mean another|7|idiom|他这个人口是心非。|Tā zhège rén kǒu shì xīn fēi.|He says one thing and means another.
yijianzhongqing|一见钟情|yí jiàn zhōng qíng|love at first sight|7|idiom|他们对北京一见钟情。|Tāmen duì Běijīng yí jiàn zhōng qíng.|They fell for Beijing at first sight.
mamahuhu|马马虎虎|mǎmǎhūhū|so-so; careless|7|idiom|我的汉语还马马虎虎。|Wǒ de Hànyǔ hái mǎmǎhūhū.|My Chinese is just so-so.
qishangbaxia|七上八下|qī shàng bā xià|to be agitated; in a flutter|7|idiom|考试前我心里七上八下。|Kǎoshì qián wǒ xīn lǐ qī shàng bā xià.|I was a bundle of nerves before the exam.
jiuniu yimao|九牛一毛|jiǔ niú yì máo|a drop in the ocean|7|idiom|这点钱对他来说是九牛一毛。|Zhè diǎn qián duì tā lái shuō shì jiǔ niú yì máo.|This bit of money is nothing to him.
ziyouzizai|自由自在|zì yóu zì zài|free and easy|7|idiom|退休以后他过得自由自在。|Tuìxiū yǐhòu tā guò de zì yóu zì zài.|After retiring he lives free and easy.
yilupingan|一路平安|yí lù píng ān|have a safe trip|7|idiom|祝你一路平安。|Zhù nǐ yí lù píng ān.|Have a safe trip.
xinxiangshicheng|心想事成|xīn xiǎng shì chéng|may all your wishes come true|7|idiom|新年心想事成。|Xīnnián xīn xiǎng shì chéng.|May the new year bring what you wish.
libucongxin|力不从心|lì bù cóng xīn|the spirit is willing but the flesh is weak|7|idiom|我想帮你，可是力不从心。|Wǒ xiǎng bāng nǐ, kěshì lì bù cóng xīn.|I want to help, but I haven't the strength.
shishijiushi|实事求是|shí shì qiú shì|to seek truth from facts|7|idiom|评价要实事求是。|Píngjià yào shí shì qiú shì.|Evaluate based on the facts.
jinjinyouwei|津津有味|jīn jīn yǒu wèi|with great relish|7|idiom|他听得津津有味。|Tā tīng de jīn jīn yǒu wèi.|He listened with great interest.
aibushishou|爱不释手|ài bù shì shǒu|to love something too much to part with it|7|idiom|这本书让我爱不释手。|Zhè běn shū ràng wǒ ài bù shì shǒu.|I can't put this book down.
`;

export const VOCAB: Vocab[] = parse(RAW);

export const VOCAB_BY_ID: Record<string, Vocab> = Object.fromEntries(
  VOCAB.map((item) => [item.id, item]),
);

export function getVocab(id: string): Vocab | undefined {
  return VOCAB_BY_ID[id];
}

export function vocabByHsk(hsk: Vocab["hsk"]): Vocab[] {
  return VOCAB.filter((item) => item.hsk === hsk);
}

export function searchVocab(q: string): Vocab[] {
  const n = q.trim().toLowerCase();
  if (!n) return [];
  return VOCAB.filter(
    (item) =>
      item.hanzi.includes(n) ||
      item.pinyin.toLowerCase().includes(n) ||
      item.english.toLowerCase().includes(n) ||
      item.id.includes(n),
  ).slice(0, 24);
}
