import LegalPage from "../components/LegalPage";
import { termsSections } from "../../src/data/legalContent";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Algemene voorwaarden",
  description: "Lees de algemene voorwaarden van Ami Amis BV.",
  alternates: { canonical: canonicalUrl("/algemene-voorwaarden/") },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Juridisch"
      title="Algemene voorwaarden"
      intro="De afspraken die gelden voor samenwerkingen met Ami Amis BV."
      sections={termsSections}
      updatedAt="26 september 2023"
    />
  );
}
