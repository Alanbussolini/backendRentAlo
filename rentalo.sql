-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-08-2023 a las 23:56:01
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rentalo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(22, 'Beneficios exclusivos con banco Santander', 'Aplican T&C', 'Con tu tarjeta del banco Santander vas a poder acceder a cuotas sin interés para pagar tu alojamiento, así como beneficios en restaurantes.', 'gwxwmrwgkirqtrkt0erb'),
(18, 'En RentAlo podes pagar hasta en 24 cuotas', 'Aplican T&C', 'En RentAlo vas a poder pagar tu estadía hasta en 24 cuotas con el plan Ahora 24.', 'ng2abxmd4avclmpeb2k4'),
(17, 'Utilizá tu tarjeta pre viaje', 'Válido lo que dure el pre viaje 5', 'Con tu tarjeta pre viaje, vas a poder acceder al reintegro del 50% en tu estadía de todos los destinos nacionales de RentAlo.', 'qxa0k6cjrzsiozxnp4qu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pinadeptos`
--

DROP TABLE IF EXISTS `pinadeptos`;
CREATE TABLE IF NOT EXISTS `pinadeptos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `pinadeptos`
--

INSERT INTO `pinadeptos` (`id`, `titulo`, `cuerpo`, `img_id`) VALUES
(7, 'Departamento con salida a la playa', 'Departamento ubicado a 6 cuadras del centro y con salida a la playa.', 'gaunqzysennqbj53chjy'),
(8, 'Antiguo departamento en zona residencial', 'Ideal aprovechar la tranquilidad que ofrece un condominio en tus vacacones.', 'o8eltgng9owwbwlbji0l'),
(9, 'Moderno departamento a 1 cuadra de la playa', 'Amplio departamento muy luminoso.', 'wbfw6pvtzlynwpfilbnb'),
(10, 'Departamento con salida directa a la playa', 'Ubicado en un moderno edificio que ofrece SUM, pileta y gimnasio.', 'r6blqbm2cmxd9gj7bpuf'),
(11, 'Moderno departamento 3 ambientes', 'Ideal para aprovechar las vacaciones estando cerca de la playa.', 'h4scl4avnupt4gi0sash');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `santadeptos`
--

DROP TABLE IF EXISTS `santadeptos`;
CREATE TABLE IF NOT EXISTS `santadeptos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `santadeptos`
--

INSERT INTO `santadeptos` (`id`, `titulo`, `cuerpo`, `img_id`) VALUES
(1, 'Departamento en calle 28&2', 'Este maravilloso departamento cuenta con una ubicación privilegiada a metros de la playa', 'qxxxuzjl8raehjlovrfp'),
(6, 'Casa p/ 4 personas', 'Casa espaciosa que cuenta con 1 cama matrimonial y 2 individuales, para que pases las mejores vacaciones junto a tu familia', 'zrr7ggqeuyqtfrmi673t'),
(7, 'Departamento con vista al mar', 'Como puede observarse en la foto, este departamento cuenta con un amplio balcón, con parrilla y sillas, para disfrutar de una hermosa vista.', 'ngadn6bmyzulaw2bbxbg'),
(8, 'Casa p/ 8 personas en el monte', 'Esta amplia casa es ideal para una familia grande, o bien grupo de amigos, que tenga ganas de disfrutar de la tranquilidad del monte.', 'ffnebbytydtxrsn3ia5e'),
(9, 'Lujoso departamento', 'Departamento moderno con 3 ambientes, ubicado en zona centro y a 2 cuadras de la playa.', 'az3jcxikb77pj1ukbjyh');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'alan', 'a591024321c5e2bdbd23ed35f0574dde');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
