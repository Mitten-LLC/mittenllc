import type { Metadata } from "next";
import source from "../../privacy/index.html?raw";

export const metadata: Metadata = { title: "Privacy — Mitten" };
const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

export default function Privacy() {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
