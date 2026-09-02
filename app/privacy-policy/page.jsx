import LegalPage from "../components/LegalPage";
import { privacySections } from "../../src/data/legalContent";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Privacy policy",
  description: "Lees hoe Ami Amis persoonsgegevens verwerkt en beschermt.",
  alternates: { canonical: canonicalUrl("/privacy-policy/") },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Juridisch"
      title="Privacy policy"
      intro="Hoe we persoonsgegevens verwerken en beschermen."
      sections={privacySections}
      updatedAt="27 september 2023"
    />
  );
}
