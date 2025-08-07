// server\api\restrictions\create.post.ts

import prisma from "../../../prisma/lib/client";
export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  return prisma.restrictionsAlimentaires.create({ data });
});
