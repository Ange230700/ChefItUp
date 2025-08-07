// server\api\users\register.post.ts
import prisma from "../../../prisma/lib/client";
import { Prisma } from "../../../prisma/generated/prisma-client";
import argon2 from "argon2";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import { serialize } from "cookie";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Basic validation (improve as needed)
  if (!body.email || !body.pseudo || !body.password)
    throw createError({ statusCode: 400, statusMessage: "Missing fields." });

  const hashed = await argon2.hash(body.password);

  let user;
  try {
    user = await prisma.users.create({
      data: {
        email: body.email.toLowerCase(),
        pseudo: body.pseudo,
        password: hashed, // add password field to schema!
        date_inscription: new Date(),
      },
      select: {
        id: true,
        email: true,
        pseudo: true,
        date_inscription: true,
        role: true,
      },
    });
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

  // Generate tokens
  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
  });
  const refreshToken = signRefreshToken({ id: user.id });

  // Set refresh token as httpOnly cookie
  event.node.res.setHeader(
    "Set-Cookie",
    serialize("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  );

  // Send access token in response (store in memory on client)
  return { ...user, accessToken };
});
