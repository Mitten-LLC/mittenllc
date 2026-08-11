import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-site-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-site-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — Product before technology. Product before AI.",
  description: "Government ProductOps and practical AI adoption for organizations and people building, optimizing, and integrating AI into everyday work and life.",
  icons: { icon: "/brand/mitten-logo-kit/web/mitten-favicon.svg" },
  openGraph: {
    title: "Mitten — Product before technology. Product before AI.",
    description: "Government ProductOps and practical AI adoption for consequential, everyday work.",
    images: ["/og-product-first.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — Product before technology. Product before AI.",
    description: "Government ProductOps and practical AI adoption for consequential, everyday work.",
    images: ["/og-product-first.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
