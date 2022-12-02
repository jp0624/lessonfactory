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
-- Table structure for table `task_attr`
--

DROP TABLE IF EXISTS `task_attr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_attr` (
  `attr_id` smallint(7) NOT NULL,
  `attr_type_id` tinyint(3) NOT NULL,
  `group_id` smallint(7) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `placeholder` varchar(45) DEFAULT NULL,
  `default_value` varchar(45) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `_order` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `group` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`attr_id`),
  KEY `ta_attr_group_id` (`group_id`),
  KEY `ta_attr_type_id` (`attr_type_id`),
  CONSTRAINT `ta_attr_group_id` FOREIGN KEY (`group_id`) REFERENCES `task_attr_group` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ta_attr_type_id` FOREIGN KEY (`attr_type_id`) REFERENCES `task_attr_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_attr`
--

/*!40000 ALTER TABLE `task_attr` DISABLE KEYS */;
INSERT INTO `task_attr` VALUES (1,9,1,'Image','Image Url','','Image Url',0,'src','figure'),(2,1,1,'Content Heading','Type Heading ','','Content Heading',1,'heading','headings'),(3,2,1,'Show Main Heading First','Paragraph Content Here','','Content',2,'text','figcaption'),(6,11,2,'Video','Video Url','','Video Url',1,'src','video'),(7,1,2,'Content Heading','Type Heading','','Content Heading',2,'heading','headings'),(8,2,2,'Paragraph','Paragraph Content Here','','Content',3,'text','figcaption'),(10,1,3,'Sub-Heading','Type Heading','','Sub-Heading',1,'subheading','headings'),(11,9,3,'Full-Screen Image','Image Url','','Full-Screen Image',2,'src','figure'),(12,1,4,'Content Heading','Type Heading','','Main Heading',0,'heading','headings'),(13,9,4,'Image','Image URL','','Image Url',2,'src','figure'),(14,2,4,'Paragraph','Paragraph Content','','Content',1,'text','figcaption'),(15,1,5,'Main Heading','Type Heading','','Main Heading',1,'heading','headings'),(16,8,5,'HTML Markup','HTML Markup','','HTML Markup',2,'html','markup'),(17,2,5,'Paragraph','Paragraph Content','','Content',4,'text','figcaption'),(19,1,6,'Content Heading','Content heading','','Content Heading',0,NULL,NULL),(20,2,6,'Content','Content','','Content',1,NULL,NULL),(21,1,6,'Button Identifier','Button Identifier','','Button Identifier',2,NULL,NULL),(22,8,7,'HTML Markup','HTML Markup','','HTML Markup',0,NULL,NULL),(23,2,7,'Intitial Content','Content','','Content',2,NULL,NULL),(24,1,7,'Initial Content Heading','Content Heading','','Content Heading',1,NULL,NULL),(25,1,8,'Content Heading','Content Heading','','Content Heading',0,NULL,NULL),(26,2,8,'Content','Content','','Content',1,NULL,NULL),(27,4,8,'Timestamp','Timestamp','','Timestamp',2,NULL,NULL),(28,9,2,'Video Poster','Video Poster','','Video Poster',1,'poster','video'),(29,1,3,'Main Heading','Main Heading','','Main Heading',0,'heading','headings'),(30,14,3,'Full-Screen Image Alt','Full-Screen Image Alt','','Full-Screen Image Alt',3,'alt','figure'),(31,2,9,'Question Text','Question Text','','Question Text',1,'text','question'),(32,6,9,'Randomize Answers','Randomize Answers','','Randomize Answers',2,'random','question'),(33,1,10,'Answer','Answer','','Answer',0,'text','answer'),(34,4,10,'Answer Value','Answer Value','','Answer Value',1,'score','answer'),(35,14,4,'Image Alt','Image Alt','','Image Alt',3,'alt','figure'),(36,1,11,'Heading','Heading','','Heading',1,'heading','headings'),(37,6,11,'Show Speedometer','Show Speedometer','','Show Speedometer',2,'speedometer','settings'),(38,6,11,'Show Phone','Show Phone','','Show Phone',3,'phone','settings'),(39,2,11,'Content','Content','','Content',5,'text','figcaption'),(40,6,11,'Show Video','Show Video','','Show Video',4,'video','settings'),(41,1,12,'Heading','Heading','','Heading',1,'heading','headings'),(42,13,12,'Result 1','Result 1','','Result 1',2,'heading','result1'),(43,2,12,'Result 1 - Content','Result 1 - Content','','Result 1 - Content',3,'text','result1'),(44,13,12,'Result 2','Result 2','','Result 2',4,'heading','result2'),(45,2,12,'Result 2 - Content','Result 2 - Content','','Result 2 - Content',5,'text','result2'),(46,13,12,'Result 3','Result 3','','Result 3',6,'heading','result3'),(47,2,12,'Result 3 - Content','Result 3 - Content','','Result 3 - Content',7,'text','result3'),(48,11,11,'Video URL','Video URL','','Video URL',5,'src','video'),(49,9,11,'Video Poster image URL','Video Poster image URL','','Video Poster image URL',6,'poster','video'),(50,8,13,'Custom HTML','Custom HTML','','Custom HTML',0,'html','stage'),(51,7,13,'Custom CSS','Custom CSS','<style></style>','Custom CSS',1,'css','stage'),(52,1,14,'Heading','Heading','','Heading',0,'heading','scene'),(53,2,14,'Content','Content','','Content',1,'text','scene'),(54,12,14,'Scene Class','Scene Class','','Scene Class',2,'activeClass','scene'),(55,7,14,'Scene CSS','Scene CSS','<style></style>','Scene CSS',3,'activeCss','scene'),(56,1,15,'Heading','Heading','','Heading',0,'heading','headings'),(57,1,15,'Sub-Heading','Sub-Heading','','Sub-Heading',1,'subheading','headings'),(58,2,15,'Content','Content','','Content',2,'text','headings'),(59,15,11,'Lock Type','Lock Type',NULL,'Lock Type',6,'type','lock'),(60,8,16,'SVG Data','SVG Data',NULL,'SVG Data',1,'icon','marker'),(61,1,16,'Title','Title',NULL,'Title',2,'title','marker'),(62,1,17,'Heading','Heading',NULL,'Heading',1,'heading','headings'),(63,2,17,'Content','Content',NULL,'Content',2,'text','figcaption'),(64,6,16,'Active Marker','Active Marker',NULL,'Active Marker',3,'active','settings'),(65,8,3,'Icon SVG Data','SVG Data',NULL,'Icon SVG Data',5,'src','headings'),(66,6,9,'Allow Redo','Allow Redo',NULL,'Allow Redo',4,'redo','question'),(67,6,9,'Show Confirm Screen','Show Confirm Screen',NULL,'Show Confirm Screen',3,'confirm','question'),(68,6,3,'Reverse Headings','','','Reverse Headings',6,'reverse','settings'),(69,1,18,'Measurement Title',NULL,NULL,'Measurement Title',1,'measurement_title','settings'),(70,1,18,'Measurement Max Value',NULL,NULL,'Measurement Max Value',2,'measurement_max','settings'),(71,6,18,'Show Measurement Title',NULL,NULL,'Show Measurement Title',3,'measurement_show','settings'),(72,1,18,'Measurement Marker(Every %)',NULL,NULL,'Measurement Marker(Every %)',4,'measurement_marker','settings'),(73,1,18,'Series Title',NULL,NULL,'Series Title',1,'series_title','settings'),(74,1,18,'Series Unit',NULL,NULL,'Series Unit',2,'series_unit','settings'),(75,6,18,'Show Series Title',NULL,NULL,'Show Series Title',3,'series_show','settings'),(76,4,19,'Item Value',NULL,NULL,'Value',2,'value','item'),(77,1,19,'Item Title',NULL,NULL,'Title',1,'title','item'),(78,6,19,'Item Highlight',NULL,NULL,'Highlight',3,'highlight','item'),(79,11,20,'Video URL',NULL,NULL,'Video URL',1,'src','video'),(80,9,20,'Video Poster image URL',NULL,NULL,'Video Poster image URL',2,'poster','video'),(81,1,21,'Question Text',NULL,NULL,'Question Text',1,'text','question'),(82,4,21,'Video TimeStamp',NULL,NULL,'Video TimeStamp',2,'time','question'),(83,1,21,'Video Assessment Answer1',NULL,NULL,'Video Assessment Answer1',3,'text','answer1'),(84,4,21,'Answer1 Score','','0','Answer1 Score',4,'score','answer1'),(85,1,21,'Video Assessment Answer2',NULL,NULL,'Video Assessment Answer2',5,'text','answer2'),(86,4,21,'Answer2 Score','','0','Answer2 Score',6,'score','answer2'),(87,1,21,'Video Assessment Answer3',NULL,NULL,'Video Assessment Answer3',7,'text','answer3'),(88,4,21,'Answer3 Score','','0','Answer3 Score',8,'score','answer3'),(89,1,21,'Video Assessment Answer4',NULL,NULL,'Video Assessment Answer4',9,'text','answer4'),(90,4,21,'Answer4 Score','','0','Answer4 Score',10,'score','answer4'),(91,1,21,'Video Assessment Answer5',NULL,NULL,'Video Assessment Answer5',11,'text','answer5'),(92,4,21,'Answer5 Score','','0','Answer5 Score',12,'score','answer5'),(93,7,5,'CSS Markup',NULL,'<style></style>','CSS',3,'css','markup'),(94,8,17,'Icon SVG Data','SVG Data',NULL,'SVG Data',3,'src','headings'),(95,1,16,'Marker Class','Class name',NULL,'Marker Class',4,'class','settings'),(96,1,22,'Heading','Heading',NULL,'Heading',1,'heading','headings'),(97,2,22,'Content','Content',NULL,'Content',2,'text','figcaption'),(98,1,22,'iFrame Url','iFrame Url',NULL,'iFrame Url',3,'src','iframe'),(99,6,23,'Loop Slides',NULL,NULL,'Loop Slies',1,'loop','settings'),(100,4,23,'Cycle Speed',NULL,NULL,'Cycle Speed (ms)',2,'speed','settings'),(101,4,23,'Cycle Delay',NULL,NULL,'Cycle Delay (ms)',3,'delay','settings'),(102,1,24,'Position X',NULL,NULL,'Position X (%)',2,'x','position'),(103,1,24,'Position Y',NULL,NULL,'Position Y (%)',3,'y','position'),(104,1,24,'Size X',NULL,NULL,'Size X (%)',4,'x','size'),(105,1,24,'Size Y',NULL,NULL,'Size Y (%)',5,'y','size'),(106,1,24,'Class',NULL,NULL,'Class',6,'class_init','button'),(107,1,24,'Clicked Class',NULL,NULL,'Clicked Class',7,'class_click','button'),(108,6,23,'Full Screen',NULL,NULL,'Full Screen',0,'fullscreen','settings'),(109,1,24,'Text',NULL,NULL,'Text',1,'text','button'),(110,1,24,'Icon',NULL,NULL,'Icon',0,'icon','button'),(111,6,2,'Pausable',NULL,NULL,'Pausable',7,'pausable','settings'),(112,6,2,'Show Controls',NULL,NULL,'Show Controls',5,'controls','settings'),(113,6,2,'Show Timeline',NULL,NULL,'Show Timeline',6,'timeline','settings'),(114,1,2,'Theme',NULL,NULL,'Theme',8,'theme','settings'),(115,9,2,'Image Overlay',NULL,NULL,'Image Overlay',4,'img','video'),(116,1,25,'Icon',NULL,NULL,'Icon',NULL,'name','icon'),(117,1,25,'Position X',NULL,'50','Position X (%)',NULL,'x','icon'),(118,1,25,'Position Y',NULL,'50','Position Y (%)',NULL,'y','icon'),(119,1,25,'Icon Size',NULL,'1','Icon Size',NULL,'size','icon'),(120,1,25,'Icon Color',NULL,'rgba(255, 255, 255,0.5)','Icon Color(rgba)',NULL,'color','icon');
/*!40000 ALTER TABLE `task_attr` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:29:01
