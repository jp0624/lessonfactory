-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 10.102.70.100    Database: dams_schema
-- ------------------------------------------------------
-- Server version	5.7.20-18-57-log

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
-- Table structure for table `lesson_task`
--

DROP TABLE IF EXISTS `lesson_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_task` (
  `lesson_task_id` smallint(7) NOT NULL,
  `lesson_id` smallint(7) NOT NULL,
  `task_id` smallint(7) NOT NULL,
  `_order` int(3) NOT NULL DEFAULT '0',
  `menu_display` int(1) NOT NULL DEFAULT '1',
  `section_marker` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`lesson_task_id`),
  KEY `le_ta_lesson_id` (`lesson_id`),
  CONSTRAINT `le_ta_lesson_id` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_task`
--

/*!40000 ALTER TABLE `lesson_task` DISABLE KEYS */;
INSERT INTO `lesson_task` VALUES (50,37,31,0,1,1),(51,37,32,1,1,1),(52,37,33,2,1,1),(53,37,34,3,1,1),(54,37,35,4,1,1),(55,37,36,5,1,1),(56,37,37,6,1,1),(57,37,38,7,1,1),(58,37,39,8,1,1),(59,37,40,9,1,1),(60,37,41,10,1,1),(61,37,42,11,1,1),(62,37,43,12,1,1),(63,37,44,13,1,1),(64,44,45,1,1,1),(65,44,46,3,1,1),(66,44,47,5,1,1),(67,44,48,7,1,1),(68,44,49,8,1,1),(70,44,51,2,1,1),(71,44,52,4,1,1),(72,44,53,6,1,1),(73,45,54,1,1,1),(75,45,56,3,1,1),(76,45,57,4,1,1),(77,45,58,2,1,1),(78,45,59,5,1,1),(79,46,60,1,1,1),(80,46,61,2,1,1),(81,46,62,4,1,1),(82,46,63,3,1,1),(83,46,64,5,1,1),(84,46,65,6,1,1),(85,46,66,7,1,1),(86,46,67,8,1,1),(87,46,68,9,1,1),(88,46,69,10,1,1),(89,46,70,11,1,1),(90,46,71,12,1,1),(91,47,72,0,1,1),(92,47,73,0,1,1),(93,47,74,0,1,1),(94,47,75,0,1,1),(95,48,76,1,1,1),(96,48,77,3,1,1),(97,48,78,7,1,1),(100,48,81,9,1,1),(101,48,82,10,1,1),(102,48,83,15,1,1),(103,48,84,16,1,1),(104,48,85,17,1,1),(105,48,86,18,1,1),(106,48,87,19,1,1),(107,48,88,20,1,1),(108,48,89,4,1,1),(109,48,90,8,1,1),(110,48,91,11,1,1),(111,48,92,14,1,1),(112,48,93,12,1,1),(113,48,94,13,1,1),(114,48,95,5,1,1),(116,48,97,6,1,1),(117,48,98,2,1,1);
/*!40000 ALTER TABLE `lesson_task` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:54
