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
            <p className="kicker"><span /> Government ProductOps · Practical AI</p>
            <h1>Find the next useful move—<br /><em>in a government mission or an AI rollout.</em></h1>
            <p className="hero-lede">Mitten brings product thinking to both. Choose the work that brought you here.</p>
            <div className="home-actions">
              <a className="solid-button" href="#choose">Choose your path <span>↓</span></a>
              <a className="quiet-link" href="/first-move/">Try First Move <span>→</span></a>
            </div>
          </div>

        </section>

        <section className="pathways wrap" id="choose">
          <header className="pathways-head">
            <h2>Choose your work.</h2>
          </header>
          <div className="pathway-grid">
            <a className="pathway-card government-path" href="/government/">
              <span>01</span>
              <div className="pathway-symbol government-symbol" aria-hidden="true"><i /><i /><i /><i /><b /></div>
              <h3>Government<br /><em>ProductOps</em></h3>
              <b className="pathway-arrow" aria-hidden="true">↗</b>
            </a>
            <a className="pathway-card ai-path" href="/ai/">
              <span>02</span>
              <div className="pathway-symbol product-symbol" aria-hidden="true"><i /><i /><i /><i /><b /></div>
              <h3>Practical<br /><em>AI</em></h3>
              <b className="pathway-arrow" aria-hidden="true">↗</b>
            </a>
          </div>
        </section>

        <section className="method wrap" id="method">
          <header className="section-intro">
            <p className="section-label">HOW WE THINK</p>
            <h2>Three questions before you buy, build, or automate.</h2>
          </header>
          <div className="method-grid">
            <article>
              <span className="method-number">01</span>
              <h3>What&apos;s actually true?</h3>
              <p>Separate the stated request from the outcome, constraint, and evidence that should drive the decision.</p>
            </article>
            <article>
              <span className="method-number">02</span>
              <h3>Who has to live with this?</h3>
              <p>Map the people, handoffs, judgment, incentives, and failure modes a useful product has to respect.</p>
            </article>
            <article className="method-accent">
              <span className="method-number">03</span>
              <h3>Does AI belong here?</h3>
              <p>Use AI where it creates a measurable advantage. Choose a simpler tool—or no new tool—when it does not.</p>
            </article>
          </div>
        </section>

        <section className="first-move wrap">
          <div className="first-move-copy">
            <p className="section-label">TRY THE THINKING</p>
            <h2>Leave with a place to start.</h2>
            <p>Answer four questions about the problem in front of you. Get a working brief back—not a lecture.</p>
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
              <h2>Training that fits how<br />your team actually works.</h2>
              <p>Private, role-specific AI training built around your team’s actual workflows, tools, and constraints. Delivered in a dedicated client environment.</p>
              <a className="outline-button" href="mailto:ben@mitten.consulting?subject=Mitten%20client%20AI%20training">Discuss client training <span>→</span></a>
            </div>
            <div className="training-index"><span>PRIVATE DELIVERY</span><strong>Learn with<br />your real work.</strong><small>DEDICATED CLIENT SUBDOMAIN</small></div>
          </div>
        </section>

        <section className="booking wrap" id="book">
          <div className="booking-copy">
            <p className="section-label">START A CONVERSATION</p>
            <h2>Thirty minutes with the person doing the work.</h2>
            <p>Bring a problem. Mitten will help sharpen the decision and identify a useful next move.</p>
          </div>
          <div className="booking-panel">
            {bookingUrl ? (
              <iframe title="Book a conversation with Mitten" src={bookingUrl} loading="lazy" />
            ) : (
              <div className="booking-fallback">
                <span>MITTEN / INTRO CONVERSATION</span>
                <strong>Google Calendar booking is being connected.</strong>
                <p>Until the live calendar is in place, send a note and we’ll find a time.</p>
                <a className="solid-button" href="mailto:ben@mitten.consulting?subject=Mitten%20intro%20conversation">Email Mitten <span>↗</span></a>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="wrap footer-grid">
          <div><BrandLogo reversed /></div>
          <nav aria-label="Footer navigation"><a href="/government/">Government</a><a href="/ai/">Practical AI</a><a href="/first-move/">First Move</a><a href="/privacy/">Privacy</a></nav>
          <div className="footer-contact"><a href="mailto:ben@mitten.consulting">Contact Mitten</a><span>Nashville, Tennessee</span></div>
          <div className="footer-bottom"><span>© 2026 Mitten LLC</span></div>
        </div>
      </footer>
    </div>
  );
}
