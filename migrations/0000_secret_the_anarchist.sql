CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`user_type` text NOT NULL,
	`created_date` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
