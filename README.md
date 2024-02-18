# API Documentation


## Installation
- Clone this repo 
``` https://github.com/evankhell619/e-comz-api.git```
- Go to the project folder
 ``` cd <e-comz-api>```
- Write in command prompt
``` npm install / npm i ```
- After that generate database after fill the .env
``` npx prisma migrate dev ```

## Usage
- To run it, please type the code:
```npm run dev ```
- You need to add manual role user as a (seller and user)
- After add role run auth-seed.js
``` node app/auth-seed.js```

## Authentication

### 1. Login

- **Route:** `/login`
- **Method:** POST
- **Controller:** login
- **Description:** Authenticate a user and generate a token for authorization.

### 2. Signup

- **Route:** `/signup`
- **Method:** POST
- **Controller:** auth
- **Description:** Register a new user and generate a token for authorization.

## Product Management

### 3. Product

- **Route:** `/product`
- **Method:** GET
- **Controller:** product
- **Description:** Retrieve a list of products.

## Shopping Cart

### 4. Cart

#### 4.1 Add to Cart

- **Route:** `/cart`
- **Method:** POST
- **Controller:** cart.addToCart
- **Description:** Add a product to the shopping cart.

#### 4.2 Get Cart

- **Route:** `/cart`
- **Method:** GET
- **Controller:** cart.getCart
- **Description:** Retrieve the contents of the shopping cart.

#### 4.3 Delete Item from Cart

- **Route:** `/cart/:id`
- **Method:** DELETE
- **Controller:** cart.deleteItemCart
- **Description:** Remove a specific item from the shopping cart.

#### 4.4 Change Quantity in Cart

- **Route:** `/cart/:id`
- **Method:** PUT
- **Controller:** cart.changeQuantity
- **Description:** Update the quantity of a product in the shopping cart.

## Order Processing

### 5. Order

- **Route:** `/order`
- **Method:** POST
- **Controller:** order
- **Description:** Place an order using the items in the shopping cart.

## Payment Processing

### 6. Payment

- **Route:** `/payment`
- **Method:** POST
- **Controller:** payment
- **Description:** Process payment for an order.

## Error Handling

In case of any errors, the API will respond with the appropriate HTTP status code and a JSON object containing an error message.

## Conclusion

This API documentation provides a comprehensive overview of the available routes and functionalities. Ensure that you follow the specified request methods and route paths for successful interaction with the API.
