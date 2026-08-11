import { BrandLogo } from "./BrandLogo";

const bookingUrl = process.env.GOOGLE_BOOKING_URL;

export default function Home() {
  return (
    <div className="home-v2" id="top">
      <header className="home-header wrap">
        <a href="#top" aria-label="Mitten home"><BrandLogo /></a>
        <nav aria-label="Main navigation">
          <a href="/government/">Government</a>
          <a href="/ai/">Practical AI</a>
          <a href="/first-move/">First Move</a>
          <a className="nav-book" href="#book">Book a conversation <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="home-hero wrap">
          <div className="hero-statement">
            <p className="kicker"><span /> One way of thinking · two kinds of work</p>
            <h1>Start with the work.<br /><em>Make the next move useful.</em></h1>
            <p className="hero-lede">Mitten applies product thinking to complex government missions and practical AI adoption. Choose the work that brought you here.</p>
            <div className="home-actions">
              <a className="solid-button" href="#choose">Choose your path <span>↓</span></a>
              <a className="quiet-link" href="/first-move/">Try First Move <span>→</span></a>
            </div>
          </div>

        </section>

        <section className="pathways wrap" id="choose">
          <header className="pathways-head">
            <p className="section-label">CHOOSE THE WORK</p>
            <p>The disciplines overlap. The jobs, language, and evidence do not.</p>
          </header>
          <div className="pathway-grid">
            <a className="pathway-card government-path" href="/government/">
              <span>01 / GOVERNMENT PRODUCTOPS</span>
              <h2>Move a complex mission forward.</h2>
              <p>For government programs and contractors navigating acquisition, requirements, delivery, and organizational change.</p>
              <strong>Explore government work <i>→</i></strong>
            </a>
            <a className="pathway-card ai-path" href="/ai/">
              <span>02 / PRACTICAL AI</span>
              <h2>Make AI useful in real life.</h2>
              <p>For organizations and people who want to build with AI, improve a workflow, or integrate it into everyday work and life.</p>
              <strong>Explore practical AI <i>→</i></strong>
            </a>
          </div>
        </section>

        <section className="point-of-view">
          <div className="wrap point-grid">
            <p className="section-label">A SIMPLE BELIEF</p>
            <blockquote>“AI changes the tools. It does not change the need to understand the mission.”</blockquote>
            <p className="point-copy">We start with the outcome, the people, and the work. Then we make the smallest useful move that can produce evidence.</p>
            <ol className="decision-flow" aria-label="Mitten decision sequence: outcome, people, product, process, then technology">
              <li><span>01</span><strong>Outcome</strong><small>What must become true?</small></li>
              <li><span>02</span><strong>People</strong><small>Who needs to succeed?</small></li>
              <li className="is-product"><span>03</span><strong>Product</strong><small>What should become useful?</small></li>
              <li><span>04</span><strong>Process</strong><small>How will it work in reality?</small></li>
              <li className="is-technology"><span>05</span><strong>Technology</strong><small>Does AI improve the answer?</small></li>
            </ol>
            <p className="decision-rule">Technology comes last in the sequence—not last in importance.</p>
          </div>
        </section>

        <section className="method wrap" id="method">
          <header className="section-intro">
            <p className="section-label">HOW WE THINK</p>
            <h2>A better sequence for uncertain work.</h2>
          </header>
          <div className="method-grid">
            <article>
              <span className="method-number">01</span>
              <h3>What&apos;s actually true?</h3>
              <p>Separate the stated request from the outcome, constraint, and evidence that should drive the decision.</p>
              <ul><li>Opportunity framing</li><li>Product strategy</li><li>Outcome definition</li></ul>
            </article>
            <article>
              <span className="method-number">02</span>
              <h3>Who has to live with this?</h3>
              <p>Map the people, handoffs, judgment, incentives, and failure modes a useful product has to respect.</p>
              <ul><li>Workflow discovery</li><li>Operating model</li><li>Risk and readiness</li></ul>
            </article>
            <article className="method-accent">
              <span className="method-number">03</span>
              <h3>Does AI belong here?</h3>
              <p>Use AI where it creates a measurable advantage. Choose a simpler tool—or no new tool—when it does not.</p>
              <ul><li>AI opportunity design</li><li>Prototype and evaluation</li><li>Responsible adoption</li></ul>
            </article>
          </div>
        </section>

        <section className="first-move wrap">
          <div className="first-move-copy">
            <p className="section-label">TRY THE THINKING</p>
            <h2>Leave with a place to start.</h2>
            <p>First Move is a short, voice-friendly diagnostic shaped around Mitten’s way of thinking. Answer four questions and leave with a practical place to begin.</p>
            <a className="solid-button" href="/first-move/">Try First Move <span>→</span></a>
            <small>About three minutes. No account required.</small>
          </div>
          <div className="first-move-card" aria-label="First Move diagnostic preview">
            <div><span>MITTEN / FIRST MOVE</span><span>01—04</span></div>
            <p>What workflow, decision, or customer problem keeps pulling at you?</p>
            <ul><li><span>01</span> Frame the outcome</li><li><span>02</span> Find the human</li><li><span>03</span> See the work</li><li><span>04</span> Prove the value</li></ul>
          </div>
        </section>

        <section className="training-home" id="client-training">
          <div className="wrap training-grid">
            <p className="section-label">CLIENT TRAINING</p>
            <div>
              <h2>Specialized training,<br />built around the work.</h2>
              <p>Mitten develops private, role-specific AI training for client teams. Each learning environment lives separately from this site and reflects the organization’s workflows, tools, constraints, and responsibilities.</p>
              <a className="outline-button" href="mailto:ben@mitten.consulting?subject=Mitten%20client%20AI%20training">Discuss client training <span>→</span></a>
            </div>
            <div className="training-index"><span>PRIVATE DELIVERY</span><strong>Learn with<br />your real work.</strong><small>DEDICATED CLIENT SUBDOMAIN</small></div>
          </div>
        </section>

        <section className="booking wrap" id="book">
          <div className="booking-copy">
            <p className="section-label">START A CONVERSATION</p>
            <h2>Thirty minutes with the person doing the work.</h2>
            <p>Talk directly with Ben to pressure-test the problem, sharpen the decision, and determine whether there is a useful next move.</p>
            <p className="booking-detail">No pitch deck. No obligation. Just a working conversation.</p>
          </div>
          <div className="booking-panel">
            {bookingUrl ? (
              <iframe title="Book a conversation with Mitten" src={bookingUrl} loading="lazy" />
            ) : (
              <div className="booking-fallback">
                <span>MITTEN / INTRO CONVERSATION</span>
                <strong>Google Calendar booking is being connected.</strong>
                <p>Until the live calendar is in place, send a note and we’ll find a time.</p>
                <a className="solid-button" href="mailto:ben@mitten.consulting?subject=Mitten%20intro%20conversation">Email Ben <span>↗</span></a>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="wrap footer-grid">
          <div><BrandLogo reversed /><p>Product thinking for complex missions<br />and practical AI adoption.</p></div>
          <nav aria-label="Footer navigation"><a href="/government/">Government</a><a href="/ai/">Practical AI</a><a href="/first-move/">First Move</a><a href="/privacy/">Privacy</a></nav>
          <div className="footer-contact"><a href="mailto:ben@mitten.consulting">ben@mitten.consulting</a><span>Nashville, Tennessee</span></div>
          <div className="footer-bottom"><span>© 2026 Mitten LLC</span><span>Product before technology. Product before AI.</span></div>
        </div>
      </footer>
    </div>
  );
}
