import type { Metadata } from "next";
import { FirstMoveInterview } from "./FirstMoveInterview";

export const metadata: Metadata = {
  title: "First Move — Mitten OS",
  description: "Talk through a difficult workflow and leave with a practical first move.",
};

export default function FirstMovePage() {
  return <FirstMoveInterview />;
}
