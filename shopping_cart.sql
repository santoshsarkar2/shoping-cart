CREATE DATABASE shopping_cart;
USE shopping_cart;

-- Table for storing user information
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone_number VARCHAR(20),
    avatar VARCHAR(255),
    role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for storing product categories
CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing product information
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_id BIGINT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Table for multiple product images
CREATE TABLE product_images (
    image_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Table for product reviews
CREATE TABLE product_reviews (
    review_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table for discounts (corrected valid_from and valid_until to allow NULL)
CREATE TABLE discounts (
    discount_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    valid_from TIMESTAMP NULL, -- Changed to allow NULL
    valid_until TIMESTAMP NULL, -- Changed to allow NULL
    max_uses INT DEFAULT NULL,
    uses_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_discount_value CHECK (discount_value >= 0)
);

-- Table for wishlist
CREATE TABLE wishlist (
    wishlist_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE (user_id, product_id)
);

-- Table for shipping methods
CREATE TABLE shipping_methods (
    shipping_method_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cost DECIMAL(10, 2) NOT NULL,
    estimated_delivery_days INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_shipping_cost CHECK (cost >= 0)
);

-- Table for shopping carts
CREATE TABLE carts (
    cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    discount_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id) ON DELETE SET NULL
);

-- Table for cart items
CREATE TABLE cart_items (
    cart_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT check_quantity CHECK (quantity > 0)
);

-- Table for orders
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_id BIGINT,
    shipping_method_id BIGINT,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cod') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id) ON DELETE SET NULL,
    FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(shipping_method_id) ON DELETE SET NULL
);

-- Table for order items
CREATE TABLE order_items (
    order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT check_order_quantity CHECK (quantity > 0)
);

-- Table for order notes
CREATE TABLE order_notes (
    note_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    user_id BIGINT,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Table for payment transactions
CREATE TABLE payment_transactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cod') NOT NULL,
    transaction_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_amount DECIMAL(10, 2) NOT NULL,
    transaction_reference VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT check_transaction_amount CHECK (transaction_amount >= 0)
);

-- Indexes for better query performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_role ON users(role);
CREATE INDEX idx_product_sku ON products(sku);
CREATE INDEX idx_cart_user ON carts(user_id);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_review_product ON product_reviews(product_id);
CREATE INDEX idx_discount_code ON discounts(code);
CREATE INDEX idx_transaction_order ON payment_transactions(order_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_order_notes_order ON order_notes(order_id);

-- Add constraints for data validation
ALTER TABLE products ADD CONSTRAINT check_price CHECK (price >= 0);
ALTER TABLE order_items ADD CONSTRAINT check_unit_price CHECK (unit_price >= 0);
ALTER TABLE order_items ADD CONSTRAINT check_subtotal CHECK (subtotal >= 0);
ALTER TABLE orders ADD CONSTRAINT check_total_amount CHECK (total_amount >= 0);



USE shopping_cart;

-- Insert dummy data into users table
INSERT INTO users (first_name, last_name, email, password, address, phone_number, avatar, role)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'hashed_password_123', '123 Main St, City', '555-0123', 'https://example.com/avatars/john.jpg', 'customer'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_456', '456 Oak Ave, Town', '555-0456', 'https://example.com/avatars/jane.jpg', 'admin'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password_789', '789 Pine Rd, Village', '555-0789', NULL, 'customer');

-- Insert dummy data into categories table
INSERT INTO categories (name, description, image_url)
VALUES
    ('Electronics', 'Gadgets and devices', 'https://example.com/categories/electronics.jpg'),
    ('Clothing', 'Apparel and accessories', 'https://example.com/categories/clothing.jpg'),
    ('Books', 'Books and literature', NULL);

-- Insert dummy data into products table
INSERT INTO products (category_id, name, description, price, stock_quantity, sku)
VALUES
    (1, 'Smartphone', 'Latest model smartphone', 699.99, 50, 'SP001'),
    (1, 'Laptop', 'High-performance laptop', 1299.99, 20, 'LP002'),
    (2, 'T-Shirt', 'Comfortable cotton t-shirt', 19.99, 100, 'TS003');

-- Insert dummy data into product_images table
INSERT INTO product_images (product_id, image_url, is_primary)
VALUES
    (1, 'https://example.com/images/smartphone1.jpg', TRUE),
    (1, 'https://example.com/images/smartphone2.jpg', FALSE),
    (2, 'https://example.com/images/laptop1.jpg', TRUE),
    (3, 'https://example.com/images/tshirt1.jpg', TRUE);

-- Insert dummy data into product_reviews table
INSERT INTO product_reviews (product_id, user_id, rating, comment)
VALUES
    (1, 1, 4, 'Great smartphone, good battery life!'),
    (2, 3, 5, 'Amazing laptop for work and gaming.'),
    (3, 1, 3, 'Nice t-shirt but sizing is a bit off.');

-- Insert dummy data into discounts table
INSERT INTO discounts (code, description, discount_type, discount_value, valid_from, valid_until, max_uses)
VALUES
    ('SAVE10', '10% off sitewide', 'percentage', 10.00, '2025-08-01 00:00:00', '2025-12-31 23:59:59', 100),
    ('FLAT20', 'Flat $20 off', 'fixed', 20.00, NULL, NULL, NULL),
    ('SUMMER25', 'Summer sale discount', 'percentage', 25.00, '2025-08-01 00:00:00', '2025-09-30 23:59:59', 50);

-- Insert dummy data into wishlist table
INSERT INTO wishlist (user_id, product_id)
VALUES
    (1, 1), -- John wishes for Smartphone
    (1, 3), -- John wishes for T-Shirt
    (3, 2); -- Alice wishes for Laptop

-- Insert dummy data into shipping_methods table
INSERT INTO shipping_methods (name, description, cost, estimated_delivery_days)
VALUES
    ('Standard Shipping', 'Standard delivery in 5-7 days', 5.99, 7),
    ('Express Shipping', 'Fast delivery in 1-2 days', 15.99, 2);

-- Insert dummy data into carts table
INSERT INTO carts (user_id, discount_id)
VALUES
    (1, 1), -- John's cart with SAVE10 discount
    (3, NULL); -- Alice's cart without discount

-- Insert dummy data into cart_items table
INSERT INTO cart_items (cart_id, product_id, quantity)
VALUES
    (1, 1, 1), -- John's cart: 1 Smartphone
    (1, 3, 2), -- John's cart: 2 T-Shirts
    (2, 2, 1); -- Alice's cart: 1 Laptop

-- Insert dummy data into orders table
INSERT INTO orders (user_id, total_amount, discount_id, shipping_method_id, status, shipping_address, payment_method)
VALUES
    (1, 719.98, 1, 1, 'pending', '123 Main St, City', 'credit_card'),
    (3, 1299.99, NULL, 2, 'processing', '789 Pine Rd, Village', 'paypal');

-- Insert dummy data into order_items table
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
VALUES
    (1, 1, 1, 699.99, 699.99), -- John's order: 1 Smartphone
    (1, 3, 1, 19.99, 19.99), -- John's order: 1 T-Shirt
    (2, 2, 1, 1299.99, 1299.99); -- Alice's order: 1 Laptop

-- Insert dummy data into order_notes table
INSERT INTO order_notes (order_id, user_id, note_text)
VALUES
    (1, 1, 'Please deliver after 5 PM'),
    (2, NULL, 'Gift wrap requested'),
    (1, 2, 'Admin note: Check address accuracy');

-- Insert dummy data into payment_transactions table
INSERT INTO payment_transactions (order_id, payment_method, transaction_status, transaction_amount, transaction_reference)
VALUES
    (1, 'credit_card', 'completed', 719.98, 'TXN123456'),
    (2, 'paypal', 'pending', 1299.99, 'TXN789012');