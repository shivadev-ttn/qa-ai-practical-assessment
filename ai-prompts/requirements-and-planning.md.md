# AI Prompts – Requirements & Planning

This document contains AI prompts and responses used for **Requirement Analysis**, **Test Planning**, and **Test Strategy** for both **UI** and **API** testing of the Practice Software Testing application.

---

# 1. UI Requirement Analysis & Test Strategy

## Prompt

> Below is an e-commerce site for which I want to analyse the requirement and then test planning and strategy (UI vs API, smoke vs regression, etc.)
>
> **SUT:** https://practicesoftwaretesting.com/
>
> Let me know if require any other inputs from my side.

---

## Requirement Analysis

### Project Information

| Item | Details |
|------|---------|
| Application | Practice Software Testing |
| Domain | Retail / E-Commerce |

### User Roles

- Guest User
- Registered Customer
- Administrator (Assumed)

---

## Functional Modules

| Module | Priority | Automation |
|---------|----------|------------|
| Home Page | High | ✅ |
| Product Listing | High | ✅ |
| Product Details | High | ✅ |
| Search | High | ✅ |
| Filters | High | ✅ |
| Sorting | High | ✅ |
| Price Range | High | ✅ |
| Shopping Cart | Critical | ✅ |
| Checkout | Critical | ✅ |
| Payment | Critical | Partial |
| Login | High | ✅ |
| Registration | High | ✅ |
| Forgot Password | Medium | ✅ |
| Language Change | Medium | ✅ |
| User Profile | Medium | ✅ |
| Orders | Medium | ✅ |

---

## Business Rules

### Products

- Inventory managed
- Product can become Out of Stock
- Quantity cannot exceed stock
- No discounts on products

### Cart

Supports:

- Guest Cart
- Logged-in Cart
- Cart Persistence
- Session Timeout

Validations:

- Quantity cannot exceed inventory
- Cart total updates instantly
- Removing items updates totals
- Cart persists after login

### Checkout

Supports:

- Shipping Address
- Billing Address
- Coupons
- Taxes

### Payment

Supports:

- Multiple payment methods
- Retry payment
- Cancel payment
- Refund

### Authentication

Supports:

- Password Policy
- Forgot Password
- Email Verification

### Search

Supports:

- Partial Search
- Category Search
- Typo Tolerance

### Additional Features

- Product Sorting
- Price Range Filter
- Language Change

---

# Test Strategy

## 1. UI Testing

### Home

- Navigation
- Hero Banner
- Categories
- Featured Products
- Footer

### Product Listing

- Grid Layout
- Product Cards
- Images
- Prices
- Ratings

### Filters

- Brand
- Category
- Availability
- Price Range

### Sorting

- Price Low → High
- Price High → Low
- Name A → Z
- Name Z → A

### Product Details

- Images
- Description
- Specifications
- Quantity
- Stock
- Add to Cart

### Cart

- Add Item
- Remove Item
- Update Quantity
- Continue Shopping
- Checkout

### Checkout

- Shipping
- Billing
- Coupon
- Tax
- Order Summary

### Payment

- Successful Payment
- Failed Payment
- Retry
- Cancel

### Language

- Language Switch
- Translation
- Currency (if applicable)

---

## 2. API Testing

Validate APIs for:

- Authentication
- Products
- Cart
- Checkout
- Payment

Verification includes:

- Status Codes
- Response Time
- Response Schema
- Error Handling
- Authentication
- Authorization

---

## 3. Smoke Testing

Run after every deployment.

### Critical Flow

- Home Page
- Login
- Search
- Product Details
- Add to Cart
- Checkout
- Payment
- Logout

> Approx. **20–30 test cases**

---

## 4. Sanity Testing

Executed after bug fixes.

### Example

**Search Fix**

- Search
- Filter
- Sorting

**Cart Fix**

- Add Item
- Remove Item
- Quantity
- Total Calculation

---

## 5. Regression Testing

### Functional

- Login
- Registration
- Search
- Filters
- Sorting
- Cart
- Checkout
- Payment
- Orders

### UI

- Responsive Design
- Browser Compatibility
- Alignment
- Fonts
- Images
- Links

### API

- CRUD Operations
- Authentication
- Negative Scenarios

### Security

- Session Timeout
- Authorization
- SQL Injection
- XSS

### Performance

- Page Load
- API Response Time
- Image Loading

### Accessibility

- Keyboard Navigation
- Screen Reader
- Contrast
- Focus Order

---

# Automation Strategy

| Suite | Automation | Frequency |
|--------|------------|-----------|
| Smoke | 100% | Every Build |
| Sanity | 100% | After Bug Fix |
| Critical Regression | 90% | Every Sprint |
| Full Regression | 70–80% | Before Release |
| Visual Regression | Key Pages | Every UI Release |
| API Regression | 100% | Every Build |

---

# Risk-Based Testing Priority

| Priority | Features |
|-----------|----------|
| 🔴 P0 | Login, Cart, Checkout, Payment |
| 🟠 P1 | Search, Filters, Sorting, Product Details |
| 🟡 P2 | Registration, Profile, Orders, Coupons |
| 🟢 P3 | Language, Footer, Contact, Static Pages |

---

# Suggested Test Execution Flow

```text
Smoke Testing
      │
      ▼
Authentication
      │
      ▼
Product Catalogue
      │
      ▼
Search + Filters + Sorting
      │
      ▼
Product Details
      │
      ▼
Shopping Cart
      │
      ▼
Checkout
      │
      ▼
Payment
      │
      ▼
Order Confirmation
      │
      ▼
Regression Testing
      │
      ▼
Cross-Browser & Responsive
      │
      ▼
Accessibility
      │
      ▼
Performance
```

---

# 2. API Requirement Analysis & Test Strategy

## Prompt

> Below is a Swagger API collection URL for which I want to analyze the requirement and then test planning and strategy.
>
> **API Documentation:** https://api.practicesoftwaretesting.com/api/documentation
>
> Let me know if require any other inputs from my side.

---

## Requirement Analysis

Swagger documentation is sufficient to:

- Analyze API contracts
- Understand business modules
- Identify API dependencies
- Plan API testing strategy
- Create API test cases

### Key API Modules

- Authentication
- User
- Product
- Category
- Brand
- Cart
- Favorites
- Payment
- Invoice
- Reports
- Images
- Contact
- TOTP

---

# Deliverables

| Phase | Deliverable |
|--------|-------------|
| 1 | Requirement Analysis |
| 2 | API Inventory |
| 3 | Test Strategy |
| 4 | Test Plan |
| 5 | Test Scenarios |
| 6 | Detailed Test Cases |
| 7 | Automation Strategy |
| 8 | Traceability Matrix |
| 9 | Defect Checklist |
| 10 | Regression Suite |

---

# Testing Approach

## Step 1 – Requirement Analysis

Analyze:

- API Resources
- Authentication
- Authorization
- CRUD Operations
- Request & Response Models
- Status Codes
- Validation Rules
- Error Responses

---

## Step 2 – Functional Modules

- User Management
- Authentication
- Products
- Categories
- Brands
- Cart
- Favorites
- Checkout
- Payment
- Invoice
- Reports
- Images
- Contact
- TOTP Authentication

---

## Step 3 – Test Strategy

Include:

- Scope
- Objectives
- Test Types
- Automation Scope
- Risks
- Assumptions
- Entry & Exit Criteria

---

## Step 4 – Test Design

Cover:

- Positive Testing
- Negative Testing
- Boundary Testing
- Mandatory Field Validation
- Invalid Data Types
- Invalid Formats
- Missing Headers
- Invalid Authorization
- Expired Tokens
- SQL Injection
- XSS
- Rate Limiting
- Duplicate Data
- Pagination
- Sorting
- Filtering

---

## Step 5 – API Validation

Validate:

- Request Headers
- Request Body
- Query Parameters
- Path Parameters
- Response Schema
- Response Body
- HTTP Status Codes
- Response Headers
- Business Rules

---

## Step 6 – Automation Strategy

Automation options:

- Postman
- Newman
- Playwright API
- REST Assured

---

## Additional Inputs (Optional)

To improve planning, provide:

1. Project Goal
   - Interview Assignment
   - Real Project
   - Learning

2. Expected Deliverables
   - Test Strategy
   - Test Plan
   - Test Cases
   - Automation Framework

3. Testing Depth
   - Basic (40–60)
   - Intermediate (100–150)
   - Comprehensive (250+)

4. Preferred Format
   - Markdown
   - Excel
   - Word
   - PDF
   - Confluence

---

# Simplified API Test Strategy

For most API testing assignments, a concise strategy is sufficient.

## Core Sections

| Section | Description |
|----------|-------------|
| Requirement Analysis | Understand API modules, authentication, business flows, and dependencies |
| Test Strategy | Scope, objectives, test types, tools, and risks |
| Test Planning | Entry/Exit criteria, environment, assumptions, deliverables |
| Test Scenarios | Positive, Negative, Boundary, Authentication, Response Validation |
| Automation | High-level automation using Postman/Newman or Playwright API |

---

## Key Test Types

- ✅ Functional Testing
- ✅ Positive Testing
- ✅ Negative Testing
- ✅ Boundary Value Testing
- ✅ Authentication & Authorization
- ✅ Response Schema Validation
- ✅ Status Code Validation
- ✅ Error Handling
- ✅ Smoke Testing
- ✅ Regression Testing

---

## Final Deliverables

- Requirement Analysis
- API Test Strategy
- API Test Plan
- API Test Scenarios / Test Cases
- Automation Approach (Optional)

---

> **Note:** This document serves as a concise reference for AI-assisted Requirement Analysis, Test Planning, and Test Strategy for both UI and API testing.
