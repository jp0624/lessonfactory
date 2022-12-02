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
-- Table structure for table `task_dictionary`
--

DROP TABLE IF EXISTS `task_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_dictionary` (
  `task_dictionary_id` int(11) NOT NULL,
  `content_id` varchar(10) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `dictionary_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_dictionary_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_dictionary`
--

/*!40000 ALTER TABLE `task_dictionary` DISABLE KEYS */;
INSERT INTO `task_dictionary` VALUES (1,'24-9',24,9),(2,'24-15',24,15),(3,'28-13',28,13),(4,'28-4',28,4),(11,'31-16',31,16),(12,'38-9',38,9),(13,'38-10',38,10),(14,'38-11',38,11),(15,'38-12',38,12),(16,'38-13',38,13),(17,'34-5',34,5),(18,'34-6',34,6),(19,'34-8',34,8),(20,'34-7',34,7),(21,'45-16',45,16),(22,'54-16',54,16),(23,'60-16',60,16),(24,'76-16',76,16),(25,'84-26',84,26),(26,'84-27',84,27);
/*!40000 ALTER TABLE `task_dictionary` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:18
