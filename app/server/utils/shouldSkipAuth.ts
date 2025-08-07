// server/utils/shouldSkipAuth.ts

import type { H3Event } from "h3";

export function shouldSkipAuth(event: H3Event): boolean {
  // Nuxt prerendering env var
  if (process.env.NUXT_PRERENDERING === "true") return true;
  // User-Agent header may be set to 'Prerender'
  const ua = event.node.req.headers["user-agent"];
  if (ua && typeof ua === "string" && ua.includes("Prerender")) return true;
  return false;
}
