// app\server\api\recettes\[id].get.ts

import prisma from "../../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params?.id) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID param." });
  }

  const id = Number(params.id);
  if (isNaN(id))
    throw createError({ statusCode: 400, statusMessage: "Invalid ID." });

  const recette = await prisma.recettes.findUnique({
    where: { id },
    include: {
      Categories: true,
      Favoris: true,
      Recette_Restriction: { include: { RestrictionsAlimentaires: true } },
    },
  });
  if (!recette)
    throw createError({ statusCode: 404, statusMessage: "Recette not found." });
  return recette;
});
