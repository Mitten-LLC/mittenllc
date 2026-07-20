"use client";

import { useMemo, useRef, useState } from "react";

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

const questions = [
  {
    label: "FRAME THE OUTCOME",
    prompt: "What workflow, decision, or customer problem keeps pulling at you?",
    help: "Give us the unpolished version. What is happening, and why does it matter now?",
  },
  {
    label: "FIND THE HUMAN",
    prompt: "Who feels this friction most—and what are they actually trying to accomplish?",
    help: "Think about the person doing the work, not the system they happen to use.",
  },
  {
    label: "SEE THE WORK",
    prompt: "Walk through what happens today. Where does judgment, waiting, or rework enter the picture?",
    help: "A rough sequence is enough. Include the handoff that worries you most.",
  },
  {
    label: "PROVE THE VALUE",
    prompt: "Thirty days from now, what evidence would convince you that a small experiment was useful?",
    help: "Name an observable change—not a general feeling or an AI capability.",
  },
];

const starters = ["AI adoption", "A difficult workflow", "Product delivery", "Team training"];

export function FirstMoveInterview() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const complete = step >= questions.length;
  const brief = useMemo(() => ({
    opportunity: answers[0] || "A workflow worth understanding",
    people: answers[1] || "The people closest to the work",
    firstMove: answers[2]
      ? `Map the current sequence, then isolate one handoff where a small assisted workflow can be tested without removing human judgment. Start with: ${answers[2]}`
      : "Map the current sequence and isolate one low-risk handoff to test.",
    evidence: answers[3] || "A visible improvement in time, quality, confidence, or rework",
  }), [answers]);

  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const BrowserRecognition = (window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!BrowserRecognition) return;
    const recognition = new BrowserRecognition();
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

  function submitAnswer() {
    if (!draft.trim()) return;
    setAnswers((current) => [...current, draft.trim()]);
    setDraft("");
    setStep((current) => current + 1);
  }

  function restart() {
    setStarted(false);
    setStep(0);
    setDraft("");
    setAnswers([]);
  }

  return (
    <main className="os-page">
      <header className="os-header">
        <a className="brand" href="/" aria-label="Mitten home"><span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>Mitten</span></a>
        <span className="os-header-label">MITTEN OS / FIRST MOVE</span>
        <a className="os-close" href="/" aria-label="Return to home">×</a>
      </header>

      {!started ? (
        <section className="os-intro">
          <div className="os-intro-copy">
            <p className="eyebrow"><span className="live-dot"></span> PROTOTYPE INTERVIEW</p>
            <h1>Bring the thing<br />you can&apos;t quite<br /><em>frame yet.</em></h1>
            <p>Four focused questions. About three minutes. A practical first move shaped by how Mitten thinks about people, products, evidence, and AI.</p>
            <button className="os-primary" onClick={() => setStarted(true)}>Start the interview <span>→</span></button>
            <small>Use your voice or type. This prototype does not save your answers.</small>
          </div>
          <div className="os-map" aria-label="Interview process">
            <div className="os-map-head"><span>THE INTERVIEW</span><span>04 MOVES</span></div>
            {questions.map((question, index) => <div className="os-map-row" key={question.label}><span>0{index + 1}</span><strong>{question.label}</strong></div>)}
            <p>Not a chatbot. A structured way to find the next useful question.</p>
          </div>
        </section>
      ) : complete ? (
        <section className="brief-shell">
          <div className="brief-heading">
            <p className="eyebrow">YOUR FIRST MOVE BRIEF</p>
            <h1>A useful place<br />to begin.</h1>
            <p>This is a rules-based prototype of the final Mitten OS synthesis. The AI reasoning layer comes next.</p>
          </div>
          <article className="brief-card">
            <div className="brief-card-head"><span>MITTEN / 01</span><span>WORKING DRAFT</span></div>
            <div className="brief-item"><span>OPPORTUNITY</span><p>{brief.opportunity}</p></div>
            <div className="brief-item"><span>PEOPLE &amp; OUTCOME</span><p>{brief.people}</p></div>
            <div className="brief-item accent"><span>THE FIRST MOVE</span><p>{brief.firstMove}</p></div>
            <div className="brief-item"><span>EVIDENCE TO COLLECT</span><p>{brief.evidence}</p></div>
            <div className="brief-actions">
              <button onClick={() => navigator.clipboard.writeText(`MITTEN FIRST MOVE\n\nOpportunity: ${brief.opportunity}\n\nPeople & outcome: ${brief.people}\n\nFirst move: ${brief.firstMove}\n\nEvidence: ${brief.evidence}`)}>Copy brief</button>
              <a href="https://calendly.com/mitten/intro">Talk it through ↗</a>
            </div>
          </article>
          <button className="os-restart" onClick={restart}>Start over</button>
        </section>
      ) : (
        <section className="interview-shell">
          <div className="interview-progress" aria-label={`Question ${step + 1} of ${questions.length}`}>
            <span>0{step + 1} / 0{questions.length}</span>
            <div><i style={{ width: `${((step + 1) / questions.length) * 100}%` }}></i></div>
            <span>{questions[step].label}</span>
          </div>
          <div className="interview-question">
            <p className="eyebrow">MITTEN ASKS</p>
            <h1>{questions[step].prompt}</h1>
            <p>{questions[step].help}</p>
          </div>
          <div className="response-panel">
            {step === 0 && !draft && <div className="starter-row">{starters.map((starter) => <button key={starter} onClick={() => setDraft(starter + ": ")}>{starter}</button>)}</div>}
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1200} placeholder="Start wherever the story starts…" aria-label="Your response" />
            <div className="response-controls">
              <button className={`voice-button ${listening ? "listening" : ""}`} onClick={toggleVoice} type="button"><span></span>{listening ? "Stop listening" : "Use my voice"}</button>
              <span>{draft.length} / 1200</span>
              <button className="continue-button" onClick={submitAnswer} disabled={!draft.trim()}>Continue <span>→</span></button>
            </div>
            <p className="voice-note">Voice transcription uses your browser in this prototype. Don&apos;t share classified, proprietary, personal, or otherwise sensitive information.</p>
          </div>
        </section>
      )}
    </main>
  );
}
