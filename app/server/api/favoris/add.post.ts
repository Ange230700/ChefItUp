// app\server\api\favoris\add.post.ts

import prisma from "../../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }

  const body = await readBody(event);
  // Validate body.user_id & body.recette_id

  const fav = await prisma.favoris.create({
    data: { user_id: body.user_id, recette_id: body.recette_id },
  });
  return fav;
});
