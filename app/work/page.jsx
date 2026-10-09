import WorkPage from "./WorkPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Cases in videoproductie, campagnes & content",
  description:
    "Bekijk hoe Ami Amis merken zichtbaar maakt met videoproductie, social content, fotografie, campagnes en creatieve strategie.",
  alternates: { canonical: canonicalUrl("/work/") },
};

export default function Page() {
  return <WorkPage />;
}
