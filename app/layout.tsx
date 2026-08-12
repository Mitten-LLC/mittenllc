import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ variable: "--font-site-sans", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-site-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — Start with the work",
  description: "Product thinking for complex government missions and practical AI adoption. Start with the work and make the next move useful.",
  icons: { icon: "/brand/mitten-logo-kit/web/mitten-favicon.svg" },
  openGraph: {
    title: "Mitten — Start with the work",
    description: "Government ProductOps and practical AI adoption, shaped around the work that needs to move.",
    url: "https://mitten.consulting",
    siteName: "Mitten",
    type: "website",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "Mitten — Find the next useful move.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — Start with the work",
    description: "Government ProductOps and practical AI adoption, shaped around the work that needs to move.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html>;
}
