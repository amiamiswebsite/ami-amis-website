import AssetsPage from "./AssetsPage";
import { canonicalUrl } from "../../src/lib/site";

export const metadata = {
  title: "Asset library",
  description: "De visuele assetbibliotheek van Ami Amis.",
  alternates: { canonical: canonicalUrl("/assets/") },
};

export default function Page() {
  return <AssetsPage />;
}
