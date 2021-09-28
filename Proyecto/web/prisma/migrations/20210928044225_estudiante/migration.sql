/*
  Warnings:

  - You are about to drop the `Moto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Moto`;

-- CreateTable
CREATE TABLE `Estudiante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `calificacion` DOUBLE NOT NULL,
    `edad` INTEGER NOT NULL,
    `anio` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
