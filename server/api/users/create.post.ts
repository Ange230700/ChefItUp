// server\api\users\create.post.ts

import prisma from "../../../prisma/lib/client";
import argon2 from "argon2";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  body.password = await argon2.hash(body.password);
  return prisma.users.create({ data: body });
});
