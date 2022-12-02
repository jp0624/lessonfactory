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
-- Table structure for table `task_dictionary`
--

DROP TABLE IF EXISTS `task_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_dictionary` (
  `task_dictionary_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `dictionary_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_dictionary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=252 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_dictionary`
--

/*!40000 ALTER TABLE `task_dictionary` DISABLE KEYS */;
INSERT INTO `task_dictionary` VALUES (1,'24-9',24,9),(2,'24-15',24,15),(3,'28-13',28,13),(4,'28-4',28,4),(11,'31-16',31,16),(12,'38-9',38,9),(13,'38-10',38,10),(14,'38-11',38,11),(15,'38-12',38,12),(16,'38-13',38,13),(17,'34-5',34,5),(18,'34-6',34,6),(19,'34-8',34,8),(20,'34-7',34,7),(21,'45-16',45,16),(22,'54-16',54,16),(23,'60-16',60,16),(24,'76-16',76,16),(25,'84-26',84,26),(26,'84-27',84,27),(27,'100-16',100,16),(28,'101-16',101,16),(29,'119-16',119,16),(32,'147-16',147,16),(33,'133-16',133,16),(34,'133-16',133,16),(35,'133-16',133,16),(37,'133-16',133,16),(39,'175-16',175,16),(40,'189-16',189,16),(41,'203-16',203,16),(42,'217-16',217,16),(43,'217-16',217,16),(44,'217-16',217,16),(45,'231-16',231,16),(46,'231-16',231,16),(47,'245-16',245,16),(48,'231-16',231,16),(49,'245-16',245,16),(50,'231-16',231,16),(51,'259-16',259,16),(52,'245-16',245,16),(53,'231-16',231,16),(54,'259-16',259,16),(55,'245-16',245,16),(56,'273-16',273,16),(57,'231-16',231,16),(58,'259-16',259,16),(59,'245-16',245,16),(60,'273-16',273,16),(61,'231-16',231,16),(62,'259-16',259,16),(63,'245-16',245,16),(64,'273-16',273,16),(65,'231-16',231,16),(66,'259-16',259,16),(68,'161-16',161,16),(70,'287-16',287,16),(71,'358-26',358,26),(72,'358-27',358,27),(75,'352-7',352,7),(76,'352-8',352,8),(77,'352-26',352,26),(78,'352-30',352,30),(79,'348-16',348,16);
/*!40000 ALTER TABLE `task_dictionary` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:44
