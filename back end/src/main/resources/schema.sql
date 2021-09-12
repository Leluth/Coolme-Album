-- 建库脚本

-- Create DataBase
DROP DATABASE IF EXISTS `sexyalbum`;
CREATE DATABASE `sexyalbum` CHARACTER SET utf8;

USE `sexyalbum`;

-- clear context
/*
DROP TABLE IF EXISTS `album_user`;
DROP TABLE IF EXISTS `album`;
DROP TABLE IF EXISTS `ele`;
DROP TABLE IF EXISTS `relation`;
DROP TABLE IF EXISTS `user_relation`;
DROP TABLE IF EXISTS `save_relation`;
*/

-- Create syntax for TABLE 'album_user'
CREATE TABLE `album_user` (
  `userid` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) UNIQUE DEFAULT NULL ,
  `password` VARCHAR(20) DEFAULT NULL ,
  `avatar` VARCHAR(40) DEFAULT NULL ,
  PRIMARY KEY (`userid`)
);

-- Create syntax for TABLE 'album'
CREATE TABLE `album` (
  `albumid` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `userid` BIGINT(20) NOT NULL ,
  `albumname` VARCHAR(255) DEFAULT NULL ,
  PRIMARY KEY (`albumid`) ,
  FOREIGN KEY (userid) REFERENCES album_user(userid)
);

-- Create syntax for TABLE 'ele'
CREATE TABLE `ele` (
  `eleid` BIGINT(20) NOT NULL ,
  `source` VARCHAR(60) DEFAULT NULL ,
  `description` VARCHAR(140) DEFAULT NULL ,
  PRIMARY KEY (`eleid`)
);

-- Create mapping relation from TABLE 'album' to TABLE 'ele'
CREATE TABLE `relation` (
  `albumid` BIGINT(20) NOT NULL ,
  `eleid` BIGINT(20) NOT NULL ,
  FOREIGN KEY (albumid) REFERENCES album(albumid) ,
  FOREIGN KEY (eleid) REFERENCES ele(eleid)
);

-- Create mapping relation from TABLE 'album_user' to TABLE 'album_user'
CREATE TABLE `user_relation` (
  `userid` BIGINT(20) NOT NULL ,
  `friendid` BIGINT(20) NOT NULL ,
  FOREIGN KEY (userid) REFERENCES album_user(userid) ,
  FOREIGN KEY (friendid) REFERENCES album_user(userid)
);

-- Create mapping relation from TABLE 'album_user' to  TABLE 'ele'
CREATE TABLE `like_relation` (
  `userid` BIGINT(20) NOT NULL ,
  `eleid` BIGINT(20) NOT NULL ,
  FOREIGN KEY (userid) REFERENCES album_user(userid) ,
  FOREIGN KEY (eleid) REFERENCES ele(eleid)
);

-- Create syntax for TABLE 'comment'
CREATE TABLE `comment` (
  `commentid` BIGINT(20) NOT NULL AUTO_INCREMENT ,
  `eleid` BIGINT(20) NOT NULL ,
  `userid` BIGINT(20) NOT NULL ,
  `tarid` BIGINT(20) DEFAULT NULL ,
  `comments` VARCHAR(140) ,
  PRIMARY KEY (commentid) ,
  FOREIGN KEY (eleid) REFERENCES ele(eleid) ,
  FOREIGN KEY (userid) REFERENCES album_user(userid)
);

-- Create syntax for TABLE 'message'
CREATE TABLE `message` (
  `messageid` BIGINT(20) NOT NULL AUTO_INCREMENT ,
  `userid` BIGINT(20) NOT NULL ,
  `tarid` BIGINT(20) NOT NULL ,
  `flag` BOOLEAN NOT NULL DEFAULT TRUE ,
  `type` INT NOT NULL ,
  `info` BIGINT(20) NOT NULL ,
  PRIMARY KEY (messageid) ,
  FOREIGN KEY (userid) REFERENCES album_user(userid) ,
  FOREIGN KEY (tarid) REFERENCES album_user(userid)
)