-- Create the "account" table to store user accounts
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(15) NOT NULL,
    otp VARCHAR(6),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on the "id" column of the "account" table for optimization
CREATE INDEX idx_account_id ON account (id);

-- Create the "store" table to store store information, including the seller (user) who owns the store
CREATE TABLE IF NOT EXISTS store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    seller_id INT REFERENCES account(id),
    store_link VARCHAR(255) UNIQUE
);

-- Create an index on the "seller_id" column of the "store" table for optimization
CREATE INDEX idx_store_seller_id ON store (seller_id);

-- Create the "category" table to store product categories
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the "product" table to store product information and associate products with categories
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    mrp NUMERIC(10, 2),
    sale_price NUMERIC(10, 2),
    image_url VARCHAR(255),
    category_id INT REFERENCES category(id)
);

-- Create the "customer" table to store customer information
CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(15),
    address VARCHAR(255)
);

-- Create the "orders" table to store order information, linking stores and customers
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    store_id INT REFERENCES store(id),
    customer_id INT REFERENCES customer(id),
    order_date TIMESTAMP
);

-- Create the "cart" table to store customer shopping carts
CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(id)
);

-- Create the "cart_line_item" table to represent line items in customer shopping carts
CREATE TABLE IF NOT EXISTS cart_line_item (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(id),
    product_id INT REFERENCES product(id),
    quantity INT,
    store_link VARCHAR(255)
);

-- Create indexes on the "cart_line_item" table for optimization
CREATE INDEX idx_cart_line_item_cart_id ON cart_line_item (cart_id);
CREATE INDEX idx_cart_line_item_product_id ON cart_line_item (product_id);
