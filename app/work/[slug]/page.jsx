import { notFound } from "next/navigation";
import CasePageTemplate from "../../components/CasePageTemplate";
import VisitAntwerpenCasePage from "../../components/VisitAntwerpenCasePage";
import { getAllCaseSlugs, getCaseBySlug } from "../../../src/data/cases";

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    return {
      title: "Case | Ami Amis",
    };
  }

  return {
    title: caseData.seo?.title || `${caseData.client} | Ami Amis case`,
    description: caseData.seo?.description || caseData.intro || caseData.heroIntro,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  if (caseData.template === "visit-antwerpen-social") {
    return <VisitAntwerpenCasePage caseData={caseData} />;
  }

  return <CasePageTemplate caseData={caseData} />;
}
