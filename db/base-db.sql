-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Generation Time: Jun 04, 2021 at 04:46 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `base-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Assignments`
--

CREATE TABLE `Assignments` (
  `id` int(100) NOT NULL,
  `type` varchar(255) NOT NULL,
  `student` varchar(255) NOT NULL,
  `grade` int(255) DEFAULT NULL,
  `submittedAnswer` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Assignments`
--

INSERT INTO `Assignments` (`id`, `type`, `student`, `grade`, `submittedAnswer`) VALUES
(1, 'multiple-choice', 'A01111111', NULL, NULL),
(2, 'multiple-select', 'A01111111', NULL, NULL),
(3, 'fill-in-blank', 'A01111111', NULL, NULL),
(4, 'multiple-choice', 'A02222222', NULL, NULL),
(5, 'multiple-select', 'A02222222', NULL, NULL),
(6, 'fill-in-blank', 'A02222222', NULL, NULL),
(7, 'multiple-choice', 'A03333333', NULL, NULL),
(8, 'multiple-select', 'A03333333', NULL, NULL),
(9, 'fill-in-blank', 'A03333333', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userKey` int(255) NOT NULL,
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userKey`, `id`, `name`, `password`, `type`) VALUES
(1, 'A00123456', 'Amanda', 'instructorpassword', 'instructor'),
(2, 'A01111111', 'Joe', 'joepassword', 'student'),
(3, 'A02222222', 'Jane', 'janepassword', 'student'),
(4, 'A03333333', 'Jill', 'jillpassword', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Assignments`
--
ALTER TABLE `Assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userKey`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Assignments`
--
ALTER TABLE `Assignments`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userKey` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;