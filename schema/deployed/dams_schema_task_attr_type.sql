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
-- Table structure for table `task_attr_type`
--

DROP TABLE IF EXISTS `task_attr_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_attr_type` (
  `type_id` tinyint(3) NOT NULL,
  `element` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `versioning` int(5) DEFAULT '1',
  PRIMARY KEY (`type_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_attr_type`
--

/*!40000 ALTER TABLE `task_attr_type` DISABLE KEYS */;
INSERT INTO `task_attr_type` VALUES (1,'input','text',1),(2,'textarea','textarea',1),(3,'video','video',1),(4,'input','number',1),(5,'input','hidden',1),(6,'select','truefalse',0),(7,'textarea','css',1),(8,'textarea','html',1),(9,'input','image',1),(10,'input','file',1),(11,'input','video',1),(12,'input','class',1),(13,'input','code',1),(14,'input','alt',1),(15,'select','locktype',0),(16,'select','charttype',0),(17,'checkbox','checkbox',0);
/*!40000 ALTER TABLE `task_attr_type` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:57
