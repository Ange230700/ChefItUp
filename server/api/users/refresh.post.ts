// server\api\users\refresh.post.ts

import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../../utils/jwt";
import prisma from "../../../prisma/lib/client";
import { serialize, parse } from "cookie";

interface JwtPayload {
  id: number;
  pseudo?: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export default defineEventHandler(async (event) => {
  const cookie = event.node.req.headers.cookie;
  if (!cookie)
    throw createError({ statusCode: 401, statusMessage: "No cookies" });

  const { refresh_token } = parse(cookie);
  if (!refresh_token)
    throw createError({ statusCode: 401, statusMessage: "No refresh token" });

  let payload: JwtPayload;
  try {
    payload = verifyRefreshToken(refresh_token);
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid refresh token",
    });
  }

  // Optionally check if token is revoked in DB

  // Re-issue tokens
  const user = await prisma.users.findUnique({ where: { id: payload.id } });
  if (!user)
    throw createError({ statusCode: 401, statusMessage: "User not found" });

  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
  });
  const newRefreshToken = signRefreshToken({ id: user.id });

  event.node.res.setHeader(
    "Set-Cookie",
    serialize("refresh_token", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  );

  return { accessToken };
});
