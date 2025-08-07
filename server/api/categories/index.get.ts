// server\api\categories\index.get.ts

import prisma from "../../../prisma/lib/client";
export default defineEventHandler(async () => {
  return prisma.categories.findMany();
});
