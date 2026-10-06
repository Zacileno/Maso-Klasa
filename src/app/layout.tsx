import type { Metadata } from "next";
import { Josefin_Sans, Lato, Playfair_Display } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/data/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

// Page titles and descriptions are set per page via pageMetadata() in src/data/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${playfair.variable} ${lato.variable} ${josefin.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
