# StoreLink


## Basic commands

```bash
git clone https://github.com//shubham-yadavv/dukaan-clone
```

&nbsp;

# Environment Variables

&nbsp;

```ENV
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=dukaan
PORT=3000
```

&nbsp;

# Docker build


```bash
docker-compose up -d
```

## Setup Postgres

&nbsp;

```pg
docker exec -it postgresdb psql -U username -W dukaan 
```

Copy and Paste DB Model
```
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



```

exit PG CLI

&nbsp;

You can access the server at: ```http://localhost:3000```

API Docs available at : ```http://localhost:3000/docs```

<img width="1439" alt="Screenshot 2023-10-24 at 8 52 00 PM" src="https://github.com/shubham-yadavv/dukaan-clone/assets/68185027/f89d77bc-abe0-4ad2-a821-573a30b6fe86">

&nbsp;

|           Routes            | Method |            Description             |
| :-------------------------: | :----: | :--------------------------------: |
|     /api/seller/signup      |  POST  |           Seller Sign-up           |
|  /api/seller/store/create   |  POST  |            Create Store            |
| /api/seller/products/upload |  POST  |   Upload Products and Categories   |
|  /api/seller/orders/accept  |  POST  |           Accept Orders            |
|  /api/buyer/store/details   |  POST  |         Get Store Details          |
| /api/buyer/products/catalog |  POST  | Get Product Catalog and Categories |
|     /api/buyer/cart/add     |  GET   |         Add Items to Cart          |
|   /api/buyer/order/place    |  POST  |           Place an Order           |


