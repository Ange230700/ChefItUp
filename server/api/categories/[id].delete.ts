// server\api\categories\[id].delete.ts

import prisma from "../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params?.id) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID param." });
  }
  const id = Number(params.id);
  if (isNaN(id))
    throw createError({ statusCode: 400, statusMessage: "Invalid ID." });
  return prisma.categories.delete({ where: { id } });
});
