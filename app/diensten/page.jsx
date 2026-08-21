import ServicesPageTwo from "../diensten-2/ServicesPageTwo";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Diensten",
  description:
    "Wij creëren niet gewoon content. Wij creëren oplossingen voor merken, werkgevers, producten, socials en events.",
  alternates: { canonical: canonicalUrl("/diensten/") },
};

export default function Page() {
  return <ServicesPageTwo />;
}
