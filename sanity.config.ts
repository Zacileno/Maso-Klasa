"use client";

// Sanity Studio (content editor) embedded in the website at /admin.
import { csCZLocale } from "@sanity/locale-cs-cz";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { AKCE_DOCUMENT_ID, dataset, projectId } from "@/sanity/env";
import { akceType } from "@/sanity/schemaTypes/akce";

const SINGLETON_TYPES = new Set<string>([akceType.name]);
const SINGLETON_ACTIONS = new Set<string>(["publish", "discardChanges", "restore"]);

export default defineConfig({
  basePath: "/admin",
  title: "Maso Klasa – administrace",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Obsah webu")
          .items([
            S.listItem()
              .title("Akce")
              .id(AKCE_DOCUMENT_ID)
              .child(
                S.document()
                  .schemaType(akceType.name)
                  .documentId(AKCE_DOCUMENT_ID)
                  .title("Akce"),
              ),
          ]),
    }),
    csCZLocale(),
  ],
  schema: {
    types: [akceType],
    // "Akce" is a single document: hide it from "create new" menus.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // No duplicate/delete for the single "Akce" document.
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
});
