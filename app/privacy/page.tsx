import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = { title: "Privacy — Mitten" };
const source = readFileSync(join(process.cwd(), "privacy/index.html"), "utf8");
const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

export default function Privacy() {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
