// app\server\api\categories\[id].get.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params?.id) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID param." });
  }
  const id = Number(params.id);
  if (isNaN(id))
    throw createError({ statusCode: 400, statusMessage: "Invalid ID." });
  return prisma.categories.findUnique({ where: { id } });
});
