<!-- docs\erd.md -->

# Entity Relationship Diagram (ERD) — _Chef It Up_

This document describes the relationships between the core entities in the Chef It Up database schema.

---

## 1. **Categories**

- **Table:** `Categories`
- **Description:** Represents a category of recipes (e.g., “Brunch”, “Desserts”).
- **Fields:**
  - `id`: Primary key
  - `nom`: Name of the category
  - `slug`: Unique slug for URL usage

### Relationships:

- **One-to-Many:**
  - **Categories → Recettes**
    - Each category can have _many_ recipes.
    - Each recipe belongs to _one_ category (may be NULL).

---

## 2. **Recettes (Recipes)**

- **Table:** `Recettes`
- **Description:** Stores recipes.
- **Fields:**
  - `id`: Primary key
  - `titre`: Title
  - `duree`: Duration
  - `difficulte`: Difficulty (1, 2, or 3)
  - `instructions`: Instructions
  - `categorie_id`: Foreign key to `Categories` (nullable)

### Relationships:

- **Many-to-One:**
  - **Recettes → Categories**
    - Each recipe belongs to _one_ category.

- **Many-to-Many:**
  - **Recettes ↔ RestrictionsAlimentaires** (via `Recette_Restriction`)
    - A recipe can have multiple dietary restrictions.
    - Each restriction can apply to many recipes.

- **Many-to-Many:**
  - **Recettes ↔ Users** (via `Favoris`)
    - A recipe can be favorited by many users.
    - A user can favorite many recipes.

---

## 3. **RestrictionsAlimentaires (Dietary Restrictions)**

- **Table:** `RestrictionsAlimentaires`
- **Description:** Types of dietary restrictions (e.g., “Sans gluten”, “Végétarien”).
- **Fields:**
  - `id`: Primary key
  - `type`: Unique name of restriction

### Relationships:

- **Many-to-Many:**
  - **RestrictionsAlimentaires ↔ Recettes** (via `Recette_Restriction`)
    - Each restriction can be associated with multiple recipes.

---

## 4. **Recette_Restriction (Recipe-Restriction Association)**

- **Table:** `Recette_Restriction`
- **Description:** Join table for the many-to-many relationship between recipes and dietary restrictions.
- **Fields:**
  - `recette_id`: Foreign key to `Recettes`
  - `restriction_id`: Foreign key to `RestrictionsAlimentaires`
  - **Primary key:** Combination of `recette_id` and `restriction_id`

### Relationships:

- Links each recipe to its applicable dietary restrictions.

---

## 5. **Users**

- **Table:** `Users`
- **Description:** Registered users of the application.
- **Fields:**
  - `id`: Primary key
  - `pseudo`: Unique username
  - `email`: Unique email
  - `date_inscription`: Date of registration

### Relationships:

- **Many-to-Many:**
  - **Users ↔ Recettes** (via `Favoris`)
    - Users can favorite many recipes.
    - Recipes can be favorited by many users.

---

## 6. **Favoris (Favorites)**

- **Table:** `Favoris`
- **Description:** Join table for recipes favorited by users.
- **Fields:**
  - `user_id`: Foreign key to `Users`
  - `recette_id`: Foreign key to `Recettes`
  - **Primary key:** Combination of `user_id` and `recette_id`

### Relationships:

- Links users and their favorite recipes.

---

## **Relationship Summary Table**

| Entity     | Related Entity           | Relationship                | Cardinality  | Join Table          |
| ---------- | ------------------------ | --------------------------- | ------------ | ------------------- |
| Categories | Recettes                 | 1 Category → N Recipes      | One-to-Many  | —                   |
| Recettes   | RestrictionsAlimentaires | M Recipes ↔ N Restrictions | Many-to-Many | Recette_Restriction |
| Users      | Recettes (Favorites)     | M Users ↔ N Recipes        | Many-to-Many | Favoris             |

---

## **Diagram Key**

- **One-to-Many**: A record in one table relates to multiple in another.
- **Many-to-Many**: Multiple records relate in both directions, usually via a join table.
- **PK**: Primary Key
- **FK**: Foreign Key
