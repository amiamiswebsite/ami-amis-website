import HomeExperience from "./components/HomeExperience";
import HomeRapVideoCampaign from "./components/HomeRapVideoCampaign";
import { canonicalUrl } from "../src/lib/site";
import { homeRapVideoCampaign } from "../src/data/homeRapVideoCampaign";

export const metadata = {
  title: "Videoproductie & creatieve content in Antwerpen",
  description:
    "Ami Amis is een creatief video- en contentbureau in Antwerpen. Van videoproductie en social content tot campagnes, fotografie en strategie.",
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  return (
    <HomeExperience
      variant="home2"
      campaignSlot={homeRapVideoCampaign.enabled ? <HomeRapVideoCampaign campaign={homeRapVideoCampaign} /> : null}
    />
  );
}
