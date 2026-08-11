const bookingUrl = process.env.GOOGLE_BOOKING_URL;

const Logo = ({ reversed = false }: { reversed?: boolean }) => (
  <img
    className="mitten-logo"
    src={`/brand/mitten-logo-kit/web/mitten-wordmark-${reversed ? "reversed" : "primary"}.svg`}
    alt="Mitten"
    width="170"
    height="44"
  />
);

export default function Home() {
  return (
    <div className="home-v2" id="top">
      <header className="home-header wrap">
        <a href="#top" aria-label="Mitten home"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="#government">Government</a>
          <a href="#ai-adoption">AI adoption</a>
          <a href="/first-move/">First Move</a>
          <a className="nav-book" href="#book">Book a conversation <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="home-hero wrap">
          <div className="hero-statement">
            <p className="kicker"><span /> Government ProductOps + practical AI</p>
            <h1>Product before technology.<br /><em>Product before AI.</em></h1>
            <p className="hero-lede">Mitten brings product discipline to government missions—and helps organizations and people build, optimize, and integrate AI into everyday work and life.</p>
            <div className="home-actions">
              <a className="solid-button" href="/first-move/">Find your first move <span>→</span></a>
              <a className="quiet-link" href="#work">See where we help <span>↓</span></a>
            </div>
          </div>

          <div className="decision-board" aria-label="Mitten decision sequence: outcome, people, product, process, then technology">
            <div className="board-head"><span>MITTEN / DECISION ORDER</span><span>START HERE ↓</span></div>
            <ol>
              <li className="is-first"><span>01</span><strong>Outcome</strong><small>What must become true?</small></li>
              <li><span>02</span><strong>People</strong><small>Who needs to succeed?</small></li>
              <li><span>03</span><strong>Product</strong><small>What should we make useful?</small></li>
              <li><span>04</span><strong>Process</strong><small>How will it work in reality?</small></li>
              <li className="is-last"><span>05</span><strong>Technology</strong><small>Does AI improve the answer?</small></li>
            </ol>
            <p className="board-note">AI is a design choice—not the starting requirement.</p>
          </div>
        </section>

        <section className="point-of-view">
          <div className="wrap point-grid">
            <p className="section-label">A SIMPLE BELIEF</p>
            <blockquote>“AI changes the tools. It does not change the need to understand the mission.”</blockquote>
            <p>We start with the outcome, the people, and the work. Then we make the smallest useful move that can produce evidence.</p>
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
              <h3>Frame the product</h3>
              <p>Clarify the people, problem, promise, constraints, and evidence of success before a solution hardens.</p>
              <ul><li>Opportunity framing</li><li>Product strategy</li><li>Outcome definition</li></ul>
            </article>
            <article>
              <span className="method-number">02</span>
              <h3>See the system</h3>
              <p>Map the real work: the decisions, handoffs, judgment, incentives, and failure modes technology must respect.</p>
              <ul><li>Workflow discovery</li><li>Operating model</li><li>Risk and readiness</li></ul>
            </article>
            <article className="method-accent">
              <span className="method-number">03</span>
              <h3>Choose the technology</h3>
              <p>Use AI where it creates a measurable advantage. Use a simpler tool—or no new tool—when it does not.</p>
              <ul><li>AI opportunity design</li><li>Prototype and evaluation</li><li>Responsible adoption</li></ul>
            </article>
          </div>
        </section>

        <section className="work" id="work">
          <div className="wrap">
            <header className="section-intro light-intro">
              <p className="section-label">WHAT WE DO</p>
              <h2>One product discipline. Two kinds of work.</h2>
            </header>
            <div className="offer-list">
              <article id="government"><span>01</span><h3>Government missions</h3><p>Product management and ProductOps for the Department of Defense, federal agencies, and government contractors—from acquisition strategy and user-centered requirements to outcome roadmaps and transformation.</p><small>ACQUISITION · REQUIREMENTS · METRICS · PRODUCTOPS</small></article>
              <article id="ai-adoption"><span>02</span><h3>Practical AI adoption</h3><p>Find where AI can remove friction, improve decisions, or create something genuinely useful. Then reshape the workflow or routine, test the value, and make it part of everyday work and life.</p><small>OPPORTUNITY MAPPING · WORKFLOW DESIGN · ADOPTION</small></article>
              <article><span>03</span><h3>Build and integrate</h3><p>Move from an idea to a working prototype, internal tool, or assisted process—without losing the human judgment, context, and evidence that make it trustworthy.</p><small>PROTOTYPES · INTEGRATIONS · EVALUATION</small></article>
            </div>
          </div>
        </section>

        <section className="first-move wrap">
          <div className="first-move-copy">
            <p className="section-label">TRY THE THINKING</p>
            <h2>Bring the thing you can’t quite frame yet.</h2>
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
            <h2>Bring the hard problem.</h2>
            <p>Thirty minutes to compare notes, sharpen the question, and decide whether there is a useful next move.</p>
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
          <div><Logo reversed /><p>Government ProductOps and practical AI<br />for consequential, everyday work.</p></div>
          <nav aria-label="Footer navigation"><a href="#government">Government</a><a href="#ai-adoption">AI adoption</a><a href="/first-move/">First Move</a><a href="/privacy/">Privacy</a></nav>
          <div className="footer-contact"><a href="mailto:ben@mitten.consulting">ben@mitten.consulting</a><span>Nashville, Tennessee</span></div>
          <div className="footer-bottom"><span>© 2026 Mitten LLC</span><span>Product before technology. Product before AI.</span></div>
        </div>
      </footer>
    </div>
  );
}
