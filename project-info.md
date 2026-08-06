# Project Info

**Primary AI Tool(s) Used:** Cursor (AI-assisted IDE)

**Application Under Test:** Practice Software Testing – Toolshop (Checkout & Application Flow)

**SUT URLs:**
- UI: https://practicesoftwaretesting.com
- API: https://api.practicesoftwaretesting.com
- API Docs: https://api.practicesoftwaretesting.com/api/documentation

**Assessment Start Date:** August 2026  
**Submission Date:** August 2026

---

## Project Summary

This project validates the end-to-end e-commerce experience of the **Practice Software Testing Toolshop** application using a combined **manual + automated** QA approach. The primary focus is on critical customer journeys: **user registration and login**, **product discovery (search, filter, sort)**, **shopping cart and checkout (Cash on Delivery)**, **invoice generation**, **contact and forgot-password flows**, and **API-backed operations** (auth, cart, products, invoices, messages).

The automation framework uses **Playwright with JavaScript**, following a **Page Object Model (POM)** for UI and a **service/API client layer** for API tests. Manual functional test cases are maintained in `FunctionalTestcase.csv` (parent folder), while automated specs live under `tests/Manual UI Test` and `tests/API Test`.

---

## Tools Used

| Category | Tools |
|----------|-------|
| **Automation** | Playwright (`@playwright/test` v1.51+), JavaScript (Node.js) |
| **Browser** | Google Chrome (headed mode for UI) |
| **API testing** | Playwright `APIRequestContext` |
| **Logging** | Winston (`reports/logs/test-run.log`) |
| **Reporting** | Playwright HTML report, screenshots, video, trace on failure |
| **AI** | Cursor (requirements, test design, automation, debugging) |
| **Manual TC tracking** | Excel (`FunctionalTestcase.csv`) |
| **Config** | dotenv (`.env`), `playwright.config.js` |

---

## Test Coverage Overview

### UI Automation (15 test cases)

| ID | Type | Focus |
|----|------|-------|
| TC_UI_001–003 | @Smoke @Regression | Registration, purchase flow, search/filter/sort |
| TC_UI_004–008 | @Regression | Invalid login, checkout validation, stock, cart persistence, language |
| TC_UI_009–010 | @Regression | Contact form, forgot password |
| UI-1 to UI-5 | @Regression | Visual checks (logo, product image, related products, listing, header banner) |

### API Automation (8 test cases)

| ID | Type | Focus |
|----|------|-------|
| TC-01, TC-02 | @Smoke @Positive | Auth + cart; product list + invoice |
| TC-03 | @Smoke @Negative | Invalid login |
| TC-04 | @Regression @Negative | Unauthorized invoice |
| TC-05 | @Regression @Positive | Product search |
| TC-06 | @Regression @Positive | Cart quantity update |
| TC-07 | @Regression @Positive | Contact message + reply |
| TC-08 | @Regression @Positive | View single product |

---

## Setup Summary

### 1. Providing Project and SUT Context to AI

Context was shared with Cursor through structured prompts and reference files:

- **SUT URLs** for UI and API, plus OpenAPI documentation link
- **Acceptance criteria** (AC1: registration/login/cart; AC2: product selection/invoice)
- **Sample pages** (home, product detail, checkout, login)
- **Business rules** (stock limits, COD payment, cart persistence, login required for checkout)
- **Prompt library** in `../ai-prompts/` (`requirements-and-planning.md`, `test-design.md`, `test-design-API.md`, `test-data.md`, `automation-and-debugging.md`)
- **Existing framework conventions** when extending tests (POM, fixtures, naming)

This gave the AI enough domain knowledge to generate relevant test cases and automation without guessing application behaviour.

### 2. AI for Requirement Analysis

AI (Cursor) was used to:

- Analyse the live application and API documentation
- Identify functional modules (home, listing, search, cart, checkout, auth, profile, contact)
- Map user roles (guest, registered customer, admin)
- Extract business rules (inventory, quantity limits, payment methods, session behaviour)
- Prioritise modules for smoke vs regression coverage

Output was captured in `ai-prompts/requirements-and-planning.md` and used as input for test design.

### 3. AI for Test Planning and Strategy

| Dimension | Strategy |
|-----------|----------|
| **UI vs API** | UI for end-user journeys and visual validation; API for backend contracts, auth, CRUD-style flows, and faster negative tests |
| **Smoke** | Critical paths only: register/login, purchase + invoice (UI); auth + cart + product/invoice (API) |
| **Regression** | Negative, edge, and extended positive scenarios |
| **Manual vs Automated** | Manual TCs in Excel for review/submission; automated Playwright specs for repeatable execution |
| **Tagging** | `@Smoke`, `@Regression`, `@Positive`, `@Negative`, `@Edge` in spec titles for selective runs |

### 4. AI for Manual Test Case Design

AI generated manual test cases covering:

- **Positive:** Registration, purchase flow, search/filter/sort, contact form, forgot password
- **Negative:** Invalid login, checkout without mandatory fields, duplicate API registration
- **Edge:** Stock exceeded, cart persistence after refresh, invalid cart/product IDs
- **Non-functional (UI):** Logo, product image, related products, listing visibility, header banner

Format used in `FunctionalTestcase.csv`:

`TC ID | Type | Execution Type | Title | Description | Test Data | Pre-requisite | Test Steps | Expected Output | Actual Output | Status`

### 5. AI for Automation Design

| Decision | Choice |
|----------|--------|
| **Framework** | Playwright + JavaScript (single tool for UI and API) |
| **UI pattern** | Page Object Model with `POManager` |
| **API pattern** | API client classes with `APIManager` |
| **Fixtures** | Custom `testFixtures.js` (logger, testData, credentialsStore, poManager, apiManager) |
| **Structure** | `UI/pageobjects`, `API/pageObjects`, `tests/Manual UI Test/{smoke,regression,UI}`, `tests/API Test/{smoke,regression}` |
| **Utilities** | Logger, test data generator, user credentials store, env store |
| **Artifacts** | Screenshot/video/trace on UI failure; HTML report |

### 6. Validating and Refining AI-Generated Test Cases and Scripts

AI output was never used blindly. Each item was:

1. **Reviewed** against live application behaviour and API responses
2. **Executed manually or via automation** to confirm steps and expected results
3. **Refined** when locators, timings, or assertions failed (e.g. contact success alert, forgot-password brief toast, cart `cart_items` structure)
4. **Aligned** with existing naming and folder conventions
5. **Re-run** until the full suite passed

Examples of refinements:
- Contact form: 2-second wait + `[role="alert"].alert-success` locator
- Forgot password: capture success alert in parallel (1-second visibility)
- API cart update: assert on `cart_items[].quantity` not `products`
- Logo check: `a.navbar-brand` (SVG logo, not `<img>`)

### 7. AI for Test Data Generation, Environment Assumptions, and API Payloads

| Area | Approach |
|------|----------|
| **Dynamic data** | `TestDataGenerator` — unique emails/passwords per run (`john.coe.{timestamp}@example.com`) |
| **Stored credentials** | `generated-users.json` — latest UI/API registered users |
| **Static samples** | `users.json` — reference data |
| **API payloads** | `generateApiUser()`, `generateInvoicePayload()`, `generateContactMessagePayload()` |
| **Environment** | `.env` for `UI_BASE_URL`, `API_BASE_URL`, `UI_INVOICE_NUMBER`, `LOG_LEVEL` |
| **Assumptions** | Public demo environment; no local API required; internet access needed |

### 8. AI for Debugging Failing Tests and Interpreting Logs

AI assisted debugging by:

- Analysing Playwright failure screenshots, traces, and `reports/logs/test-run.log`
- Inspecting live DOM/API responses to fix locators and response shape mismatches
- Suggesting waits for flaky UI elements (product listing load, brief alerts)
- Diagnosing environment issues (ffmpeg, stale credentials, account lockout after repeated invalid logins)

Typical workflow: run test → read log + screenshot → share error with AI → apply fix → re-run.

### 9. Information Avoided Sharing with AI

The following was **not** shared unnecessarily:

- Real personal credentials or production secrets
- API keys, tokens, or passwords from non-demo accounts
- Internal company URLs or proprietary data unrelated to the assessment
- `.env` file contents with sensitive values

Only demo-application context and synthetic test data were used.

### 10. Reusing This QA Workflow in a Real Project

This workflow scales to production projects as follows:

1. **Requirements intake** → AI-assisted analysis with SUT URLs, ACs, and business rules documented
2. **Test design** → AI drafts manual cases; QA reviews and adds to test management tool / Excel
3. **Automation scaffold** → POM + API clients + fixtures + tagging strategy
4. **Iterative refinement** → Execute, fix, re-run; keep prompts in a shared `ai-prompts/` library
5. **CI integration** → `npm run test:smoke` on every build; full regression nightly
6. **Reporting** → HTML report + logs + artifacts for triage
7. **Data strategy** → Dynamic users per run; credential store for dependent tests
8. **Security** → Never commit secrets; use `.env.example` as template

---

## Project Structure

```
Automation/
├── API/pageObjects/          # API client classes (Auth, Cart, Product, Invoice, Message)
├── UI/
│   ├── pageobjects/          # UI Page Objects + POManager
│   ├── utilities/            # Fixtures, logger, test data, credentials store
│   └── resources/data/       # users.json, generated-users.json
├── config/                   # testConfig.js
├── tests/
│   ├── Manual UI Test/       # UI automation (smoke, regression, UI)
│   └── API Test/             # API automation (smoke, regression)
├── reports/
│   ├── html-report/          # Playwright HTML report
│   └── logs/                 # Winston log file
├── test-results/             # Screenshots, videos, traces (on failure)
├── playwright.config.js
├── package.json
├── .env.example
├── project-info.md           # This file
└── README.md
```

---

## Manual Test Artifacts

| Artifact | Location |
|----------|----------|
| Functional test cases (Excel) | `../FunctionalTestcase.csv` |
| AI prompt library | `../ai-prompts/` |
