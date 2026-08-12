import type { Metadata } from "next";
import { DecisionStudio } from "./DecisionStudio";

export const metadata: Metadata = {
  title: "Decision Studio — Mitten",
  description: "See the decision underneath the requirements—or the person underneath the workflow.",
};

export default function StudioPage() {
  return <DecisionStudio />;
}
