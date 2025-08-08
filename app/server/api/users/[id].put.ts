// app\server\api\users\[id].put.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params?.id) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID param." });
  }
  const id = Number(params.id);
  if (isNaN(id))
    throw createError({ statusCode: 400, statusMessage: "Invalid ID." });
  const body = await readBody(event);
  return prisma.users.update({ where: { id }, data: body });
});
