import "./styles/generated/tokens.css";
import "./styles/foundation/base.css";
import "./styles/foundation/icons.css";
import "./styles/foundation/primitives.css";
import "./globals.css";
import "./styles/pages/home-polish.css";
import "./styles/pages/team-polish.css";
import "./styles/pages/contact-polish.css";
import "./styles/pages/legal.css";
import PixelCursor from "./components/PixelCursor";
import ConsentAnalytics from "./components/ConsentAnalytics";
import { assetPath } from "../src/lib/assetPath";
import { canonicalUrl, siteUrl } from "../src/lib/site";

const GOOGLE_TAG_MANAGER_ID = "GTM-WZ3LC9DC";

const consentModeScript = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
  (function initialiseConsentMode() {
    var storedChoice = null;
    try {
      storedChoice = window.localStorage.getItem("amiamis_cookie_consent");
    } catch (error) {
      storedChoice = null;
    }
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: storedChoice === "granted" ? "granted" : "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500
    });
  })();
`;

const googleTagManagerScript = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "y3UjCWtW-1s3zxBBM70_hWwnyLQz4eaMuqx0z3_Rv58",
  },
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
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} suppressHydrationWarning />
        <script
          dangerouslySetInnerHTML={{ __html: consentModeScript }}
          id="google-consent-mode"
        />
        <script
          dangerouslySetInnerHTML={{ __html: googleTagManagerScript }}
          id="google-tag-manager"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
          type="application/ld+json"
        />
      </head>
      <body style={assetVariables}>
        <noscript>
          <iframe
            aria-hidden="true"
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <ConsentAnalytics />
        <PixelCursor />
      </body>
    </html>
  );
}
