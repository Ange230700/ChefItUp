// server\api\favoris\[user_id]_[recette_id].get.ts

import prisma from "../../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const key = params?.["user_id_recette_id"];
  if (!key) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing user_id_recette_id param.",
    });
  }
  const [user_id, recette_id] = key.split("_").map(Number);
  if (isNaN(user_id) || isNaN(recette_id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user_id or recette_id.",
    });
  }
  return prisma.favoris.findUnique({
    where: { user_id_recette_id: { user_id, recette_id } },
  });
});
