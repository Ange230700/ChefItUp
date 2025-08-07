// prisma/helpers/cleanUp.ts

import prisma from "../lib/client";
import deleteSafely from "./deleteSafely";

async function cleanUp() {
  console.log("🧹 Cleaning up…");
  await deleteSafely(() => prisma.favoris.deleteMany(), "favoris");
  await deleteSafely(
    () => prisma.recette_Restriction.deleteMany(),
    "recette_Restriction",
  );
  await deleteSafely(() => prisma.recettes.deleteMany(), "recettes");
  await deleteSafely(() => prisma.categories.deleteMany(), "categories");
  await deleteSafely(
    () => prisma.restrictionsAlimentaires.deleteMany(),
    "restrictionsAlimentaires",
  );
  await deleteSafely(() => prisma.users.deleteMany(), "users");
  console.log("🧹 Cleaning up complete.");
}

cleanUp()
  .then(() => {
    console.log("🟢 cleanUp.ts: Script executed successfully.");
  })
  .catch((e) => {
    console.error("🔴 cleanUp.ts: Script failed:", e);
    process.exit(1);
  });

export default cleanUp;
