# AI Prompts – Test Design

This document captures the AI prompts and responses used to generate a concise **Manual UI Test Suite** for the Practice Software Testing application.

The objective was to create a professional set of test cases covering **Positive**, **Negative**, and **Edge** scenarios while classifying them as **@Smoke** and **@Regression** tests.

---

# Prompt 1 – Test Case Generation Request

## Prompt

> Kindly generate the Test cases which should also include below types:
>
> - Positive
> - Negative
> - Edge
> - Smoke
> - Regression
>
> Kindly refer below 2 sample TCs for reference:
>
> **AC1: User Registration & Login**
>
> The user should be able to register with valid details, log in using the registered credentials, and verify their profile information successfully.
>
> **AC2: End-to-End Purchase Flow**
>
> The user should be able to browse products, add multiple items to the cart (including updating quantity), complete the checkout using Cash on Delivery, and successfully view the generated invoice under **My Invoices**.
>
> **Note**
>
> - There should not be more than **5–8 test cases** of each type.
> - Test cases should be **Manual + UI**.
> - Include both **@Smoke** and **@Regression** tags.
>
> **Required Test Case Format**
>
> ```
> TC ID | Type | Execution Type | Title | Description | Test Data |
> Pre-requisite | Test Steps | Expected Output | Actual Output | Status
> ```
>
> Let me know if you require any other inputs from my side.
>
> **Application URLs**
>
> Home Page
>
> https://practicesoftwaretesting.com/
>
> Product Pages
>
> - https://practicesoftwaretesting.com/product/01KZ36RV84E2738RYPW268N6DK
> - https://practicesoftwaretesting.com/product/01KZ36RV89A8Z280K5W9GQ70Z8
> - https://practicesoftwaretesting.com/product/01KZ36RV86RQBWHQAMFPSV5T37
>
> Checkout Page
>
> https://practicesoftwaretesting.com/checkout
>
> User login is required to place an order.

---

# Response

The provided information is sufficient to generate a professional QA test suite.

---

## Deliverables

The generated test suite will include:

### Manual UI Test Cases

- Positive
- Negative
- Edge

### Test Coverage

- User Registration
- Login
- Product Search
- Product Details
- Add to Cart
- Update Cart
- Checkout
- Cash on Delivery
- Invoice Validation
- Logout
- Basic Validation & Error Scenarios

### Execution Type

- Manual
- UI

---

## Test Case Format

| Column |
|---------|
| TC ID |
| Type |
| Execution Type |
| Title |
| Description |
| Test Data |
| Pre-requisite |
| Test Steps |
| Expected Output |
| Actual Output |
| Status |

---

## Assumptions

Unless specified otherwise, the following assumptions are used:

- Test Environment: Practice Software Testing
- Browser: Chrome (Latest)
- Payment Method: Cash on Delivery
- Existing customer account available
- Product stock available
- Guest checkout not allowed
- Invoice generated after successful order
- Default language: English

---

## Planned Test Suite Size

| Suite | Count |
|--------|------:|
| Manual/UI (Positive) | 5–8 |
| Manual/UI (Negative) | 5–8 |
| Manual/UI (Edge) | 5–8 |

---

# Prompt 2 – Generate Test Cases

## Prompt

> Ok, looks good.
>
> Please generate the Test cases.

---

# Response

Below is a concise **Manual/UI Test Suite** consisting of **8 test cases** covering **Positive**, **Negative**, and **Edge** scenarios with appropriate **@Smoke** and **@Regression** tags.

---

# Manual UI Test Cases

| TC ID | Type | Execution Type | Title | Description | Test Data | Pre-requisite | Test Steps | Expected Output | Actual Output | Status |
|------|------|----------------|--------|-------------|-----------|---------------|------------|-----------------|---------------|--------|
| **TC_UI_001 @Smoke** | Positive | Manual/UI | Verify user can register and login successfully | Verify a new user can register, login, and access profile. | Valid user details | User is not registered | 1. Open Home Page.<br>2. Click **Sign In/Register**.<br>3. Register with valid details.<br>4. Login using registered credentials.<br>5. Navigate to **My Profile**. | Registration succeeds. User logs in successfully and profile information is displayed correctly. | | |
| **TC_UI_002 @Smoke** | Positive | Manual/UI | Verify complete purchase flow using Cash on Delivery | Validate end-to-end purchase flow including invoice generation. | Valid login, COD | Registered user | 1. Login.<br>2. Search a product.<br>3. Open Product Details.<br>4. Add product to Cart.<br>5. Update quantity.<br>6. Checkout.<br>7. Select **Cash on Delivery**.<br>8. Place order.<br>9. Navigate to **My Invoices**. | Order is placed successfully. Invoice is generated and visible under **My Invoices**. | | |
| **TC_UI_003 @Smoke** | Positive | Manual/UI | Verify search, filter and sorting functionality | Verify user can locate products using search, category, price range, and sorting. | Product Name: Hammer | Products available | 1. Search for a product.<br>2. Apply Category filter.<br>3. Apply Price filter.<br>4. Sort **Price Low → High**. | Only matching products are displayed and sorting/filtering work correctly. | | |
| **TC_UI_004 @Regression** | Negative | Manual/UI | Verify login with invalid credentials | Verify system rejects invalid login attempts. | Invalid email/password | Login page available | 1. Open Login page.<br>2. Enter invalid credentials.<br>3. Click **Login**. | Login fails and an appropriate validation message is displayed. | | |
| **TC_UI_005 @Regression** | Negative | Manual/UI | Verify checkout without mandatory fields | Verify mandatory checkout fields are validated. | Blank address | User logged in with product in cart | 1. Add product to cart.<br>2. Proceed to Checkout.<br>3. Leave mandatory fields blank.<br>4. Continue. | Validation messages are displayed and order is not placed. | | |
| **TC_UI_006 @Regression** | Negative | Manual/UI | Verify quantity exceeding available stock | Verify quantity cannot exceed available inventory. | Quantity greater than stock | Product available | 1. Open Product page.<br>2. Enter quantity greater than stock.<br>3. Add to Cart. | System prevents adding quantity exceeding stock and displays an appropriate message. | | |
| **TC_UI_007 @Regression** | Edge | Manual/UI | Verify cart persistence after session refresh | Verify cart contents persist after browser refresh or login. | Existing cart | Product already added to cart | 1. Add products to Cart.<br>2. Refresh browser.<br>3. Login again if required.<br>4. Open Cart. | Previously added products remain available in the cart. | | |
| **TC_UI_008 @Regression** | Edge | Manual/UI | Verify language change across pages | Verify selected language persists while navigating the application. | Change language | Home page loaded | 1. Change language.<br>2. Navigate to Product page.<br>3. Open Cart.<br>4. Open Checkout. | Selected language remains applied across all pages. | | |

---

# Test Coverage Summary

## Scenario Coverage

- ✅ User Registration
- ✅ User Login
- ✅ Product Search
- ✅ Product Details
- ✅ Add to Cart
- ✅ Update Quantity
- ✅ Checkout
- ✅ Cash on Delivery
- ✅ Invoice Validation
- ✅ Cart Persistence
- ✅ Language Selection

---

## Test Type Distribution

| Type | Count |
|------|------:|
| Positive | 3 |
| Negative | 3 |
| Edge | 2 |

---

## Execution Tag Distribution

| Tag | Count |
|------|------:|
| @Smoke | 3 |
| @Regression | 5 |

---

> **Note:** The generated test suite is intentionally concise (8 test cases) while covering the application's critical business flows and balancing **Positive**, **Negative**, and **Edge** scenarios with **@Smoke** and **@Regression** execution tags.
