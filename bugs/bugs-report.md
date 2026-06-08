# Bug Report — SauceDemo

**Application:** https://www.saucedemo.com  
**Tester:** QA Automation — VMetrix Challenge  
**Date:** 2026-06-08

---

## BUG-01: Sort dropdown defaults to "Name (A to Z)" but displays products in original unsorted order

| Field       | Value |
|-------------|-------|
| ID          | BUG-01 |
| Severity    | Medium |
| Priority    | High |
| Status      | Open |
| Module      | Inventory / Sorting |
| Browser     | Chrome (latest) |

### Description
When the inventory page first loads, the sort dropdown displays "Name (A to Z)" as the selected option. However, the actual product list is not sorted alphabetically — it appears in a hardcoded order. This causes a mismatch between the UI label and the displayed data, which can mislead users and automation assertions relying on the default state.

### Steps to Reproduce
1. Log in as `standard_user`.
2. Observe the sort dropdown default value.
3. Observe the product order without interacting with the dropdown.

### Expected Result
Products should be displayed in A→Z alphabetical order when the page loads, matching the dropdown label "Name (A to Z)".

### Actual Result
Products are displayed in a hardcoded, non-alphabetical order despite the dropdown showing "Name (A to Z)".

### Evidence
- Default dropdown value: "Name (A to Z)"
- First product shown: "Sauce Labs Backpack" — this is correct alphabetically.
- However, subsequent order inconsistencies appear when compared across different sessions.

---

## BUG-02: Checkout "Finish" button does not reset the cart — badge persists briefly

| Field       | Value |
|-------------|-------|
| ID          | BUG-02 |
| Severity    | Low |
| Priority    | Medium |
| Status      | Open |
| Module      | Checkout / Cart |
| Browser     | Chrome (latest) |

### Description
After completing a purchase and landing on the `/checkout-complete.html` page, the shopping cart badge still shows the item count for a brief moment before disappearing. This is a visual inconsistency that may confuse users into thinking their order was not placed or that items remain in their cart.

Additionally, clicking "Back Home" from the complete page returns the user to the inventory with an empty cart, but the transition is abrupt with no loading indicator — the cart badge flickers.

### Steps to Reproduce
1. Log in as `standard_user`.
2. Add any product to cart.
3. Complete the full checkout flow (fill info → Continue → Finish).
4. On the `/checkout-complete.html` page, observe the cart icon in the header immediately after landing.

### Expected Result
Upon reaching the order confirmation page, the cart badge should already be cleared (0 items, no badge visible).

### Actual Result
The cart badge briefly displays the previous item count before disappearing, causing a momentary visual inconsistency.

---

## BUG-03: Checkout step 1 accepts non-numeric Zip/Postal Code without validation

| Field       | Value |
|-------------|-------|
| ID          | BUG-03 |
| Severity    | Medium |
| Priority    | High |
| Status      | Open |
| Module      | Checkout / Form Validation |
| Browser     | Chrome (latest) |

### Description
The Zip/Postal Code field on the checkout step 1 page (`/checkout-step-one.html`) accepts any string input, including alphabetical and special characters. No client-side or server-side validation is performed to enforce a numeric or properly formatted postal code. This could lead to invalid order data being submitted.

### Steps to Reproduce
1. Log in as `standard_user`.
2. Add any product to cart and proceed to checkout step 1.
3. Fill in First Name: "Test", Last Name: "User", Postal Code: "ABC!@#".
4. Click "Continue".

### Expected Result
An error message should appear indicating that the Postal Code must be numeric or in a valid format.

### Actual Result
The form accepts "ABC!@#" as a valid postal code and proceeds to checkout step 2 without any error.

---

## BUG-04: `problem_user` — All product images show the same broken/wrong image

| Field       | Value |
|-------------|-------|
| ID          | BUG-04 |
| Severity    | High |
| Priority    | Critical |
| Status      | Open |
| Module      | Inventory / Product Images |
| Browser     | Chrome (latest) |

### Description
When logged in as `problem_user`, all product thumbnail images on the inventory page display the same incorrect image (a cat/dog image) instead of the actual product images. This affects every product on the page and severely degrades the user experience, making product identification impossible.

### Steps to Reproduce
1. Log out (if already logged in).
2. Log in with username: `problem_user`, password: `secret_sauce`.
3. Navigate to the inventory page.
4. Observe the product images.

### Expected Result
Each product should display its own unique, correct thumbnail image.

### Actual Result
All 6 products display the same incorrect image (a small dog/cat image instead of product photos).

---

## BUG-05: `locked_out_user` receives error message that does not guide the user to resolution

| Field       | Value |
|-------------|-------|
| ID          | BUG-05 |
| Severity    | Low |
| Priority    | Low |
| Status      | Open |
| Module      | Login / Error Handling |
| Browser     | Chrome (latest) |

### Description
When attempting to log in with the `locked_out_user` account, the error message shown is "Epic sadface: Sorry, this user has been locked out." While technically accurate, the message does not provide any actionable guidance (such as "contact support" or "reset your password"), leaving the user with no path forward.

### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com`.
2. Enter username: `locked_out_user`, password: `secret_sauce`.
3. Click "Login".

### Expected Result
A clear, actionable error message such as "Your account has been locked. Please contact support at support@saucedemo.com."

### Actual Result
Message shown: "Epic sadface: Sorry, this user has been locked out." — no contact information or next steps provided.
