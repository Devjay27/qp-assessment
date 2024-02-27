SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `grocery_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `grocery_items` (`id`, `name`, `price`, `quantity`) VALUES
(1, 'Cheese', 20.00, 40),
(2, 'Bread', 30.00, 25);


CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `grocery_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `order_history` (`id`, `user_name`, `grocery_name`, `quantity`, `order_date`) VALUES
(1, 'Mike Lee', 'Yogurt', 1, '2024-02-27 19:00:00'),
(2, 'Max Lynn', 'Cheese', 4, '2024-02-27 19:00:00'),

ALTER TABLE `grocery_items`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `grocery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
