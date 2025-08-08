// prisma/seed.ts

import prisma from "./lib/client";
import { faker } from "@faker-js/faker";
import deleteSafely from "./helpers/deleteSafely";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import type {
  Categories,
  Users,
  Recettes,
  RestrictionsAlimentaires,
} from "./generated/prisma-client";

// Set number of records to seed for each entity
const USERS_TO_CREATE = 10;
const CATEGORIES_TO_CREATE = 5;
const RECIPES_TO_CREATE = 15;
const RESTRICTIONS_TO_CREATE = 4;

async function seed(skipCleanup = false) {
  if (!skipCleanup) {
    // Cleanup all data (delete order matters due to FKs)
    await deleteSafely(() => prisma.favoris.deleteMany(), "favoris");
    await deleteSafely(
      () => prisma.recette_Restriction.deleteMany(),
      "recette_Restriction",
    );
    await deleteSafely(() => prisma.recettes.deleteMany(), "recettes");
    await deleteSafely(() => prisma.categories.deleteMany(), "categories");
    await deleteSafely(
      () => prisma.restrictionsAlimentaires.deleteMany(),
      "restrictionsAlimentaires",
    );
    await deleteSafely(() => prisma.users.deleteMany(), "users");
  } else {
    console.log("⚠️ Skipping cleanup (SKIP_CLEANUP=true)");
  }

  // Seed Categories
  const categories: Categories[] = await Promise.all(
    Array.from({ length: CATEGORIES_TO_CREATE }).map((_, i) =>
      prisma.categories.create({
        data: {
          nom: faker.commerce.department() + " " + i,
          slug: faker.helpers
            .slugify(faker.commerce.department() + " " + i)
            .toLowerCase(),
        },
      }),
    ),
  );

  // Seed Users
  const users: Users[] = await Promise.all(
    Array.from({ length: USERS_TO_CREATE }).map(async (_, i) => {
      // Generate a random password (for dev seed; don't log in production)
      const randomPassword = randomBytes(16).toString("hex");
      const hashedPassword = await argon2.hash(randomPassword);

      return prisma.users.create({
        data: {
          pseudo: faker.internet.username() + i,
          email: faker.internet.email().toLowerCase(),
          password: hashedPassword,
          date_inscription: faker.date.past({ years: 2 }),
          role: "USER",
        },
      });
    }),
  );

  // Seed RestrictionsAlimentaires
  const restrictionTypes = [
    "Végétarien",
    "Sans gluten",
    "Vegan",
    "Sans lactose",
  ];
  const restrictions: RestrictionsAlimentaires[] = await Promise.all(
    restrictionTypes.slice(0, RESTRICTIONS_TO_CREATE).map((type) =>
      prisma.restrictionsAlimentaires.upsert({
        where: { type },
        update: {},
        create: { type },
      }),
    ),
  );

  // Seed Recettes
  const recettes: Recettes[] = await Promise.all(
    Array.from({ length: RECIPES_TO_CREATE }).map(() => {
      const category = faker.helpers.arrayElement(categories);
      if (!category)
        throw new Error("No categories available for seeding recettes");
      return prisma.recettes.create({
        data: {
          titre: faker.commerce.productName(),
          duree: faker.number.int({ min: 10, max: 180 }),
          difficulte: faker.helpers.arrayElement(["EASY", "MEDIUM", "HARD"]), // Use enum values!
          instructions: faker.lorem.paragraphs({ min: 2, max: 5 }),
          categorie_id: category.id,
        },
      });
    }),
  );

  // Link Recettes <-> Restrictions (Recette_Restriction)
  await Promise.all(
    recettes.map(async (recette) => {
      // Each recette gets 1-2 random restrictions
      const n = faker.number.int({ min: 1, max: 2 });
      const sample = faker.helpers.arrayElements(restrictions, n);
      await Promise.all(
        sample.map((restriction) =>
          prisma.recette_Restriction.create({
            data: {
              recette_id: recette.id,
              restriction_id: restriction.id,
            },
          }),
        ),
      );
    }),
  );

  // Seed Favoris (Users <-> Recettes)
  await Promise.all(
    users.map(async (user) => {
      // Each user favorites 2-3 recipes
      const favs = faker.helpers.arrayElements(
        recettes,
        faker.number.int({ min: 2, max: 3 }),
      );
      await Promise.all(
        favs.map((recette) =>
          prisma.favoris.create({
            data: {
              user_id: user.id,
              recette_id: recette.id,
            },
          }),
        ),
      );
    }),
  );

  console.log(
    `🌟 Created ${users.length} users, ${categories.length} categories, ${recettes.length} recettes, ${restrictions.length} restrictions, favoris and recette_restriction associations.`,
  );
}

export default seed;
