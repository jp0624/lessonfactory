-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 192.168.4.45    Database: dams_schema
-- ------------------------------------------------------
-- Server version	5.7.21-20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson` (
  `lesson_id` smallint(7) NOT NULL AUTO_INCREMENT,
  `status_id` tinyint(3) NOT NULL,
  `vehicle_id` tinyint(3) NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_private` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_id` int(11) DEFAULT '1',
  PRIMARY KEY (`lesson_id`),
  KEY `IDX_lesson_vehicle_id` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES (37,1,1,'Driver Attitude Multi-Tasking','TMM','','','2018-07-25 18:31:11',NULL,1),(44,1,1,'Situational Awareness','SA','','','2018-05-04 14:09:14',NULL,1),(45,1,1,'Inappropriate Speeds for Conditions (express)','ISC','','','2018-07-23 20:13:27',NULL,1),(46,1,1,'ASSE 2018','ASSE-18','','','2018-05-14 14:29:23',NULL,2),(47,1,1,'Situational Awareness','SAT','','','2018-05-28 15:13:47',NULL,1),(48,1,1,'Change Blindness','CHB','','','2018-06-06 18:07:47',NULL,1),(49,1,2,'Large Trucks','LRT','','','2018-06-13 19:43:57',NULL,1),(50,1,1,'Hazard Perception 360','HPE','','','2018-08-30 19:53:24',NULL,1),(51,1,1,'Template','DDT-T','','','2018-07-03 14:57:09',NULL,1),(52,1,1,'Drowsy Driving','DRW','','','2018-08-27 15:20:37',NULL,1),(53,1,1,'Deadly Distractions','DST','','','2018-07-25 18:25:42',NULL,1),(54,1,1,'Escape Routes','ESR','','','2018-07-23 19:15:31',NULL,1),(55,1,1,'Failure To Give Way','FTG','','','2018-07-23 19:16:10',NULL,1),(56,1,1,'Junctions','JCT','','','2018-07-23 19:16:30',NULL,1),(57,1,1,'Lane Changes','LNC','','','2018-07-23 19:17:00',NULL,1),(58,1,1,'Sharing the Road with Large Trucks','LTR','','','2018-07-23 19:17:38',NULL,1),(59,1,1,'Safe motorway Driving','MOT','','','2018-07-23 19:18:00',NULL,1),(60,1,1,'Parking and Reversing','PRK','','','2018-07-23 19:18:39',NULL,1),(61,1,1,'Safely Navigating Rural Roads','RUR','','','2018-07-23 19:19:10',NULL,1),(62,1,1,'Speeding','SPD','','','2018-07-23 19:19:27',NULL,1),(63,1,1,'Adverse Weather','WEA','','','2018-07-23 19:19:51',NULL,1),(64,1,1,'Conflict Points','COP','','','2018-08-20 19:56:54',NULL,1),(65,1,1,'Critical Reactions','CRE','','','2018-10-04 16:35:58',NULL,1);
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-15 13:10:01
