import { LEGAL_NAME, SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/data/seo";
import { ORDER_EMAIL, company } from "@/data/site";

type JsonLdData = Record<string, unknown>;

/** Renders schema.org structured data. "<" is escaped so content can't close the script tag. */
export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Address and IDs verified in ARES (IČO 02141990).
const address = {
  "@type": "PostalAddress",
  streetAddress: company.street,
  postalCode: "190 00",
  addressLocality: "Praha 9",
  addressCountry: "CZ",
};

/** Homepage: company, its Prague operation and the website. */
export function homeJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: ORDER_EMAIL,
        telephone: company.operationsPhone,
        vatID: company.dic,
        address,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#provoz`,
        name: SITE_NAME,
        description:
          "Dodavatel čerstvého masa a uzenin pro restaurace, hotely, školy a jídelny v Praze a okolí.",
        url: SITE_URL,
        image: `${SITE_URL}${SHARE_IMAGE.url}`,
        email: ORDER_EMAIL,
        telephone: company.operationsPhone,
        address,
        areaServed: { "@type": "City", name: "Praha" },
        parentOrganization: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "cs",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** Subpages: Domů → current page. */
export function breadcrumbJsonLd(name: string, path: string): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}
