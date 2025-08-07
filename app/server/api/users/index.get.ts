// server\api\users\index.get.ts

import prisma from "../../../../prisma/lib/client";
export default defineEventHandler(async () => prisma.users.findMany());
