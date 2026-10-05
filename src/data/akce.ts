// Section "Akce" on the homepage. Phase 2: loaded from Supabase and edited by the client.

export type AkceItem = {
  name: string;
  /** Display price including unit, e.g. "109,90 Kč/kg". */
  price: string;
};

export const akceItems: AkceItem[] = [
  { name: "Treska MR.", price: "109,90 Kč/kg" },
  { name: "H.Plec CHL.", price: "159,90 Kč/kg" },
  { name: "Jelení kostky na guláš MR.", price: "159,90 Kč/kg" },
  { name: "V.líčka MR.", price: "166,90 Kč/kg" },
  { name: "Telecí kýta MR.", price: "179,90 Kč/kg" },
  { name: "Kuřecí nudličky MR.", price: "107,90 Kč/kg" },
];
