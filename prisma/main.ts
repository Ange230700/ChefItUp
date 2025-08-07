// prisma/main.ts

import seed from "./seed";
import prisma from "./lib/client";

async function main() {
  await seed(false); // Set true to skip cleanup
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
