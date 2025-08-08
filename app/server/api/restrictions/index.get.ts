// app\server\api\restrictions\index.get.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async () => {
  return prisma.restrictionsAlimentaires.findMany();
});
