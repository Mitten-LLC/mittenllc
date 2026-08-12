import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-site-sans", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-site-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — Start with the work",
  description: "Product thinking for complex government missions and practical AI adoption. Start with the work and make the next move useful.",
  icons: { icon: "/brand/mitten-logo-kit/web/mitten-favicon.svg" },
  openGraph: {
    title: "Mitten — Start with the work",
    description: "Government ProductOps and practical AI adoption, shaped around the work that needs to move.",
    images: ["https://mitten-ai.mittensix.chatgpt.site/og-two-paths.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — Start with the work",
    description: "Government ProductOps and practical AI adoption, shaped around the work that needs to move.",
    images: ["https://mitten-ai.mittensix.chatgpt.site/og-two-paths.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${display.variable}`}>{children}</body></html>;
}
