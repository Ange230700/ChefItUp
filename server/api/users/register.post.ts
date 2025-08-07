// server\api\users\register.post.ts
import prisma from "../../../prisma/lib/client";
import { Prisma } from "../../../prisma/generated/prisma-client";
import argon2 from "argon2";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Basic validation (improve as needed)
  if (!body.email || !body.pseudo || !body.password)
    throw createError({ statusCode: 400, statusMessage: "Missing fields." });

  const hashed = await argon2.hash(body.password);

  try {
    const user = await prisma.users.create({
      data: {
        email: body.email.toLowerCase(),
        pseudo: body.pseudo,
        password: hashed, // add password field to schema!
        date_inscription: new Date(),
      },
      select: { id: true, email: true, pseudo: true, date_inscription: true },
    });
    return user;
  } catch (e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email or username already exists.",
      });
    }
    throw e;
  }
});
