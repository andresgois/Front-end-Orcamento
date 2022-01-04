-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04-Jan-2022 às 16:10
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `orcamento`
--
CREATE DATABASE IF NOT EXISTS `orcamento` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `orcamento`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `conta`
--

DROP TABLE IF EXISTS `conta`;
CREATE TABLE `conta` (
  `id_conta` int(11) NOT NULL,
  `data_compra` date NOT NULL,
  `descricao` varchar(150) NOT NULL,
  `parcelas` int(11) NOT NULL,
  `valor` decimal(12,2) NOT NULL,
  `id_pagamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `conta`
--

INSERT INTO `conta` (`id_conta`, `data_compra`, `descricao`, `parcelas`, `valor`, `id_pagamento`) VALUES
(1, '2021-01-25', 'Celular Galaxy', 2, '195.90', 3),
(2, '2021-02-10', 'Microondas', 3, '49.90', 1),
(3, '2021-01-01', 'PC Positivo', 4, '39.27', 1),
(4, '2021-01-10', 'Viagem', 8, '98.90', 1),
(5, '2020-10-30', 'Material Escolar', 10, '35.50', 1);

--
-- Acionadores `conta`
--
DROP TRIGGER IF EXISTS `conta_AFTER_INSERT`;
DELIMITER $$
CREATE TRIGGER `conta_AFTER_INSERT` AFTER INSERT ON `conta` FOR EACH ROW BEGIN
	SET @cont := 0;
	SET @vencimento := ( SELECT vencimento FROM conta c INNER JOIN tipo_pagamento tp on c.id_pagamento = tp.id_pagamento WHERE id_conta = NEW.id_conta);
	SET @melhor_dia := (SELECT melhor_dia_compra FROM conta c INNER JOIN tipo_pagamento tp on c.id_pagamento = tp.id_pagamento WHERE id_conta = NEW.id_conta);
    SET @parc := (SELECT parcelas FROM conta WHERE id_conta = NEW.id_conta);
    SET @data_compra := (select data_compra from conta where id_conta = NEW.id_conta);
    SET @dia_compra := (select DAY(data_compra) from conta where id_conta = NEW.id_conta);
    SET @num_parc := 1;
    
    WHILE @cont < @parc DO
		IF @dia_compra > @melhor_dia THEN
			SET @dat := (SELECT adddate(@data_compra, INTERVAL @cont+1 MONTH));
            INSERT INTO relatorio (conta_id, data_parcela,parc_atual) values (NEW.id_conta , @dat, @num_parc);           
		ELSE 
			SET @dat := (SELECT adddate(@data_compra, INTERVAL @cont MONTH));
            INSERT INTO relatorio (conta_id, data_parcela,parc_atual) values (NEW.id_conta , @dat, @num_parc);    
        END IF;		 		 
        SET @cont := @cont + 1;
        SET @num_parc := @num_parc + 1;
    END WHILE;
   
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorio`
--

DROP TABLE IF EXISTS `relatorio`;
CREATE TABLE `relatorio` (
  `id` int(11) NOT NULL,
  `conta_id` varchar(145) NOT NULL,
  `data_parcela` date NOT NULL,
  `parc_atual` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `relatorio`
--

INSERT INTO `relatorio` (`id`, `conta_id`, `data_parcela`, `parc_atual`) VALUES
(1, '1', '2021-01-25', 1),
(2, '1', '2021-02-25', 2),
(3, '2', '2021-03-10', 1),
(4, '2', '2021-04-10', 2),
(5, '2', '2021-05-10', 3),
(6, '3', '2021-01-01', 1),
(7, '3', '2021-02-01', 2),
(8, '3', '2021-03-01', 3),
(9, '3', '2021-04-01', 4),
(10, '4', '2021-02-10', 1),
(11, '4', '2021-03-10', 2),
(12, '4', '2021-04-10', 3),
(13, '4', '2021-05-10', 4),
(14, '4', '2021-06-10', 5),
(15, '4', '2021-07-10', 6),
(16, '4', '2021-08-10', 7),
(17, '4', '2021-09-10', 8),
(18, '5', '2020-11-30', 1),
(19, '5', '2020-12-30', 2),
(20, '5', '2021-01-30', 3),
(21, '5', '2021-02-28', 4),
(22, '5', '2021-03-30', 5),
(23, '5', '2021-04-30', 6),
(24, '5', '2021-05-30', 7),
(25, '5', '2021-06-30', 8),
(26, '5', '2021-07-30', 9),
(27, '5', '2021-08-30', 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_pagamento`
--

DROP TABLE IF EXISTS `tipo_pagamento`;
CREATE TABLE `tipo_pagamento` (
  `id_pagamento` int(11) NOT NULL,
  `pagamento` varchar(145) NOT NULL,
  `vencimento` int(11) NOT NULL,
  `melhor_dia_compra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tipo_pagamento`
--

INSERT INTO `tipo_pagamento` (`id_pagamento`, `pagamento`, `vencimento`, `melhor_dia_compra`) VALUES
(1, 'Ouro', 13, 1),
(3, 'Americanas', 17, 10),
(37, 'Nubank', 20, 13),
(38, 'Hiper', 8, 1),
(41, 'Inter', 25, 10),
(42, 'Next3', 12, 2),
(46, 'Pic Pay', 10, 4);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `conta`
--
ALTER TABLE `conta`
  ADD PRIMARY KEY (`id_conta`),
  ADD KEY `FK_Conta_Pag` (`id_pagamento`);

--
-- Índices para tabela `relatorio`
--
ALTER TABLE `relatorio`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tipo_pagamento`
--
ALTER TABLE `tipo_pagamento`
  ADD PRIMARY KEY (`id_pagamento`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `conta`
--
ALTER TABLE `conta`
  MODIFY `id_conta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `relatorio`
--
ALTER TABLE `relatorio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `tipo_pagamento`
--
ALTER TABLE `tipo_pagamento`
  MODIFY `id_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `conta`
--
ALTER TABLE `conta`
  ADD CONSTRAINT `FK_Conta_Pag` FOREIGN KEY (`id_pagamento`) REFERENCES `tipo_pagamento` (`id_pagamento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
