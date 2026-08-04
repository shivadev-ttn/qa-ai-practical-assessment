# AI Prompts – Test Data

This document contains AI-generated **test data** prepared for the previously generated **Manual UI** and **API** test cases for the **Practice Software Testing** application.

> **Note:** The test data was generated in the same conversation after the corresponding test cases were created. :contentReference[oaicite:0]{index=0}

---

# 1. Manual UI Test Data

## Prompt

> Generate test data for the generated Manual / UI test cases. :contentReference[oaicite:1]{index=1}

---

## Response

Below is realistic test data for the generated Manual UI test cases using actual product names and sample user information suitable for the Practice Software Testing application. :contentReference[oaicite:2]{index=2}

---

## Test Data by Test Case

### TC_UI_001 – User Registration & Login

| Field | Value |
|------|-------|
| First Name | John |
| Last Name | Carter |
| DOB | 15-08-1995 |
| Street | 221 Baker Street |
| Postal Code | 10001 |
| City | New York |
| State | New York |
| Country | United States |
| Phone | +1 9876543210 |
| Email | john.carter.qa+001@example.com *(Use timestamp for uniqueness if needed)* |
| Password | Test@12345 |
| Confirm Password | Test@12345 |

:contentReference[oaicite:3]{index=3}

---

### TC_UI_002 – Complete Purchase Flow

| Field | Value |
|------|-------|
| Login | john.carter.qa@example.com / Test@12345 |
| Product 1 | Combination Pliers |
| Quantity | 2 |
| Product 2 | Claw Hammer |
| Quantity | 1 |
| Shipping Address | 221 Baker Street, New York, NY 10001 |
| Billing Address | Same as Shipping |
| Payment Method | Cash on Delivery |

:contentReference[oaicite:4]{index=4}

---

### TC_UI_003 – Search, Filter & Sorting

| Field | Value |
|------|-------|
| Search Keyword | Hammer |
| Category | Hand Tools |
| Price Range | $10 – $50 |
| Sort By | Price (Low → High) |

:contentReference[oaicite:5]{index=5}

---

### TC_UI_004 – Invalid Login

| Field | Value |
|------|-------|
| Email | invalid.user@example.com |
| Password | Wrong@123 |

:contentReference[oaicite:6]{index=6}

---

### TC_UI_005 – Checkout Mandatory Validation

| Field | Value |
|------|-------|
| Login | Valid User |
| Product | Slip Joint Pliers |
| Shipping Address | Blank |
| Postal Code | Blank |
| City | Blank |
| Phone | Blank |

:contentReference[oaicite:7]{index=7}

---

### TC_UI_006 – Quantity Exceeds Stock

| Field | Value |
|------|-------|
| Product | Claw Hammer |
| Available Stock | 10 *(Example)* |
| Entered Quantity | 999 |

:contentReference[oaicite:8]{index=8}

---

### TC_UI_007 – Cart Persistence

| Field | Value |
|------|-------|
| Login | john.carter.qa@example.com / Test@12345 |
| Products | Combination Pliers ×2 |
| | Claw Hammer ×1 |

:contentReference[oaicite:9]{index=9}

---

### TC_UI_008 – Language Change

| Field | Value |
|------|-------|
| Current Language | English |
| Change To | Dutch *(or any available language)* |

:contentReference[oaicite:10]{index=10}

---

# Negative Test Data

| Scenario | Test Data |
|----------|-----------|
| Invalid Email | `invalid.email` |
| Empty Email | Blank |
| Empty Password | Blank |
| Incorrect Password | `WrongPassword123` |
| SQL Injection | `' OR '1'='1` |
| XSS Payload | `<script>alert('QA')</script>` |
| Very Long Search | `HammerHammerHammerHammerHammerHammerHammerHammerHammerHammerHammerHammer` |
| Special Characters | `@#$%^&*()` |

:contentReference[oaicite:11]{index=11}

---

# Edge Test Data

| Scenario | Test Data |
|----------|-----------|
| Minimum Quantity | 1 |
| Maximum Quantity | Equal to available stock *(e.g., 10)* |
| Quantity Above Stock | Stock + 1 *(e.g., 11)* |
| Single Character Search | H |
| Search with Spaces | `" Hammer "` |
| Mixed Case Search | `hAmMeR` |
| Unicode Search | `हॅमर / 工具` |
| Refresh During Checkout | Refresh browser after Shipping step |

:contentReference[oaicite:12]{index=12}

---

# Sample User Accounts

| Type | Email | Password |
|------|-------|----------|
| Valid User | john.carter.qa@example.com | Test@12345 |
| Existing User | shiva.qa@example.com | Test@12345 |
| Invalid User | invalid.user@example.com | Wrong@123 |

:contentReference[oaicite:13]{index=13}

---

# Product Test Data

| Product | Quantity | Purpose |
|---------|---------:|---------|
| Combination Pliers | 2 | Add to Cart |
| Claw Hammer | 1 | Checkout |
| Slip Joint Pliers | 3 | Quantity Update |
| Any Out-of-Stock Product | 1 | Stock Validation |

:contentReference[oaicite:14]{index=14}

---

# Search & Filter Test Data

| Field | Value |
|------|-------|
| Search Keyword | Hammer |
| Partial Search | Ham |
| Typo Search | Hamer |
| Category | Hand Tools |
| Sort | Name A → Z |
| Sort | Name Z → A |
| Sort | Price Low → High |
| Sort | Price High → Low |
| Price Range | $10 – $50 |

:contentReference[oaicite:15]{index=15}

---

# 2. API Test Data

## Prompt

> Generate test data for the generated API test cases. :contentReference[oaicite:16]{index=16}

---

## Response

Test data prepared for all **7 API Test Cases** using values from the Practice Software Testing API and the OpenAPI specification. :contentReference[oaicite:17]{index=17}

---

# Master Test Data Variables

These variables are shared across multiple API test cases.

| Variable | Sample Value | Notes |
|----------|--------------|------|
| BASE_URL | https://api.practicesoftwaretesting.com | API Base URL |
| unique_suffix | 20260804_1102 | Generate for each run |
| test_email | john.doe.20260804_1102@example.com | Registration |
| test_password | SuperSecure@123 | Valid Password |
| seeded_email | customer@practicesoftwaretesting.com | Existing User |
| seeded_password | welcome01 | Existing Password |
| wrong_password | WrongPassword@99 | Invalid Login |
| product_id_valid | 01KZ5J9VW2H605ZEFYN999AF50 | Combination Pliers |
| product_id_out_of_stock | 01KZ5J9VW99Z3QAFN7MW6DMH4Q | Long Nose Pliers |
| product_id_invalid | INVALID_PRODUCT_ID_000 | Invalid Product |
| cart_id_valid | Generated from TC-01 | Create Cart API |
| cart_id_invalid | 01invalidcartid000000000000 | Invalid Cart |
| access_token | Generated from Login API | Bearer Token |
| quantity | 1 | Default Quantity |
| payment_method | cash-on-delivery | Invoice API |

:contentReference[oaicite:18]{index=18}

---

# API Test Data by Test Case

## TC-01 – User Registration, Login & Cart Creation

**Type:** @Smoke, Positive

### Test Flow

1. Register User
2. Login
3. Create Cart

### Captured Variables

- user_id
- access_token
- cart_id_valid

:contentReference[oaicite:19]{index=19}

---

## TC-02 – Product Selection, Cart Verification & Invoice Generation

**Type:** @Smoke, @Regression, Positive

### Test Flow

1. Get Products
2. Add Product to Cart
3. Verify Cart
4. Generate Invoice

### Captured Variables

- product_id_valid
- invoice_id
- invoice_number

:contentReference[oaicite:20]{index=20}

---

## TC-03 – Login with Invalid Credentials

**Type:** @Smoke, Negative

- Existing Email
- Incorrect Password
- Expected Response: **401 Unauthorized**

:contentReference[oaicite:21]{index=21}

---

## TC-04 – Invoice Without Authentication

**Type:** @Regression, Negative

- No Authorization Header
- Valid Invoice Payload
- Expected Response: **401 Unauthorized**

:contentReference[oaicite:22]{index=22}

---

## TC-05 – Duplicate Email Registration

**Type:** @Regression, Negative

- Existing Email Address
- Expected Response: **409 Conflict**

:contentReference[oaicite:23]{index=23}

---

## TC-06 – Add Item with Invalid Product ID

**Type:** @Regression, Edge

- Invalid Product ID
- Valid Cart
- Expected Response: **404 Not Found**

:contentReference[oaicite:24]{index=24}

---

## TC-07 – Retrieve Non-Existent Cart

**Type:** @Regression, Edge

- Invalid Cart ID
- Expected Response: **404 Not Found**

:contentReference[oaicite:25]{index=25}

---

# Additional Payment Test Data

| Payment Method | Payment Details |
|---------------|-----------------|
| Cash on Delivery | `{}` |
| Credit Card | Card Number, Expiry Date, CVV, Card Holder |
| Bank Transfer | Bank Name, Account Name, Account Number |
| Gift Card | Gift Card Number, Validation Code |
| Buy Now Pay Later | Monthly Installments |

:contentReference[oaicite:26]{index=26}

---

# Test Data Dependency Flow

```text
TC-01
(Register → Login → Create Cart)
            │
            ▼
TC-02
(Product → Cart → Invoice)
            │
     ┌──────┴─────────┐
     ▼                ▼
TC-04             TC-06

Standalone Tests
----------------
TC-03
TC-05
TC-07
```

:contentReference[oaicite:27]{index=27}

---

# Recommended Execution Order

| Order | Test Case | Prerequisite |
|------:|-----------|--------------|
| 1 | TC-01 | Unique Test Email |
| 2 | TC-02 | Access Token & Cart ID |
| 3 | TC-03 | None |
| 4 | TC-04 | Cart ID |
| 5 | TC-05 | None |
| 6 | TC-06 | Cart ID |
| 7 | TC-07 | None |

:contentReference[oaicite:28]{index=28}
