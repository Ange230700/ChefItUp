// app\server\middlewares\auth.ts

import type { H3Event } from "h3";
import { parse } from "cookie";
import { verifyAccessToken } from "../utils/jwt";

interface JwtPayload {
  id: number;
  pseudo: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Attach `event.context.user` if access token is valid, otherwise throw.
export default defineEventHandler(async (event: H3Event) => {
  const cookie = event.node.req.headers.cookie;
  if (!cookie)
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });

  const { access_token } = parse(cookie);
  if (!access_token)
    throw createError({ statusCode: 401, statusMessage: "No access token" });

  try {
    const payload = verifyAccessToken(access_token) as JwtPayload;
    event.context.user = {
      id: payload.id,
      pseudo: payload.pseudo,
      email: payload.email,
    };
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
});
