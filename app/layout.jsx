import "./styles/generated/tokens.css";
import "./styles/foundation/base.css";
import "./styles/foundation/icons.css";
import "./styles/foundation/primitives.css";
import "./globals.css";
import "./styles/pages/home-polish.css";
import "./styles/pages/team-polish.css";
import "./styles/pages/contact-polish.css";
import PixelCursor from "./components/PixelCursor";
import { assetPath } from "../src/lib/assetPath";
import { canonicalUrl, siteUrl } from "../src/lib/site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ami Amis | Creatieve groeipartner",
    template: "%s | Ami Amis",
  },
  description:
    "Ami Amis is een creatieve groeipartner in Antwerpen voor merken die durven springen.",
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: "Ami Amis",
    title: "Ami Amis | Creatieve groeipartner",
    description:
      "Ami Amis is een creatieve groeipartner in Antwerpen voor merken die durven springen.",
    images: [
      {
        url: canonicalUrl("/assets/hero-composite.png"),
        width: 1613,
        height: 899,
        alt: "Ami Amis, creatieve groeipartner in Antwerpen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ami Amis | Creatieve groeipartner",
    description:
      "Ami Amis is een creatieve groeipartner in Antwerpen voor merken die durven springen.",
    images: [canonicalUrl("/assets/hero-composite.png")],
  },
};

export default function RootLayout({ children }) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ami Amis",
    url: canonicalUrl("/"),
    logo: canonicalUrl("/assets/logo-black.png"),
    email: "brent@amiamis.be",
    telephone: "+32472657595",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Meir 78 - Stadsfeestzaal",
      postalCode: "2000",
      addressLocality: "Antwerpen",
      addressCountry: "BE",
    },
    sameAs: [
      "https://www.instagram.com/amiamismedia/",
      "https://www.linkedin.com/company/ami-amis-malle/",
      "https://www.facebook.com/AmiAmisMedia",
    ],
  };
  const fontFaces = `
    @font-face {
      font-family: "Neue Haas Black";
      src: url("${assetPath("/fonts/neue-haas-black.otf")}") format("opentype");
      font-display: swap;
      font-weight: 900;
    }

    @font-face {
      font-family: "Neue Haas";
      src: url("${assetPath("/fonts/neue-haas-roman.otf")}") format("opentype");
      font-display: swap;
      font-weight: 400;
    }

    @font-face {
      font-family: "Neue Haas";
      src: url("${assetPath("/fonts/neue-haas-bold.otf")}") format("opentype");
      font-display: swap;
      font-weight: 800;
    }

    @font-face {
      font-family: "Apple Garamond";
      src: url("${assetPath("/fonts/apple-garamond.ttf")}") format("truetype");
      font-display: swap;
      font-weight: 400;
    }

    @font-face {
      font-family: "Apple Garamond";
      src: url("${assetPath("/fonts/apple-garamond-bold-italic.ttf")}") format("truetype");
      font-display: swap;
      font-style: italic;
      font-weight: 800;
    }
  `;

  const assetVariables = {
    "--logo-mask-image": `url("${assetPath("/assets/logo-black.png")}")`,
    "--paper-bg-image": `url("${assetPath("/assets/paper-bg.webp")}")`,
    "--riso-mask-image": `url("${assetPath("/assets/textures/riso-mask.png")}")`,
    "--riso-ink-breakup-mask-image": `url("${assetPath("/assets/textures/riso-ink-breakup-mask.png")}")`,
  };

  return (
    <html lang="nl">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
          type="application/ld+json"
        />
      </head>
      <body style={assetVariables}>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <PixelCursor />
      </body>
    </html>
  );
}
