-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Nov 2019 pada 08.10
-- Versi server: 10.1.37-MariaDB
-- Versi PHP: 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skedan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id_customer` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `no_hp` varchar(14) DEFAULT NULL,
  `isadmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id_customer`, `nama`, `alamat`, `email`, `password`, `no_hp`, `isadmin`) VALUES
('15f21692-97e6-427c-99bb-a35831be60c6', 'didi', 'Medan', 'didi@mail.com', 'bac', '081236278726', 0),
('5e42c68f-cd3d-48db-905c-eb44b5f55420', 'andi', 'Medan', 'didi@mail.com', 'aku', '081236278726', 0),
('75139672-5d91-4961-a512-5f65bac678b3', 'budiman', 'medan', 'budi@mail.com', 'aaa', '081238189', 0),
('admin001', 'Admin', 'Medan', 'admin@admin.com', 'admin', NULL, 1),
('e401d4f3-b20e-4772-b728-eba5a865ffd3', 'Yuni', 'Medan', 'yuni@Mail.com', 'ccc', '0812371289', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar`
--

CREATE TABLE `komentar` (
  `id_komentar` varchar(100) NOT NULL,
  `id_pesanan` varchar(100) NOT NULL,
  `id_customer` varchar(100) NOT NULL,
  `pesan` varchar(500) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `komentar`
--

INSERT INTO `komentar` (`id_komentar`, `id_pesanan`, `id_customer`, `pesan`, `tanggal`) VALUES
('334cc7ab-2e02-404e-ba0a-24fe6a678b32', '0a37a508-b861-415f-992f-f05c8503658a', '75139672-5d91-4961-a512-5f65bac678b3', 'oi ', '2019-11-29 17:07:33'),
('607f34ed-731d-4e5a-90b7-fee741881175', '0a37a508-b861-415f-992f-f05c8503658a', 'admin001', 'udah bro\r\n', '2019-11-29 17:20:48'),
('67054384-a2f0-4262-9167-a12a36f97c0a', '0a37a508-b861-415f-992f-f05c8503658a', '75139672-5d91-4961-a512-5f65bac678b3', 'apaan ini', '2019-11-29 17:07:39'),
('81d497d2-8913-420c-8111-590a2433c98c', '1af91131-9ec1-48e8-9e36-64faaceaeac0', '5e42c68f-cd3d-48db-905c-eb44b5f55420', 'cepat selesaikan ya', '2019-11-30 11:31:46'),
('94b86234-53cf-4546-a887-5c5236187258', '089790bb-2a63-40ab-856e-dea74911fbf3', '75139672-5d91-4961-a512-5f65bac678b3', 'bagus buat oi', '2019-11-29 00:42:18'),
('9de7b235-0c9b-4de6-83a0-95b02f091c32', '0a37a508-b861-415f-992f-f05c8503658a', '75139672-5d91-4961-a512-5f65bac678b3', 'ini apaan??', '2019-11-29 17:07:26'),
('a6d19f0d-d4a3-47f2-8f22-4f2698c34db0', '089790bb-2a63-40ab-856e-dea74911fbf3', 'admin001', 'udah paling bagus itu kampret', '2019-11-29 00:42:36'),
('c5e5b006-c2c2-4dc7-93da-991c0a1052f3', '1af91131-9ec1-48e8-9e36-64faaceaeac0', 'admin001', 'ok bang', '2019-11-30 11:32:25'),
('f09f0f31-7cdb-4d46-9b25-74f3517e167c', '0a37a508-b861-415f-992f-f05c8503658a', '75139672-5d91-4961-a512-5f65bac678b3', 'ok makasih bang', '2019-11-29 17:26:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pesanan` varchar(100) NOT NULL,
  `id_customer` varchar(100) DEFAULT NULL,
  `jenis` varchar(50) DEFAULT NULL,
  `biaya` int(11) DEFAULT NULL,
  `ukuran_bingkai` varchar(10) DEFAULT NULL,
  `jumlah_orang` int(11) DEFAULT NULL,
  `ekspedisi` varchar(100) DEFAULT NULL,
  `gambar` varchar(100) DEFAULT NULL,
  `tulisan` varchar(1000) DEFAULT NULL,
  `keterangan` varchar(1000) DEFAULT NULL,
  `pembayaran` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `tanggal` datetime NOT NULL,
  `gambar_konfirmasi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pemesanan`
--

INSERT INTO `pemesanan` (`id_pesanan`, `id_customer`, `jenis`, `biaya`, `ukuran_bingkai`, `jumlah_orang`, `ekspedisi`, `gambar`, `tulisan`, `keterangan`, `pembayaran`, `status`, `tanggal`, `gambar_konfirmasi`) VALUES
('089790bb-2a63-40ab-856e-dea74911fbf3', '75139672-5d91-4961-a512-5f65bac678b3', 'Sketsa Pensil', 100000, '8\" x 12\"', 2, NULL, '/asset/img/gambar_pemesanan/undefined-1574962729676.png', '', '', 'Belum Dibayar', 'Konfirmasi Gambar', '2019-11-29 00:38:49', '/asset/img/gambar_konfirmasi/Konfirmasi_1574962846653.png'),
('0a37a508-b861-415f-992f-f05c8503658a', '75139672-5d91-4961-a512-5f65bac678b3', 'Wedha\'s Pop Art Potrait (WPAP)', 70000, '8\" x 10\"', 1, NULL, '/asset/img/gambar_pemesanan/undefined-1574962412822.jpg', '', '', 'Belum Dibayar', 'Dalam Pengiriman', '2019-11-29 00:33:32', '/asset/img/gambar_konfirmasi/Konfirmasi_1574962557319.png'),
('1af91131-9ec1-48e8-9e36-64faaceaeac0', '5e42c68f-cd3d-48db-905c-eb44b5f55420', 'Wedha\'s Pop Art Potrait (WPAP)', 90000, '8\" x 12\"', 1, NULL, '/asset/img/gambar_pemesanan/undefined-1575088298444.png', 'abcd', '', 'Belum Dibayar', 'Dalam Pengiriman', '2019-11-30 11:31:38', '/asset/img/gambar_konfirmasi/Konfirmasi_1575088389280.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indeks untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id_komentar`),
  ADD KEY `FK_komentar1` (`id_pesanan`),
  ADD KEY `FK_komentar2` (`id_customer`);

--
-- Indeks untuk tabel `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `FK_pemesanan` (`id_customer`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `FK_komentar1` FOREIGN KEY (`id_pesanan`) REFERENCES `pemesanan` (`id_pesanan`),
  ADD CONSTRAINT `FK_komentar2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `FK_pemesanan` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
