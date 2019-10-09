CREATE TABLE `chat`.`message` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `channel_id` INT NOT NULL ,
    `username` VARCHAR(50) NOT NULL ,
    `message` VARCHAR(50) NOT NULL ,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;