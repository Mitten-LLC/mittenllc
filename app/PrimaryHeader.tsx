import { BrandLogo } from "./BrandLogo";

type HeaderLink = {
  href: string;
  label: string;
  primary?: boolean;
};

export function PrimaryHeader({ homeHref = "/", links }: { homeHref?: string; links: HeaderLink[] }) {
  const navigation = (label: string) => (
    <nav aria-label={label}>
      {links.map((link) => (
        <a className={link.primary ? "nav-book" : undefined} href={link.href} key={`${label}-${link.href}`}>
          {link.label}{link.primary && <span aria-hidden="true">↗</span>}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="home-header wrap">
      <a href={homeHref} aria-label="Mitten home"><BrandLogo /></a>
      <div className="desktop-navigation">{navigation("Main navigation")}</div>
      <details className="mobile-navigation">
        <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
        {navigation("Mobile navigation")}
      </details>
    </header>
  );
}
