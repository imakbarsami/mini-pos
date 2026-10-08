-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 08, 2026 at 05:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Asset','Liability','Equity','Revenue','Expense') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Accounts Receivable', 'Asset', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(2, 'Sales Revenue', 'Revenue', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(3, 'Tax Payable', 'Liability', '2026-10-06 09:28:01', '2026-10-06 09:28:01');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `email`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Rohim Uddin', '01711000001', 'rahim@example.com', 'Uttara, Dhaka', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(2, 'Karim Saheb', '01811000002', 'karim@example.com', 'Mirpur, Dhaka', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(3, 'Adnan Hoque', '01911000003', 'adnan@example.com', 'Chittagong, Bangladesh', '2026-10-06 09:28:01', '2026-10-08 06:51:24'),
(5, 'Angela Schmidt V', '01234567895', 'sylvester.bailey@example.com', '2085 Corwin Mews Apt. 726 East Daphney, NJ 35158-7642', '2026-10-07 02:08:17', '2026-10-08 07:09:30'),
(6, 'Melody Blick', '01258948228', 'hazel.altenwerth@example.net', '1896 Grady Spring Apt. 968\nHayesburgh, HI 52874-723077', '2026-10-07 02:08:17', '2026-10-08 08:29:42'),
(7, 'Jerad Hickle', '+1 (757) 432-5929', 'ward59@example.net', '100 Dickinson Crest\nJoycebury, DC 43694-1000', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(8, 'Stuart Pfeffer', '+1-317-563-9549', 'karlee20@example.net', '81400 Amy Valleys Suite 839\nFadelchester, NM 93057', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(9, 'Dylan Gusikowski DVM', '012856676633', 'nbartell@example.org', '7240 Leuschke Locks\nEast Elsaview, CA 25635-1964', '2026-10-07 02:08:17', '2026-10-08 08:25:41'),
(11, 'Marcelino Pacocha II', '(251) 993-0227', 'vrunolfsson@example.org', '617 Mollie Land\nAuerfurt, UT 85808', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(12, 'Miss Stephanie Brakus DDS', '1-859-904-3093', 'queenie.hand@example.org', '109 Hegmann Shore Apt. 358\nEast Trudieport, OK 62361', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(13, 'Clement Paucek', '(234) 288-3865', 'mertz.gladyce@example.net', '2371 Gerhold Land Suite 084\nGreenhaven, CA 11820', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(14, 'Bernardo Green MD', '+18063492866', 'pschmitt@example.net', '2085 Corwin Mews Apt. 726\nEast Daphney, NJ 35158-7642', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(15, 'Ms. Myrtice Pfannerstill', '+1-458-637-0810', 'rosario83@example.net', '2124 Stracke Well Apt. 226\nSouth Ruthieton, GA 30106', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(16, 'Peter Littel', '+1.309.783.2364', 'marguerite79@example.com', '8119 Ervin Forks Suite 107\nSchusterfort, CA 47712', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(17, 'Prof. Lilyan Hudson DVM', '(469) 256-5482', 'pfeffer.yesenia@example.com', '40343 Mckenzie Mountain\nWolffurt, NE 14181', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(18, 'Dayne Senger', '+1-304-593-4198', 'mac.kub@example.net', '22138 Lambert Circles\nHeloisehaven, VT 98733', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(19, 'Prof. Bryce Brown', '+1-956-981-3251', 'zledner@example.com', '40137 Josefina Heights\nEast Hailie, LA 76057-5690', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(20, 'Prof. Cade Mills', '+1 (361) 992-3875', 'eichmann.arlo@example.org', '919 Arlene Valley Apt. 672\nOthaview, PA 56436', '2026-10-07 02:08:17', '2026-10-07 02:08:17'),
(23, 'Ali Mortuja', '0123456789', 'alimortuja@gmail.com', '90456 Hank Wall Jordifort, KS 731528y', '2026-10-08 05:13:56', '2026-10-08 08:09:49');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journal_entries`
--

CREATE TABLE `journal_entries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `journal_entries`
--

INSERT INTO `journal_entries` (`id`, `order_id`, `date`, `created_at`, `updated_at`) VALUES
(1, 10, '2026-10-07', '2026-10-07 04:28:46', '2026-10-07 04:28:46'),
(2, 11, '2026-10-07', '2026-10-07 04:31:38', '2026-10-07 04:31:38'),
(3, 6, '2026-10-07', '2026-10-07 04:34:07', '2026-10-07 04:34:07'),
(4, 9, '2026-10-07', '2026-10-07 04:40:31', '2026-10-07 04:40:31'),
(5, 8, '2026-10-07', '2026-10-07 04:41:01', '2026-10-07 04:41:01'),
(6, 7, '2026-10-07', '2026-10-07 04:48:59', '2026-10-07 04:48:59'),
(7, 5, '2026-10-07', '2026-10-07 04:58:02', '2026-10-07 04:58:02'),
(8, 4, '2026-10-07', '2026-10-07 04:58:38', '2026-10-07 04:58:38'),
(9, 12, '2026-10-07', '2026-10-07 05:07:30', '2026-10-07 05:07:30'),
(10, 3, '2026-10-07', '2026-10-07 05:18:52', '2026-10-07 05:18:52'),
(11, 13, '2026-10-07', '2026-10-07 05:39:37', '2026-10-07 05:39:37'),
(12, 2, '2026-10-07', '2026-10-07 06:26:07', '2026-10-07 06:26:07'),
(13, 2, '2026-10-07', '2026-10-07 06:39:59', '2026-10-07 06:39:59'),
(14, 14, '2026-10-07', '2026-10-07 10:26:42', '2026-10-07 10:26:42'),
(15, 15, '2026-10-08', '2026-10-07 23:44:34', '2026-10-07 23:44:34'),
(16, 16, '2026-10-08', '2026-10-08 01:30:34', '2026-10-08 01:30:34'),
(17, 17, '2026-10-08', '2026-10-08 02:50:52', '2026-10-08 02:50:52'),
(18, 18, '2026-10-08', '2026-10-08 08:11:46', '2026-10-08 08:11:46'),
(19, 1, '2026-10-08', '2026-10-08 08:12:20', '2026-10-08 08:12:20'),
(20, 21, '2026-10-08', '2026-10-08 08:19:21', '2026-10-08 08:19:21'),
(21, 23, '2026-10-08', '2026-10-08 08:28:09', '2026-10-08 08:28:09'),
(22, 24, '2026-10-08', '2026-10-08 08:31:35', '2026-10-08 08:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `journal_entry_lines`
--

CREATE TABLE `journal_entry_lines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `journal_entry_id` bigint(20) UNSIGNED NOT NULL,
  `account_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('debit','credit') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `journal_entry_lines`
--

INSERT INTO `journal_entry_lines` (`id`, `journal_entry_id`, `account_id`, `type`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'debit', 158.74, '2026-10-07 04:28:46', '2026-10-07 04:28:46'),
(2, 1, 2, 'credit', 151.18, '2026-10-07 04:28:46', '2026-10-07 04:28:46'),
(3, 1, 3, 'credit', 7.56, '2026-10-07 04:28:46', '2026-10-07 04:28:46'),
(4, 2, 1, 'debit', 1905.28, '2026-10-07 04:31:38', '2026-10-07 04:31:38'),
(5, 2, 2, 'credit', 1814.55, '2026-10-07 04:31:38', '2026-10-07 04:31:38'),
(6, 2, 3, 'credit', 90.73, '2026-10-07 04:31:38', '2026-10-07 04:31:38'),
(7, 3, 1, 'debit', 2012.92, '2026-10-07 04:34:07', '2026-10-07 04:34:07'),
(8, 3, 2, 'credit', 1917.07, '2026-10-07 04:34:07', '2026-10-07 04:34:07'),
(9, 3, 3, 'credit', 95.85, '2026-10-07 04:34:07', '2026-10-07 04:34:07'),
(10, 4, 1, 'debit', 1771.57, '2026-10-07 04:40:31', '2026-10-07 04:40:31'),
(11, 4, 2, 'credit', 1687.21, '2026-10-07 04:40:31', '2026-10-07 04:40:31'),
(12, 4, 3, 'credit', 84.36, '2026-10-07 04:40:31', '2026-10-07 04:40:31'),
(13, 5, 1, 'debit', 1905.28, '2026-10-07 04:41:01', '2026-10-07 04:41:01'),
(14, 5, 2, 'credit', 1814.55, '2026-10-07 04:41:01', '2026-10-07 04:41:01'),
(15, 5, 3, 'credit', 90.73, '2026-10-07 04:41:01', '2026-10-07 04:41:01'),
(16, 6, 1, 'debit', 7653.29, '2026-10-07 04:48:59', '2026-10-07 04:48:59'),
(17, 6, 2, 'credit', 7288.85, '2026-10-07 04:48:59', '2026-10-07 04:48:59'),
(18, 6, 3, 'credit', 364.44, '2026-10-07 04:48:59', '2026-10-07 04:48:59'),
(19, 7, 1, 'debit', 24801.99, '2026-10-07 04:58:02', '2026-10-07 04:58:02'),
(20, 7, 2, 'credit', 23620.94, '2026-10-07 04:58:02', '2026-10-07 04:58:02'),
(21, 7, 3, 'credit', 1181.05, '2026-10-07 04:58:02', '2026-10-07 04:58:02'),
(22, 8, 1, 'debit', 5782.14, '2026-10-07 04:58:38', '2026-10-07 04:58:38'),
(23, 8, 2, 'credit', 5506.80, '2026-10-07 04:58:38', '2026-10-07 04:58:38'),
(24, 8, 3, 'credit', 275.34, '2026-10-07 04:58:38', '2026-10-07 04:58:38'),
(25, 9, 1, 'debit', 1330.07, '2026-10-07 05:07:30', '2026-10-07 05:07:30'),
(26, 9, 2, 'credit', 1266.73, '2026-10-07 05:07:30', '2026-10-07 05:07:30'),
(27, 9, 3, 'credit', 63.34, '2026-10-07 05:07:30', '2026-10-07 05:07:30'),
(28, 10, 1, 'debit', 1433.55, '2026-10-07 05:18:52', '2026-10-07 05:18:52'),
(29, 10, 2, 'credit', 1365.29, '2026-10-07 05:18:52', '2026-10-07 05:18:52'),
(30, 10, 3, 'credit', 68.26, '2026-10-07 05:18:52', '2026-10-07 05:18:52'),
(31, 11, 1, 'debit', 3580.97, '2026-10-07 05:39:37', '2026-10-07 05:39:37'),
(32, 11, 2, 'credit', 3410.45, '2026-10-07 05:39:37', '2026-10-07 05:39:37'),
(33, 11, 3, 'credit', 170.52, '2026-10-07 05:39:37', '2026-10-07 05:39:37'),
(34, 12, 1, 'debit', 17202.65, '2026-10-07 06:26:07', '2026-10-07 06:26:07'),
(35, 12, 2, 'credit', 16383.48, '2026-10-07 06:26:07', '2026-10-07 06:26:07'),
(36, 12, 3, 'credit', 819.17, '2026-10-07 06:26:07', '2026-10-07 06:26:07'),
(37, 13, 1, 'debit', 17202.65, '2026-10-07 06:39:59', '2026-10-07 06:39:59'),
(38, 13, 2, 'credit', 16383.48, '2026-10-07 06:39:59', '2026-10-07 06:39:59'),
(39, 13, 3, 'credit', 819.17, '2026-10-07 06:39:59', '2026-10-07 06:39:59'),
(40, 14, 1, 'debit', 658.61, '2026-10-07 10:26:42', '2026-10-07 10:26:42'),
(41, 14, 2, 'credit', 627.25, '2026-10-07 10:26:42', '2026-10-07 10:26:42'),
(42, 14, 3, 'credit', 31.36, '2026-10-07 10:26:42', '2026-10-07 10:26:42'),
(43, 15, 1, 'debit', 7512.07, '2026-10-07 23:44:34', '2026-10-07 23:44:34'),
(44, 15, 2, 'credit', 7154.35, '2026-10-07 23:44:34', '2026-10-07 23:44:34'),
(45, 15, 3, 'credit', 357.72, '2026-10-07 23:44:34', '2026-10-07 23:44:34'),
(46, 16, 1, 'debit', 1905.28, '2026-10-08 01:30:34', '2026-10-08 01:30:34'),
(47, 16, 2, 'credit', 1814.55, '2026-10-08 01:30:34', '2026-10-08 01:30:34'),
(48, 16, 3, 'credit', 90.73, '2026-10-08 01:30:34', '2026-10-08 01:30:34'),
(49, 17, 1, 'debit', 489.30, '2026-10-08 02:50:52', '2026-10-08 02:50:52'),
(50, 17, 2, 'credit', 466.00, '2026-10-08 02:50:52', '2026-10-08 02:50:52'),
(51, 17, 3, 'credit', 23.30, '2026-10-08 02:50:52', '2026-10-08 02:50:52'),
(52, 18, 1, 'debit', 9578.69, '2026-10-08 08:11:46', '2026-10-08 08:11:46'),
(53, 18, 2, 'credit', 9122.56, '2026-10-08 08:11:46', '2026-10-08 08:11:46'),
(54, 18, 3, 'credit', 456.13, '2026-10-08 08:11:46', '2026-10-08 08:11:46'),
(55, 19, 1, 'debit', 10572.07, '2026-10-08 08:12:20', '2026-10-08 08:12:20'),
(56, 19, 2, 'credit', 10068.64, '2026-10-08 08:12:20', '2026-10-08 08:12:20'),
(57, 19, 3, 'credit', 503.43, '2026-10-08 08:12:20', '2026-10-08 08:12:20'),
(58, 20, 1, 'debit', 6318.90, '2026-10-08 08:19:21', '2026-10-08 08:19:21'),
(59, 20, 2, 'credit', 6018.00, '2026-10-08 08:19:21', '2026-10-08 08:19:21'),
(60, 20, 3, 'credit', 300.90, '2026-10-08 08:19:21', '2026-10-08 08:19:21'),
(61, 21, 1, 'debit', 8079.75, '2026-10-08 08:28:09', '2026-10-08 08:28:09'),
(62, 21, 2, 'credit', 7695.00, '2026-10-08 08:28:09', '2026-10-08 08:28:09'),
(63, 21, 3, 'credit', 384.75, '2026-10-08 08:28:09', '2026-10-08 08:28:09'),
(64, 22, 1, 'debit', 8079.75, '2026-10-08 08:31:35', '2026-10-08 08:31:35'),
(65, 22, 2, 'credit', 7695.00, '2026-10-08 08:31:35', '2026-10-08 08:31:35'),
(66, 22, 3, 'credit', 384.75, '2026-10-08 08:31:35', '2026-10-08 08:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(19, '0001_01_01_000000_create_users_table', 1),
(20, '0001_01_01_000001_create_cache_table', 1),
(21, '0001_01_01_000002_create_jobs_table', 1),
(22, '2026_10_05_132028_create_personal_access_tokens_table', 1),
(23, '2026_10_05_134038_create_customers_table', 1),
(24, '2026_10_05_134052_create_products_table', 1),
(25, '2026_10_05_134105_create_orders_table', 1),
(26, '2026_10_05_134113_create_order_items_table', 1),
(27, '2026_10_05_134128_create_accounts_table', 1),
(28, '2026_10_05_134143_create_journal_entries_table', 1),
(29, '2026_10_05_134200_create_journal_entry_lines_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `sub_total` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `tax_amount` decimal(10,2) NOT NULL,
  `grand_total` decimal(10,2) NOT NULL,
  `status` enum('Pending','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_number`, `sub_total`, `discount`, `tax_amount`, `grand_total`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'ORD-20261006-4995', 10068.64, 0.00, 503.43, 10572.07, 'Completed', '2026-10-06 09:40:07', '2026-10-08 08:12:20'),
(2, 2, 'ORD-20261007-9133', 16383.48, 0.00, 819.17, 17202.65, 'Completed', '2026-10-07 00:58:36', '2026-10-07 06:39:59'),
(3, 1, 'ORD-20261007-2020', 1365.29, 0.00, 68.26, 1433.55, 'Completed', '2026-10-07 01:33:01', '2026-10-07 05:18:52'),
(4, 1, 'ORD-20261007-7852', 5506.80, 0.00, 275.34, 5782.14, 'Completed', '2026-10-07 01:33:11', '2026-10-07 04:58:38'),
(5, 2, 'ORD-20261007-4984', 23620.94, 0.00, 1181.05, 24801.99, 'Completed', '2026-10-07 01:33:22', '2026-10-07 04:58:02'),
(6, 3, 'ORD-20261007-6008', 1917.07, 0.00, 95.85, 2012.92, 'Completed', '2026-10-07 01:33:41', '2026-10-07 04:34:07'),
(7, 1, 'ORD-20261007-7367', 7288.85, 0.00, 364.44, 7653.29, 'Completed', '2026-10-07 01:33:50', '2026-10-07 04:48:59'),
(8, 1, 'ORD-20261007-2883', 1814.55, 0.00, 90.73, 1905.28, 'Completed', '2026-10-07 01:33:56', '2026-10-07 04:41:01'),
(9, 1, 'ORD-20261007-5819', 1687.21, 0.00, 84.36, 1771.57, 'Completed', '2026-10-07 01:34:02', '2026-10-07 04:40:31'),
(10, 1, 'ORD-20261007-9727', 151.18, 0.00, 7.56, 158.74, 'Completed', '2026-10-07 01:34:08', '2026-10-07 04:28:46'),
(11, 7, 'ORD-20261007-9802', 1814.55, 0.00, 90.73, 1905.28, 'Completed', '2026-10-07 02:08:52', '2026-10-07 04:31:38'),
(12, 14, 'ORD-20261007-7027', 1266.73, 0.00, 63.34, 1330.07, 'Completed', '2026-10-07 05:07:25', '2026-10-07 05:07:30'),
(13, 9, 'ORD-20261007-8652', 3410.45, 0.00, 170.52, 3580.97, 'Completed', '2026-10-07 05:39:32', '2026-10-07 05:39:37'),
(14, 3, 'ORD-20261007-6775', 627.25, 0.00, 31.36, 658.61, 'Completed', '2026-10-07 10:26:25', '2026-10-07 10:26:42'),
(15, 5, 'ORD-20261008-8189', 7154.35, 0.00, 357.72, 7512.07, 'Completed', '2026-10-07 23:44:18', '2026-10-07 23:44:34'),
(16, 18, 'ORD-20261008-6113', 1814.55, 0.00, 90.73, 1905.28, 'Completed', '2026-10-08 01:30:22', '2026-10-08 01:30:34'),
(17, 5, 'ORD-20261008-8364', 466.00, 0.00, 23.30, 489.30, 'Completed', '2026-10-08 02:50:45', '2026-10-08 02:50:52'),
(18, 23, 'ORD-20261008-6375', 9122.56, 0.00, 456.13, 9578.69, 'Completed', '2026-10-08 08:11:28', '2026-10-08 08:11:46'),
(21, 23, 'ORD-20261008-6844', 6018.00, 0.00, 300.90, 6318.90, 'Completed', '2026-10-08 08:19:05', '2026-10-08 08:19:21'),
(22, 5, 'ORD-20261008-1707', 1266.73, 0.00, 63.34, 1330.07, 'Pending', '2026-10-08 08:24:05', '2026-10-08 08:24:05'),
(23, 23, 'ORD-20261008-5596', 7695.00, 0.00, 384.75, 8079.75, 'Completed', '2026-10-08 08:27:45', '2026-10-08 08:28:09'),
(24, 23, 'ORD-20261008-6548', 7695.00, 0.00, 384.75, 8079.75, 'Completed', '2026-10-08 08:31:08', '2026-10-08 08:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `line_total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `line_total`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 10, 550.00, 5500.00, '2026-10-06 09:40:07', '2026-10-06 09:40:07'),
(2, 1, 64, 12, 380.72, 4568.64, '2026-10-06 09:40:07', '2026-10-06 09:40:07'),
(3, 2, 29, 12, 1365.29, 16383.48, '2026-10-07 00:58:36', '2026-10-07 00:58:36'),
(4, 3, 29, 1, 1365.29, 1365.29, '2026-10-07 01:33:01', '2026-10-07 01:33:01'),
(5, 4, 24, 12, 458.90, 5506.80, '2026-10-07 01:33:11', '2026-10-07 01:33:11'),
(6, 5, 43, 14, 1687.21, 23620.94, '2026-10-07 01:33:22', '2026-10-07 01:33:22'),
(7, 6, 26, 1, 1917.07, 1917.07, '2026-10-07 01:33:41', '2026-10-07 01:33:41'),
(8, 7, 37, 5, 1457.77, 7288.85, '2026-10-07 01:33:50', '2026-10-07 01:33:50'),
(9, 8, 61, 1, 1814.55, 1814.55, '2026-10-07 01:33:56', '2026-10-07 01:33:56'),
(10, 9, 43, 1, 1687.21, 1687.21, '2026-10-07 01:34:02', '2026-10-07 01:34:02'),
(11, 10, 16, 1, 151.18, 151.18, '2026-10-07 01:34:08', '2026-10-07 01:34:08'),
(12, 11, 61, 1, 1814.55, 1814.55, '2026-10-07 02:08:52', '2026-10-07 02:08:52'),
(13, 12, 11, 1, 1266.73, 1266.73, '2026-10-07 05:07:25', '2026-10-07 05:07:25'),
(14, 13, 29, 1, 1365.29, 1365.29, '2026-10-07 05:39:32', '2026-10-07 05:39:32'),
(15, 13, 11, 1, 1266.73, 1266.73, '2026-10-07 05:39:32', '2026-10-07 05:39:32'),
(16, 13, 20, 1, 627.25, 627.25, '2026-10-07 05:39:32', '2026-10-07 05:39:32'),
(17, 13, 16, 1, 151.18, 151.18, '2026-10-07 05:39:32', '2026-10-07 05:39:32'),
(18, 14, 20, 1, 627.25, 627.25, '2026-10-07 10:26:25', '2026-10-07 10:26:25'),
(19, 15, 23, 5, 1430.87, 7154.35, '2026-10-07 23:44:18', '2026-10-07 23:44:18'),
(20, 16, 61, 1, 1814.55, 1814.55, '2026-10-08 01:30:22', '2026-10-08 01:30:22'),
(21, 17, 75, 2, 233.00, 466.00, '2026-10-08 02:50:45', '2026-10-08 02:50:45'),
(22, 18, 78, 2, 333.00, 666.00, '2026-10-08 08:11:28', '2026-10-08 08:11:28'),
(23, 18, 42, 2, 1646.60, 3293.20, '2026-10-08 08:11:28', '2026-10-08 08:11:28'),
(24, 18, 62, 4, 1290.84, 5163.36, '2026-10-08 08:11:28', '2026-10-08 08:11:28'),
(27, 21, 79, 2, 2343.00, 4686.00, '2026-10-08 08:19:05', '2026-10-08 08:19:05'),
(28, 21, 78, 4, 333.00, 1332.00, '2026-10-08 08:19:05', '2026-10-08 08:19:05'),
(29, 22, 11, 1, 1266.73, 1266.73, '2026-10-08 08:24:05', '2026-10-08 08:24:05'),
(30, 23, 79, 3, 2343.00, 7029.00, '2026-10-08 08:27:45', '2026-10-08 08:27:45'),
(31, 23, 78, 2, 333.00, 666.00, '2026-10-08 08:27:45', '2026-10-08 08:27:45'),
(32, 24, 79, 3, 2343.00, 7029.00, '2026-10-08 08:31:08', '2026-10-08 08:31:08'),
(33, 24, 78, 2, 333.00, 666.00, '2026-10-08 08:31:08', '2026-10-08 08:31:08');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(62, 'App\\Models\\User', 2, 'token', 'eff5377da14caf41ab19034f68489e9e7c565c337e84fde26d6f8570f16053d8', '[\"*\"]', '2026-10-08 04:05:15', NULL, '2026-10-08 01:48:28', '2026-10-08 04:05:15'),
(63, 'App\\Models\\User', 2, 'token', '8a5bed777e3bfc58838c01a5515d357e2f5362870a8bc874714c60a440998ee0', '[\"*\"]', '2026-10-08 05:15:20', NULL, '2026-10-08 05:03:09', '2026-10-08 05:15:20'),
(64, 'App\\Models\\User', 2, 'token', '920fb766c2a5a388ac175630559bdbb57cec851f84fe7bdd0b67a110c71b26e0', '[\"*\"]', '2026-10-08 05:18:30', NULL, '2026-10-08 05:18:30', '2026-10-08 05:18:30'),
(66, 'App\\Models\\User', 2, 'token', '8d5935b47afbf4df70caa4a9afd42ed2487c5a7bfb541e39deca20d78097358b', '[\"*\"]', '2026-10-08 07:03:35', NULL, '2026-10-08 06:18:20', '2026-10-08 07:03:35'),
(75, 'App\\Models\\User', 20, 'token', '1227f3a156df4ff1639eb7a3c66435005c7f6b032db6626c3536b9dc4d6c07b5', '[\"*\"]', '2026-10-08 09:47:09', NULL, '2026-10-08 09:07:58', '2026-10-08 09:47:09');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `sku`, `price`, `stock_quantity`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Logitech Wireless Mouse', 'PRD-MOU-001', 850.00, 50, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(3, 'Dell 22-inch Monitor', 'PRD-MON-003', 12500.00, 10, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:28:01', '2026-10-06 09:28:01'),
(4, 'HP 16GB Pendrive', 'PRD-PEN-004', 550.00, 40, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:28:01', '2026-10-08 08:12:20'),
(5, 'JBL Gaming Mouse', 'PRD-toh-5257', 252.77, 100, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 06:44:36'),
(6, 'Logitech Headphone', 'PRD-lvz-1345', 1589.90, 14, 'uploads/products/1791463515_6ac7905beb343.png', '2026-10-06 09:29:25', '2026-10-08 06:45:15'),
(7, 'UGREEN RAM', 'PRD-zlx-4754', 1113.34, 100, 'uploads/products/1791463573_6ac790950fc43.png', '2026-10-06 09:29:25', '2026-10-08 06:46:13'),
(8, 'Logitech Gaming Mouse', 'PRD-vnq-8065', 1968.02, 90, 'uploads/products/1791463626_6ac790ca1c0e6.png', '2026-10-06 09:29:25', '2026-10-08 08:24:53'),
(9, 'Xiaomi Gaming Mouse', 'PRD-pwv-0565', 1186.15, 5, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(10, 'Anker Bluetooth Speaker', 'PRD-aaq-5571', 1349.16, 77, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(11, 'A4Tech Wireless Mouse', 'PRD-byp-6116', 1266.73, 65, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 05:39:37'),
(12, 'hello', 'sku', 233.00, 4, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 01:51:04'),
(13, 'JBL Pendrive', 'PRD-nmq-3719', 1474.45, 34, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(14, 'Dell Laptop Stand', 'PRD-lry-2031', 251.98, 0, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 04:07:30'),
(15, 'Sony Keyboard', 'PRD-uzx-6201', 1473.32, 78, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(16, 'Corsair Pendrive', 'PRD-eaw-6320', 151.18, 11, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 05:39:37'),
(17, 'Sony USB Cable', 'PRD-hzz-8672', 683.96, 34, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(18, 'TP-Link Gaming Mouse', 'PRD-ufq-3997', 1607.78, 63, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(19, 'HP Wireless Mouse', 'PRD-wtm-7516', 649.32, 33, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(20, 'ASUS Laptop Stand', 'PRD-hxj-2013', 627.25, 88, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 10:26:42'),
(21, 'Logitech USB Hub', 'PRD-tzb-5323', 1654.75, 27, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(22, 'HP Laptop Stand', 'PRD-vwn-5586', 219.11, 13, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(23, 'Corsair RAM', 'PRD-ume-2660', 1430.87, 5, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 23:44:34'),
(24, 'Corsair Laptop Stand', 'PRD-aff-1085', 458.90, 0, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 04:58:38'),
(25, 'Xiaomi WiFi Router', 'PRD-fqa-0356', 736.60, 66, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(26, 'Anker RAM', 'PRD-odz-1076', 1917.07, 95, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 04:34:07'),
(27, 'UGREEN Power Bank', 'PRD-zvz-4485', 1824.26, 82, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(28, 'ASUS Laptop Stand', 'PRD-hqs-3452', 1535.43, 6, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(29, 'A4Tech Webcam', 'PRD-bqx-3736', 1365.29, 42, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 06:39:59'),
(30, 'Kingston RAM', 'PRD-etr-3794', 786.08, 43, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(31, 'Samsung USB Cable', 'PRD-mbh-6725', 620.61, 55, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(32, 'ASUS SSD', 'PRD-wlc-1529', 1018.10, 38, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(33, 'HP Headphone', 'PRD-qgk-0420', 1948.10, 10, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(34, 'Logitech WiFi Router', 'PRD-qlk-5622', 1928.15, 89, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(35, 'Samsung Webcam', 'PRD-yyh-9180', 654.07, 71, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(36, 'Lenovo RAM', 'PRD-qrl-9286', 1374.77, 43, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(37, 'Corsair Power Bank', 'PRD-loz-3074', 1457.77, 73, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 04:48:59'),
(38, 'Sony Pendrive', 'PRD-ygw-3224', 654.95, 43, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(39, 'TP-Link RAM', 'PRD-ugo-3602', 983.59, 7, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(40, 'Samsung RAM', 'PRD-fqx-3465', 1190.34, 13, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(41, 'Sony Gaming Mouse', 'PRD-ysm-2052', 741.87, 76, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(42, 'Dell WiFi Router', 'PRD-bzd-6953', 1646.60, 14, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 08:11:46'),
(43, 'Dell Bluetooth Speaker', 'PRD-sqp-9330', 1687.21, 76, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-07 04:58:02'),
(44, 'UGREEN Headphone', 'PRD-dii-1992', 387.49, 71, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(45, 'Anker Keyboard', 'PRD-sio-7757', 1225.64, 1, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(46, 'Sony Pendrive', 'PRD-hbq-9607', 1046.07, 14, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(47, 'Sony USB Cable', 'PRD-mhq-9112', 674.86, 67, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(48, 'Logitech USB Cable', 'PRD-byl-9390', 690.37, 6, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(49, 'TP-Link WiFi Router', 'PRD-zfm-0395', 1505.94, 47, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(50, 'Samsung WiFi Router', 'PRD-vwj-6102', 1748.25, 29, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(51, 'JBL USB Cable', 'PRD-flx-5067', 558.22, 74, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(52, 'HP Webcam', 'PRD-mys-3364', 820.82, 67, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(53, 'Kingston Power Bank', 'PRD-gvo-0965', 553.46, 62, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(54, 'Xiaomi Laptop Stand', 'PRD-vhc-0480', 1697.58, 50, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(55, 'UGREEN Headphone', 'PRD-ooo-8935', 643.38, 32, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(56, 'Logitech Type-C Cable', 'PRD-ykq-5691', 1493.50, 65, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(57, 'TP-Link SSD', 'PRD-jnj-1444', 698.17, 49, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(58, 'TP-Link Type-C Cable', 'PRD-hcm-2367', 1758.37, 48, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(59, 'TP-Link Pendrive', 'PRD-fou-1070', 1885.47, 60, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(60, 'Sony Webcam', 'PRD-ovu-4161', 1154.88, 83, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(61, 'Corsair Power Bank', 'PRD-ygd-2145', 1814.55, 6, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 01:30:34'),
(62, 'A4Tech USB Cable', 'PRD-oez-6570', 1290.84, 8, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 08:11:46'),
(63, 'Kingston Wireless Mouse', 'PRD-rqq-9154', 856.79, 87, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(64, 'Lenovo SSD', 'PRD-ung-5937', 380.72, 72, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-08 08:12:20'),
(65, 'Kingston USB Hub', 'PRD-jfc-4844', 1094.54, 50, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(66, 'JBL USB Hub', 'PRD-uxm-0603', 716.16, 86, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(67, 'Sony Webcam', 'PRD-kaa-8762', 652.39, 87, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(68, 'TP-Link Bluetooth Speaker', 'PRD-oae-1254', 732.72, 59, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(69, 'Xiaomi Bluetooth Speaker', 'PRD-aku-4506', 1745.21, 23, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(70, 'Sony Power Bank', 'PRD-emp-8555', 1359.18, 25, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(71, 'Samsung USB Hub', 'PRD-yiq-4894', 1274.54, 78, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(72, 'Logitech Power Bank', 'PRD-zly-2248', 1438.50, 71, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(73, 'Logitech Webcam', 'PRD-hiq-8706', 254.44, 61, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(74, 'Kingston Laptop Stand', 'PRD-zcx-2059', 1239.66, 79, 'uploads/products/1791463476_6ac7903413777.png', '2026-10-06 09:29:25', '2026-10-06 09:29:25'),
(75, 'ASUS Laptop Stand', 'PRD-toh-5250', 233.00, 5, 'uploads/products/1791464058_6ac7927a90c56.png', '2026-10-08 01:52:06', '2026-10-08 06:54:36'),
(78, 'Wireless Mouse', 'PRD-toh-5254', 333.00, 2, 'uploads/products/1791468929_6ac7a581b0f4f.png', '2026-10-08 05:10:03', '2026-10-08 08:31:35'),
(79, 'Extended Mouse Pad', 'PRD-toh-5258', 2343.00, 20, 'uploads/products/1791463430_6ac790066c900.png', '2026-10-08 05:13:10', '2026-10-08 08:32:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(20, 'Akbar Sami', 'me.akbarsami@gmail.com', NULL, '$2y$12$jEmxGuMEix4a1idQyRDyp.G3di0TZ5m0rgGqVUBEmjxjH.VJfwR0y', NULL, '2026-10-08 07:08:04', '2026-10-08 07:08:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_phone_unique` (`phone`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `journal_entries_order_id_foreign` (`order_id`);

--
-- Indexes for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `journal_entry_lines_journal_entry_id_foreign` (`journal_entry_id`),
  ADD KEY `journal_entry_lines_account_id_foreign` (`account_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal_entries`
--
ALTER TABLE `journal_entries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD CONSTRAINT `journal_entries_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  ADD CONSTRAINT `journal_entry_lines_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `journal_entry_lines_journal_entry_id_foreign` FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
