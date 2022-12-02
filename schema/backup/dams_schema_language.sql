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
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language` (
  `language_id` int(5) NOT NULL AUTO_INCREMENT,
  `code` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text_dir` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT 'ltr',
  PRIMARY KEY (`language_id`),
  KEY `code` (`code`),
  KEY `code_2` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AVG_ROW_LENGTH=138 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'af','Afrikaans (af)','ltr'),(2,'am',' አማርኛ (am)','ltr'),(3,'an','Aragonés (an)','ltr'),(4,'ar','عربي (ar)','rtl'),(5,'ast','Asturianu (ast)','ltr'),(6,'az','Azərbaycanca (az)','ltr'),(7,'ba','Башҡорт теле (ba)','ltr'),(8,'be','Беларуская (be)','ltr'),(9,'bg','Български (bg)','ltr'),(10,'bn','বাংলা (bn)','ltr'),(11,'br','Breizh (br)','ltr'),(12,'bs','Bosanski (bs)','ltr'),(13,'ca','Català (ca)','ltr'),(15,'ckb','سۆرانی (ckb)','ltr'),(16,'cs','Čeština (cs)','ltr'),(17,'cy','Cymraeg (cy)','ltr'),(18,'da','Dansk (da)','ltr'),(21,'de','Deutsch (de)','ltr'),(25,'dv','ދިވެހި (dv)','ltr'),(26,'dz','རྫོང་ཁ (dz)','ltr'),(27,'ee','Èʋegbe (ee)','ltr'),(28,'el','Ελληνικά (el)','ltr'),(33,'eo','Esperanto (eo)','ltr'),(34,'es','Español (es)','ltr'),(39,'et','eesti (et)','ltr'),(40,'eu','Euskara (eu)','ltr'),(41,'fa','فارسی (fa)','rtl'),(42,'fi','Suomi (fi)','ltr'),(44,'fil','Filipino (fil)','ltr'),(45,'fj','VakaViti (fj)','ltr'),(46,'fo','Føroyskt (fo)','ltr'),(47,'fr','Français (fr)','ltr'),(49,'ga','Gaeilge (ga)','ltr'),(50,'gd','Gàidhlig (gd)','ltr'),(51,'gl','Galego (gl)','ltr'),(52,'gu','ગુજરાતી (gu)','ltr'),(53,'ha','Hausa (ha)','ltr'),(54,'hat','Kreyòl Ayisyen (hat)','ltr'),(55,'haw','ʻŌlelo Hawaiʻi (haw)','ltr'),(56,'he','עברית (he)','rtl'),(58,'hi','हिंदी (hi)','ltr'),(59,'hr','Hrvatski (hr)','ltr'),(60,'hu','magyar (hu)','ltr'),(61,'hy','Հայերեն (hy)','ltr'),(62,'id','Indonesian (id)','ltr'),(63,'is','Íslenska (is)','ltr'),(64,'it','Italiano (it)','ltr'),(65,'ja','日本語 (ja)','ltr'),(67,'ka','ქართული (ka)','ltr'),(68,'kab','Taqbaylit (kab)','ltr'),(69,'kk','Қазақша (kk)','ltr'),(70,'kl','Kalaallisut (kl)','ltr'),(71,'km','ខ្មែរ (km)','ltr'),(72,'kmr','Kurmanji (kmr)','ltr'),(73,'kn','ಕನ್ನಡ (kn)','ltr'),(74,'ko','한국어 (ko)','ltr'),(75,'ky','Кыргызча (ky)','ltr'),(76,'la','Latin (la)','ltr'),(77,'lb','Lëtzebuergesch (lb)','ltr'),(78,'lo','Laotian (lo)','ltr'),(79,'lt','Lietuvių (lt)','ltr'),(81,'lv','Latviešu (lv)','ltr'),(82,'mg','Malagasy (mg)','ltr'),(83,'mh','Ebon (mh)','ltr'),(84,'mi_tn','Māori - Tainui (mi_tn)','ltr'),(85,'mi_wwow','Māori - Waikato (mi_wwow)','ltr'),(86,'mis','Crnogorski (mis)','ltr'),(87,'mk','Македонски (mk)','ltr'),(88,'ml','മലയാളം (ml)','ltr'),(89,'mn','Монгол (mn)','ltr'),(91,'mr','मराठी (mr)','ltr'),(92,'ms','Bahasa Melayu (ms)','ltr'),(93,'my','myanma bhasa (my)','ltr'),(94,'ne','नेपाली (ne)','ltr'),(95,'nl','Nederlands (nl)','ltr'),(96,'nn','Norsk - nynorsk (nn)','ltr'),(97,'no','Norsk - bokmål (no)','ltr'),(102,'or','ଓଡ଼ିଆ (or)','ltr'),(103,'pan','ਪੰਜਾਬੀ (pan)','ltr'),(104,'pl','Polski (pl)','ltr'),(105,'ps','پښتو (ps)','ltr'),(106,'pt','Português (pt)','ltr'),(108,'rm_surs','Romansh Sursilvan (rm_surs)','ltr'),(109,'ro','Română (ro)','ltr'),(110,'ru','Русский (ru)','ltr'),(111,'se','Davvisámegiella (se)','ltr'),(112,'si','සිංහල (si)','ltr'),(113,'sk','Slovenčina (sk)','ltr'),(114,'sl','Sloven&#353;&#269;ina (sl)','ltr'),(115,'sm','Samoan (sm)','ltr'),(116,'sma','Sørsamisk (sma)','ltr'),(117,'smj','Lulesamisk (smj)','ltr'),(118,'so','Soomaali (so)','ltr'),(119,'sq','Shqip (sq)','ltr'),(122,'sv','Svenska (sv)','ltr'),(124,'sw','Kiswahili (sw)','ltr'),(125,'ta','Tamil (ta)','ltr'),(127,'te','తెలుగు  (te)','ltr'),(128,'tg','Тоҷикӣ (tg)','ltr'),(129,'th','Thai (th)','ltr'),(130,'ti','ትግርኛ (ti)','ltr'),(131,'tk','Turkmen (tk)','ltr'),(132,'tl','Tagalog (tl)','ltr'),(133,'tn','Setswana (tn)','ltr'),(134,'to','Tongan (to)','ltr'),(135,'tr','Türkçe (tr)','ltr'),(136,'tt','татар теле (tt)','ltr'),(137,'uk','Українська (uk)','ltr'),(138,'ur','اردو (ur)','rtl'),(139,'uz','Ozbekcha (uz)','ltr'),(140,'vi','Vietnamese (vi)','ltr'),(141,'wo','Wolof (wo)','ltr'),(142,'xct','བོད་ཡིག (xct)','ltr'),(143,'zgh','ⵜⴰⵎⴰⵣⵉⵖⵜ (zgh)','ltr'),(144,'zh_cn','简体中文 (zh_cn)','ltr'),(145,'zh_tw','正體中文 (zh_tw)','ltr'),(146,'zu','isiZulu (zu)','ltr'),(147,'en','English','ltr');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-23 17:00:46
