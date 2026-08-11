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
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/ai/">Practical AI</a><a href="/first-move/">First Move</a><a className="nav-book" href="/#book">Book a conversation <span>↗</span></a></nav>
      </header>
      <main>
        <section className="lane-hero wrap">
          <p className="kicker"><span /> Government ProductOps</p>
          <h1>Make the mission legible<br /><em>enough to move.</em></h1>
          <p>Mitten helps government programs and contractors turn acquisition complexity, user needs, and delivery constraints into decisions a program can defend—and work a team can execute.</p>
          <div className="home-actions"><a className="solid-button" href="/first-move/">Start a government First Move <span>→</span></a><a className="quiet-link" href="#government-work">See the work <span>↓</span></a></div>
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
        <section className="lane-close"><div className="wrap"><p className="section-label">THE STANDARD</p><h2>Industry product discipline.<br /><em>Government reality.</em></h2><p>Start with the mission, work backward from the user, and choose the acquisition, delivery, and technology approach that fits.</p><a className="outline-button" href="/#book">Talk with Ben <span>→</span></a></div></section>
      </main>
      <footer className="home-footer"><div className="wrap footer-grid"><div><BrandLogo reversed /><p>Government ProductOps for consequential work.</p></div><nav><a href="/">Home</a><a href="/ai/">Practical AI</a><a href="/first-move/">First Move</a></nav><div className="footer-contact"><a href="mailto:ben@mitten.consulting">ben@mitten.consulting</a><span>Nashville, Tennessee</span></div></div></footer>
    </div>
  );
}
