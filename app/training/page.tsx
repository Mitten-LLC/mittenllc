import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ClientEnhancements } from "../ClientEnhancements";

export const metadata: Metadata = {
  title: "AI Training — Mitten",
  description: "Practical AI training for people doing complex, consequential work.",
};

const source = readFileSync(join(process.cwd(), "training/index.html"), "utf8");
const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "") ?? "";

export default function Training() {
  return <div className="training-page"><div dangerouslySetInnerHTML={{ __html: body }} /><ClientEnhancements /></div>;
}
