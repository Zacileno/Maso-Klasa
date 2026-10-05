import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Studio markup is the same for every visitor; login happens in the browser.
export const dynamic = "force-static";

// studioMetadata includes robots: noindex, so search engines skip the admin.
export const metadata: Metadata = {
  ...studioMetadata,
  title: { absolute: "Administrace – Maso Klasa" },
};

export { viewport } from "next-sanity/studio";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
