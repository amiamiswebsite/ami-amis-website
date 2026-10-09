import HomeExperience from "./components/HomeExperience";
import { canonicalUrl } from "../src/lib/site";

export const metadata = {
  title: "Videoproductie & creatieve content in Antwerpen",
  description:
    "Ami Amis is een creatief video- en contentbureau in Antwerpen. Van videoproductie en social content tot campagnes, fotografie en strategie.",
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  return <HomeExperience variant="home2" />;
}
