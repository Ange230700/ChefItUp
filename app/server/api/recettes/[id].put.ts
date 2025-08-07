// server\api\recettes\[id].put.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params?.id) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID param." });
  }
  const id = Number(params.id);
  if (isNaN(id))
    throw createError({ statusCode: 400, statusMessage: "Invalid ID." });
  const data = await readBody(event);
  return prisma.recettes.update({ where: { id }, data });
});
