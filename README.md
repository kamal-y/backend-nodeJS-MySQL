# Product Management API

A simple RESTful API for user authentication and product management, built with Node.js, Express, and MySQL.

## Installation

1. Clone the repository.
2. Install dependencies by running:

   ```bash
   npm install

#API Endpoints
##Authentication
POST /signup: Register a new user.
POST /login: Login and get a JWT token.
##Products
(Authenticated Routes: Requires Authorization: Bearer <token> in headers)

GET /api/products: Get all products.
POST /api/products: Create a new product.
PUT /api/products/:id: Update a product by ID.
DELETE /api/products/:id: Delete a product by ID.

#Database
The project uses MySQL hosted on Clever Cloud. Create users and products tables as per your requirements.
