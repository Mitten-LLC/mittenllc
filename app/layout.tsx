import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-site-sans", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-site-display", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-site-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — Ship the first useful move",
  description: "Diagnose the real workflow, decision, or acquisition problem—and prove a useful first move before committing to the technology.",
  icons: { icon: "/brand/mitten-logo-kit/web/mitten-favicon.svg" },
  openGraph: {
    title: "Mitten — Ship the first useful move",
    description: "Government ProductOps and practical AI adoption grounded in evidence, not hype.",
    images: ["/og-first-useful-move.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — Ship the first useful move",
    description: "Government ProductOps and practical AI adoption grounded in evidence, not hype.",
    images: ["/og-first-useful-move.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${display.variable} ${mono.variable}`}>{children}</body></html>;
}
