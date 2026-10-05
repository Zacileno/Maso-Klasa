// Section "Naše nabídka" on the homepage. Phase 2: loaded from Supabase and edited by the client.

export type NabidkaCategory = {
  title: string;
  items: string[];
};

// The original website shows the same placeholder list in all three columns.
const placeholderItems: string[] = [
  "zadní",
  "zadní šál",
  "plec bez kosti",
  "kližka",
  "karb",
  "roštěná býk",
  "roštěná kráva",
  "roštěná kráva k.ú.",
  "svíčková chlaz. 1+",
  "svíčková chlazená 1,8+",
  "svíčková mr. 1+",
  "svíčková mr. býk",
];

export const nabidkaCategories: NabidkaCategory[] = [
  { title: "Maso", items: placeholderItems },
  { title: "Uzeniny", items: placeholderItems },
  { title: "Maso", items: placeholderItems },
];
