// app\server\middlewares\auth.global.ts
import type { H3Event } from "h3";
import { defineEventHandler, getCookie, getRequestHeader } from "h3";
import { verifyAccessToken } from "../utils/jwt"; // your JWT util!
import prisma from "../prisma";

// --- 1. Mock user for prerender ---
const MOCK_PRERENDER_USER = {
  id: 0,
  pseudo: "prerender-bot",
  email: "prerender@example.com",
  role: "USER", // Match your UserRole enum!
  date_inscription: new Date().toISOString(),
};

export default defineEventHandler(async (event: H3Event) => {
  // --- 2. Prerender detection ---
  const isPrerender =
    process.env.NUXT_PRERENDERING === "true" ||
    (getRequestHeader(event, "user-agent") || "").includes("Prerender");

  if (isPrerender) {
    event.context.skipAuth = true;
    event.context.user = MOCK_PRERENDER_USER;
    return;
  }

  // --- 3. Actual authentication logic for prod/dev ---
  try {
    // 1. Try cookie (recommended, httpOnly cookie set on login)
    let token = getCookie(event, "access_token");

    // 2. Or fallback to Bearer header
    if (!token) {
      const authHeader = getRequestHeader(event, "authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice("Bearer ".length);
      }
    }

    if (!token) {
      // Don't set user context: will cause 401 if required by handler
      return;
    }

    // 3. Verify token (throws if invalid)
    const payload = verifyAccessToken(token) as { userId: number };

    // 4. Load user from DB (optional: attach only needed fields)
    const user = await prisma.users.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        pseudo: true,
        email: true,
        role: true, // your UserRole enum/field!
        date_inscription: true,
      },
    });

    if (user) {
      event.context.user = user;
    }
    // else: invalid user, don't set context.user (401 later)
  } catch (err: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[auth.global.ts] Auth middleware error:", err);
    }
  }
});
