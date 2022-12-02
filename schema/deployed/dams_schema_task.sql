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
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `type_id` int(3) NOT NULL,
  `status_id` int(3) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(1255) DEFAULT NULL,
  `lock_type` varchar(45) DEFAULT NULL,
  `lock_time` int(25) DEFAULT NULL,
  `heading` varchar(145) DEFAULT NULL,
  `display_main` int(2) DEFAULT NULL,
  `display_next` int(2) DEFAULT NULL,
  `display_innav` int(2) DEFAULT '1',
  PRIMARY KEY (`task_id`),
  KEY `ta_status_id_idx` (`status_id`),
  KEY `ta_type_id_idx` (`type_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (31,4,1,'intro','','1',50,'undefined',0,0,1),(32,10,1,'question-1','','1',50,'undefined',0,0,1),(33,5,1,'Fact','','3',50,'undefined',1,1,1),(34,11,1,'Interactive 1','','4',50,'undefined',1,1,1),(35,10,1,'question-2','','1',50,'undefined',0,0,1),(36,12,1,'interactive-2','','3',50,'undefined',1,1,1),(37,10,1,'question-3','','1',50,'undefined',0,0,1),(38,12,1,'interactive-3','','3',50,'undefined',1,1,1),(39,10,1,'question-4','','1',50,'undefined',0,0,1),(40,5,1,'Statistical Proof','','3',50,'undefined',1,1,1),(41,2,1,'Video','','5',50,'undefined',1,1,1),(42,10,1,'question-5','','1',50,'undefined',0,0,1),(43,10,1,'question-6','','1',50,'undefined',0,0,1),(44,13,1,'Congratulations','','1',50,'undefined',1,1,1),(45,4,1,'Intro','','1',50,'undefined',0,0,1),(46,10,1,'Question-1','','1',50,'undefined',0,0,1),(47,10,1,'Question-2','','1',50,'undefined',0,0,1),(48,10,1,'Question-3','','1',50,'undefined',0,0,1),(49,13,1,'Congratulations','','1',50,'undefined',1,1,1),(51,14,1,'Perception','','3',50,'undefined',1,1,1),(52,14,1,'Comprehension','','3',50,'undefined',1,1,1),(53,14,1,'Prediction','','3',50,'undefined',1,1,1),(54,4,1,'Intro','','1',50,'undefined',0,0,1),(55,5,1,'Slide Show','','3',50,'undefined',0,1,1),(56,15,1,'Chart','','4',50,'undefined',0,1,1),(57,16,1,'Video Assessment','','1',50,'undefined',0,0,1),(58,6,1,'Guage','','3',50,'undefined',0,1,1),(59,13,1,'Congratulations','','1',50,'undefined',0,0,1),(60,4,1,'Home','','1',50,'undefined',1,1,1),(61,14,1,'Overview','','1',50,'undefined',1,1,1),(62,17,1,'HP 360 - iFrame','','1',50,'undefined',1,1,0),(63,14,1,'HP 360','','1',50,'undefined',1,1,1),(64,14,1,'Prioritization Engine','','1',50,'undefined',1,1,1),(65,2,1,'Prioritization Engine - Video','','1',50,'undefined',1,1,0),(66,14,1,'Driver Training','','1',50,'undefined',1,1,1),(67,17,1,'Driver Training - iFrame','','1',50,'undefined',1,1,0),(68,14,1,'MotorMind','','1',50,'undefined',1,1,1),(69,17,1,'MotorMind - iFrame','','1',50,'undefined',1,1,0),(70,14,1,'Situational Awareness','','1',50,'undefined',1,1,1),(71,2,1,'Situational Awareness - Video','','1',50,'undefined',1,1,0),(72,5,1,'Slide01','','3',50,'undefined',1,1,1),(73,5,1,'Slide02','','3',50,'undefined',1,1,1),(74,5,1,'Slide03','','3',50,'undefined',1,1,1),(75,2,1,'Video','','1',50,'undefined',1,0,1),(76,4,1,'Intro','','1',50,'undefined',0,0,1),(77,5,1,'Fact','','3',50,'undefined',1,1,1),(78,10,1,'Question-2','','1',50,'undefined',0,0,1),(81,12,1,'Interactive 2','','3',50,'undefined',1,1,1),(82,10,1,'Question-3','','1',50,'undefined',0,0,1),(83,10,1,'Question-4','','1',50,'undefined',0,0,1),(84,6,1,'Statistical Proof','','3',50,'undefined',1,1,1),(85,2,1,'Video','','5',50,'undefined',1,1,1),(86,10,1,'Question-5','','1',50,'undefined',0,0,1),(87,10,1,'Question-6','','1',50,'undefined',0,0,1),(88,13,1,'Congratulations','','1',50,'undefined',1,1,1),(89,18,1,'Find out for yourself','','3',50,'undefined',1,1,1),(90,18,1,'What Happened','','3',50,'undefined',1,1,1),(91,18,1,'Visual Biases','','3',50,'undefined',1,1,1),(92,12,1,'Interactive 3 Explanation','','3',50,'undefined',1,1,1),(93,19,1,'Interactive 3a','','4',50,'undefined',1,1,1),(94,19,1,'Interactive 3b','','4',50,'undefined',1,1,1),(95,2,1,'Interactive 1','','5',50,'undefined',0,1,1),(97,2,1,'Interactive 1 Explanation','','5',50,'undefined',1,1,1),(98,10,1,'Question-1','','1',50,'undefined',NULL,NULL,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:30:00
