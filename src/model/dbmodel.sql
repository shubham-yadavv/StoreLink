CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    otp VARCHAR(6),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_account_id ON account (id);

CREATE TABLE IF NOT EXISTS store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    seller_id INT REFERENCES account(id) ON DELETE CASCADE,
    store_link VARCHAR(255) UNIQUE
);

CREATE INDEX idx_store_seller_id ON store (seller_id);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    mrp NUMERIC(10, 2),
    sale_price NUMERIC(10, 2),
    image_url VARCHAR(255),
    category_id INT REFERENCES category(id) ON DELETE CASCADE,
    store_id INT REFERENCES store(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(15),
    address VARCHAR(255)
);

CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TABLE IF NOT EXISTS orders (  
    id SERIAL PRIMARY KEY,
    store_id INT REFERENCES store(id) ON DELETE CASCADE,
    customer_id INT REFERENCES customer(id) ON DELETE CASCADE,
    order_date TIMESTAMP,
    status order_status DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS order_item (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES product(id) ON DELETE CASCADE,
    quantity INT
);


CREATE INDEX idx_cart_line_item_cart_id ON cart_line_item (cart_id);
CREATE INDEX idx_cart_line_item_product_id ON cart_line_item (product_id);
