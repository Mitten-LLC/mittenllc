import type { Metadata } from "next";
import { BrandLogo } from "../BrandLogo";

export const metadata: Metadata = {
  title: "Practical AI — Mitten",
  description: "Build, optimize, and integrate AI into everyday work and life.",
};

export default function AiPage() {
  return (
    <div className="lane-page ai-lane">
      <header className="home-header wrap">
        <a href="/" aria-label="Mitten home"><BrandLogo /></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/government/">Government</a><a href="/first-move/">First Move</a><a className="nav-book" href="/#book">Book a conversation <span>↗</span></a></nav>
      </header>
      <main>
        <section className="lane-hero wrap">
          <p className="kicker"><span /> Practical AI</p>
          <h1>Make AI useful in<br /><em>the life you already live.</em></h1>
          <p>Mitten helps organizations and people find the work worth improving, build what is missing, and integrate AI without adding another layer of noise.</p>
          <div className="home-actions"><a className="solid-button" href="/first-move/">Start an AI First Move <span>→</span></a><a className="quiet-link" href="#ai-work">See what useful looks like <span>↓</span></a></div>
        </section>
        <section className="lane-proof"><div className="wrap"><span>USE AI TO</span><strong>Build</strong><strong>Optimize</strong><strong>Integrate</strong><strong>Learn</strong></div></section>
        <section className="lane-jobs wrap" id="ai-work">
          <header><p className="section-label">WHEN YOU WANT TO</p><h2>Move beyond prompts and into practice.</h2></header>
          <div className="job-list">
            <article><span>01</span><h3>Build something useful</h3><p>Turn an idea into a focused assistant, internal tool, or working prototype tied to a real outcome.</p><small>PRODUCT FRAME · PROTOTYPE</small></article>
            <article><span>02</span><h3>Improve a repeated workflow</h3><p>Find the handoff, search, synthesis, or judgment call that consumes time—and redesign it around human control.</p><small>WORKFLOW MAP · ASSISTED PROCESS</small></article>
            <article><span>03</span><h3>Make AI part of everyday life</h3><p>Choose the right tools, connect them to the way you already work, and build habits that survive beyond the first week.</p><small>INTEGRATION PLAN · PRACTICE</small></article>
          </div>
        </section>
        <section className="lane-close ai-close"><div className="wrap"><p className="section-label">THE STANDARD</p><h2>Less AI theater,<br /><em>more work that ships.</em></h2><a className="outline-button" href="/#book">Talk with Mitten <span>→</span></a></div></section>
      </main>
      <footer className="home-footer"><div className="wrap footer-grid"><div><BrandLogo reversed /></div><nav><a href="/">Home</a><a href="/government/">Government</a><a href="/first-move/">First Move</a></nav><div className="footer-contact"><a href="mailto:ben@mitten.consulting">Contact Mitten</a><span>Nashville, Tennessee</span></div></div></footer>
    </div>
  );
}
