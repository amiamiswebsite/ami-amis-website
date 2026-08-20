import HomeExperience from "./components/HomeExperience";
import { canonicalUrl } from "../src/lib/site";

export const metadata = {
  description: "Ami Amis als creatieve groeipartner voor merken met ambitie.",
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  return <HomeExperience variant="home2" />;
}
