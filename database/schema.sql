-- Grocery Shopping App - MySQL Schema

CREATE DATABASE IF NOT EXISTS grocery_db;
USE grocery_db;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Products table
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    category_id BIGINT,
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample data
INSERT INTO categories (name, description) VALUES
('Fruits & Vegetables', 'Fresh fruits and vegetables'),
('Dairy & Eggs', 'Milk, cheese, eggs and more'),
('Bakery', 'Bread, cakes and pastries'),
('Meat & Seafood', 'Fresh meat and seafood'),
('Beverages', 'Drinks and juices');

INSERT INTO products (name, description, price, stock_quantity, image_url, category_id, unit) VALUES
('Banana', 'Fresh yellow bananas', 1.99, 100, 'https://via.placeholder.com/150', 1, 'bunch'),
('Apple', 'Crispy red apples', 2.49, 80, 'https://via.placeholder.com/150', 1, 'kg'),
('Whole Milk', 'Fresh whole milk', 1.79, 50, 'https://via.placeholder.com/150', 2, 'litre'),
('Eggs', 'Free range eggs', 3.49, 60, 'https://via.placeholder.com/150', 2, '12 pack'),
('White Bread', 'Soft white sandwich bread', 1.29, 40, 'https://via.placeholder.com/150', 3, 'loaf'),
('Orange Juice', 'Fresh squeezed orange juice', 2.99, 70, 'https://via.placeholder.com/150', 5, '1L');
