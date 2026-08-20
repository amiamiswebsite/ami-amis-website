import TeamPage from "./TeamPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Over Ami Amis",
  description:
    "Maak kennis met het Ami Amis-team: een amicale, bold en no-bullshit creative marketing & video agency.",
  alternates: { canonical: canonicalUrl("/team/") },
};

export default function Page() {
  return <TeamPage />;
}
