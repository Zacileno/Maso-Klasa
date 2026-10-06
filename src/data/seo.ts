import type { Metadata } from "next";

/**
 * Public address of the website, used for canonical URLs, sitemap and Open Graph.
 * Set SITE_URL (e.g. "https://www.masoklasa.cz") once the domain is known.
 * Until then Vercel's production domain is used automatically.
 */
export const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Maso Klasa";

/** Legal company name as registered in ARES (IČO 02141990). */
export const LEGAL_NAME = "maso – uzeniny Gaube Miloslav s.r.o.";

type PageSeo = {
  /** Full title, 50–60 characters, brand at the end. */
  title: string;
  /** 150–160 characters. */
  description: string;
  /** Path starting with "/", e.g. "/kontakt". */
  path: string;
};

/** Share preview image (Facebook, LinkedIn, X…), 1200 × 630 px. */
export const SHARE_IMAGE = {
  url: "/images/maso-klasa-sdileni.jpg",
  width: 1200,
  height: 630,
  alt: "Logo Maso Klasa na fotce syrového hovězího masa s rozmarýnem – dodavatel čerstvého masa v Praze",
};

/**
 * Metadata for one page. Next.js merges metadata shallowly, so openGraph and
 * twitter are repeated here in full for every page.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "cs_CZ",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
