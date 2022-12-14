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
-- Table structure for table `lesson_task`
--

DROP TABLE IF EXISTS `lesson_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_task` (
  `lesson_task_id` smallint(7) NOT NULL AUTO_INCREMENT,
  `lesson_id` smallint(7) NOT NULL,
  `task_id` smallint(7) NOT NULL,
  `_order` int(3) NOT NULL DEFAULT '0',
  `menu_display` int(1) NOT NULL DEFAULT '1',
  `section_marker` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`lesson_task_id`),
  KEY `le_ta_lesson_id_idx` (`lesson_id`),
  CONSTRAINT `le_ta_lesson_id` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=398 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=50 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_task`
--

/*!40000 ALTER TABLE `lesson_task` DISABLE KEYS */;
INSERT INTO `lesson_task` VALUES (50,37,31,0,1,1),(51,37,32,1,1,1),(52,37,33,2,1,1),(53,37,34,3,1,1),(54,37,35,4,1,1),(55,37,36,5,1,1),(56,37,37,6,1,1),(57,37,38,7,1,1),(58,37,39,8,1,1),(59,37,40,9,1,1),(60,37,41,10,1,1),(61,37,42,11,1,1),(62,37,43,12,1,1),(63,37,44,13,1,1),(64,44,45,1,1,1),(65,44,46,3,1,1),(66,44,47,5,1,1),(67,44,48,7,1,1),(68,44,49,8,1,1),(70,44,51,2,1,1),(71,44,52,4,1,1),(72,44,53,6,1,1),(73,45,54,1,1,1),(75,45,56,3,1,1),(76,45,57,4,1,1),(77,45,58,2,1,1),(78,45,59,5,1,1),(79,46,60,1,1,1),(80,46,61,2,1,1),(81,46,62,4,1,1),(82,46,63,3,1,1),(83,46,64,5,1,1),(84,46,65,6,1,1),(85,46,66,7,1,1),(86,46,67,8,1,1),(87,46,68,9,1,1),(88,46,69,10,1,1),(89,46,70,11,1,1),(90,46,71,12,1,1),(91,47,72,0,1,1),(92,47,73,0,1,1),(93,47,74,0,1,1),(94,47,75,0,1,1),(95,48,76,1,1,1),(96,48,77,3,1,1),(97,48,78,7,1,1),(100,48,81,9,1,1),(101,48,82,10,1,1),(102,48,83,15,1,1),(103,48,84,16,1,1),(104,48,85,17,1,1),(105,48,86,18,1,1),(106,48,87,19,1,1),(107,48,88,20,1,1),(108,48,89,4,1,1),(109,48,90,8,1,1),(110,48,91,11,1,1),(111,48,92,14,1,1),(112,48,93,12,1,1),(113,48,94,13,1,1),(114,48,95,5,1,1),(116,48,97,6,1,1),(117,48,98,2,1,1),(118,49,99,0,1,1),(119,50,100,0,1,1),(120,51,101,0,1,1),(121,51,102,1,1,1),(124,51,104,3,1,1),(127,51,106,2,1,1),(128,50,107,1,1,1),(130,51,109,4,1,1),(131,51,110,5,1,1),(132,51,111,6,1,1),(133,51,112,7,1,1),(134,51,113,8,1,1),(135,51,114,9,1,1),(136,51,115,10,1,1),(137,51,116,11,1,1),(138,51,117,12,1,1),(139,51,118,13,1,1),(140,52,119,0,1,1),(141,52,120,1,1,1),(142,52,121,2,1,1),(143,52,122,3,1,1),(144,52,123,4,1,1),(145,52,124,5,1,1),(146,52,125,6,1,1),(147,52,126,7,1,1),(148,52,127,8,1,1),(149,52,128,9,1,1),(150,52,129,10,1,1),(151,52,130,11,1,1),(152,52,131,12,1,1),(153,52,132,13,1,1),(154,53,133,0,1,1),(155,53,134,1,1,1),(156,53,135,2,1,1),(157,53,136,3,1,1),(158,53,137,4,1,1),(159,53,138,5,1,1),(160,53,139,6,1,1),(161,53,140,7,1,1),(162,53,141,8,1,1),(163,53,142,9,1,1),(164,53,143,10,1,1),(165,53,144,11,1,1),(166,53,145,12,1,1),(167,53,146,13,1,1),(168,54,147,0,1,1),(169,54,148,1,1,1),(170,54,149,2,1,1),(171,54,150,3,1,1),(172,54,151,4,1,1),(173,54,152,5,1,1),(174,54,153,6,1,1),(175,54,154,7,1,1),(176,54,155,8,1,1),(177,54,156,9,1,1),(178,54,157,10,1,1),(179,54,158,11,1,1),(180,54,159,12,1,1),(181,54,160,13,1,1),(182,55,161,0,1,1),(183,55,162,1,1,1),(184,55,163,2,1,1),(185,55,164,3,1,1),(186,55,165,4,1,1),(187,55,166,5,1,1),(188,55,167,6,1,1),(189,55,168,7,1,1),(190,55,169,8,1,1),(191,55,170,9,1,1),(192,55,171,10,1,1),(193,55,172,11,1,1),(194,55,173,12,1,1),(195,55,174,13,1,1),(196,56,175,0,1,1),(197,56,176,1,1,1),(198,56,177,2,1,1),(199,56,178,3,1,1),(200,56,179,4,1,1),(201,56,180,5,1,1),(202,56,181,6,1,1),(203,56,182,7,1,1),(204,56,183,8,1,1),(205,56,184,9,1,1),(206,56,185,10,1,1),(207,56,186,11,1,1),(208,56,187,12,1,1),(209,56,188,13,1,1),(210,57,189,0,1,1),(211,57,190,1,1,1),(212,57,191,2,1,1),(213,57,192,3,1,1),(214,57,193,4,1,1),(215,57,194,5,1,1),(216,57,195,6,1,1),(217,57,196,7,1,1),(218,57,197,8,1,1),(219,57,198,9,1,1),(220,57,199,10,1,1),(221,57,200,11,1,1),(222,57,201,12,1,1),(223,57,202,13,1,1),(224,58,203,0,1,1),(225,58,204,1,1,1),(226,58,205,2,1,1),(227,58,206,3,1,1),(228,58,207,4,1,1),(229,58,208,5,1,1),(230,58,209,6,1,1),(231,58,210,7,1,1),(232,58,211,8,1,1),(233,58,212,9,1,1),(234,58,213,10,1,1),(235,58,214,11,1,1),(236,58,215,12,1,1),(237,58,216,13,1,1),(238,59,217,0,1,1),(239,59,218,1,1,1),(240,59,219,2,1,1),(241,59,220,3,1,1),(242,59,221,4,1,1),(243,59,222,5,1,1),(244,59,223,6,1,1),(245,59,224,7,1,1),(246,59,225,8,1,1),(247,59,226,9,1,1),(248,59,227,10,1,1),(249,59,228,11,1,1),(250,59,229,12,1,1),(251,59,230,13,1,1),(252,60,231,0,1,1),(253,60,232,1,1,1),(254,60,233,2,1,1),(255,60,234,3,1,1),(256,60,235,4,1,1),(257,60,236,5,1,1),(258,60,237,6,1,1),(259,60,238,7,1,1),(260,60,239,8,1,1),(261,60,240,9,1,1),(262,60,241,10,1,1),(263,60,242,11,1,1),(264,60,243,12,1,1),(265,60,244,13,1,1),(266,61,245,0,1,1),(267,61,246,1,1,1),(268,61,247,2,1,1),(269,61,248,3,1,1),(270,61,249,4,1,1),(271,61,250,5,1,1),(272,61,251,6,1,1),(273,61,252,7,1,1),(274,61,253,8,1,1),(275,61,254,9,1,1),(276,61,255,10,1,1),(277,61,256,11,1,1),(278,61,257,12,1,1),(279,61,258,13,1,1),(280,62,259,0,1,1),(281,62,260,1,1,1),(282,62,261,2,1,1),(283,62,262,3,1,1),(284,62,263,4,1,1),(285,62,264,5,1,1),(286,62,265,6,1,1),(287,62,266,7,1,1),(288,62,267,8,1,1),(289,62,268,9,1,1),(290,62,269,10,1,1),(291,62,270,11,1,1),(292,62,271,12,1,1),(293,62,272,13,1,1),(294,63,273,0,1,1),(295,63,274,1,1,1),(296,63,275,2,1,1),(297,63,276,3,1,1),(298,63,277,4,1,1),(299,63,278,5,1,1),(300,63,279,6,1,1),(301,63,280,7,1,1),(302,63,281,8,1,1),(303,63,282,9,1,1),(304,63,283,10,1,1),(305,63,284,11,1,1),(306,63,285,12,1,1),(307,63,286,13,1,1),(308,64,287,0,1,1),(309,64,288,1,1,1),(310,64,289,2,1,1),(313,64,292,5,1,1),(315,64,294,7,1,1),(316,64,295,8,1,1),(317,64,296,9,1,1),(318,64,297,10,1,1),(319,64,298,11,1,1),(320,64,299,12,1,1),(321,64,300,13,1,1),(322,64,301,14,1,1),(323,64,302,15,1,1),(324,64,303,16,1,1),(325,64,304,3,1,1),(326,52,305,14,1,1),(327,50,306,3,1,1),(328,50,307,4,1,1),(329,50,308,5,1,1),(330,50,309,2,1,1),(331,50,310,6,1,1),(333,50,312,24,1,1),(334,50,313,14,1,1),(335,50,314,31,1,1),(336,50,315,25,1,1),(337,50,316,18,1,1),(338,50,317,26,1,1),(339,50,318,20,1,1),(341,50,320,11,1,1),(342,50,321,23,1,1),(343,50,322,8,1,1),(344,50,323,30,1,1),(345,50,324,16,1,1),(347,50,326,29,1,1),(348,50,327,17,1,1),(349,50,328,12,1,1),(350,50,329,32,1,1),(351,50,330,28,1,1),(353,50,332,9,1,1),(354,50,333,35,1,1),(356,50,335,22,1,1),(357,50,336,34,1,1),(358,50,337,10,1,1),(359,50,338,15,1,1),(360,50,339,21,1,1),(361,50,340,36,1,1),(362,50,341,27,1,1),(363,50,342,7,1,1),(364,50,343,19,1,1),(365,50,344,13,1,1),(366,50,345,33,1,1),(367,53,305,14,1,1),(368,54,305,14,1,1),(369,55,305,14,1,1),(370,56,305,14,1,1),(371,57,305,14,1,1),(372,58,305,14,1,1),(373,59,305,14,1,1),(374,60,305,14,1,1),(375,61,305,14,1,1),(376,62,305,14,1,1),(377,63,305,14,1,1),(382,65,348,0,1,1),(383,65,349,0,1,1),(384,65,350,0,1,1),(385,65,351,0,1,1),(386,65,352,0,1,1),(387,65,353,0,1,1),(388,65,354,0,1,1),(389,65,355,0,1,1),(390,65,356,0,1,1),(391,65,357,0,1,1),(392,65,358,0,1,1),(393,65,359,0,1,1),(394,65,360,0,1,1),(395,65,361,0,1,1),(396,65,362,0,1,1),(397,66,363,0,1,1);
/*!40000 ALTER TABLE `lesson_task` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:46
