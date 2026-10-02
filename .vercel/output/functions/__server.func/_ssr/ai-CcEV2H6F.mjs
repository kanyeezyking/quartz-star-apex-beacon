import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CcEV2H6F.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var tutorReply_createServerFn_handler = createServerRpc({
	id: "7befa45338753a9ffb989d76356267cc82eaeefdddabfa6dd8b13361afd03514",
	name: "tutorReply",
	filename: "src/lib/ai.ts"
}, (opts) => tutorReply.__executeServer(opts));
var tutorReply = createServerFn({ method: "POST" }).validator((input) => input).handler(tutorReply_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "unavailable"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 400,
			temperature: .7,
			messages: [
				{
					role: "system",
					content: `You are a patient Mandarin tutor in Cinnabar, a fluency academy.
Student level: HSK ${data.level} (0 beginner, 6 advanced, 7 near-fluent).
Reply with JSON only, no markdown:
{"hanzi":"1-3 short Simplified Chinese sentences at their level","pinyin":"tone-marked pinyin","english":"brief gloss","correction":null or a short correction of their Chinese,"hint":"one short teaching tip or a follow-up in English"}
Do not invent rare words at low levels. Keep hanzi short.`
				},
				...data.history.slice(-8).map((m) => ({
					role: m.role === "assistant" ? "assistant" : "user",
					content: m.content
				})),
				{
					role: "user",
					content: data.message
				}
			]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	const raw = (await res.json()).choices[0]?.message.content ?? "";
	const jsonStart = raw.indexOf("{");
	const jsonEnd = raw.lastIndexOf("}");
	if (jsonStart < 0 || jsonEnd < 0) return {
		ok: false,
		error: "bad-json"
	};
	try {
		const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));
		return {
			ok: true,
			reply: {
				hanzi: String(parsed.hanzi ?? ""),
				pinyin: String(parsed.pinyin ?? ""),
				english: String(parsed.english ?? ""),
				correction: parsed.correction ? String(parsed.correction) : null,
				hint: String(parsed.hint ?? "")
			}
		};
	} catch {
		return {
			ok: false,
			error: "bad-json"
		};
	}
});
//#endregion
export { tutorReply_createServerFn_handler };
