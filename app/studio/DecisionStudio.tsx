"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lane = "government" | "ai";
type Stage = "lane" | "input" | "analysis" | "brief";
type InputMode = "sample" | "custom";
type Brief = {
  decision: string;
  people: string;
  unknowns: string;
  risk: string;
  experiment: string;
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

const samples: Record<Lane, Array<{ id: string; label: string; body: string; brief: Brief }>> = {
  government: [
    {
      id: "conflict",
      label: "Acquisition requirements conflict",
      body: "The program office has 340 stated requirements from three offices that do not agree on priority. Legal wants full audit logging. Ops wants same-day approvals. Finance wants a single system of record by the next fiscal year. Nobody has said which outcome the mission actually needs first.",
      brief: {
        decision: "Which requirement wins when legal, operations, and finance conflict—not how to satisfy all 340 at once.",
        people: "The approver who must explain a same-day decision to an auditor six months from now.",
        unknowns: "Whether same-day approval and full audit logging are actually incompatible, or simply untested together.",
        risk: "Building toward a single system of record before anyone ranks the three offices’ outcomes.",
        experiment: "Run one approval end-to-end under the strictest audit rule and time it.",
        evidence: "Actual time-to-approve under full logging, measured against the same-day target.",
      },
    },
    {
      id: "legacy",
      label: "Legacy system migration mandate",
      body: "A program has been directed to leave a legacy platform within eighteen months. The replacement contract is moving, but teams still rely on undocumented reports and workarounds. Leadership is tracking migration milestones, while operators are worried about losing the decisions those workarounds support.",
      brief: {
        decision: "Which operational decisions the replacement must preserve before the legacy platform can be retired.",
        people: "Operators who rely on undocumented reports and leaders accountable for the migration date.",
        unknowns: "Which workarounds contain essential judgment and which are merely habits inherited from the old system.",
        risk: "Meeting the migration milestone while quietly breaking the work that makes the program function.",
        experiment: "Shadow one high-value decision in both systems before migrating its workflow.",
        evidence: "Decision time, missing context, and rework observed across the legacy and replacement paths.",
      },
    },
    {
      id: "stakeholders",
      label: "Multi-stakeholder requirement pile-up",
      body: "Six stakeholder groups have submitted priority-one requests for the next release. The delivery team cannot complete all of them, each sponsor has a credible mission argument, and the roadmap currently lists requests without showing the tradeoffs leadership is making.",
      brief: {
        decision: "Which mission outcome earns the next unit of delivery capacity and what evidence justifies that choice.",
        people: "Mission users affected by the release and leaders who must defend the tradeoff to six sponsors.",
        unknowns: "Which requests change mission performance and which primarily reduce local inconvenience.",
        risk: "Spreading capacity across every sponsor and finishing nothing that changes the mission.",
        experiment: "Score one request from each stakeholder against the same mission outcome and evidence standard.",
        evidence: "Observed user effect, delivery effort, and consequence of delay for each competing request.",
      },
    },
  ],
  ai: [
    {
      id: "handoff",
      label: "Repeated handoff",
      body: "A client team spends hours every Friday combining notes from meetings, email, and a project tracker into a leadership update. The analyst rewrites everything to make it consistent, then managers correct missing context before it can be sent.",
      brief: {
        decision: "Which parts of the weekly update require judgment and which can be assembled reliably with assistance.",
        people: "The analyst assembling the update and the managers accountable for its accuracy.",
        unknowns: "Whether the missing context is absent from source material or lost during synthesis.",
        risk: "Automating the polished summary while preserving the same incomplete inputs.",
        experiment: "Generate a draft from one week of source material and have the analyst mark every correction.",
        evidence: "Time saved, correction categories, and whether managers find the assisted draft equally trustworthy.",
      },
    },
    {
      id: "search",
      label: "Knowledge search",
      body: "People repeatedly ask the same policy and process questions in chat. Answers exist across shared drives, old messages, and internal documentation, but employees cannot tell which source is current or authoritative.",
      brief: {
        decision: "Whether AI should answer questions or first help people find the authoritative source.",
        people: "Employees trying to act quickly and policy owners responsible for the accuracy of guidance.",
        unknowns: "How often sources conflict, age out, or lack a clear owner.",
        risk: "Making an outdated answer faster and more persuasive.",
        experiment: "Test retrieval on twenty recurring questions and require every response to cite an approved source.",
        evidence: "Source accuracy, unanswered questions, reviewer corrections, and time to verified guidance.",
      },
    },
    {
      id: "tools",
      label: "Too many AI tools",
      body: "A small team has subscribed to several AI products, but usage is inconsistent. People experiment with prompts, switch tools frequently, and cannot point to one workflow that has become faster or better as a result.",
      brief: {
        decision: "Which repeated workflow deserves focused adoption before the team adds another tool.",
        people: "The person doing the repeated work and the manager deciding whether the subscriptions are worthwhile.",
        unknowns: "Whether inconsistency comes from the tools, unclear workflow ownership, or lack of a useful standard.",
        risk: "Treating access as adoption and adding cost without changing the work.",
        experiment: "Choose one weekly workflow, one tool, and one success measure for thirty days.",
        evidence: "Usage consistency, time or quality change, and the amount of human correction required.",
      },
    },
  ],
};

const analysisLabels: Record<Lane, string[]> = {
  government: ["Reading the requirement", "Separating the ask from the decision", "Mapping who has to defend this", "Flagging what is still unknown", "Naming the delivery risk"],
  ai: ["Reading the workflow", "Separating the task from the outcome", "Finding who the workflow serves", "Flagging what is still unknown", "Naming the delivery risk"],
};

function customBrief(lane: Lane, source: string): Brief {
  const excerpt = source.trim().replace(/\s+/g, " ");
  const short = excerpt.length > 190 ? `${excerpt.slice(0, 187)}…` : excerpt;
  return lane === "government" ? {
    decision: `What the program must decide before it commits further: ${short}`,
    people: "The mission user closest to the work and the leader accountable for defending the decision.",
    unknowns: "Which stated constraints are fixed, which are assumed, and which outcome should govern the tradeoff.",
    risk: "Committing to a solution before the program agrees on the decision and evidence standard.",
    experiment: "Map the current decision path and test the highest-risk assumption with one mission-relevant case.",
    evidence: "An observable result that makes the next program decision easier to defend.",
  } : {
    decision: `Which part of this work should change—and whether AI creates a measurable advantage: ${short}`,
    people: "The person doing the work and the person accountable for the quality of its result.",
    unknowns: "Where judgment matters, what information is trustworthy, and which friction is actually worth removing.",
    risk: "Automating visible activity without improving the outcome or preserving human control.",
    experiment: "Test one assisted handoff on a small set of real, non-sensitive examples with a human reviewer.",
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
    navigator.clipboard.writeText(`MITTEN DECISION BRIEF\n\nTHE REAL DECISION\n${brief.decision}\n\nPEOPLE WHO MUST SUCCEED\n${brief.people}\n\nUNKNOWNS\n${brief.unknowns}\n\nDELIVERY RISK\n${brief.risk}\n\nFIRST EXPERIMENT\n${brief.experiment}\n\nEVIDENCE TO COLLECT\n${brief.evidence}`);
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
            <h1>Watch the mess<br /><em>resolve.</em></h1>
            <p>Two instruments. Feed one a situation—described in general terms—and watch it separate the decision from the noise.</p>
          </div>
          <div className="studio-lanes">
            <button className="studio-lane-card is-gov" onClick={() => selectLane("government")}>
              <span>01 / REQUIREMENTS X-RAY</span><div className="studio-proof-mark"><i /><i /><i /></div>
              <h2>See the decision underneath the requirements.</h2><strong>Run a Requirements X-Ray <i>→</i></strong>
            </button>
            <button className="studio-lane-card is-ai" onClick={() => selectLane("ai")}>
              <span>02 / WORKFLOW X-RAY</span><div className="studio-proof-mark"><i /><i /><i /></div>
              <h2>See the person underneath the workflow.</h2><strong>Run a Workflow X-Ray <i>→</i></strong>
            </button>
          </div>
          <p className="studio-footnote">Visual prototype. No live AI model. Nothing you type is saved.</p>
        </section>
      )}

      {stage === "input" && lane && (
        <section className="studio-input-shell">
          <div className="studio-heading">
            <p className="eyebrow">{lane === "government" ? "REQUIREMENTS" : "WORKFLOW"} X-RAY / STEP 1</p>
            <h1>Give it something<br /><em>to read.</em></h1>
          </div>
          <div className="studio-input-panel">
            <div className="studio-mode" aria-label="Input mode">
              <button aria-pressed={inputMode === "sample"} onClick={() => setInputMode("sample")}>Use a sample</button>
              <button aria-pressed={inputMode === "custom"} onClick={() => setInputMode("custom")}>Describe it yourself</button>
            </div>
            {inputMode === "sample" ? (
              <><div className="studio-samples">{samples[lane].map((sample) => <button key={sample.id} aria-pressed={sampleId === sample.id} onClick={() => setSampleId(sample.id)}>{sample.label}</button>)}</div><div className="studio-source-preview"><span>SYNTHETIC SCENARIO</span><p>{selectedSample?.body}</p></div></>
            ) : (
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1800} placeholder={lane === "government" ? "Describe the requirement, mandate, or decision that is stuck. General terms only." : "Describe the workflow, handoff, or routine that is harder than it should be. General terms only."} aria-label="Describe your situation" />
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
            <p className="eyebrow">{lane === "government" ? "REQUIREMENTS" : "WORKFLOW"} X-RAY / READING</p>
            <h1>Separating the decision<br />from the noise.</h1>
            <div className="studio-stage-list" aria-live="polite">{analysisLabels[lane].map((label, index) => <div key={label} className={`studio-stage ${analysisStep === index + 1 ? "is-active" : ""} ${analysisStep > index + 1 ? "is-resolved" : ""}`}><i /><span>{label}</span></div>)}</div>
          </div>
        </section>
      )}

      {stage === "brief" && lane && brief && (
        <section className="studio-brief-shell">
          <div className="studio-brief-heading">
            <p className="eyebrow">MITTEN / DECISION BRIEF</p>
            <h1 ref={briefTitleRef} tabIndex={-1}>Here&apos;s what was<br /><em>actually being asked.</em></h1>
            <p>This is a structural read of what you provided—not a model that understands your organization. Treat it as a starting shape.</p>
            <div className="studio-secondary-actions"><button onClick={() => reset(lane === "government" ? "ai" : "government")}>Try the other X-Ray →</button><button onClick={() => reset()}>Start over</button></div>
          </div>
          <article className="studio-brief-card">
            <div className="studio-brief-head"><span>DECISION STUDIO</span><span>WORKING DRAFT</span></div>
            {([[
              "THE REAL DECISION", brief.decision], ["PEOPLE WHO MUST SUCCEED", brief.people], ["UNKNOWNS", brief.unknowns], ["DELIVERY RISK", brief.risk], ["FIRST EXPERIMENT", brief.experiment], ["EVIDENCE TO COLLECT", brief.evidence],
            ] as Array<[string, string]>).map(([label, value], index) => <div className={`studio-brief-item ${index === 0 ? "is-primary" : ""}`} key={label}><span>{label}</span><p>{value}</p></div>)}
            <div className="studio-brief-actions"><button onClick={copyBrief}>Copy brief</button><a href="/#book">Talk it through ↗</a></div>
          </article>
        </section>
      )}
    </main>
  );
}
