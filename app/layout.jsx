import "./globals.css";

export const metadata = {
  title: "Ami Amis | Creative marketing & video agency",
  description: "Video first marketing, van A tot Z.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
