// Settings for the Sanity command line (e.g. `npx sanity dataset import`).
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "0n4phjgq", dataset: "production" },
});
