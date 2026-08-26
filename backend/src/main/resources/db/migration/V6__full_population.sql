-- Users
INSERT INTO users (name,email,password,role) VALUES
('Alice Johnson','alice@example.com','password123','USER'),
('Bob Smith','bob@example.com','password123','USER'),
('Charlie Brown','charlie@example.com','password123','ADMIN'),
('Diana Prince','diana@example.com','password123','USER'),
('Ethan Clark','ethan@example.com','password123','USER');

-- Profiles
INSERT INTO profiles (id,bio,phone_number,date_of_birth,loyalty_points) VALUES
(1,'Food enthusiast','9876543210','1998-05-14',120),
(2,'Fitness lover','9876543211','1995-09-23',80),
(3,'Store administrator','9876543212','1992-01-11',500),
(4,'Home chef','9876543213','2000-12-02',40),
(5,'Coffee addict','9876543214','1997-07-19',200);

-- Addresses
INSERT INTO addresses (street,city,state,zip,user_id) VALUES
('101 MG Road','Mumbai','Maharashtra','400001',1),
('22 Residency Rd','Bengaluru','Karnataka','560001',2),
('18 Park Street','Kolkata','West Bengal','700016',3),
('77 Marine Drive','Mumbai','Maharashtra','400020',4),
('55 Banjara Hills','Hyderabad','Telangana','500034',5);

-- Wishlist
INSERT INTO wishlist (product_id,user_id) VALUES
(1,1),(3,1),(2,2),(5,2),(8,3),(10,4),(6,5);

-- Carts
INSERT INTO carts (id) VALUES
(UUID_TO_BIN(UUID())),
(UUID_TO_BIN(UUID())),
(UUID_TO_BIN(UUID()));

-- Cart Items
INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,1,3 FROM carts ORDER BY date_created,id LIMIT 1;

INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,3,1 FROM carts ORDER BY date_created,id LIMIT 1;

INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,2,2 FROM carts ORDER BY date_created,id LIMIT 1 OFFSET 1;

INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,8,1 FROM carts ORDER BY date_created,id LIMIT 1 OFFSET 1;

INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,10,1 FROM carts ORDER BY date_created,id LIMIT 1 OFFSET 2;

INSERT INTO cart_items (cart_id,product_id,quantity)
SELECT id,5,4 FROM carts ORDER BY date_created,id LIMIT 1 OFFSET 2;

-- Orders
INSERT INTO orders (customer_id,status,total_price) VALUES
(1,'DELIVERED',10.02),
(2,'PROCESSING',15.98),
(4,'SHIPPED',17.98);

-- Order Items
INSERT INTO order_items (order_id,product_id,unit_price,quantity,total_price) VALUES
(1,1,0.59,2,1.18),
(1,3,4.25,2,8.50),
(2,2,3.49,2,6.98),
(2,8,5.25,1,5.25),
(2,5,2.79,1,2.79),
(3,10,8.99,2,17.98);
