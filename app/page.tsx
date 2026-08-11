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
          <a href="#method">How we think</a>
          <a href="#work">What we do</a>
          <a href="/training/">Training</a>
          <a className="nav-book" href="#book">Book a conversation <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="home-hero wrap">
          <div className="hero-statement">
            <p className="kicker"><span /> Product strategy + applied AI</p>
            <h1>Product before technology.<br /><em>Product before AI.</em></h1>
            <p className="hero-lede">Mitten helps leaders turn hard, consequential problems into products, operating models, and teams that work—using AI when it earns a place.</p>
            <div className="home-actions">
              <a className="solid-button" href="/first-move/">Find your first move <span>→</span></a>
              <a className="quiet-link" href="#method">See how Mitten thinks <span>↓</span></a>
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
            <blockquote>“The most expensive AI mistake is building the wrong thing faster.”</blockquote>
            <p>Mitten starts with the decision, behavior, or outcome that needs to change. Then we make the smallest useful move that can produce evidence.</p>
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
              <h2>From a hard question to working capability.</h2>
            </header>
            <div className="offer-list">
              <article><span>01</span><h3>Shape the opportunity</h3><p>A focused engagement to turn ambiguity into a product frame, decision path, and first experiment.</p><small>STRATEGY SPRINTS · EXECUTIVE WORKSHOPS</small></article>
              <article><span>02</span><h3>Build to learn</h3><p>Rapid prototypes and evaluations that test usefulness, trust, feasibility, and fit before a major commitment.</p><small>PRODUCT DISCOVERY · AI PROTOTYPES</small></article>
              <article><span>03</span><h3>Make it operational</h3><p>Product practices, operating rhythms, and enablement that help the work survive beyond the first demonstration.</p><small>PRODUCT OPERATIONS · ADOPTION</small></article>
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

        <section className="training-home">
          <div className="wrap training-grid">
            <p className="section-label">MITTEN / LEARNING</p>
            <div>
              <h2>Build judgment,<br />not just prompt skills.</h2>
              <p>Applied AI training for teams doing real work. Participants learn to frame problems, use AI responsibly, test outputs, and make better decisions with the tools.</p>
              <a className="outline-button" href="/training/">Explore AI training <span>→</span></a>
            </div>
            <div className="training-index"><span>COURSE 01</span><strong>AI-Assisted<br />Software Testing</strong><small>SELF-GUIDED · 13 MODULES</small></div>
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
          <div><Logo reversed /><p>Product strategy and applied AI<br />for consequential work.</p></div>
          <nav aria-label="Footer navigation"><a href="#method">How we think</a><a href="#work">What we do</a><a href="/training/">Training</a><a href="/privacy/">Privacy</a></nav>
          <div className="footer-contact"><a href="mailto:ben@mitten.consulting">ben@mitten.consulting</a><span>Nashville, Tennessee</span></div>
          <div className="footer-bottom"><span>© 2026 Mitten LLC</span><span>Product before technology. Product before AI.</span></div>
        </div>
      </footer>
    </div>
  );
}
