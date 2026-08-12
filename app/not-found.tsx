import type { Metadata } from "next";
import { PrimaryHeader } from "./PrimaryHeader";

export const metadata: Metadata = {
  title: "Page not found — Mitten",
  description: "The requested Mitten page could not be found.",
};

export default function NotFound() {
  return (
    <div className="home-v2">
      <PrimaryHeader links={[
        { href: "/government/", label: "Government" },
        { href: "/ai/", label: "Practical AI" },
        { href: "/first-move/", label: "First Move" },
        { href: "/#book", label: "Book a conversation", primary: true },
      ]} />
      <main className="not-found-main wrap">
        <p className="section-label">404 / WRONG TURN</p>
        <div>
          <h1>This path stops here.<br /><em>Let’s find the useful one.</em></h1>
          <p>The page may have moved, but the work is still in reach. Return home or choose the path that brought you to Mitten.</p>
          <div className="home-actions"><a className="solid-button" href="/">Return home <span>→</span></a><a className="quiet-link" href="/first-move/">Try First Move <span>↗</span></a></div>
        </div>
      </main>
    </div>
  );
}
