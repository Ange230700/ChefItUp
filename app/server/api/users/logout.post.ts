// server\api\users\logout.post.ts

import { serialize } from "cookie";

export default defineEventHandler(async (event) => {
  // Clear refresh token cookie
  event.node.res.setHeader(
    "Set-Cookie",
    serialize("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 }),
  );
  return { ok: true };
});
