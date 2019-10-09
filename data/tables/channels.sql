CREATE TABLE `chat`.`channels` ( 
    `id` INT NOT NULL AUTO_INCREMENT ,
    `title` VARCHAR(50) NOT NULL ,
    `description` VARCHAR(50) NOT NULL ,
    `icon` VARCHAR(50) NOT NULL DEFAULT 'Home' ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;