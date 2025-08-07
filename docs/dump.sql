-- docs\dump.sql

-- Table des catégories
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Table des recettes
CREATE TABLE Recettes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    duree INT NOT NULL,
    difficulte ENUM('1', '2', '3') NOT NULL,
    instructions TEXT NOT NULL,
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES Categories(id) ON DELETE SET NULL
);

-- Table des restrictions alimentaires
CREATE TABLE RestrictionsAlimentaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL UNIQUE
);

-- Table d'association entre recettes et restrictions alimentaires
CREATE TABLE Recette_Restriction (
    recette_id INT,
    restriction_id INT,
    PRIMARY KEY (recette_id, restriction_id),
    FOREIGN KEY (recette_id) REFERENCES Recettes(id) ON DELETE CASCADE,
    FOREIGN KEY (restriction_id) REFERENCES RestrictionsAlimentaires(id) ON DELETE CASCADE
);

-- Table des utilisateurs
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_inscription DATE NOT NULL
);

-- Table des favoris
CREATE TABLE Favoris (
    user_id INT,
    recette_id INT,
    PRIMARY KEY (user_id, recette_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (recette_id) REFERENCES Recettes(id) ON DELETE CASCADE
);

-- Insertion des catégories
INSERT INTO Categories (nom, slug) VALUES
('Petits déjeuners', 'petits-dejeuners'),
('Brunch', 'brunch'),
('Entrées', 'entrées'),
('Plats principaux', 'plats-principaux'),
('Desserts & Goûters', 'desserts-gouters'),
('Apéro', 'apero');

-- Insertion des restrictions alimentaires
INSERT INTO RestrictionsAlimentaires (type) VALUES
('Sans gluten'),
('Sans lactose'),
('Végétarien'),
('Végétalien'),
('Sans noix'),
('Sans arachides'),
('Sans sucres');

-- Insertion des utilisateurs
INSERT INTO Users (pseudo, email, date_inscription) VALUES
('AliceGourmande', 'alice@example.com', '2024-01-01'),
('ChefLeo', 'leo@example.com', '2024-01-02'),
('MamanCuisine', 'maman@example.com', '2024-01-03'),
('PapaChef', 'papa@example.com', '2024-01-04'),
('VeggieLover', 'veggie@example.com', '2024-01-05'),
('FoodieMax', 'max@example.com', '2024-01-06'),
('EpicurePaul', 'paul@example.com', '2024-01-07'),
('GastronomeZoe', 'zoe@example.com', '2024-01-08'),
('HealthyAnna', 'anna@example.com', '2024-01-09'),
('PetitChefTom', 'tom@example.com', '2024-01-10'),
('CuisineMarie', 'marie@example.com', '2024-01-11'),
('SaveursDavid', 'david@example.com', '2024-01-12'),
('RecetteNico', 'nico@example.com', '2024-01-13'),
('DeliceEmma', 'emma@example.com', '2024-01-14'),
('GourmetSophie', 'sophie@example.com', '2024-01-15'),
('PlatRaphael', 'raphael@example.com', '2024-01-16'),
('CuisinierLucas', 'lucas@example.com', '2024-01-17'),
('FourneauClara', 'clara@example.com', '2024-01-18'),
('BakerHugo', 'hugo@example.com', '2024-01-19'),
('ChefManon', 'manon@example.com', '2024-01-20');

-- Insertion de recettes 
INSERT INTO Recettes (titre, duree, difficulte, instructions, categorie_id) VALUES
('Omelette aux champignons', 15, '2', 'Battez les œufs, ajoutez les champignons, puis cuisez à feu moyen.', 1),
('Pancakes maison', 20, '1', 'Mélangez la pâte, laissez reposer, puis faites cuire à la poêle.', 1),
('Tartines avocat saumon', 10, '1', 'Disposez avocat et saumon sur des tartines grillées.', 2),
('Granola maison', 30, '2', 'Mélangez avoine, miel et noix, faites dorer au four.', 1),
('Salade César', 15, '1', 'Mélangez laitue, poulet grillé, parmesan et sauce.', 3),
('Lasagnes végétariennes', 60, '3', 'Alternez pâtes, légumes et béchamel.', 4),
('Poisson en papillote', 35, '2', 'Disposez le poisson et légumes dans du papier sulfurisé et enfournez.', 4),
('Bowl healthy au quinoa', 20, '1', 'Mélangez quinoa, légumes, avocat et sauce citronnée.', 4),
('Cookies aux pépites de chocolat', 25, '1', 'Mélangez les ingrédients, façonnez et enfournez.', 5),
('Tarte aux pommes', 40, '2', 'Disposez les pommes sur la pâte et faites cuire au four.', 5),
('Guacamole maison', 15, '1', 'Écrasez les avocats, ajoutez citron, oignons et épices.', 6),
('Houmous traditionnel', 20, '1', 'Mixez pois chiches, tahini, citron et ail.', 6),
('Pizza maison', 45, '3', 'Préparez la pâte, garnissez et enfournez.', 4),
('Crêpes maison', 25, '1', 'Préparez la pâte, laissez reposer puis cuisez dans une poêle chaude.', 1),
('Smoothie bowl aux fruits rouges', 10, '1', 'Mixez fruits congelés et yaourt, garnissez de fruits frais et granola.', 1),
('Porridge aux fruits secs', 15, '1', 'Cuisez les flocons d''avoine avec du lait, ajoutez fruits secs et miel.', 1),
('Gaufres liégeoises', 30, '2', 'Préparez la pâte avec du sucre perlé, cuisez dans un gaufrier chaud.', 1),
('Quiche aux légumes', 45, '2', 'Garnissez la pâte de légumes et d''appareil, enfournez 30 minutes.', 4),
('Salade de quinoa aux légumes grillés', 25, '2', 'Cuisez le quinoa, ajoutez légumes grillés et vinaigrette.', 3),
('Bagel saumon cream cheese', 10, '1', 'Garnissez le bagel de cream cheese, saumon fumé et aneth.', 2),
('Buddha bowl au tofu', 30, '2', 'Disposez riz, tofu mariné et légumes dans un bol, ajoutez sauce.', 4),
('Risotto aux champignons', 40, '3', 'Cuisez le riz en ajoutant progressivement du bouillon, incorporez champignons.', 4),
('Poulet rôti aux herbes', 60, '2', 'Assaisonnez le poulet d''herbes, enfournez avec pommes de terre.', 4),
('Bœuf bourguignon', 120, '3', 'Faites mijoter la viande avec vin rouge, légumes et aromates.', 4),
('Gratin dauphinois', 50, '2', 'Alternez pommes de terre et crème, enfournez jusqu''à coloration.', 4),
('Curry de légumes', 35, '2', 'Faites revenir légumes avec épices et lait de coco.', 4),
('Soupe detox aux légumes verts', 30, '1', 'Cuisez les légumes verts, mixez avec bouillon et épices.', 3),
('Salade de lentilles aux légumes croquants', 20, '1', 'Mélangez lentilles cuites et légumes frais, assaisonnez.', 3),
('Papillote de cabillaud aux légumes', 25, '2', 'Enfermez poisson et légumes dans papier sulfurisé, cuisez au four.', 4),
('Muffins aux myrtilles', 30, '2', 'Incorporez myrtilles à la pâte, enfournez dans moules.', 5),
('Cake aux fruits', 50, '2', 'Mélangez pâte et fruits, cuisez dans moule à cake.', 5),
('Crumble aux pommes', 35, '1', 'Disposez pommes et pâte à crumble dans plat, enfournez.', 5),
('Madeleines au citron', 25, '2', 'Préparez la pâte au citron, cuisez dans moules à madeleine.', 5),
('Verrines avocat crevettes', 15, '1', 'Alternez purée d''avocat et crevettes dans verrines.', 6),
('Feuilletés au fromage', 25, '2', 'Enroulez fromage dans pâte feuilletée, dorez et enfournez.', 6),
('Brochettes de poulet marinées', 20, '2', 'Marinez poulet, enfilez sur brochettes et grillez.', 4),
('Dips de légumes et tzatziki', 15, '1', 'Préparez tzatziki, servez avec légumes crus.', 6),
('Pâtes carbonara', 20, '2', 'Cuisez pâtes, mélangez avec lardons, œufs et parmesan.', 4),
('Tarte flambée alsacienne', 25, '2', 'Garnissez pâte fine de crème, oignons et lardons, enfournez.', 4),
('Salades de pdt', 25, '2', 'Faire des trucs pis assaisonner ...', 3),
('Pain perdu à la cannelle', 15, '1', 'Trempez pain dans mélange lait-œufs, cuisez à la poêle, saupoudrez de cannelle.', 1),
('Foie de volaille', 15, '1', 'Achetez un foie de volaille et faites le cuire dans du beurre. A manger avec des tartines de pain au levain.', 4),
('Tripes à la mode de Caen', 15, '1', 'Achetez des tripes et faites le cuire dans du beurre, du calva et du cidre. A manger avec beaucoup de pain', 1),
("Tartare d'algues Wakame sur pain grillé", 15, '1', "Ouvrez un paquet contenant des algues du pêcheur et imbibez avec de l'huile de sésame.", 1);

-- Insertion des favoris 
INSERT INTO Favoris (user_id, recette_id) VALUES
(1, 1), (1, 8), (1, 11), (1, 12), (1, 19), (1, 21), (1, 26), (1, 27), (1, 28),
(2, 13), (2, 22), (2, 24), (2, 30), (2, 31), (2, 32), (2, 33), (2, 38),
(3, 1), (3, 2), (3, 6), (3, 14), (3, 18), (3, 23), (3, 24), (3, 25), (3, 40),
(4, 23), (4, 24), (4, 36), (4, 38), (4, 39), (4, 4), (4, 10),
(5, 6), (5, 8), (5, 11), (5, 12), (5, 19), (5, 21), (5, 26), (5, 27), (5, 28), (5, 22), (5, 37),
(6, 5), (6, 13), (6, 22), (6, 23), (6, 24), (6, 38), (6, 9), (6, 10),
(7, 3), (7, 5), (7, 7), (7, 20), (7, 23), (7, 24), (7, 29), (7, 34), (7, 36), (7, 38),
(8, 3), (8, 8), (8, 15), (8, 21), (8, 26), (8, 34), (8, 17), (8, 35),
(9, 1), (9, 4), (9, 8), (9, 15), (9, 16), (9, 19), (9, 21), (9, 27), (9, 28), (9, 37),
(10, 2), (10, 9), (10, 10), (10, 14), (10, 17), (10, 30), (10, 31), (10, 32), (10, 33), (10, 40),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 14), (11, 15), (11, 16), (11, 17), (11, 20), (11, 40),
(12, 6), (12, 7), (12, 13), (12, 18), (12, 22), (12, 23), (12, 24), (12, 25), (12, 38), (12, 39),
(13, 1), (13, 7), (13, 8), (13, 11), (13, 12), (13, 19), (13, 21), (13, 27), (13, 28), (13, 29),
(14, 3), (14, 5), (14, 11), (14, 12), (14, 19), (14, 34), (14, 35), (14, 37),
(15, 1), (15, 3), (15, 7), (15, 18), (15, 19), (15, 22), (15, 23), (15, 24), (15, 25), (15, 27), (15, 28), (15, 37),
(16, 5), (16, 6), (16, 13), (16, 22), (16, 23), (16, 24), (16, 36), (16, 38),
(17, 1), (17, 3), (17, 5), (17, 8), (17, 11), (17, 15), (17, 20), (17, 38),
(18, 1), (18, 2), (18, 3), (18, 5), (18, 6), (18, 7), (18, 8), (18, 10), (18, 25), (18, 32),
(19, 2), (19, 9), (19, 10), (19, 14), (19, 17), (19, 30), (19, 31), (19, 32), (19, 33), (19, 40),
(20, 1), (20, 6), (20, 8), (20, 11), (20, 12), (20, 18), (20, 19), (20, 21), (20, 22), (20, 26), (20, 27), (20, 28);


-- Restrictions
INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(1, 1), 
(1, 3), 
(1, 5), 
(1, 6), 
(1, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(2, 5), 
(2, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(3, 2), 
(3, 5), 
(3, 6), 
(3, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(4, 2), 
(4, 3);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(5, 1), 
(5, 5), 
(5, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(6, 3), 
(6, 5), 
(6, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(7, 1), 
(7, 2), 
(7, 5), 
(7, 6), 
(7, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(8, 1), 
(8, 2), 
(8, 3), 
(8, 4), 
(8, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(9, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(10, 3), 
(10, 5), 
(10, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(11, 1), 
(11, 2), 
(11, 3), 
(11, 4), 
(11, 5), 
(11, 6), 
(11, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(12, 1), 
(12, 2), 
(12, 3), 
(12, 4), 
(12, 5), 
(12, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(13, 5), 
(13, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(14, 5), 
(14, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(15, 1), 
(15, 3), 
(15, 5), 
(15, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(16, 1), 
(16, 3), 
(16, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(17, 3), 
(17, 5), 
(17, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(18, 3), 
(18, 5), 
(18, 6), 
(18, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(19, 1), 
(19, 2), 
(19, 3), 
(19, 4), 
(19, 5), 
(19, 6), 
(19, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(20, 5), 
(20, 6), 
(20, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(21, 1), 
(21, 2), 
(21, 3), 
(21, 4), 
(21, 5), 
(21, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(22, 3), 
(22, 5), 
(22, 6), 
(22, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(23, 1), 
(23, 2), 
(23, 5), 
(23, 6), 
(23, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(24, 5), 
(24, 6), 
(24, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(25, 1), 
(25, 3), 
(25, 5), 
(25, 6), 
(25, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(26, 1), 
(26, 2), 
(26, 3), 
(26, 4), 
(26, 5), 
(26, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(27, 1), 
(27, 2), 
(27, 3), 
(27, 4), 
(27, 5), 
(27, 6), 
(27, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(28, 1), 
(28, 2), 
(28, 3), 
(28, 4), 
(28, 5), 
(28, 6), 
(28, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(29, 1), 
(29, 2), 
(29, 5), 
(29, 6), 
(29, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(30, 3), 
(30, 5), 
(30, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(31, 3), 
(31, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(32, 3), 
(32, 5), 
(32, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(33, 3), 
(33, 5), 
(33, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(34, 1), 
(34, 2), 
(34, 5), 
(34, 6), 
(34, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(35, 3), 
(35, 5), 
(35, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(36, 1), 
(36, 2), 
(36, 5), 
(36, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(37, 1), 
(37, 3), 
(37, 5), 
(37, 6), 
(37, 7);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(38, 5), 
(38, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(39, 5), 
(39, 6);

INSERT INTO Recette_Restriction (recette_id, restriction_id) VALUES
(40, 3), 
(40, 5), 
(40, 6);
