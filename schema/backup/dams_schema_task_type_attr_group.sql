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
-- Table structure for table `task_type_attr_group`
--

DROP TABLE IF EXISTS `task_type_attr_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_type_attr_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `attr_group_id` smallint(7) NOT NULL,
  `task_type_id` int(5) NOT NULL,
  `_order` int(5) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `ta_ty_gr_attr_group_id_idx` (`attr_group_id`),
  KEY `ta_ty_gr_task_type_id_idx` (`task_type_id`),
  CONSTRAINT `ta_ty_gr_attr_group_id` FOREIGN KEY (`attr_group_id`) REFERENCES `task_attr_group` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=364 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_type_attr_group`
--

/*!40000 ALTER TABLE `task_type_attr_group` DISABLE KEYS */;
INSERT INTO `task_type_attr_group` VALUES (1,1,1,2),(2,2,1,1),(3,3,4,0),(4,4,5,0),(5,5,6,0),(6,6,7,0),(7,7,7,0),(8,2,8,1),(9,8,8,0),(10,2,2,0),(11,9,10,0),(12,10,10,1),(13,11,11,0),(14,12,11,1),(15,13,12,0),(16,14,12,1),(17,15,13,0),(18,17,14,1),(19,16,14,2),(20,18,15,2),(21,19,15,3),(22,15,15,1),(23,20,16,1),(24,21,16,2),(25,22,17,1),(26,15,18,1),(27,1,19,1),(28,23,19,2),(29,24,19,3),(30,25,2,2),(32,21,9,2),(33,26,20,1),(34,27,20,0),(35,2,21,1),(36,28,21,2),(37,30,21,0),(38,31,21,3),(39,15,1,4),(40,32,22,0),(41,33,22,1),(42,2,23,0),(43,34,23,1),(44,35,23,2),(45,36,23,3),(46,37,23,4);
/*!40000 ALTER TABLE `task_type_attr_group` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:44
