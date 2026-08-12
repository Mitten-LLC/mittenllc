"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lane = "government" | "ai";
type Stage = "lane" | "input" | "analysis" | "brief";
type InputMode = "sample" | "custom";
type RiskKey = "value" | "usability" | "feasibility" | "viability";
type Brief = {
  jtbd: { when: string; need: string; soThat: string };
  outcome: string;
  workaround: string;
  risks: Record<RiskKey, string>;
  strongestRisk: RiskKey;
  assumption: string;
  test: string;
  evidence: string;
};

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

const riskCopy: Record<Lane, Record<RiskKey, { label: string; sub: string }>> = {
  government: {
    value: { label: "VALUE", sub: "Will the mission choose to use it?" },
    usability: { label: "USABILITY", sub: "Can people use it under real constraints?" },
    feasibility: { label: "FEASIBILITY", sub: "Can the program deliver it with what it has?" },
    viability: { label: "VIABILITY", sub: "Will authority, funding, and compliance support it?" },
  },
  ai: {
    value: { label: "VALUE", sub: "Will people choose it over what they do now?" },
    usability: { label: "USABILITY", sub: "Can the people doing the work actually use it?" },
    feasibility: { label: "FEASIBILITY", sub: "Can it be built with the data and tools on hand?" },
    viability: { label: "VIABILITY", sub: "Will cost, oversight, privacy, and policy support it?" },
  },
};

const riskKeys: RiskKey[] = ["value", "usability", "feasibility", "viability"];
const jtbdSentence = (job: Brief["jtbd"]) => `When ${job.when}, I need to ${job.need}, so that ${job.soThat}.`;

const samples: Record<Lane, Array<{ id: string; label: string; body: string; brief: Brief }>> = {
  government: [
    {
      id: "conflict",
      label: "Requirements conflict across offices",
      body: "The program office has 340 stated requirements from three offices that do not agree on priority. Legal wants full audit logging. Ops wants same-day approvals. Finance wants a single system of record by the next fiscal year. Nobody has said which outcome the mission actually needs first.",
      brief: {
        jtbd: { when: "legal, operations, and finance each rank their own requirement first", need: "make one ranked call for which outcome wins", soThat: "I can commit resources without reopening the decision six months from now" },
        outcome: "A ranking the program can defend to all three offices and apply to the next real case.",
        workaround: "Staff negotiate requirement by requirement in meetings; no one has recorded which outcome governs the tradeoff.",
        risks: { value: "The three offices may reject a shared ranking and continue pressing their own requirements.", usability: "The approver may not be able to apply the ranking during a same-day case.", feasibility: "Current systems and staffing may not support both same-day approval and full logging.", viability: "Legal may not support a ranking that trades audit depth against approval speed." },
        strongestRisk: "viability",
        assumption: "Same-day approval and full audit logging are truly in tension—not simply untested together.",
        test: "Run one approval end-to-end under the strictest audit rule and time it.",
        evidence: "Actual time-to-approve under full logging, measured against the same-day target.",
      },
    },
    {
      id: "legacy",
      label: "Legacy system retirement deadline",
      body: "A program has been directed to leave a legacy platform within eighteen months. The replacement contract is moving, but teams still rely on undocumented reports and workarounds. Leadership is tracking migration milestones, while operators are worried about losing the decisions those workarounds support.",
      brief: {
        jtbd: { when: "a legacy platform must retire and operators still depend on undocumented reports", need: "identify which decisions the replacement must preserve", soThat: "the mission does not stall when the old system goes dark" },
        outcome: "A short list of day-one decisions confirmed by the operators who make them.",
        workaround: "Operators keep old reports and side spreadsheets alive because no one has confirmed what the replacement covers.",
        risks: { value: "Operators may keep running both systems if they do not trust the replacement.", usability: "The replacement may not support the decision in the same time and context.", feasibility: "The contract may not absorb newly discovered needs before the retirement date.", viability: "Leadership may keep the date even if testing exposes a critical gap." },
        strongestRisk: "feasibility",
        assumption: "The undocumented reports contain essential decisions, not merely inherited habits.",
        test: "Shadow one high-value decision in both systems before migrating its workflow.",
        evidence: "Decision time, missing context, and rework observed across the legacy and replacement paths.",
      },
    },
    {
      id: "stakeholders",
      label: "Six stakeholders, one release",
      body: "Six stakeholder groups have submitted priority-one requests for the next release. The delivery team cannot complete all of them, each sponsor has a credible mission argument, and the roadmap currently lists requests without showing the tradeoffs leadership is making.",
      brief: {
        jtbd: { when: "six stakeholder groups each submit a priority-one request for the same release", need: "choose which request earns the capacity", soThat: "I can defend the choice to the five sponsors who are not selected" },
        outcome: "One funded request with an evidence trail leadership can reuse the next time capacity is contested.",
        workaround: "The roadmap lists all six requests; whichever sponsor escalates loudest tends to move up.",
        risks: { value: "The selected request may reduce local inconvenience without changing mission performance.", usability: "Sponsors may not understand or accept the ranking method.", feasibility: "The team may not be able to finish the selected request in the release.", viability: "Leadership may not back the ranking when passed-over sponsors push back." },
        strongestRisk: "value",
        assumption: "Mission effect—not sponsor seniority—should decide which request goes first.",
        test: "Score one request from each stakeholder against the same mission outcome and evidence standard.",
        evidence: "Observed user effect, delivery effort, and consequence of delay for each competing request.",
      },
    },
  ],
  ai: [
    {
      id: "handoff",
      label: "Weekly report handoff eats a day",
      body: "A client team spends hours every Friday combining notes from meetings, email, and a project tracker into a leadership update. The analyst rewrites everything to make it consistent, then managers correct missing context before it can be sent.",
      brief: {
        jtbd: { when: "the team spends hours every Friday assembling a leadership update", need: "separate the judgment from the repeatable synthesis", soThat: "we get the day back without shipping a less trustworthy update" },
        outcome: "A weekly update assembled in under an hour that managers approve without extra correction.",
        workaround: "The analyst manually rewrites notes, email, and tracker data; managers catch missing context afterward.",
        risks: { value: "Managers may not trust an assisted draft as much as the hand-built version.", usability: "Reviewing and correcting the draft may take as long as writing it.", feasibility: "The source systems may require integration work before they can feed a draft.", viability: "Meeting notes and email may not be permitted for this use under current rules." },
        strongestRisk: "value",
        assumption: "The missing context exists in the source material and is lost during synthesis.",
        test: "Generate a draft from one week of source material and have the analyst mark every correction.",
        evidence: "Time saved, correction categories, and whether managers find the assisted draft equally trustworthy.",
      },
    },
    {
      id: "search",
      label: "Same policy questions every day",
      body: "People repeatedly ask the same policy and process questions in chat. Answers exist across shared drives, old messages, and internal documentation, but employees cannot tell which source is current or authoritative.",
      brief: {
        jtbd: { when: "people repeatedly ask policy questions because they cannot identify the current source", need: "return guidance with an authoritative citation", soThat: "no one acts on an answer that is already out of date" },
        outcome: "Recurring questions answered with an approved source every time.",
        workaround: "People ask in chat and trust whoever answers fastest; the policy documents go unread.",
        risks: { value: "People may accept the answer without opening the cited source.", usability: "Employees may not be able to tell current guidance from stale guidance.", feasibility: "Shared drives and old messages may not be clean enough for reliable retrieval.", viability: "Policy owners may not keep authoritative sources current after launch." },
        strongestRisk: "viability",
        assumption: "An authoritative source exists and can be clearly identified.",
        test: "Test retrieval on twenty recurring questions and require every response to cite an approved source.",
        evidence: "Source accuracy, unanswered questions, reviewer corrections, and time to verified guidance.",
      },
    },
    {
      id: "tools",
      label: "Five AI tools, no clear win",
      body: "A small team has subscribed to several AI products, but usage is inconsistent. People experiment with prompts, switch tools frequently, and cannot point to one workflow that has become faster or better as a result.",
      brief: {
        jtbd: { when: "a team pays for several AI tools but cannot name one workflow that improved", need: "choose one repeated job for focused adoption", soThat: "we know which subscription is earning its place" },
        outcome: "One workflow with a measured before and after that justifies keeping—or dropping—the tool.",
        workaround: "People experiment independently, switch tools frequently, and share no standard or owner.",
        risks: { value: "The team may keep experimenting instead of adopting one workflow.", usability: "The tool may not fit well enough for people to use it consistently.", feasibility: "The team may not have enough repetitions to measure a change in thirty days.", viability: "The subscription cost may not be justified even if a few people adopt it." },
        strongestRisk: "value",
        assumption: "Inconsistent usage comes from the lack of a standard—not from the tools themselves.",
        test: "Choose one weekly workflow, one tool, and one success measure for thirty days.",
        evidence: "Usage consistency, time or quality change, and the amount of human correction required.",
      },
    },
  ],
};

const analysisLabels: Record<Lane, string[]> = {
  government: ["Reading the requirement", "Naming the job behind it", "Finding the current workaround", "Weighing value, use, delivery, and approval risk", "Sizing the smallest test"],
  ai: ["Reading the workflow", "Naming the job behind it", "Finding the current workaround", "Weighing value, use, delivery, and approval risk", "Sizing the smallest test"],
};

function customBrief(lane: Lane, source: string): Brief {
  const excerpt = source.trim().replace(/\s+/g, " ");
  const short = excerpt.length > 160 ? `${excerpt.slice(0, 157)}…` : excerpt;
  return lane === "government" ? {
    jtbd: { when: short.toLowerCase(), need: "decide what the program must resolve before it commits further", soThat: "the next commitment is defensible—not merely fast" },
    outcome: "A recorded decision with the governing tradeoff and evidence standard made explicit.",
    workaround: "The program is resolving this case by case, in meetings, without a reusable decision standard.",
    risks: { value: "The people affected may not accept the decision or use the resulting solution.", usability: "The people closest to the mission may not be able to apply it under real constraints.", feasibility: "The program may lack the authority, staffing, time, or technology to deliver it.", viability: "Legal, compliance, acquisition, or funding may not stand behind it." },
    strongestRisk: "viability",
    assumption: "The constraints driving the problem are fixed—not simply assumed and never tested.",
    test: "Map the current decision path and test the riskiest assumption against one mission-relevant case.",
    evidence: "An observable result that makes the next program decision easier to defend.",
  } : {
    jtbd: { when: short.toLowerCase(), need: "identify which part of this work should change", soThat: "AI creates a measurable advantage instead of visible activity" },
    outcome: "A visible improvement in time, quality, or confidence—with the required human correction made explicit.",
    workaround: "People handle this manually today, using judgment and corrections that have not been documented.",
    risks: { value: "People may not choose the new approach once the novelty wears off.", usability: "The workflow may require a workaround of its own.", feasibility: "The necessary data, tools, or skills may not be available.", viability: "Privacy, IP, cost, or oversight rules may not support the approach." },
    strongestRisk: "value",
    assumption: "The visible friction is the part of the work actually worth removing.",
    test: "Test one assisted handoff on a small set of non-sensitive examples with a human reviewer.",
    evidence: "A visible improvement in time, quality, confidence, or rework—and the corrections still required.",
  };
}

export function DecisionStudio() {
  const [stage, setStage] = useState<Stage>("lane");
  const [lane, setLane] = useState<Lane | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>("sample");
  const [sampleId, setSampleId] = useState("");
  const [draft, setDraft] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);
  const briefTitleRef = useRef<HTMLHeadingElement>(null);

  const selectedSample = lane ? samples[lane].find((sample) => sample.id === sampleId) : undefined;
  const source = inputMode === "sample" ? selectedSample?.body || "" : draft;
  const brief = useMemo(() => lane ? selectedSample?.brief || customBrief(lane, source) : null, [lane, selectedSample, source]);

  useEffect(() => {
    if (stage !== "analysis") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const finish = window.setTimeout(() => { setAnalysisStep(5); setStage("brief"); }, 650);
      return () => window.clearTimeout(finish);
    }
    const timers = [1, 2, 3, 4, 5].map((step, index) => window.setTimeout(() => setAnalysisStep(step), 500 + index * 650));
    timers.push(window.setTimeout(() => setStage("brief"), 4100));
    return () => timers.forEach(window.clearTimeout);
  }, [stage]);

  useEffect(() => {
    if (stage === "brief") briefTitleRef.current?.focus();
  }, [stage]);

  function selectLane(nextLane: Lane) {
    setLane(nextLane);
    setSampleId(samples[nextLane][0].id);
    setInputMode("sample");
    setStage("input");
  }

  function toggleVoice() {
    if (listening) return recognitionRef.current?.stop();
    const browser = window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor };
    const Recognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setDraft((current) => `${current}${current ? " " : ""}${transcript}`);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function reset(nextLane?: Lane) {
    const resolvedLane = nextLane || null;
    setStage(resolvedLane ? "input" : "lane");
    setLane(resolvedLane);
    setInputMode("sample");
    setSampleId(resolvedLane ? samples[resolvedLane][0].id : "");
    setDraft("");
    setAnalysisStep(0);
  }

  function copyBrief() {
    if (!brief) return;
    const risks = riskKeys.map((key) => `${key.toUpperCase()}${brief.strongestRisk === key ? " (STRONGEST)" : ""}: ${brief.risks[key]}`).join("\n");
    navigator.clipboard.writeText(`MITTEN PRODUCT DISCOVERY BRIEF\n\nTHE JOB\n${jtbdSentence(brief.jtbd)}\n\nDESIRED OUTCOME\n${brief.outcome}\n\nCURRENT WORKAROUND\n${brief.workaround}\n\nFOUR-RISK READ\n${risks}\n\nKEY ASSUMPTION\n${brief.assumption}\n\nSMALLEST TEST\n${brief.test}\n\nEVIDENCE TO COLLECT\n${brief.evidence}`);
  }

  return (
    <main className="studio-page">
      <header className="os-header studio-header">
        <a href="/" aria-label="Mitten home"><img className="mitten-logo" src="/brand/mitten-logo-kit/web/mitten-wordmark-primary.svg" alt="Mitten" width="154" height="40" /></a>
        <span className="os-header-label">MITTEN / DECISION STUDIO</span>
        <a className="os-close" href="/" aria-label="Return to home">×</a>
      </header>
      <aside className="studio-guardrail"><b>DATA BOUNDARY</b> Don&apos;t paste classified, proprietary, or personal information. Use a sample or describe your situation in general terms.</aside>

      {stage === "lane" && (
        <section className="studio-entry">
          <div className="studio-entry-copy">
            <p className="eyebrow">MITTEN DECISION STUDIO</p>
            <h1>Name the job.<br /><em>See what it takes.</em></h1>
            <p>Pick the job you&apos;re trying to get done. Get back a product discovery brief: the job, the risks, and the smallest test to prove it.</p>
          </div>
          <div className="studio-lanes">
            <button className="studio-lane-card is-gov" onClick={() => selectLane("government")}>
              <span>01 / REQUIREMENTS X-RAY</span><div className="studio-proof-mark"><i /><i /><i /></div>
              <h2>When requirements conflict, find the decision underneath.</h2><strong>Run a Requirements X-Ray <i>→</i></strong>
            </button>
            <button className="studio-lane-card is-ai" onClick={() => selectLane("ai")}>
              <span>02 / WORKFLOW X-RAY</span><div className="studio-proof-mark"><i /><i /><i /></div>
              <h2>When a workflow eats your week, find the job worth improving.</h2><strong>Run a Workflow X-Ray <i>→</i></strong>
            </button>
          </div>
          <p className="studio-footnote">Visual prototype. No live AI model. Nothing you type is saved.</p>
        </section>
      )}

      {stage === "input" && lane && (
        <section className="studio-input-shell">
          <div className="studio-heading">
            <p className="eyebrow">{lane === "government" ? "REQUIREMENTS" : "WORKFLOW"} X-RAY / NAME THE JOB</p>
            <h1>What job are you<br /><em>trying to get done?</em></h1>
          </div>
          <div className="studio-input-panel">
            <div className="studio-mode" aria-label="Input mode">
              <button aria-pressed={inputMode === "sample"} onClick={() => setInputMode("sample")}>Use a sample</button>
              <button aria-pressed={inputMode === "custom"} onClick={() => setInputMode("custom")}>Describe it yourself</button>
            </div>
            {inputMode === "sample" ? (
              <><div className="studio-samples">{samples[lane].map((sample) => <button key={sample.id} aria-pressed={sampleId === sample.id} onClick={() => setSampleId(sample.id)}>{sample.label}</button>)}</div><div className="studio-source-preview"><span>SYNTHETIC SCENARIO</span>{selectedSample && <p className="studio-preview-jtbd">{jtbdSentence(selectedSample.brief.jtbd)}</p>}<p>{selectedSample?.body}</p></div></>
            ) : (
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1800} placeholder={lane === "government" ? "Describe the requirement or decision that is stuck—and who needs it resolved. General terms only." : "Describe the workflow that is harder than it should be—and who does it today. General terms only."} aria-label="Describe your situation" />
            )}
            <div className="studio-input-actions">
              {inputMode === "custom" && <button className={`voice-button ${listening ? "listening" : ""}`} onClick={toggleVoice}><span />{listening ? "Stop listening" : "Use my voice"}</button>}
              <button className="continue-button" disabled={!source.trim()} onClick={() => { setAnalysisStep(0); setStage("analysis"); }}>Run the X-Ray <span>→</span></button>
            </div>
            <button className="studio-back" onClick={() => reset()}>← Choose another instrument</button>
          </div>
        </section>
      )}

      {stage === "analysis" && lane && (
        <section className="studio-analysis">
          <div className="studio-source"><span>INPUT / GENERAL TERMS</span><p>{source}</p></div>
          <div>
            <p className="eyebrow">{lane === "government" ? "REQUIREMENTS" : "WORKFLOW"} X-RAY / WEIGHING THE RISK</p>
            <h1>Turning it into<br /><em>a discovery brief.</em></h1>
            <div className="studio-stage-list" aria-live="polite">{analysisLabels[lane].map((label, index) => <div key={label} className={`studio-stage ${analysisStep === index + 1 ? "is-active" : ""} ${analysisStep > index + 1 ? "is-resolved" : ""}`}><i /><span>{label}</span></div>)}</div>
          </div>
        </section>
      )}

      {stage === "brief" && lane && brief && (
        <section className="studio-brief-shell">
          <div className="studio-brief-heading">
            <p className="eyebrow">MITTEN / PRODUCT DISCOVERY BRIEF</p>
            <h1 ref={briefTitleRef} tabIndex={-1}>Here&apos;s the job—<br /><em>and what it&apos;ll take.</em></h1>
            <p>This is a structural read of the job you described—not a model that understands your organization or mission. Treat it as a brief to pressure-test.</p>
            <div className="studio-secondary-actions"><button onClick={() => reset(lane === "government" ? "ai" : "government")}>Try the other X-Ray →</button><button onClick={() => reset()}>Start over</button></div>
          </div>
          <article className="studio-brief-card">
            <div className="studio-brief-head"><span>DECISION STUDIO</span><span>WORKING DRAFT</span></div>
            <div className="studio-brief-jtbd"><span>THE JOB</span><div className="studio-jtbd-grid"><div><b>When</b><p>{brief.jtbd.when}</p></div><div><b>I need to</b><p>{brief.jtbd.need}</p></div><div><b>So that</b><p>{brief.jtbd.soThat}</p></div></div></div>
            <div className="studio-brief-item"><span>DESIRED OUTCOME</span><p>{brief.outcome}</p></div>
            <div className="studio-brief-item"><span>CURRENT WORKAROUND</span><p>{brief.workaround}</p></div>
            <div className="studio-proof-mark is-mini" aria-hidden="true"><i /><i /><i /></div>
            <div className="studio-brief-item studio-risk-block"><span>FOUR-RISK READ</span><div className="studio-risk-grid">{riskKeys.map((key) => <div key={key} className={`studio-risk-tile ${brief.strongestRisk === key ? "is-strongest" : ""}`}><div className="studio-risk-tile-head"><span>{riskCopy[lane][key].label}</span>{brief.strongestRisk === key && <em>STRONGEST RISK</em>}</div><p className="studio-risk-sub">{riskCopy[lane][key].sub}</p><p>{brief.risks[key]}</p></div>)}</div></div>
            <div className="studio-brief-item"><span>KEY ASSUMPTION</span><p>{brief.assumption}</p></div>
            <div className="studio-brief-item"><span>SMALLEST TEST</span><p>{brief.test}</p></div>
            <div className="studio-brief-item"><span>EVIDENCE TO COLLECT</span><p>{brief.evidence}</p></div>
            <div className="studio-brief-actions"><button onClick={copyBrief}>Copy brief</button><a href="/#book">Talk it through ↗</a></div>
          </article>
        </section>
      )}
    </main>
  );
}
