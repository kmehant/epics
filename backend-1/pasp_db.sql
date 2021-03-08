-- MySQL dump 10.13  Distrib 5.7.29, for osx10.15 (x86_64)
--
-- Host: localhost    Database: pasp_db
-- ------------------------------------------------------
-- Server version	5.7.29

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
-- Table structure for table `antibiotics`
--

DROP TABLE IF EXISTS `antibiotics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `antibiotics` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(100) NOT NULL,
  `risk` varchar(30) NOT NULL,
  `ob` varchar(50) NOT NULL,
  `cost` double NOT NULL,
  `standard_dosing` varchar(100) NOT NULL,
  `effects` varchar(200) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assoc`
--

DROP TABLE IF EXISTS `assoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assoc` (
  `pathid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  PRIMARY KEY (`pathid`,`sid`),
  KEY `sid` (`sid`),
  CONSTRAINT `assoc_ibfk_1` FOREIGN KEY (`pathid`) REFERENCES `pathogens` (`pathid`),
  CONSTRAINT `assoc_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `syndromes` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cures`
--

DROP TABLE IF EXISTS `cures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cures` (
  `aid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  PRIMARY KEY (`aid`,`sid`),
  KEY `sid` (`sid`),
  CONSTRAINT `cures_ibfk_1` FOREIGN KEY (`aid`) REFERENCES `antibiotics` (`aid`),
  CONSTRAINT `cures_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `syndromes` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `input`
--

DROP TABLE IF EXISTS `input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `input` (
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `present_date` date NOT NULL,
  `dosage` int(11) NOT NULL,
  `dosage_pattern` varchar(100) NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`uid`,`aid`,`present_date`),
  KEY `aid` (`aid`),
  CONSTRAINT `input_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `input_ibfk_2` FOREIGN KEY (`aid`) REFERENCES `antibiotics` (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `need`
--

DROP TABLE IF EXISTS `need`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `need` (
  `pathid` int(11) NOT NULL,
  `prec_id` int(11) NOT NULL,
  PRIMARY KEY (`pathid`,`prec_id`),
  KEY `prec_id` (`prec_id`),
  CONSTRAINT `need_ibfk_1` FOREIGN KEY (`pathid`) REFERENCES `pathogens` (`pathid`),
  CONSTRAINT `need_ibfk_2` FOREIGN KEY (`prec_id`) REFERENCES `precautions` (`prec_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pathogens`
--

DROP TABLE IF EXISTS `pathogens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pathogens` (
  `pathid` int(11) NOT NULL AUTO_INCREMENT,
  `pathname` varchar(100) NOT NULL,
  `info` varchar(200) DEFAULT NULL,
  `epidemiology` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`pathid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `precautions`
--

DROP TABLE IF EXISTS `precautions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `precautions` (
  `prec_id` int(11) NOT NULL AUTO_INCREMENT,
  `prec_name` varchar(100) NOT NULL,
  PRIMARY KEY (`prec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problems` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(40) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `syndromes`
--

DROP TABLE IF EXISTS `syndromes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syndromes` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(200) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `pid` (`pid`),
  CONSTRAINT `syndromes_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `problems` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(35) NOT NULL,
  `otp` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-19 19:48:24


/* sample data insertion */;

insert into antibiotics (aname, risk, ob, cost, standard_dosing, effects) values 
( "Azithromycin", "medium", "Moderate", 50, "500mg po/IV on day 1 then 250mg daily for 4 days", "macrolide resistance, increase cardiovascular mortality"),
( "Clindamycin", "high", "Excellent", 50, "300-450mg PO q6h", "NA");


insert into problems (pid, pname) values 
(1, "RESPIRATORY TRACT INFECTIONS"),
(2, "SKIN & SOFT TISSUE INFECTIONS");

insert into syndromes (sid, sname, pid) values
(1, "Pneumonia",1),
(2, "Pertusis",1),
(3, "Cellulitis",2),
(4, "Furunculosis",2),
(5, "Necrotizing fasciitis",2);

insert into cures values
(1,1),
(1,2),
(2,3),
(2,4),
(2,5);
 
insert into pathogens (pathid, pathname, info, epidemiology) VALUES
(1, "Streptococcus pneumoniae", "encapsulated lancet-shaped gram positive diplococci", "normal flora and important cause of invasive disease often vaccine preventable"),
(2, "Bordetella pertussis", "Gram-negative, aerobic, pathogenic, encapsulated coccobacillus of the genus Bordetella", "Reservoir: Human Adolescents and adults. Transmission: respiratory droplets. Communicability: Maximum in catarrhal stage Secondary attack rate up to 80%"),
(3, "Staphylococcus aureus", "is a genus of Gram-positive bacteria in the family Staphylococcaceae in the order Bacillales", "NA"),
(4, "Streptococcus ", "are gram-positive aerobic organisms that cause many disorders, including pharyngitis, pneumonia, wound and skin infections, sepsis, and endocarditis", "15–30% of the pharyngitis cases in children and 5–20% in adults. Cases usually occur in late winter and early spring");

insert into assoc values 
(1,1),
(2,2),
(3,3),
(4,3),
(4,5);

insert into precautions VALUES
(1, "contact"),
(2, "droplet");

insert into need VALUES
(1,1),
(1,2),
(2,1),
(2,2),
(3,1),
(4,1);
