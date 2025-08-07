// server\api\favoris\index.get.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async () =>
  prisma.favoris.findMany({
    include: { Users: true, Recettes: true },
  }),
);
