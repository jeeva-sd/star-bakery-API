# Star Bakery Order API

# Introduction
The Star Bakery Order API allows you to manage and retrieve order information for Star Bakery's online delivery service.

## Installation
1. Clone the repository:
git clone https://github.com/jeeva-sd/star-bakery-API.git

2. Navigate to the project directory:
cd star-bakery-API

3. Install the dependencies:
npm install

4. Create a `.env` file in the root directory and add your MongoDB connection URL, Port
PORT=
DB_KEY=

5. Start the server:
npm start

The API will be running on `http://localhost:1650`.

## API Routes

- **GET /api/order/{orderId}**: Retrieve details of a specific order by its ID.
- **GET /api/order**: Get a list of all orders.

- **POST /api/order/**: Create a new order and return its ID.
 - Request Body:
 - {
    "itemType": "Cake",
    "orderState": "Created",
    "lastUpdateTime": "2023-09-25T10:30:00Z",
    "branch": 1,
    "customer": "Customer123"
  }

- **PUT /api/order/{orderId}**: Update an existing order by its ID.
 - Request Body:
 - {
    "orderState": "Shipped"
  }

## Server Configuration
- The server runs on port 1650.

## Dependencies
- Express.js: Web application framework for Node.js.
- Mongoose: MongoDB object modeling for Node.js.
- Moment.js: Library for parsing, validating, manipulating, and formatting dates.