// server\api\favoris\remove.post.ts

import prisma from "../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Validate body.user_id & body.recette_id

  await prisma.favoris.delete({
    where: {
      user_id_recette_id: {
        user_id: body.user_id,
        recette_id: body.recette_id,
      },
    },
  });
  return { ok: true };
});
