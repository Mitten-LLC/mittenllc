import source from "../index.html?raw";
import { ClientEnhancements } from "./ClientEnhancements";

const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "") ?? "";

export default function Home() {
  return <><div dangerouslySetInnerHTML={{ __html: body }} /><ClientEnhancements /></>;
}
