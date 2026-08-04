# AI Prompts – Test Design


Prompt:-
API Test - https://api.practicesoftwaretesting.com/api/documentation
Attachment - refer attached json file

Kindly generate the Test cases which could also include below types:-

positive/negative/edge, Smoke /Regression
There should not be more than 5-8 test cases


Kindly refer below 2 sample TCs for reference:-

AC1: User Authentication & Cart Creation

A new user should be able to register via API, log in with the registered credentials, obtain a valid bearer token, and create a new cart successfully.

AC2: Product Selection & Invoice Generation

Using the bearer token, the user should be able to retrieve products, add selected products to the cart, verify the cart contents, and successfully generate an invoice with the required customer and order details. 

Example Request body for invoice generation post call
				{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "01kx0dctdxxg6sm4wtt1t0nf9r",
  "payment_details": {}
    
} 

Please tell me know if you required more details.


Need TC is below format. Used the json data for this request.

TC ID | Title | Description | API Endpoint | HTTP Method | Request Headers | Request Body | Expected Response Code | Expected Response Body | Test Case Status | Remarks



Response:-

Here are 7 API test cases derived from the Toolshop API OpenAPI spec (Toolshop API.json, v5.0.0) and aligned with your AC1/AC2 flows. They cover Smoke, Regression, Positive, Negative, and Edge scenarios.

Base URL: https://api.practicesoftwaretesting.com


TC ID	Title	Description	API Endpoint	HTTP Method	Request Headers	Request Body	Expected Response Code	Expected Response Body	Test Case Status	Remarks
TC-01
User Registration, Login & Cart Creation (AC1)
Smoke / Positive — End-to-end: register a new user, log in with those credentials, obtain a bearer token, and create a new cart.
Step 1: /users/register
Step 2: /users/login
Step 3: /carts
POST
Content-Type: application/json
Accept: application/json
Step 1: {"first_name":"John","last_name":"Doe","email":"john.doe.{unique}@example.com","password":"SuperSecure@123","phone":"0987654321","dob":"1990-05-15"}
Step 2: {"email":"john.doe.{unique}@example.com","password":"SuperSecure@123"}
Step 3: (no body)
Step 1: 201
Step 2: 200
Step 3: 201
Step 1: User object with id, email, first_name, last_name
Step 2: {"access_token":"<token>","token_type":"Bearer","expires_in":120}
Step 3: {"id":"<cart_id>"}
Not Executed
Type: Smoke, Positive. Use a unique email per run. Store access_token and cart_id for TC-02. Password must meet spec: uppercase, lowercase, number, symbol, min 8 chars.
TC-02
Product Selection, Cart Verification & Invoice Generation (AC2)
Smoke / Regression / Positive — Using the bearer token: retrieve products, add a product to the cart, verify cart contents, and generate an invoice with billing and payment details.
Step 1: /products
Step 2: /carts/{id}
Step 3: /carts/{cartId}
Step 4: /invoices
GET / POST
Content-Type: application/json
Accept: application/json
Authorization: Bearer {access_token}
Step 2: {"product_id":"{product_id}","quantity":1}
Step 4: {"billing_street":"Zoey Shore","billing_city":"Hesselbury","billing_state":"Florida","billing_country":"TG","billing_postal_code":"1234AA","payment_method":"cash-on-delivery","cart_id":"{cart_id}","payment_details":{}}
Step 1: 200
Step 2: 200
Step 3: 200
Step 4: 200
Step 1: Paginated list with data[] containing id, name, price
Step 2: {"result":"item added or updated"}
Step 3: Cart object with id matching {cart_id}
Step 4: Invoice with id, invoice_number, billing_street, billing_city, subtotal, total, status
Not Executed
Type: Smoke, Regression, Positive. Depends on TC-01. Pick any product_id from Step 1. payment_method enum: bank-transfer, cash-on-delivery, credit-card, buy-now-pay-later, gift-card.
TC-03
Login with Invalid Credentials
Negative — Attempt login with a valid email format but wrong password.
/users/login
POST
Content-Type: application/json
Accept: application/json
{"email":"customer@practicesoftwaretesting.com","password":"WrongPassword@99"}
401
{"message":"Unauthorized"} or authentication error message
Not Executed
Type: Negative, Smoke. Uses seeded customer email from API spec example.
TC-04
Invoice Creation Without Authentication
Negative — Attempt to create an invoice without a bearer token.
/invoices
POST
Content-Type: application/json
Accept: application/json
{"billing_street":"Zoey Shore","billing_city":"Hesselbury","billing_state":"Florida","billing_country":"TG","billing_postal_code":"1234AA","payment_method":"cash-on-delivery","cart_id":"{cart_id}","payment_details":{}}
401
{"message":"Unauthorized"}
Not Executed
Type: Negative, Regression. Per spec, /invoices POST requires apiAuth security.
TC-05
User Registration with Duplicate Email
Negative — Register using an email that already exists.
/users/register
POST
Content-Type: application/json
Accept: application/json
{"first_name":"John","last_name":"Doe","email":"customer@practicesoftwaretesting.com","password":"SuperSecure@123"}
409
Conflict response (duplicate email)
Not Executed
Type: Negative, Regression. customer@practicesoftwaretesting.com is a seeded account in the practice API.
TC-06
Add Item to Cart with Invalid Product ID
Edge / Negative — Add a product to a valid cart using a non-existent or invalid product_id.
/carts/{id}
POST
Content-Type: application/json
Accept: application/json
{"product_id":"INVALID_PRODUCT_ID_000","quantity":1}
404
Item/resource not found error
Not Executed
Type: Edge, Negative. Use a valid cart_id from TC-01. Spec documents 404 for item not found.
TC-07
Retrieve Non-Existent Cart
Edge / Negative — Fetch cart details using an invalid or non-existent cartId.
/carts/{cartId}
GET
Content-Type: application/json
Accept: application/json
(no body)
404
Item/resource not found error
Not Executed
Type: Edge, Negative. Example path: /carts/01invalidcartid000000000000. No auth required per spec.