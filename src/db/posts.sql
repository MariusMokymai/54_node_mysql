-- Create posts table

CREATE TABLE `bit_main`.`posts` 
(
  `post_id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(255) NOT NULL , 
`author` VARCHAR(255) NOT NULL , 
`date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , 
`content` TEXT NOT NULL , 
PRIMARY KEY (`post_id`)) 
ENGINE = InnoDB;

-- insert 2 rows
INSERT INTO `posts` (`title`, `author`, `date`, `content`) 
VALUES 
('Post 1', 'James Band', current_timestamp(), 'Body of post 1'), 
('Post 2', 'Jane Dow', '2023-12-14', 'Body of post 2')