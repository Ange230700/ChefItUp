// prisma/seed.spec.ts

import prisma from "./lib/client";
import seed from "./seed";

describe("DB Seeding", () => {
  it("should seed all main entities and relations", async () => {
    await seed(false);
    const users = await prisma.users.count();
    const recettes = await prisma.recettes.count();
    const favoris = await prisma.favoris.count();
    expect(users).toBeGreaterThan(0);
    expect(recettes).toBeGreaterThan(0);
    expect(favoris).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
