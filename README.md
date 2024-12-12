# Product Management API

A simple RESTful API for user authentication and product management, built with Node.js, Express, and MySQL.

## Installation

1. Clone the repository.
2. Install dependencies by running:

   ```bash
   npm install

Authentication
POST /signup: Register a new user.
POST /login: Login and receive a JWT token.
Products
Note: All product-related routes require an Authorization: Bearer <token> header.

GET /api/products: Retrieve all products.
POST /api/products: Add a new product.
PUT /api/products/:id: Update an existing product by its ID.
DELETE /api/products/:id: Delete a product by its ID.
Database
The project uses a MySQL database hosted on Clever Cloud.
