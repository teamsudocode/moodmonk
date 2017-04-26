-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: moodmonk
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu1

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
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('lama','password'),('monk','password');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emotion_tone`
--

DROP TABLE IF EXISTS `emotion_tone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emotion_tone` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `anger` decimal(11,10) NOT NULL,
  `disgust` decimal(11,10) NOT NULL,
  `fear` decimal(11,10) NOT NULL,
  `joy` decimal(11,10) NOT NULL,
  `sadness` decimal(11,10) NOT NULL,
  PRIMARY KEY (`index`,`userid`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emotion_tone`
--

LOCK TABLES `emotion_tone` WRITE;
/*!40000 ALTER TABLE `emotion_tone` DISABLE KEYS */;
INSERT INTO `emotion_tone` VALUES (1,'lama','2017-04-24',0.2054830000,0.6206680000,0.1868390000,0.0016190000,0.1889730000),(2,'lama','2017-04-25',0.1732560000,0.1935580000,0.5020340000,0.1306860000,0.4830350000),(3,'lama','2017-04-26',0.1715420000,0.0831640000,0.1779460000,0.5025510000,0.2750720000),(4,'lama','2017-04-23',0.1928390000,0.3322470000,0.1074930000,0.0408040000,0.4385650000),(5,'lama','2017-04-22',0.2447430000,0.1115430000,0.0744220000,0.0554590000,0.5755500000),(6,'lama','2017-04-21',0.1000400000,0.6467210000,0.6260630000,0.5795900000,0.1911860000),(7,'lama','2017-04-20',0.0120150000,0.0045120000,0.0666930000,0.6039750000,0.1531160000);
/*!40000 ALTER TABLE `emotion_tone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_tone`
--

DROP TABLE IF EXISTS `language_tone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_tone` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `analytical` decimal(11,10) NOT NULL,
  `confident` decimal(11,10) NOT NULL,
  `tentative` decimal(11,10) NOT NULL,
  PRIMARY KEY (`index`,`userid`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_tone`
--

LOCK TABLES `language_tone` WRITE;
/*!40000 ALTER TABLE `language_tone` DISABLE KEYS */;
INSERT INTO `language_tone` VALUES (1,'lama','2017-04-24',0.0000000000,0.6633000000,0.0000000000),(2,'lama','2017-04-25',0.4941710000,0.0000000000,0.9682440000),(3,'lama','2017-04-26',0.6938150000,0.5001920000,0.0000000000),(4,'lama','2017-04-23',0.0000000000,0.0000000000,0.1822820000),(5,'lama','2017-04-22',0.8626210000,0.7958080000,0.0000000000),(6,'lama','2017-04-21',0.7097360000,0.0000000000,0.9223210000),(7,'lama','2017-04-20',0.4819080000,0.0000000000,0.6239540000);
/*!40000 ALTER TABLE `language_tone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_tone`
--

DROP TABLE IF EXISTS `social_tone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_tone` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `openness_big5` decimal(11,10) NOT NULL,
  `conscientiousness_big5` decimal(11,10) NOT NULL,
  `extraversion_big5` decimal(11,10) NOT NULL,
  `agreeableness_big5` decimal(11,10) NOT NULL,
  `emotional_range_big5` decimal(11,10) NOT NULL,
  PRIMARY KEY (`index`,`userid`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_tone`
--

LOCK TABLES `social_tone` WRITE;
/*!40000 ALTER TABLE `social_tone` DISABLE KEYS */;
INSERT INTO `social_tone` VALUES (1,'lama','2017-04-24',0.6031710000,0.0824390000,0.4223100000,0.1593820000,0.1340450000),(2,'lama','2017-04-25',0.9049060000,0.4270040000,0.3798720000,0.2129700000,0.4231630000),(3,'lama','2017-04-26',0.3327770000,0.6506710000,0.5036150000,0.8642130000,0.4617350000),(4,'lama','2017-04-23',0.7561010000,0.7847790000,0.5989890000,0.5971540000,0.6497750000),(5,'lama','2017-04-22',0.0974950000,0.7224310000,0.2475080000,0.4335360000,0.7135700000),(6,'lama','2017-04-21',0.6966720000,0.6405930000,0.3801120000,0.5012590000,0.3117410000),(7,'lama','2017-04-20',0.5604660000,0.5265110000,0.7853100000,0.9863530000,0.3305150000);
/*!40000 ALTER TABLE `social_tone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-26 19:54:53
