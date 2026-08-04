# AI Prompts – API Test Design

This document captures the AI prompts and responses used to generate a concise **API Test Suite** for the **Practice Software Testing Toolshop API**.

The objective was to create a professional API test suite covering **Positive**, **Negative**, and **Edge** scenarios while identifying **@Smoke** and **@Regression** tests based on the OpenAPI (Swagger) specification.

---

# Prompt – API Test Case Generation

## Prompt

> **API Documentation**
>
> https://api.practicesoftwaretesting.com/api/documentation
>
> **Attachment**
>
> Refer to the attached **Toolshop API.json** (OpenAPI v5.0.0).
>
> Kindly generate the API test cases which should include:
>
> - Positive
> - Negative
> - Edge
> - Smoke
> - Regression
>
> **Note**
>
> - There should not be more than **5–8 test cases**.
>
> Kindly refer to the following Acceptance Criteria.

### AC1 – User Authentication & Cart Creation

A new user should be able to:

- Register via API
- Login using registered credentials
- Obtain a valid Bearer Token
- Create a new cart successfully

### AC2 – Product Selection & Invoice Generation

Using the Bearer Token, the user should be able to:

- Retrieve products
- Add selected products to the cart
- Verify cart contents
- Generate an invoice successfully

### Sample Request Body (Invoice Generation)

```json
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
```

### Required Test Case Format

| Column |
|---------|
| TC ID |
| Title |
| Description |
| API Endpoint |
| HTTP Method |
| Request Headers |
| Request Body |
| Expected Response Code |
| Expected Response Body |
| Test Case Status |
| Remarks |

> Please let me know if you require any additional details.

---

# Response

Based on the **Toolshop API OpenAPI Specification (v5.0.0)**, a concise set of **7 API test cases** was generated covering **Smoke**, **Regression**, **Positive**, **Negative**, and **Edge** scenarios.

---

## Test Environment

| Item | Value |
|------|-------|
| API | Practice Software Testing Toolshop API |
| Base URL | `https://api.practicesoftwaretesting.com` |
| API Specification | OpenAPI v5.0.0 |

---

# API Test Cases

## TC-01 – User Registration, Login & Cart Creation (AC1)

| Field | Details |
|------|---------|
| **Type** | @Smoke, Positive |
| **Description** | Register a new user, login using the registered credentials, obtain a Bearer Token, and create a new cart. |
| **API Endpoint** | `/users/register` → `/users/login` → `/carts` |
| **HTTP Method** | POST |
| **Request Headers** | `Content-Type: application/json`<br>`Accept: application/json` |
| **Request Body** | **Step 1** – Register User<br>`{"first_name":"John","last_name":"Doe","email":"john.doe.{unique}@example.com","password":"SuperSecure@123","phone":"0987654321","dob":"1990-05-15"}`<br><br>**Step 2** – Login<br>`{"email":"john.doe.{unique}@example.com","password":"SuperSecure@123"}`<br><br>**Step 3** – Create Cart (No Body) |
| **Expected Response Code** | 201 → 200 → 201 |
| **Expected Response Body** | User created successfully → Bearer Token returned → Cart ID generated |
| **Status** | Not Executed |
| **Remarks** | Store `access_token` and `cart_id` for subsequent test cases. Use a unique email address for each execution. |

---

## TC-02 – Product Selection, Cart Verification & Invoice Generation (AC2)

| Field | Details |
|------|---------|
| **Type** | @Smoke, @Regression, Positive |
| **Description** | Retrieve products, add a product to the cart, verify cart contents, and generate an invoice. |
| **API Endpoint** | `/products` → `/carts/{id}` → `/carts/{cartId}` → `/invoices` |
| **HTTP Method** | GET / POST |
| **Request Headers** | `Authorization: Bearer {access_token}`<br>`Content-Type: application/json` |
| **Request Body** | **Add Product**<br>`{"product_id":"{product_id}","quantity":1}`<br><br>**Generate Invoice**<br>`{"billing_street":"Zoey Shore","billing_city":"Hesselbury","billing_state":"Florida","billing_country":"TG","billing_postal_code":"1234AA","payment_method":"cash-on-delivery","cart_id":"{cart_id}","payment_details":{}}` |
| **Expected Response Code** | 200 |
| **Expected Response Body** | Product list returned → Item added to cart → Cart verified → Invoice generated successfully |
| **Status** | Not Executed |
| **Remarks** | Depends on **TC-01**. Use any valid `product_id` returned by the Products API. |

---

## TC-03 – Login with Invalid Credentials

| Field | Details |
|------|---------|
| **Type** | @Smoke, Negative |
| **Description** | Attempt login using a valid email format but an incorrect password. |
| **API Endpoint** | `/users/login` |
| **HTTP Method** | POST |
| **Request Headers** | `Content-Type: application/json` |
| **Request Body** | `{"email":"customer@practicesoftwaretesting.com","password":"WrongPassword@99"}` |
| **Expected Response Code** | 401 |
| **Expected Response Body** | Unauthorized or authentication error message |
| **Status** | Not Executed |
| **Remarks** | Validates authentication failure handling. |

---

## TC-04 – Invoice Creation Without Authentication

| Field | Details |
|------|---------|
| **Type** | @Regression, Negative |
| **Description** | Attempt to generate an invoice without providing a Bearer Token. |
| **API Endpoint** | `/invoices` |
| **HTTP Method** | POST |
| **Request Headers** | `Content-Type: application/json` |
| **Request Body** | Valid invoice generation payload |
| **Expected Response Code** | 401 |
| **Expected Response Body** | Unauthorized |
| **Status** | Not Executed |
| **Remarks** | Validates authorization enforcement. |

---

## TC-05 – User Registration with Duplicate Email

| Field | Details |
|------|---------|
| **Type** | @Regression, Negative |
| **Description** | Register using an email address that already exists. |
| **API Endpoint** | `/users/register` |
| **HTTP Method** | POST |
| **Request Headers** | `Content-Type: application/json` |
| **Request Body** | Existing user registration payload |
| **Expected Response Code** | 409 |
| **Expected Response Body** | Conflict (Duplicate Email) |
| **Status** | Not Executed |
| **Remarks** | Validates duplicate user registration handling. |

---

## TC-06 – Add Item to Cart with Invalid Product ID

| Field | Details |
|------|---------|
| **Type** | @Regression, Edge |
| **Description** | Add an item to a valid cart using a non-existent Product ID. |
| **API Endpoint** | `/carts/{id}` |
| **HTTP Method** | POST |
| **Request Headers** | `Authorization: Bearer {access_token}` |
| **Request Body** | `{"product_id":"INVALID_PRODUCT_ID_000","quantity":1}` |
| **Expected Response Code** | 404 |
| **Expected Response Body** | Item or resource not found |
| **Status** | Not Executed |
| **Remarks** | Requires a valid `cart_id` generated in **TC-01**. |

---

## TC-07 – Retrieve Non-Existent Cart

| Field | Details |
|------|---------|
| **Type** | @Regression, Edge |
| **Description** | Retrieve cart details using an invalid or non-existent Cart ID. |
| **API Endpoint** | `/carts/{cartId}` |
| **HTTP Method** | GET |
| **Request Headers** | `Accept: application/json` |
| **Request Body** | Not Applicable |
| **Expected Response Code** | 404 |
| **Expected Response Body** | Item or resource not found |
| **Status** | Not Executed |
| **Remarks** | Example path: `/carts/01invalidcartid000000000000`. |

---

# Test Coverage Summary

## Business Flow Coverage

- ✅ User Registration
- ✅ User Authentication
- ✅ Bearer Token Generation
- ✅ Cart Creation
- ✅ Product Retrieval
- ✅ Add Product to Cart
- ✅ Cart Verification
- ✅ Invoice Generation

---

## API Validation Coverage

- ✅ Authentication
- ✅ Authorization
- ✅ CRUD Operations
- ✅ Request Body Validation
- ✅ Response Validation
- ✅ HTTP Status Codes
- ✅ Error Handling
- ✅ Business Flow Validation

---

## Test Type Distribution

| Type | Count |
|------|------:|
| Positive | 2 |
| Negative | 3 |
| Edge | 2 |

---

## Execution Tag Distribution

| Tag | Count |
|------|------:|
| @Smoke | 3 |
| @Regression | 5 |

---

> **Note:** This API test suite is intentionally concise (7 test cases) while covering the critical end-to-end API workflow from **User Registration** through **Invoice Generation**, along with essential authentication, authorization, validation, and error-handling scenarios.
