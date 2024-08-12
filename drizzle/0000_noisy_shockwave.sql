CREATE TABLE `flashy_flashcards` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`question` varchar(256),
	`answer` varchar(2048),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `flashy_flashcards_id` PRIMARY KEY(`id`)
);
