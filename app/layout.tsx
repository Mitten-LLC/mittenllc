import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-site-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-site-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — AI that works in the real world",
  description: "Practical AI strategy, product operations, mission delivery, and hands-on training.",
  icons: { icon: "/img/favicon.ico" },
  openGraph: {
    title: "Mitten — AI that works in the real world",
    description: "Practical AI strategy, product operations, mission delivery, and hands-on training.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — AI that works in the real world",
    description: "Practical AI strategy, product operations, mission delivery, and hands-on training.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
