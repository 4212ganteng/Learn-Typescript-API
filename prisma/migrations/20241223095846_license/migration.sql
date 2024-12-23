-- CreateTable
CREATE TABLE `apks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `version` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `url` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `licenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `apkId` INTEGER NOT NULL,
    `licenseKey` VARCHAR(191) NOT NULL,
    `hwid` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `expiryDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `licenses_licenseKey_key`(`licenseKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `licenses` ADD CONSTRAINT `licenses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `licenses` ADD CONSTRAINT `licenses_apkId_fkey` FOREIGN KEY (`apkId`) REFERENCES `apks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
