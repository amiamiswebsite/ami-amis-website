import ContactPage from "./ContactPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Neem contact op met Ami Amis voor video, marketing, social content, fotografie, design en campagnes.",
  alternates: { canonical: canonicalUrl("/contact/") },
};

export default function Page() {
  return <ContactPage />;
}
