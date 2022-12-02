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
-- Table structure for table `task_type`
--

DROP TABLE IF EXISTS `task_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_type` (
  `type_id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_angular` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `child` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Item',
  `status_id` int(3) DEFAULT '1',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=712 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_type`
--

/*!40000 ALTER TABLE `task_type` DISABLE KEYS */;
INSERT INTO `task_type` VALUES (1,'Slideshow','displays a set of images','SlideshowComponent','slide',1),(2,'Video','displays a video','VideopageComponent','detail',1),(3,'Interactive Buttons','Custom interactive buttons','custom-buttons','markup',0),(4,'Splash Page','Landing page of lesson','TitlescreenComponent','content',1),(5,'Image with Content','Static image with headings and paragraph','FigurefigcaptionComponent','content',1),(6,'HTML/CSS with Headings and Paragraph','HTML/CSS with Headings and Paragraph','HtmlcssComponent','content',1),(7,'Interactive with HTML and Buttons','Interactive with HTML and Buttons','inthtml','content',0),(8,'Video with Play / Pause Timestamps','Video with Play / Pause Timestamps','VideoplaypauseComponent','timestamp',1),(9,'Assessment','Assessment','AssessmentComponent','Question/Answer',1),(10,'Question','Question','QuestionComponent','Question/Answer',1),(11,'_Custom - Interactive(TMM) ','Speedometer with phone and video','TMM_Int1Component','step',1),(12,'Theatre','Theatre','TheatreComponent','scene',1),(13,'Centered Text Only','Centered Text Only','CentertextComponent','content',1),(14,'Section Marker','Section Change Marker','SectionmarkerComponent','marker',1),(15,'Chart','displays a chart','ChartComponent','series',1),(16,'Video Assessment','Video with Questions at Timestamps','VideoassessmentComponent','content',1),(17,'Iframe with Headings and Paragraph','iFrame with Headings and Paragraph','IframepageComponent','content',1),(18,'Heading with Centered Content','Heading with Centered Content','CentercontentComponent','content',1),(19,'Image Swap','Swap Image Cycle with content','ImageswapComponent','content',1),(20,'Bandwidth Detection','Detect Users Bandwith Threshold','BandwidthComponent','format',1),(21,'Interactive Video Scene','Video with clickable coordinates','InteractivevideosceneComponent','content',1),(22,'Results','Display results from questions and Interactive Tasks','ResultsComponent','detail',1),(23,'Timed Reaction',NULL,'TimedreactionComponent','content',1);
/*!40000 ALTER TABLE `task_type` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:43
