import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type Lane = "government" | "ai";
type Experience = "studio" | "interview";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;
const TIMEOUT_MS = 8_000;
const MAX_SOURCE_CHARS = 6_000;
const rateBuckets = new Map<string, number[]>();

const briefSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    status: { type: "string", enum: ["follow_up", "complete"] },
    follow_up_question: { type: "string" },
    brief: {
      type: "object",
      additionalProperties: false,
      properties: {
        jtbd: {
          type: "object",
          additionalProperties: false,
          properties: {
            when: { type: "string" },
            need: { type: "string" },
            soThat: { type: "string" },
          },
          required: ["when", "need", "soThat"],
        },
        outcome: { type: "string" },
        workaround: { type: "string" },
        risks: {
          type: "object",
          additionalProperties: false,
          properties: {
            value: { type: "string" },
            usability: { type: "string" },
            feasibility: { type: "string" },
            viability: { type: "string" },
          },
          required: ["value", "usability", "feasibility", "viability"],
        },
        strongestRisk: { type: "string", enum: ["value", "usability", "feasibility", "viability"] },
        assumption: { type: "string" },
        test: { type: "string" },
        evidence: { type: "string" },
      },
      required: ["jtbd", "outcome", "workaround", "risks", "strongestRisk", "assumption", "test", "evidence"],
    },
  },
  required: ["status", "follow_up_question", "brief"],
} as const;

function clientKey(request: NextRequest) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (rateBuckets.get(key) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  rateBuckets.set(key, recent);
  return false;
}

function looksSensitive(text: string) {
  return /\b(classified|top secret|secret\/\/|fouo|controlled unclassified|social security number|ssn)\b/i.test(text) || /\b\d{3}-\d{2}-\d{4}\b/.test(text);
}

function emptyBrief() {
  return {
    jtbd: { when: "", need: "", soThat: "" }, outcome: "", workaround: "",
    risks: { value: "", usability: "", feasibility: "", viability: "" },
    strongestRisk: "value", assumption: "", test: "", evidence: "",
  };
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientKey(request))) return NextResponse.json({ error: "Please wait before running another read." }, { status: 429 });

  let body: { lane?: Lane; experience?: Experience; source?: string; followUpAnswer?: string; allowFollowUp?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The request could not be read." }, { status: 400 });
  }

  const lane = body.lane;
  const experience = body.experience;
  const source = `${body.source || ""}`.trim().slice(0, MAX_SOURCE_CHARS);
  const followUpAnswer = `${body.followUpAnswer || ""}`.trim().slice(0, 1_000);
  if (!lane || !["government", "ai"].includes(lane) || !experience || !source) return NextResponse.json({ error: "A lane and a general description are required." }, { status: 400 });
  if (looksSensitive(`${source}\n${followUpAnswer}`)) return NextResponse.json({ error: "This appears to include sensitive government or personal information. Remove it and describe the situation only in general terms." }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI synthesis is not configured yet." }, { status: 503 });

  const system = `You are Mitten, a senior product-discovery facilitator. Turn a messy situation into a concrete, action-ready brief.

Use Jobs to Be Done and the four product risks accurately:
- value: will users choose it or use it;
- usability: can intended users use it in their real context;
- feasibility: can it be delivered with available technology, skills, time, data, and authority;
- viability: will stakeholders, legal, compliance, security, acquisition, funding, cost, and operating constraints support it.

For government work, use program-office language and make acquisition, authority, mission use, security, and oversight tangible. For practical AI, name the current workflow, human judgment, source quality, adoption, privacy, IP, and cost constraints.

Be concrete. Name a role, artifact, timebox, observable behavior, and decision gate where the input supports it. Avoid consultancy abstractions, maturity scores, invented facts, and confident claims beyond the evidence. The smallest test must be executable without production build or sensitive data. Evidence must be observable and measurable.

You may ask exactly one follow-up only when a missing fact would materially change the strongest risk or smallest test. If follow-up is allowed and necessary, return status follow_up with one plain-language question and an otherwise empty brief. If an answer is present, or follow-up is not allowed, return status complete. Never ask for classified, controlled, proprietary, procurement-sensitive, or personal information.`;

  const user = `EXPERIENCE: ${experience}\nLANE: ${lane}\nFOLLOW-UP ALLOWED: ${body.allowFollowUp && !followUpAnswer ? "yes" : "no"}\nSITUATION:\n${source}${followUpAnswer ? `\n\nFOLLOW-UP ANSWER:\n${followUpAnswer}` : ""}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4-nano",
        store: false,
        reasoning_effort: "none",
        max_completion_tokens: 1_400,
        messages: [{ role: "system", content: system }, { role: "user", content: user }],
        response_format: { type: "json_schema", json_schema: { name: "mitten_discovery_brief", strict: true, schema: briefSchema } },
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI response error", response.status, detail.slice(0, 400));
      return NextResponse.json({ error: "The read could not be completed. Please try again." }, { status: 502 });
    }
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Missing structured output");
    const result = JSON.parse(content);
    if (result.status === "follow_up") result.brief = emptyBrief();
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return NextResponse.json({ error: "The read reached its eight-second limit. Try a shorter description." }, { status: 504 });
    console.error("Mitten analysis failed", error);
    return NextResponse.json({ error: "The read did not return a usable brief. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
