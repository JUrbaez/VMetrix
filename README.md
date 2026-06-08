# VMetrix QA Automation Challenge

Playwright + TypeScript automation project covering UI tests for [SauceDemo](https://www.saucedemo.com) and API tests for [DummyJSON](https://dummyjson.com), using Page Object Model and Allure reporting.

---

## Requirements

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Java** 8 or higher (required by Allure CLI to open reports)

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/JUrbaez/VMetrix.git
cd VMetrix

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

### All tests (UI + API)
```bash
npm test
```

### UI tests only (SauceDemo)
```bash
npm run test:ui
```

### API tests only (DummyJSON)
```bash
npm run test:api
```

### UI tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run a single spec file
```bash
npx playwright test tests/ui/checkout.spec.ts
```

### Run a specific test by name
```bash
npx playwright test --grep "UI-08"
```

---

## Generating the Allure Report

After running tests, Allure results are written to `allure-results/`.

### Generate + open report
```bash
npm run report
```

### Generate only (no browser)
```bash
npm run report:generate
```

> **Note:** Allure CLI requires Java to be installed. If `allure` is not found, install it via:
> ```bash
> npm install -g allure-commandline
> # or via Homebrew (macOS):
> brew install allure
> ```

---

## Project Structure

```
VMetrix/
├── pages/                    # Page Object Model classes
│   ├── LoginPage.ts          # Login page (used by fixtures)
│   ├── InventoryPage.ts      # Product listing + sorting + add to cart
│   ├── CartPage.ts           # Shopping cart
│   ├── CheckoutPage.ts       # Checkout steps 1, 2, and complete
│   └── ProductDetailPage.ts  # Product detail view
├── fixtures/
│   └── saucedemo.ts          # Custom Playwright fixtures (pre-authenticated page)
├── utils/
│   └── api-client.ts         # Typed HTTP client for DummyJSON API
├── tests/
│   ├── ui/
│   │   ├── inventory.spec.ts      # UI-01, UI-04
│   │   ├── product-detail.spec.ts # UI-07
│   │   └── checkout.spec.ts       # UI-08, UI-09
│   └── api/
│       ├── auth.spec.ts           # API-01, API-02
│       ├── products.spec.ts       # API-03, API-05
│       └── users.spec.ts          # API-08
├── test-cases/
│   └── test-cases.md         # All 20 designed test cases (UI + API)
├── bugs/
│   └── bugs-report.md        # 5 bugs found and documented
├── allure-results/           # Generated at runtime (gitignored)
├── allure-report/            # Generated at runtime (gitignored)
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Test Coverage

### UI Tests — SauceDemo

| ID    | Title                                                         | Type     | Automated |
|-------|---------------------------------------------------------------|----------|-----------|
| UI-01 | Filter products by price Low to High                          | Positive | Yes       |
| UI-02 | Filter products by price High to Low                          | Positive | No        |
| UI-03 | Sort products by name A to Z                                  | Positive | No        |
| UI-04 | Add a single product to cart from inventory                   | Positive | Yes       |
| UI-05 | Add multiple products and verify cart badge count             | Positive | No        |
| UI-06 | Remove product from cart page                                 | Positive | No        |
| UI-07 | View product detail page and verify all fields are displayed  | Positive | Yes       |
| UI-08 | Complete full checkout flow (happy path)                      | Positive | Yes       |
| UI-09 | Attempt checkout with missing required First Name field       | Negative | Yes       |
| UI-10 | Verify empty cart state shows no items                        | Negative | No        |

### API Tests — DummyJSON

| ID     | Endpoint                    | Description                                     | Type     | Automated |
|--------|-----------------------------|-------------------------------------------------|----------|-----------|
| API-01 | POST /auth/login            | Valid credentials return token and user data    | Positive | Yes       |
| API-02 | POST /auth/login            | Invalid credentials return 400                  | Negative | Yes       |
| API-03 | GET /products?limit=10&skip=0 | Paginated list returns 10 items               | Positive | Yes       |
| API-04 | GET /products/:id           | Get specific product by ID                      | Positive | No        |
| API-05 | POST /products/add          | Create product returns id and submitted fields  | Positive | Yes       |
| API-06 | PUT /products/:id           | Update product returns updated fields           | Positive | No        |
| API-07 | DELETE /products/:id        | Delete product returns isDeleted: true          | Positive | No        |
| API-08 | GET /users?limit=5&skip=0   | Paginated users list with no overlap on page 2 | Positive | Yes       |
| API-09 | GET /users/:id              | Get specific user returns correct id            | Positive | No        |
| API-10 | GET /products/9999          | Non-existent product returns 404                | Negative | No        |

---

## Credentials

### SauceDemo
| Username          | Notes                              |
|-------------------|------------------------------------|
| standard_user     | Used for all automated tests       |
| locked_out_user   | Account locked — cannot log in     |
| problem_user      | Images are broken (known bug)      |
| performance_glitch_user | Slow login response          |

Password for all accounts: `secret_sauce`

### DummyJSON
No API key required. Auth tests use: `username: emilys`, `password: emilyspass`.

---

## Bugs Found

See [`bugs/bugs-report.md`](bugs/bugs-report.md) for the full list. Summary:

| ID     | Description                                                        | Severity |
|--------|--------------------------------------------------------------------|----------|
| BUG-01 | Sort dropdown defaults to A→Z but products appear in wrong order   | Medium   |
| BUG-02 | Cart badge persists briefly after order completion                 | Low      |
| BUG-03 | Postal Code accepts non-numeric input without validation           | Medium   |
| BUG-04 | `problem_user`: all product images show the same incorrect image   | High     |
| BUG-05 | `locked_out_user` error message provides no actionable guidance    | Low      |

---

## Tech Stack

| Tool              | Version    | Purpose                         |
|-------------------|------------|---------------------------------|
| Playwright        | ^1.49.0    | Test runner + browser automation|
| TypeScript        | ^5.8.3     | Language                        |
| allure-playwright | ^3.0.0     | Allure reporter integration     |
| allure-commandline| ^2.30.0    | Generate and open Allure HTML   |
