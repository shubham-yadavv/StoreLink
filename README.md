# Dukaan clone

Uses

Endpoints for Seller Side
Seller Sign-up

```URL: /api/seller/signup
Method: POST
Input: Mobile number, OTP
Action: Create a customer account in the accounts table and issue a token.
Create Store
```

```
URL: /api/seller/store/create
Method: POST
Input: Store name, address
Action: Create a store in the store table and generate a unique store link.
Upload Products and Categories
```
```URL: /api/seller/products/upload
Method: POST
Input: Product name, description, MRP, sale price, image, category
Action: Create a category if it doesn't exist, create the product, and respond with product details.
```

```Accept Orders

URL: /api/seller/orders/accept
Method: POST
Input: Customer details, order data
Action: Create a customer record in the customer table, save order records in the order table when a customer places an order.

```

Endpoints for Buyer Side
```
Get Store Details
URL: /api/buyer/store/details
Method: GET
Input: Store link
Action: Respond with store details (storeId, store name, address).
```

Get Product Catalog and Categories

URL: /api/buyer/products/catalog
Method: GET
Input: Store link
Action: Respond with product catalog grouped by categories and sorted by the number of products in each category.


Add Items to Cart

URL: /api/buyer/cart/add
Method: POST
Input: Product ID, quantity, store link
Action: Maintain a cart on the server, update the cart on cart change (add/remove item), and fetch product metadata from the database.


Place an Order

URL: /api/buyer/order/place
Method: POST
Input: JWT or token (authentication), cart object
Action: Verify customer identity, create a customer record if it doesn't exist, convert the cart into an order, create an order for the store and customer, and return the order ID.


SELECT product.*, category.name AS category_name FROM product INNER JOIN category ON product.category_id = category.id WHERE product.store_id = (SELECT id FROM store WHERE link = $1)
