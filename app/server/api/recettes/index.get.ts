// server\api\recettes\index.get.ts

import prisma from "../../../../prisma/lib/client";

export default defineEventHandler(async () => {
  const recettes = await prisma.recettes.findMany({
    include: {
      Categories: true,
      Favoris: true,
      Recette_Restriction: { include: { RestrictionsAlimentaires: true } },
    },
    orderBy: { id: "desc" },
  });
  return recettes;
});
