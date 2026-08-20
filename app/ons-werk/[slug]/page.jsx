import { notFound } from "next/navigation";
import CasePageTemplate from "../../components/CasePageTemplate";
import { getAllCaseSlugs, getCaseBySlug } from "../../../src/data/cases";
import { canonicalUrl, pageTitle } from "../../../src/lib/site";

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
      title: "Case",
    };
  }

  return {
    title: pageTitle(caseData.seo?.title || `${caseData.client} case`),
    description: caseData.seo?.description || caseData.intro || caseData.heroIntro,
    alternates: { canonical: canonicalUrl(`/work/${caseData.slug}/`) },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  return <CasePageTemplate caseData={caseData} />;
}
