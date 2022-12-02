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
-- Table structure for table `country_language`
--

DROP TABLE IF EXISTS `country_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_language` (
  `country_language_id` int(11) NOT NULL,
  `country_code` char(10) CHARACTER SET utf8mb4 DEFAULT NULL,
  `language_code` char(10) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`country_language_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_language`
--

/*!40000 ALTER TABLE `country_language` DISABLE KEYS */;
INSERT INTO `country_language` VALUES (1,'AR','es'),(2,'AM','hy'),(3,'AU','en'),(4,'AT','en'),(5,'AT','de'),(6,'BY','by'),(7,'BE','en'),(8,'BE','fr'),(9,'BE','nl'),(10,'BA','bs'),(11,'BA','hr'),(12,'BR','en'),(14,'BG','bg'),(15,'CA','en'),(17,'CN','en'),(18,'CN','zh'),(19,'HR','hr'),(20,'CY','en'),(21,'CY','el'),(22,'CZ','en'),(23,'CZ','cs'),(24,'DK','en'),(25,'DK','da'),(26,'EG','en'),(27,'EG','ar'),(28,'EE','et'),(29,'ET','am'),(30,'FI','fi'),(31,'FR','en'),(32,'FR','fr'),(33,'DE','de'),(34,'GR','en'),(35,'GR','el'),(36,'HK','en'),(37,'HK','zh'),(38,'HU','hu'),(39,'IN','en'),(40,'IN','hi'),(41,'ID','en'),(42,'ID','id'),(43,'IE','en'),(44,'IT','en'),(45,'IT','it'),(46,'JP','en'),(47,'JP','ja'),(48,'KZ','kk'),(49,'KZ','ru'),(50,'LV','lv'),(51,'LT','lt'),(52,'MW','en'),(53,'MY','en'),(54,'MY','ms'),(55,'MX','en'),(56,'MX','es'),(57,'MD','ro'),(58,'MA','en'),(59,'MA','fr'),(60,'MA','ar'),(61,'MZ','pt'),(62,'NL','en'),(63,'NL','nl'),(64,'NZ','en'),(65,'NO','no'),(66,'PH','en'),(67,'PH','tl'),(68,'PL','en'),(69,'PL','pl'),(70,'PT','en'),(71,'PT','pt'),(72,'RO','en'),(73,'RO','ro'),(74,'RU','en'),(75,'RU','ru'),(76,'CS','sr'),(77,'SG','en'),(78,'SK','sk'),(79,'SI','sl'),(80,'ZA','en'),(81,'KR','ko'),(82,'ES','en'),(83,'ES','es'),(84,'SE','en'),(85,'SE','sv'),(86,'CH','en'),(87,'CH','fr'),(88,'CH','de'),(89,'TW','zh'),(90,'TZ','en'),(91,'TZ','sw'),(92,'TH','th'),(93,'TR','en'),(94,'TR','tr'),(95,'UA','uk'),(96,'AE','en'),(97,'AE','ar'),(98,'AE','hi'),(99,'AE','ur'),(100,'GB','en'),(101,'US','en'),(102,'US','es'),(103,'VN','vi'),(104,'GLB','en'),(105,'GLB','fr'),(107,'CN','zh_cn'),(108,'BR','pt_br'),(111,'CA','fr_ca'),(114,'DE','en'),(117,'FI','en'),(120,'GAAR','en'),(123,'GAAL','en'),(126,'GAFL','en'),(129,'GAFL','fr'),(132,'GAFR','en'),(135,'GAFR','fr'),(138,'GEU','en'),(141,'GLA','en'),(144,'GLA','es'),(147,'BR','pt'),(150,'CA','fr'),(153,'GME','ar'),(156,'GME','en'),(159,'HK','zh_tw'),(162,'HU','en'),(165,'KR','en'),(168,'NO','en'),(171,'TH','en'),(174,'TW','zh_tw'),(177,'TW','en'),(178,'EH','an'),(179,'EH','ast');
/*!40000 ALTER TABLE `country_language` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-02 10:30:27
