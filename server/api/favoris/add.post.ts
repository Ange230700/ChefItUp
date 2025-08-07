// server\api\favoris\add.post.ts

import prisma from "../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Validate body.user_id & body.recette_id

  const fav = await prisma.favoris.create({
    data: { user_id: body.user_id, recette_id: body.recette_id },
  });
  return fav;
});
