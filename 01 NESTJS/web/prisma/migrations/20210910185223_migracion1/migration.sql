-- CreateTable
CREATE TABLE `EPN_USUARIO` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `apellido` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
