import { redirect } from "next/navigation";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function HomeTwoPage() {
  redirect("/");
}
