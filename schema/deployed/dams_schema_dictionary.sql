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
-- Table structure for table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dictionary` (
  `term_id` smallint(5) NOT NULL,
  `term` varchar(45) DEFAULT NULL,
  `selector` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`term_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictionary`
--

/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
INSERT INTO `dictionary` VALUES (1,'Cancel','{$dt-cancel}'),(2,'Start','{$dt-start}'),(3,'Left','{$dt-left}'),(4,'Right','{$dt-right}'),(5,'mph','{$dt-mph}'),(6,'km/h','{$dt-kmh}'),(7,'Meters','{$dt-meters}'),(8,'Feet','{$dt-feet}'),(9,'Person A','{$dt-person_a}'),(10,'Person B','{$dt-person_b}'),(11,'Task 1','{$dt-task_1}'),(12,'Task 2','{$dt-task_2}'),(13,'Task Switch','{$dt-task_switch}'),(14,'True','{$dt-true}'),(15,'False','{$dt-false}'),(16,'Continue','{$dt-continue}'),(17,'Look','{$dt-look}'),(18,'Drive','{$dt-drive}'),(19,'Phone','{$dt-phone}'),(20,'Speedometer','{$dt-speedometer}'),(21,'Spacebar','{$dt-spacebar}'),(22,'Who','{$dt-who}'),(23,'What','{$dt-what}'),(24,'Where','{$dt-where}'),(25,'Why','{$dt-why}'),(26,'Placeholder01','{$dt-placeholder01}'),(27,'Placeholder02','{$dt-placeholder02}'),(28,'Placeholder03','{$dt-placeholder03}'),(29,'Placeholder04','{$dt-placeholder04}');
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:35
