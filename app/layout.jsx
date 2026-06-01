import "./globals.css";
import { assetPath } from "../src/lib/assetPath";

export const metadata = {
  title: "Ami Amis | Creative marketing & video agency",
  description: "Video first marketing, van A tot Z.",
};

export default function RootLayout({ children }) {
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
    "--paper-bg-image": `url("${assetPath("/assets/paper-bg.jpg")}")`,
  };

  return (
    <html lang="nl">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
      </head>
      <body style={assetVariables}>{children}</body>
    </html>
  );
}
