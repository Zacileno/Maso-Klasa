import { createClient, defineQuery } from "next-sanity";
import type { AkceItem } from "@/data/akce";
import { AKCE_DOCUMENT_ID, apiVersion, dataset, projectId } from "./env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Skip the CDN so a saved change shows up on the next revalidation.
  useCdn: false,
  perspective: "published",
});

/** How often (in seconds) the website picks up changes from Sanity. */
export const SANITY_REVALIDATE = 60;

const AKCE_QUERY = defineQuery(
  `*[_type == "akce" && _id == $id][0].items[]{ "name": coalesce(name, ""), "price": coalesce(price, "") }`,
);

export async function getAkceItems(): Promise<AkceItem[]> {
  const items = await client.fetch<AkceItem[] | null>(
    AKCE_QUERY,
    { id: AKCE_DOCUMENT_ID },
    { next: { revalidate: SANITY_REVALIDATE } },
  );
  return (items ?? []).filter((item) => item.name && item.price);
}
