// server\utils\jwt.ts

import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

export function signAccessToken(
  payload: string | object | Buffer,
  expiresIn = "15m",
) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
}

export function signRefreshToken(
  payload: string | object | Buffer,
  expiresIn = "7d",
) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}
