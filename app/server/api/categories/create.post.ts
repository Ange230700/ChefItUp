// server\api\categories\create.post.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  return prisma.categories.create({ data });
});
