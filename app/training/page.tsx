import type { Metadata } from "next";
import source from "../../training/index.html?raw";
import { ClientEnhancements } from "../ClientEnhancements";

export const metadata: Metadata = {
  title: "AI Training — Mitten",
  description: "Practical AI training for people doing complex, consequential work.",
};

const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "") ?? "";

export default function Training() {
  return <div className="training-page"><div dangerouslySetInnerHTML={{ __html: body }} /><ClientEnhancements /></div>;
}
