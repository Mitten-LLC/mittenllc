import type { Metadata } from "next";
import { PrimaryHeader } from "../PrimaryHeader";

export const metadata: Metadata = { title: "Privacy — Mitten" };

export default function Privacy() {
  return (
    <div className="home-v2 privacy-page">
      <PrimaryHeader links={[{ href: "/", label: "Back home", primary: true }]} />
      <main className="privacy-main wrap">
        <p className="section-label">PRIVACY</p>
        <h1 className="privacy-title">Straightforward<br />by design.</h1>
        <div className="privacy-copy">
          <p>Mitten LLC respects your privacy. This website does not sell personal information. If you contact us by email or through a scheduling service, we use the information you provide to respond to your request and conduct our business relationship.</p>
          <p>The First Move interview and Decision Studio send the general description you provide to OpenAI through a server-side API to generate your working brief. Mitten does not persist those inputs or outputs, and API storage is disabled for these requests. OpenAI processes the request under its own <a href="https://openai.com/policies/privacy-policy/">privacy policy</a>. Do not submit classified, controlled, proprietary, procurement-sensitive, or personal information.</p>
          <p>Other third-party services linked from this site may collect information under their own privacy policies. For questions about this notice or your information, contact <a href="mailto:ben@mitten.consulting">ben@mitten.consulting</a>.</p>
          <p>Last updated August 2026.</p>
        </div>
      </main>
    </div>
  );
}
