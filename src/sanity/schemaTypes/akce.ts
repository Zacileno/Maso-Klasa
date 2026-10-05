import { defineArrayMember, defineField, defineType } from "sanity";

export const akceType = defineType({
  name: "akce",
  title: "Akce",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Položky v akci",
      description:
        "Pořadí změníte přetažením. Na webu se položky zobrazí ve stejném pořadí.",
      type: "array",
      of: [
        defineArrayMember({
          name: "akceItem",
          title: "Položka",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Název",
              description: "Např. Telecí kýta MR.",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "price",
              title: "Cena",
              description: "Včetně jednotky, např. 179,90 Kč/kg",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Akce" }),
  },
});
