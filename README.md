# Practice Software Testing – QA Automation Framework

Playwright-based automation framework for **UI** and **API** testing of the [Practice Software Testing Toolshop](https://practicesoftwaretesting.com).

For AI-assisted workflow, test strategy, and project background, see **[project-info.md](./project-info.md)**.

---

## Project Information

| Item | Detail |
|------|--------|
| **Framework** | [Playwright](https://playwright.dev/) + JavaScript (Node.js) |
| **Design pattern** | Page Object Model (UI) + API Service Layer (API) |
| **UI SUT** | https://practicesoftwaretesting.com |
| **API SUT** | https://api.practicesoftwaretesting.com |
| **Browser** | Google Chrome (headed, 1280×720, 80% zoom for UI) |
| **Manual test cases** | `../FunctionalTestcase.csv` |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **Google Chrome** installed (Playwright uses `channel: 'chrome'`)
- Internet access to reach the public demo application

---

## Installation

```bash
# Clone or copy the project, then:
cd "Playwright Framework + Report"

# Install dependencies
npm install

# Install Playwright browser (Chrome)
npm run install:browsers
```

### Environment setup

Copy the example env file and adjust if needed:

```bash
copy .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_BASE_URL` | `https://practicesoftwaretesting.com` | UI application URL |
| `API_BASE_URL` | `https://api.practicesoftwaretesting.com` | API base URL |
| `LOG_LEVEL` | `info` | Winston log level |
| `UI_INVOICE_NUMBER` | _(empty)_ | Populated by purchase flow test (optional) |

---

## Project Structure

```
Automation/
├── API/pageObjects/       # AuthApi, CartApi, ProductApi, InvoiceApi, MessageApi, APIManager
├── UI/
│   ├── pageobjects/       # HomePage, LoginPage, CartPage, CheckoutPage, etc.
│   ├── utilities/         # testFixtures, logger, testDataGenerator, userCredentialsStore
│   └── resources/
│       ├── data/          # Test data files
│       └── sortOptions.js
├── config/testConfig.js
├── tests/
│   ├── Manual UI Test/
│   │   ├── smoke/         # TC_UI_001 – TC_UI_003
│   │   ├── regression/    # TC_UI_004 – TC_UI_010
│   │   └── UI/            # UI-1 – UI-5 (visual checks)
│   └── API Test/
│       ├── smoke/         # TC-01 – TC-03
│       └── regression/    # TC-04 – TC-08
├── reports/
│   ├── html-report/       # HTML test report
│   └── logs/test-run.log  # Execution log
└── test-results/          # Failure artifacts (screenshot, video, trace)
```

---

## Test Data

| File | Purpose |
|------|---------|
| `UI/resources/data/generated-users.json` | Latest registered UI/API users (auto-updated by tests) |
| `UI/resources/data/users.json` | Static sample user data |
| `UI/utilities/testDataGenerator.js` | Dynamic emails, passwords, API payloads, contact messages |
| `.env` | Runtime config and invoice number from checkout test |

Credentials are generated uniquely per run to avoid duplicate-email conflicts on the demo API.

---

## Running Tests

### All tests (UI + API)

```bash
npm test
```

### UI tests only

```bash
npm run test:ui
```

Runs all specs under `tests/Manual UI Test/` in Chrome (headed).

### API tests only

```bash
npm run test:api
```

Runs all specs under `tests/API Test/`.

### Smoke tests only

```bash
npm run test:smoke
```

Runs tests tagged with `@Smoke` across both UI and API projects.

### Regression tests only

```bash
npx playwright test --grep @Regression
```

### UI smoke only

```bash
npx playwright test --project=ui --grep @Smoke
```

### API smoke only

```bash
npx playwright test --project=api --grep @Smoke
```

### API regression only

```bash
npx playwright test --project=api --grep @Regression
```

### UI regression only

```bash
npx playwright test --project=ui --grep @Regression
```

### Run a single test file

```bash
npx playwright test --project=ui "tests/Manual UI Test/smoke/01_Registration.spec.js"
npx playwright test --project=api "tests/API Test/smoke/01_AuthCart.spec.js"
```

### Headed UI run (explicit)

```bash
npm run test:headed
```

---

## Test Suite Summary

### UI – Manual UI Test (15 cases)

| Folder | Test IDs | Tags |
|--------|----------|------|
| `smoke/` | TC_UI_001, 002, 003 | @Smoke @Regression |
| `regression/` | TC_UI_004 – 010 | @Regression |
| `UI/` | UI-1 – UI-5 | @Regression |

### API – API Test (8 cases)

| Folder | Test IDs | Tags |
|--------|----------|------|
| `smoke/` | TC-01, 02, 03 | @Smoke |
| `regression/` | TC-04 – 08 | @Regression |

---

## Reports and Logs

| Output | Location | How to open |
|--------|----------|-------------|
| **HTML report** | `reports/html-report/` | `npm run report` |
| **Execution log** | `reports/logs/test-run.log` | Any text editor |
| **Failure screenshots** | `test-results/` | Auto-captured on UI failure |
| **Failure video** | `test-results/` | Retained on failure |
| **Trace files** | `test-results/` | `npx playwright show-trace <path-to-trace.zip>` |

---

## Manual Test Cases

Functional/manual test cases (for review and manual execution) are maintained in:

```
../FunctionalTestcase.csv
```

Columns: TC ID, Type, Execution Type, Title, Description, Test Data, Pre-requisite, Test Steps, Expected Output, Actual Output, Status.

---

## Troubleshooting

| Issue | Suggestion |
|-------|------------|
| Chrome not found | Run `npm run install:browsers` |
| Duplicate email (API) | Tests use unique emails; delete stale entries in `generated-users.json` if needed |
| Account locked (401/423) | Demo API locks after repeated invalid logins; wait or use a fresh email |
| UI element not found | Run headed (`npm run test:ui`) and check screenshot in `test-results/` |
| ffmpeg missing | Run `npx playwright install ffmpeg` |

---

## AI Prompt Library

Reusable prompts used during this assessment:

```
../ai-prompts/
├── requirements-and-planning.md
├── test-design.md
├── test-design-API.md
├── test-data.md
└── automation-and-debugging.md
```


