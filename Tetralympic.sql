CREATE DATABASE  IF NOT EXISTS `tetralympic` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tetralympic`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: tetralympic
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `competition`
--

DROP TABLE IF EXISTS `competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `event_date` datetime NOT NULL,
  `rank_upper_limit` varchar(45) DEFAULT NULL,
  `rank_lower_limit` varchar(45) DEFAULT NULL,
  `rd_limit` int DEFAULT NULL,
  `country_limit` varchar(45) DEFAULT NULL,
  `fk_status_id` int NOT NULL,
  `registration_deadline` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Status_idx` (`fk_status_id`),
  CONSTRAINT `Status` FOREIGN KEY (`fk_status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `discord_user`
--

DROP TABLE IF EXISTS `discord_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discord_user` (
  `id` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `discriminator` varchar(45) NOT NULL,
  `fk_tetrio_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Tetrio_ID_idx` (`fk_tetrio_id`),
  CONSTRAINT `Tetrio_User_ID` FOREIGN KEY (`fk_tetrio_id`) REFERENCES `tetrio_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `snapshots_leaderboard`
--

DROP TABLE IF EXISTS `snapshots_leaderboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `snapshots_leaderboard` (
  `snapshot_id` int NOT NULL AUTO_INCREMENT,
  `id` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `gamesplayed` int DEFAULT NULL,
  `rating` decimal(11,6) DEFAULT NULL,
  `glicko` decimal(10,6) DEFAULT NULL,
  `rd` decimal(9,6) DEFAULT NULL,
  `rank` varchar(45) DEFAULT NULL,
  `apm` decimal(5,2) DEFAULT NULL,
  `pps` decimal(5,2) DEFAULT NULL,
  `vs` decimal(5,2) DEFAULT NULL,
  `cached_at` datetime DEFAULT NULL,
  PRIMARY KEY (`snapshot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=143618 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `status_UNIQUE` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tetrio_user`
--

DROP TABLE IF EXISTS `tetrio_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tetrio_user` (
  `id` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `joindate` datetime DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `gamesplayed` int NOT NULL,
  `rating` decimal(11,6) NOT NULL,
  `glicko` decimal(10,6) DEFAULT NULL,
  `rd` decimal(9,6) DEFAULT NULL,
  `rank` varchar(45) NOT NULL,
  `apm` decimal(5,2) DEFAULT NULL,
  `pps` decimal(5,2) DEFAULT NULL,
  `vs` decimal(5,2) DEFAULT NULL,
  `highest_rank` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tetrio_users_competitions`
--

DROP TABLE IF EXISTS `tetrio_users_competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tetrio_users_competitions` (
  `fk_tetrio_id` varchar(100) NOT NULL,
  `fk_competition_id` int NOT NULL,
  PRIMARY KEY (`fk_tetrio_id`,`fk_competition_id`),
  KEY `FK_Competition_ID_idx` (`fk_competition_id`),
  CONSTRAINT `FK_Competition_ID` FOREIGN KEY (`fk_competition_id`) REFERENCES `competition` (`id`),
  CONSTRAINT `FK_Tetrio_ID` FOREIGN KEY (`fk_tetrio_id`) REFERENCES `tetrio_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-06 19:09:35
