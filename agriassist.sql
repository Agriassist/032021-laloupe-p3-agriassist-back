-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: agriassist
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carnet_entretien`
--

DROP TABLE IF EXISTS `carnet_entretien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carnet_entretien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oil` varchar(100) NOT NULL,
  `use_times` int DEFAULT NULL,
  `materiel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materiel_id` (`materiel_id`),
  CONSTRAINT `carnet_entretien_ibfk_1` FOREIGN KEY (`materiel_id`) REFERENCES `materiel` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carnet_entretien`
--

LOCK TABLES `carnet_entretien` WRITE;
/*!40000 ALTER TABLE `carnet_entretien` DISABLE KEYS */;
/*!40000 ALTER TABLE `carnet_entretien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concessionaire`
--

DROP TABLE IF EXISTS `concessionaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concessionaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `identifiant` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `brands_followed` varchar(100) NOT NULL,
  `picture_logo` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concessionaire`
--

LOCK TABLES `concessionaire` WRITE;
/*!40000 ALTER TABLE `concessionaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `concessionaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche_technique`
--

DROP TABLE IF EXISTS `fiche_technique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche_technique` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `modele_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modele_id` (`modele_id`),
  CONSTRAINT `fiche_technique_ibfk_1` FOREIGN KEY (`modele_id`) REFERENCES `modele` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche_technique`
--

LOCK TABLES `fiche_technique` WRITE;
/*!40000 ALTER TABLE `fiche_technique` DISABLE KEYS */;
/*!40000 ALTER TABLE `fiche_technique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marque`
--

DROP TABLE IF EXISTS `marque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marque` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marque`
--

LOCK TABLES `marque` WRITE;
/*!40000 ALTER TABLE `marque` DISABLE KEYS */;
INSERT INTO `marque` VALUES (4,'Massey Ferguson'),(5,'New Holland'),(6,'Case IH');
/*!40000 ALTER TABLE `marque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiel`
--

DROP TABLE IF EXISTS `materiel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `serial_number` varchar(100) NOT NULL,
  `modele_id` int DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `prev_oil_change` varchar(255) DEFAULT NULL,
  `next_oil_change` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modele_id` (`modele_id`),
  CONSTRAINT `materiel_ibfk_1` FOREIGN KEY (`modele_id`) REFERENCES `modele` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiel`
--

LOCK TABLES `materiel` WRITE;
/*!40000 ALTER TABLE `materiel` DISABLE KEYS */;
INSERT INTO `materiel` VALUES (27,2009,'0123456789',20,'PUMA 210','0h','600h'),(28,2012,'012345678',23,'T7.200','0h','600h'),(29,2018,'01234567',24,'7718S','0h','500h'),(30,2015,'0123456000',24,'7718S','0h','500h');
/*!40000 ALTER TABLE `materiel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modele`
--

DROP TABLE IF EXISTS `modele`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modele` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `picture` varchar(100) NOT NULL,
  `marque_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `marque_id` (`marque_id`),
  CONSTRAINT `modele_ibfk_1` FOREIGN KEY (`marque_id`) REFERENCES `marque` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modele`
--

LOCK TABLES `modele` WRITE;
/*!40000 ALTER TABLE `modele` DISABLE KEYS */;
INSERT INTO `modele` VALUES (20,'PUMA 210','PUMA_210.jpg',6),(23,'T7.200','T7.200.jpg',5),(24,'7718S','7718S.jpg',4);
/*!40000 ALTER TABLE `modele` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park`
--

DROP TABLE IF EXISTS `park`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `park` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int DEFAULT NULL,
  `materiel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `materiel_id` (`materiel_id`),
  CONSTRAINT `park_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `park_ibfk_2` FOREIGN KEY (`materiel_id`) REFERENCES `materiel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park`
--

LOCK TABLES `park` WRITE;
/*!40000 ALTER TABLE `park` DISABLE KEYS */;
INSERT INTO `park` VALUES (58,1,27),(59,3,27),(60,1,28),(61,3,28),(62,1,29),(63,3,29),(64,1,30),(65,3,30);
/*!40000 ALTER TABLE `park` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `statue` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `identifiant` varchar(100) DEFAULT NULL,
  `hassPassword` varchar(150) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `photo_profil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `identifiant` (`identifiant`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'agriculteur','Lepetit','Georges','g.lepetit@orange.fr','GeorgesDeLaBrousse','$argon2i$v=19$m=4096,t=3,p=1$HqyTE1yGi2QDF+QEgfo7bw$qEzLM4Iq85yL2OJmoYsOWk2YTxrMKGxKWGkZjgikHtE','0237450178','1626874309427-no_profile_s.png'),(3,'concessionnaire','Lepetit','Michel','g.legrnad@orange.fr','GeorgeBrousse','$argon2i$v=19$m=4096,t=3,p=1$12WIb55vCDJquUuuwq3s/A$ptze47rFeJOGw3o2PnLZsrtWItUsCFT14UXkNSnyuEc','0237450278','left.jpg'),(5,'administrateur','Masson','Benoit','b-masson28@gmail.fr','benoit','$argon2i$v=19$m=4096,t=3,p=1$7qVrIxtTeIeJ10iqjeQY4Q$Q1gicw9kcGkuO+0hYZaLy8ZSfmZWYhk3Akmy2dH8JKk','0237008290','1627293006173-88814776_p0_square1200.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-29 15:21:07
