// prisma\tests\database.spec.ts
import { beforeAll, afterAll, describe, expect, test } from "vitest";
import prisma from "../lib/client"; // Update path as needed

describe("Prisma Integration", () => {
  beforeAll(async () => {
    await prisma.favoris.deleteMany();
    await prisma.recette_Restriction.deleteMany();
    await prisma.recettes.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.restrictionsAlimentaires.deleteMany();
    await prisma.users.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Should create a user", async () => {
    const user = await prisma.users.create({
      data: {
        pseudo: "testuser",
        email: "testuser@example.com",
        date_inscription: new Date(),
      },
    });
    expect(user).toHaveProperty("id");
    expect(user.pseudo).toBe("testuser");
  });

  test("Should create a category and a recette", async () => {
    const category = await prisma.categories.create({
      data: {
        nom: "Desserts",
        slug: "desserts",
      },
    });
    const recette = await prisma.recettes.create({
      data: {
        titre: "Tarte aux pommes",
        duree: 60,
        difficulte: "EASY", // Use enum value
        instructions: "Étaler la pâte, garnir de pommes, cuire.",
        categorie_id: category.id,
      },
    });
    expect(recette.titre).toBe("Tarte aux pommes");
    expect(recette.categorie_id).toBe(category.id);
  });

  test("Should create a restriction and link with recette", async () => {
    const restriction = await prisma.restrictionsAlimentaires.create({
      data: { type: "Sans gluten" },
    });
    const recette = await prisma.recettes.create({
      data: {
        titre: "Soupe",
        duree: 30,
        difficulte: "MEDIUM",
        instructions: "Mixer les légumes.",
      },
    });
    const link = await prisma.recette_Restriction.create({
      data: {
        recette_id: recette.id,
        restriction_id: restriction.id,
      },
    });
    expect(link.recette_id).toBe(recette.id);
    expect(link.restriction_id).toBe(restriction.id);
  });

  test("Should favorite a recette", async () => {
    const user = await prisma.users.create({
      data: {
        pseudo: "fanuser",
        email: "fan@example.com",
        date_inscription: new Date(),
      },
    });
    const recette = await prisma.recettes.create({
      data: {
        titre: "Pizza",
        duree: 45,
        difficulte: "HARD",
        instructions: "Faire la pâte, garnir, cuire.",
      },
    });
    const fav = await prisma.favoris.create({
      data: {
        user_id: user.id,
        recette_id: recette.id,
      },
    });
    expect(fav.user_id).toBe(user.id);
    expect(fav.recette_id).toBe(recette.id);
  });

  test("Should enforce unique email on users", async () => {
    await prisma.users.create({
      data: {
        pseudo: "uniqueuser",
        email: "unique@example.com",
        date_inscription: new Date(),
      },
    });
    await expect(
      prisma.users.create({
        data: {
          pseudo: "uniqueuser2",
          email: "unique@example.com",
          date_inscription: new Date(),
        },
      }),
    ).rejects.toThrow();
  });
});
