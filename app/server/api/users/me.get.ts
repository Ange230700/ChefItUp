// app\server\api\users\me.get.ts

import auth from "../../middlewares/auth";
import prisma from "../../../../prisma/lib/client";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }

  await auth(event); // Middleware: checks and populates event.context.user

  // Get user info from context (set by auth middleware)
  const { id } = event.context.user;

  const user = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      pseudo: true,
      date_inscription: true,
      role: true,
    },
  });
  if (!user)
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  return user;
});
