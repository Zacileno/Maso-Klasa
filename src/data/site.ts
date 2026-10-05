export const ORDER_EMAIL = "gaubemaso@seznam.cz";
export const ORDER_MAILTO = `mailto:${ORDER_EMAIL}`;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Akce", href: "/#akce" },
  { label: "Nabídka", href: "/#nabidka" },
  { label: "Certifikace", href: "/#certifikace" },
  { label: "Kariéra", href: "/kariera" },
  { label: "Kontakt", href: "/kontakt" },
];

export type Person = {
  name: string;
  phone: string;
};

/** Converts a display phone number ("+420 603 251 519") to a tel: link. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export const company = {
  street: "Lovosická 778/2",
  city: "190 00 Praha 9",
  ico: "02141990",
  dic: "CZ02141990",
  fileNumber: "C 214392",
  court: "vedená u Městského soudu v Praze",
  operationsPhone: "+420 603 251 519",
};

export const salesDirector: Person = {
  name: "Karel Milec",
  phone: "+420 774 704 731",
};

export const salesReps: Person[] = [
  { name: "Václav Nechvátal", phone: "+420 608 032 165" },
  { name: "Pavel Krafek", phone: "+420 774 999 676" },
  { name: "Ivana Vostřelová", phone: "+420 774 407 854" },
];
