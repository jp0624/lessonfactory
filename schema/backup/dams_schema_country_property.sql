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
-- Table structure for table `country_property`
--

DROP TABLE IF EXISTS `country_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_property` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL,
  `content_version_property_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=154 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_property`
--

/*!40000 ALTER TABLE `country_property` DISABLE KEYS */;
INSERT INTO `country_property` VALUES (8,231,4),(10,231,6),(12,228,4),(69,8,3),(72,8,6),(78,15,4),(81,15,6),(84,16,3),(87,16,6),(90,19,3),(93,19,6),(96,31,3),(99,31,6),(102,38,3),(105,38,6),(108,40,3),(111,40,6),(114,42,3),(117,42,6),(120,56,3),(123,56,6),(126,57,3),(129,57,6),(132,60,3),(135,60,6),(138,67,3),(141,67,6),(144,70,3),(147,70,6),(150,73,3),(153,73,6),(156,86,3),(159,86,6),(162,246,3),(165,246,6),(168,243,4),(171,243,6),(174,249,4),(177,249,6),(180,252,3),(183,252,6),(186,77,4),(189,77,6),(192,77,5),(195,255,3),(198,255,6),(201,258,3),(204,258,6),(207,261,3),(210,261,6),(213,93,4),(216,93,6),(219,98,3),(222,98,6),(225,99,4),(228,99,6),(231,100,4),(234,100,6),(237,102,4),(240,102,6),(243,107,3),(246,107,6),(249,110,4),(252,110,6),(255,117,3),(258,117,6),(261,131,3),(264,131,6),(267,136,3),(270,136,6),(273,150,4),(276,150,6),(279,159,3),(282,159,6),(285,160,3),(288,160,6),(291,163,4),(294,163,6),(297,169,3),(300,169,6),(303,172,3),(306,172,6),(309,175,3),(312,175,6),(315,181,3),(318,181,6),(321,182,3),(324,182,6),(327,187,4),(330,187,6),(333,201,3),(336,201,6),(339,208,4),(342,208,6),(345,216,3),(348,216,6),(351,218,3),(354,218,6),(360,224,5),(363,237,4),(366,237,6),(371,224,3),(372,66,3),(373,66,5),(374,141,3),(376,141,6);
/*!40000 ALTER TABLE `country_property` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:43