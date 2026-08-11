import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-site-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-site-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitten.consulting"),
  title: "Mitten — Product before technology. Product before AI.",
  description: "Mitten helps leaders turn hard problems into useful products, operating models, and teams—using AI when it earns a place.",
  icons: { icon: "/brand/mitten-logo-kit/web/mitten-favicon.svg" },
  openGraph: {
    title: "Mitten — Product before technology. Product before AI.",
    description: "Product strategy and applied AI for consequential work.",
    images: ["/og-product-first.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitten — Product before technology. Product before AI.",
    description: "Product strategy and applied AI for consequential work.",
    images: ["/og-product-first.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
