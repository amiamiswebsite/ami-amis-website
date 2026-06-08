import { notFound } from "next/navigation";
import CasePageTemplate from "../../components/CasePageTemplate";
import { cases, getCaseBySlug } from "../../../src/data/cases";

export function generateStaticParams() {
  return cases.map((item) => ({
    slug: item.slug,
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
    title: `${caseData.client} | Ami Amis case`,
    description: caseData.intro || caseData.heroIntro,
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
