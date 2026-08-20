import WorkPage from "./WorkPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Ons werk",
  description:
    "Bekijk cases, campagnes, video's en creatieve projecten van Ami Amis.",
  alternates: { canonical: canonicalUrl("/work/") },
};

export default function Page() {
  return <WorkPage />;
}
