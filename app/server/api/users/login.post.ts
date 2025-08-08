// app\server\api\users\login.post.ts
import prisma from "../../../../prisma/lib/client";
import argon2 from "argon2";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import { serialize } from "cookie";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password)
    throw createError({
      statusCode: 400,
      statusMessage: "Missing credentials.",
    });

  const user = await prisma.users.findUnique({
    where: { email: body.email.toLowerCase() },
  });
  if (!user || !(await argon2.verify(user.password, body.password)))
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials.",
    });

  // Generate tokens
  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
  });
  const refreshToken = signRefreshToken({ id: user.id });

  event.node.res.setHeader(
    "Set-Cookie",
    serialize("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  );

  // You'd create a JWT here for real apps!
  return {
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
    date_inscription: user.date_inscription,
    accessToken,
  };
});
