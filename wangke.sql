/*
 Navicat MySQL Data Transfer
 BY zhizhuo
 Date: 07/04/2022 21:06:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for wk_order
-- ----------------------------
DROP TABLE IF EXISTS `wk_order`;
CREATE TABLE `wk_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `wkname` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wkname_user` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wkname_password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wkschool` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `wkname_state` int NOT NULL,
  PRIMARY KEY (`id`, `wkname`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_question
-- ----------------------------
DROP TABLE IF EXISTS `wk_question`;
CREATE TABLE `wk_question`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `answer`(`answer`(191)) USING BTREE,
  INDEX `question`(`question`(191)) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2070757 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for wk_question_cx_update
-- ----------------------------
DROP TABLE IF EXISTS `wk_question_cx_update`;
CREATE TABLE `wk_question_cx_update`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `course` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `courseId` int NOT NULL,
  `question` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keyword` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ip_address` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `question`(`question`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `course:`(`course`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 104313 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_question_new
-- ----------------------------
DROP TABLE IF EXISTS `wk_question_new`;
CREATE TABLE `wk_question_new`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `question`) USING BTREE,
  INDEX `question`(`question`) USING BTREE,
  INDEX `question_2`(`question`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1189874 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_question_update
-- ----------------------------
DROP TABLE IF EXISTS `wk_question_update`;
CREATE TABLE `wk_question_update`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `question`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `question`(`question`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 768132 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_question_update_new
-- ----------------------------
DROP TABLE IF EXISTS `wk_question_update_new`;
CREATE TABLE `wk_question_update_new`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `question`(`question`(191)) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_user
-- ----------------------------
DROP TABLE IF EXISTS `wk_user`;
CREATE TABLE `wk_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ip_adress` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `username`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for wk_user_vip
-- ----------------------------
DROP TABLE IF EXISTS `wk_user_vip`;
CREATE TABLE `wk_user_vip`  (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keyword` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`, `username`, `keyword`) USING BTREE,
  INDEX `id`(`userid`, `username`, `token`, `type`, `keyword`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
