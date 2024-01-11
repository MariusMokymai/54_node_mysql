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
INSERT INTO posts (title, author, date, content) 
VALUES 
('Post 3', 'James Band', '2023-12-24', 'Body of post 3'), 
('Post 4', 'Jane Dow', '2023-12-25', 'Body of post 4'),
('Post 5', 'Jane Dow', '2023-12-25', 'Body of post 5')

-- comments table 

CREATE TABLE `bit_main`.`post_comments` (`comm_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `author` VARCHAR(255) NOT NULL , `comment` TEXT NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `post_id` INT UNSIGNED NOT NULL , PRIMARY KEY (`comm_id`)) ENGINE = InnoDB;

-- users table 

CREATE TABLE `bit_main`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `emailUniq` (`email`(255))) ENGINE = InnoDB;

-- create a table post_comments

CREATE TABLE `bit_main`.`post_comments` 
(
  `comm_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `author` VARCHAR(255) NOT NULL ,
  `comment` TEXT NOT NULL ,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `post_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`comm_id`))
ENGINE = InnoDB;

-- add 5 comments to post_comments table

INSERT INTO post_comments (author, comment, post_id)
VALUES
('John Doe', 'Great post!', 1),
('Sarah Smith', 'Very informative', 2),
('Michael Johnson', 'I learned a lot', 1),
('Emily Brown', 'Well written', 3),
('David Wilson', 'Thanks for sharing', 4)
('James Bond', 'I was a great post', 1),
('Jane Dow', 'how did you manage that ', 2)


-- create a table books

CREATE TABLE `bit_main`.`books` 
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(255) NOT NULL ,
  `author` VARCHAR(255) NOT NULL ,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`))

-- create a table book_comments

CREATE TABLE `bit_main`.`book_comments` 
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `author` VARCHAR(255) NOT NULL ,
  `comment` TEXT NOT NULL ,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `book_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`))

