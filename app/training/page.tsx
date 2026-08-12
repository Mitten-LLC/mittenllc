import type { Metadata } from "next";
import { BrandLogo } from "../BrandLogo";

export const metadata: Metadata = {
  title: "AI-Assisted Software Testing — Mitten Learning",
  description: "Scenario-based AI training for software testers who want stronger habits, safer automation, and human judgment at the center.",
};

const courseUrl = "https://learn.mitten.consulting/";

const practiceSteps = [
  { number: "01", title: "Frame the risk", body: "Name what could fail, who would feel it, and what evidence would matter." },
  { number: "02", title: "Ask AI for options", body: "Generate test ideas and edge cases without treating the first answer as truth." },
  { number: "03", title: "Run and inspect", body: "Turn useful ideas into executable checks, then examine what actually happened." },
  { number: "04", title: "Challenge the result", body: "Review gaps, false confidence, and automation choices before anything ships." },
];

const coursePath = [
  ["01–03", "Use AI safely"],
  ["04–05", "Prompt for test design"],
  ["06–08", "Read APIs and specs"],
  ["09–11", "Execute and hand off"],
  ["12–13", "Review critically"],
];

function TrainingNavigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"}>
      <a href="https://mitten.consulting/government/">Government</a>
      <a href="https://mitten.consulting/ai/">Practical AI</a>
      <a href="https://mitten.consulting/first-move/">First Move</a>
      <a className="training-nav-cta" href={courseUrl}>Enter the course <span aria-hidden="true">↗</span></a>
    </nav>
  );
}

function TestingLabGraphic() {
  return (
    <div className="training-lab" aria-label="AI-assisted software testing practice loop">
      <div className="training-lab-head"><span>TEST LAB / COURSE 01</span><span>HUMAN IN CONTROL</span></div>
      <div className="training-loop-graphic">
        <svg viewBox="0 0 520 300" aria-hidden="true">
          <path d="M104 76 C180 28 332 28 416 76" />
          <path d="M442 104 C486 154 486 206 442 246" />
          <path d="M416 270 C332 314 180 314 104 270" />
          <path d="M78 246 C34 206 34 154 78 104" />
          <path className="is-signal" d="M150 150 L215 150 M305 150 L370 150" />
        </svg>
        <div className="training-loop-node is-frame"><span>01</span><strong>Frame</strong></div>
        <div className="training-loop-node is-generate"><span>02</span><strong>Generate</strong></div>
        <div className="training-loop-node is-run"><span>03</span><strong>Run</strong></div>
        <div className="training-loop-node is-review"><span>04</span><strong>Review</strong></div>
        <div className="training-loop-core"><span>AI ASSISTS</span><strong>Human<br />decides</strong></div>
      </div>
      <div className="training-code-card">
        <div><span>AUTOMATION HANDOFF</span><span>READY FOR REVIEW</span></div>
        <code><b>TEST</b> Reject expired access token<br /><i>→</i> Send request&nbsp;&nbsp;<i>→</i> Expect 401&nbsp;&nbsp;<i>→</i> Inspect body</code>
      </div>
    </div>
  );
}

export default function Training() {
  return (
    <div className="training-page">
      <div className="noise" aria-hidden="true" />
      <header className="training-header training-shell">
        <a href="https://mitten.consulting/" aria-label="Mitten home"><BrandLogo reversed /></a>
        <div className="training-desktop-nav"><TrainingNavigation /></div>
        <details className="training-mobile-nav">
          <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
          <TrainingNavigation mobile />
        </details>
      </header>

      <main>
        <section className="training-hero training-shell">
          <div className="training-hero-copy">
            <p className="training-label">MITTEN LEARNING / COURSE 01</p>
            <h1>Practice before the <span>stakes are real.</span></h1>
            <p className="training-lede">A hands-on course for software testers and technical teams learning to use AI without giving up judgment.</p>
            <div className="training-actions">
              <a className="training-button is-primary" href={courseUrl}>Start AI-Assisted Testing <span aria-hidden="true">↗</span></a>
              <a className="training-button is-secondary" href="#practice-loop">See the practice loop <span aria-hidden="true">↓</span></a>
            </div>
            <ul className="training-proof" aria-label="Course details">
              <li>13 focused modules</li><li>Self-guided</li><li>Scenario-based</li>
            </ul>
          </div>
          <TestingLabGraphic />
        </section>

        <section className="training-practice" id="practice-loop">
          <div className="training-shell">
            <header className="training-section-head">
              <p className="training-label">THE PRACTICE LOOP</p>
              <h2>AI can propose. The tester still has to know.</h2>
              <p>Each exercise follows the same repeatable loop: frame the risk, use AI deliberately, execute a check, and challenge the result.</p>
            </header>
            <div className="training-practice-grid">
              {practiceSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <div className="training-step-icon" aria-hidden="true"><i /><i /><b /></div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="training-course training-shell">
          <div className="training-course-copy">
            <p className="training-label">COURSE 01 / AI-ASSISTED SOFTWARE TESTING</p>
            <h2>From a useful prompt to a defensible test.</h2>
            <p>The course moves from safe-use foundations through API testing, automation handoff, and critical review. The goal is not faster typing. It is better testing judgment with a stronger set of tools.</p>
            <a className="training-button is-primary" href={courseUrl}>View the full course <span aria-hidden="true">↗</span></a>
          </div>
          <div className="training-course-map" aria-label="Course module path">
            <div className="training-course-map-head"><span>13 MODULES</span><span>ONE WORKING PATH</span></div>
            {coursePath.map(([range, label], index) => (
              <div className="training-course-row" key={range}>
                <span>{range}</span><strong>{label}</strong><i aria-hidden="true">{index === coursePath.length - 1 ? "✓" : "→"}</i>
              </div>
            ))}
          </div>
        </section>

        <section className="training-close">
          <div className="training-shell">
            <p className="training-label">READY WHEN YOU ARE</p>
            <h2>Build the habit before the pressure arrives.</h2>
            <a className="training-button is-primary" href={courseUrl}>Enter the training hub <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
    </div>
  );
}
