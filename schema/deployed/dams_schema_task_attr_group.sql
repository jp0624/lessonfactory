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
-- Table structure for table `task_attr_group`
--

DROP TABLE IF EXISTS `task_attr_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_attr_group` (
  `group_id` smallint(7) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_attr_group`
--

/*!40000 ALTER TABLE `task_attr_group` DISABLE KEYS */;
INSERT INTO `task_attr_group` VALUES (1,'Image with Heading and Paragraph','panorama'),(2,'Video with Heading and Paragraph','movie'),(3,'Fullscreen Image and Sub-Heading','settings_overscan'),(4,'Static Image with Heading and Paragraph','panorama'),(5,'HTML/CSS with Heading and Paragraph','settings_ethernet'),(6,'Button Identifier with Heading and Paragraph','touch_app'),(7,'HTML Block','code'),(8,'Timestamp with Heading and Paragraph','alarm_add'),(9,'Question','event_note'),(10,'Answer','event_available'),(11,'Step','filter_none'),(12,'Results','thumb_up'),(13,'Stage','video_label'),(14,'Scene','movie'),(15,'Headings with Content','remove_from_queue'),(16,'Marker','flag'),(17,'Heading and Paragraph','dehaze'),(18,'Chart Settings','settings_applications'),(19,'Series Item','insert_chart'),(20,'Video (Video Assessment)','movie'),(21,'Question (Video Assessment)','event_note'),(22,'iFrame with Heading and Paragraph','settings_system_daydream'),(23,'Cycle Settings','settings_applications'),(24,'Hotspot','fullscreen'),(25,'Icon','camera_enhance');
/*!40000 ALTER TABLE `task_attr_group` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:08
