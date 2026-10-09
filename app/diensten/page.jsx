import ServicesPageTwo from "../diensten-2/ServicesPageTwo";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Videoproductie, social content & campagnes",
  description:
    "Ami Amis helpt merken met videoproductie, social content, campagnes, fotografie en creatieve strategie vanuit Antwerpen.",
  alternates: { canonical: canonicalUrl("/diensten/") },
};

export default function Page() {
  return <ServicesPageTwo />;
}
