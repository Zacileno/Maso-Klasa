// Section "Akce" on the homepage. The items are edited by the client in the
// Sanity Studio (/admin) and loaded via `getAkceItems()` in src/sanity/client.ts.

export type AkceItem = {
  name: string;
  /** Display price including unit, e.g. "109,90 Kč/kg". */
  price: string;
};
