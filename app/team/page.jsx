import TeamPage from "./TeamPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Creatief video- en contentbureau in Antwerpen",
  description:
    "Maak kennis met Ami Amis, het creatieve video- en contentbureau uit Antwerpen voor videoproductie, campagnes en social content.",
  alternates: { canonical: canonicalUrl("/team/") },
};

export default function Page() {
  return <TeamPage />;
}
