-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favoris` (
    `user_id` INTEGER NOT NULL,
    `recette_id` INTEGER NOT NULL,

    INDEX `recette_id`(`recette_id`),
    PRIMARY KEY (`user_id`, `recette_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recette_Restriction` (
    `recette_id` INTEGER NOT NULL,
    `restriction_id` INTEGER NOT NULL,

    INDEX `restriction_id`(`restriction_id`),
    PRIMARY KEY (`recette_id`, `restriction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recettes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NOT NULL,
    `duree` INTEGER NOT NULL,
    `difficulte` ENUM('1', '2', '3') NOT NULL,
    `instructions` TEXT NOT NULL,
    `categorie_id` INTEGER NULL,

    INDEX `categorie_id`(`categorie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestrictionsAlimentaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `date_inscription` DATE NOT NULL,

    UNIQUE INDEX `pseudo`(`pseudo`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favoris` ADD CONSTRAINT `Favoris_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Favoris` ADD CONSTRAINT `Favoris_ibfk_2` FOREIGN KEY (`recette_id`) REFERENCES `Recettes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recette_Restriction` ADD CONSTRAINT `Recette_Restriction_ibfk_1` FOREIGN KEY (`recette_id`) REFERENCES `Recettes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recette_Restriction` ADD CONSTRAINT `Recette_Restriction_ibfk_2` FOREIGN KEY (`restriction_id`) REFERENCES `RestrictionsAlimentaires`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Recettes` ADD CONSTRAINT `Recettes_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
