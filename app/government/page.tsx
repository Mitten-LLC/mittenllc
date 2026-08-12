import type { Metadata } from "next";
import { BrandLogo } from "../BrandLogo";

export const metadata: Metadata = {
  title: "Government ProductOps — Mitten",
  description: "Product management and ProductOps for DoD, federal agencies, and government contractors.",
};

export default function GovernmentPage() {
  return (
    <div className="lane-page government-lane">
      <header className="home-header wrap">
        <a href="/" aria-label="Mitten home"><BrandLogo /></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/ai/">Practical AI</a><a href="/studio/?lane=government">Requirements X-Ray</a><a href="/first-move/">First Move</a><a href="https://training.mitten.consulting/">Training</a><a className="nav-book" href="/#book">Book a conversation <span>↗</span></a></nav>
      </header>
      <main>
        <section className="lane-hero wrap">
          <p className="kicker"><span /> Government ProductOps</p>
          <h1>The plan underneath<br /><em>a thousand requirements.</em></h1>
          <p>Mitten turns acquisition complexity, user needs, and delivery constraints into decisions a program can defend—and work a team can execute.</p>
          <div className="home-actions"><a className="solid-button" href="/studio/?lane=government">Run a Requirements X-Ray <span>→</span></a><a className="quiet-link" href="/first-move/">Start a guided First Move <span>↗</span></a></div>
        </section>
        <section className="lane-proof"><div className="wrap"><span>BUILT FOR</span><strong>Program offices</strong><strong>Acquisition teams</strong><strong>Government contractors</strong><strong>Mission users</strong></div></section>
        <section className="lane-jobs wrap" id="government-work">
          <header><p className="section-label">WHEN YOU NEED TO</p><h2>Move from program language to product decisions.</h2></header>
          <div className="job-list">
            <article><span>01</span><h3>Defend the next decision</h3><p>Turn competing demands, mission outcomes, and delivery risk into a product frame and evidence path leaders can act on.</p><small>DECISION BRIEF · PRODUCT FRAME</small></article>
            <article><span>02</span><h3>Make requirements useful</h3><p>Translate hundreds of requirements into user-centered value, testable outcomes, and a roadmap that guides tradeoffs.</p><small>LEAN CANVAS · OUTCOME ROADMAP</small></article>
            <article><span>03</span><h3>Change how the program works</h3><p>Build ProductOps rhythms around the people already delivering the mission, without importing a commercial playbook wholesale.</p><small>OPERATING MODEL · ENABLEMENT</small></article>
          </div>
        </section>
        <section className="lane-close"><div className="wrap"><p className="section-label">THE STANDARD</p><h2>Product discipline that survives<br /><em>contact with government reality.</em></h2><div className="home-actions"><a className="outline-button" href="/studio/?lane=government">Run the Requirements X-Ray <span>→</span></a><a className="quiet-link" href="/#book">Talk with Mitten <span>↗</span></a></div></div></section>
      </main>
      <footer className="home-footer"><div className="wrap footer-grid"><div><BrandLogo reversed /></div><nav><a href="/">Home</a><a href="/ai/">Practical AI</a><a href="/studio/?lane=government">Requirements X-Ray</a><a href="/first-move/">First Move</a><a href="https://training.mitten.consulting/">Training</a></nav><div className="footer-contact"><a href="mailto:ben@mitten.consulting">Contact Mitten</a><span>Nashville, Tennessee</span></div></div></footer>
    </div>
  );
}
