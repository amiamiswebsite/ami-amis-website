import ContactPage from "./ContactPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Contact | Video- en contentbureau in Antwerpen",
  description:
    "Contacteer Ami Amis voor videoproductie, social content, fotografie, campagnes en creatieve strategie in Antwerpen.",
  alternates: { canonical: canonicalUrl("/contact/") },
};

export default function Page() {
  return <ContactPage />;
}
