# VMetrix QA Challenge - Test Cases

## UI Test Cases — SauceDemo (https://www.saucedemo.com)

> All cases assume the user is already authenticated as `standard_user`.

---

### UI-01: Filter products by price Low to High

| Field       | Value |
|-------------|-------|
| ID          | UI-01 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | High |
| Module      | Inventory / Sorting |

**Preconditions:** User is logged in and on the inventory page.

**Steps:**
1. Open `/inventory.html`.
2. Click the sort dropdown.
3. Select "Price (low to high)".

**Expected Result:** Products are displayed in ascending order by price (lowest price first).

---

### UI-02: Filter products by price High to Low

| Field       | Value |
|-------------|-------|
| ID          | UI-02 |
| Type        | Positive |
| Automated   | No |
| Priority    | Medium |
| Module      | Inventory / Sorting |

**Preconditions:** User is logged in and on the inventory page.

**Steps:**
1. Open `/inventory.html`.
2. Click the sort dropdown.
3. Select "Price (high to low)".

**Expected Result:** Products are displayed in descending order by price (highest price first).

---

### UI-03: Sort products by name A to Z

| Field       | Value |
|-------------|-------|
| ID          | UI-03 |
| Type        | Positive |
| Automated   | No |
| Priority    | Medium |
| Module      | Inventory / Sorting |

**Preconditions:** User is logged in and on the inventory page.

**Steps:**
1. Open `/inventory.html`.
2. Click the sort dropdown.
3. Select "Name (A to Z)".

**Expected Result:** Products are displayed alphabetically A→Z by title.

---

### UI-04: Add a single product to cart from inventory

| Field       | Value |
|-------------|-------|
| ID          | UI-04 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Critical |
| Module      | Shopping Cart |

**Preconditions:** User is logged in and on the inventory page. Cart is empty.

**Steps:**
1. Open `/inventory.html`.
2. Click the "Add to cart" button on "Sauce Labs Backpack".
3. Check the cart icon badge.

**Expected Result:** Cart badge shows "1". The button for the product changes to "Remove".

---

### UI-05: Add multiple products and verify cart badge count

| Field       | Value |
|-------------|-------|
| ID          | UI-05 |
| Type        | Positive |
| Automated   | No |
| Priority    | High |
| Module      | Shopping Cart |

**Preconditions:** User is logged in and on the inventory page. Cart is empty.

**Steps:**
1. Open `/inventory.html`.
2. Click "Add to cart" on "Sauce Labs Backpack".
3. Click "Add to cart" on "Sauce Labs Bike Light".
4. Click "Add to cart" on "Sauce Labs Bolt T-Shirt".
5. Observe the cart badge.

**Expected Result:** Cart badge displays "3".

---

### UI-06: Remove product from cart page

| Field       | Value |
|-------------|-------|
| ID          | UI-06 |
| Type        | Positive |
| Automated   | No |
| Priority    | High |
| Module      | Shopping Cart |

**Preconditions:** User is logged in. Cart contains at least one item ("Sauce Labs Backpack").

**Steps:**
1. Navigate to `/cart.html`.
2. Click the "Remove" button next to "Sauce Labs Backpack".
3. Verify the cart.

**Expected Result:** Product is removed from cart. Cart is now empty and badge disappears.

---

### UI-07: View product detail page and verify all fields are displayed

| Field       | Value |
|-------------|-------|
| ID          | UI-07 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Medium |
| Module      | Product Detail |

**Preconditions:** User is logged in and on the inventory page.

**Steps:**
1. Open `/inventory.html`.
2. Click on the title "Sauce Labs Backpack".
3. Inspect the detail page.

**Expected Result:** Detail page shows product name, description, price, image, and "Add to cart" button. URL contains `inventory-item.html`.

---

### UI-08: Complete full checkout flow (happy path)

| Field       | Value |
|-------------|-------|
| ID          | UI-08 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Blocker |
| Module      | Checkout |

**Preconditions:** User is logged in. Cart contains "Sauce Labs Backpack".

**Steps:**
1. Go to `/cart.html`.
2. Click "Checkout".
3. Fill in First Name: "John", Last Name: "Doe", Postal Code: "12345".
4. Click "Continue".
5. Review order summary, click "Finish".

**Expected Result:** Confirmation page shows "Thank you for your order!" URL is `/checkout-complete.html`.

---

### UI-09: Attempt checkout with missing required First Name field

| Field       | Value |
|-------------|-------|
| ID          | UI-09 |
| Type        | Negative |
| Automated   | Yes |
| Priority    | Critical |
| Module      | Checkout / Validation |

**Preconditions:** User is logged in. Cart contains at least one item.

**Steps:**
1. Navigate through cart to checkout step 1.
2. Fill only Last Name ("Smith") and Postal Code ("67890"), leave First Name blank.
3. Click "Continue".

**Expected Result:** Error message "Error: First Name is required" appears. User remains on step 1 page.

---

### UI-10: Verify empty cart state shows no items

| Field       | Value |
|-------------|-------|
| ID          | UI-10 |
| Type        | Negative |
| Automated   | No |
| Priority    | Medium |
| Module      | Shopping Cart |

**Preconditions:** User is logged in. Cart is empty (no products added).

**Steps:**
1. Navigate to `/cart.html` without adding any products.
2. Observe the cart contents.

**Expected Result:** Cart shows no items. No cart badge is visible on the header icon. "Checkout" button is still present.

---

## API Test Cases — DummyJSON (https://dummyjson.com)

---

### API-01: POST /auth/login with valid credentials returns token

| Field       | Value |
|-------------|-------|
| ID          | API-01 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Blocker |
| Module      | Authentication |

**Endpoint:** `POST https://dummyjson.com/auth/login`

**Request Body:**
```json
{ "username": "emilys", "password": "emilyspass" }
```

**Expected Result:**
- HTTP 200
- Body contains `accessToken` (non-empty string)
- Body contains `refreshToken` (non-empty string)
- `username` matches "emilys"
- `id` is a positive integer

---

### API-02: POST /auth/login with invalid credentials returns 400

| Field       | Value |
|-------------|-------|
| ID          | API-02 |
| Type        | Negative |
| Automated   | Yes |
| Priority    | Critical |
| Module      | Authentication |

**Endpoint:** `POST https://dummyjson.com/auth/login`

**Request Body:**
```json
{ "username": "emilys", "password": "wrongpassword" }
```

**Expected Result:**
- HTTP 400
- Body contains `message` field with error description

---

### API-03: GET /products with pagination returns correct items count

| Field       | Value |
|-------------|-------|
| ID          | API-03 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Critical |
| Module      | Products |

**Endpoint:** `GET https://dummyjson.com/products?limit=10&skip=0`

**Expected Result:**
- HTTP 200
- `products` array has exactly 10 items
- `limit` = 10, `skip` = 0
- `total` > 10
- Each product has `id`, `title`, `price`

---

### API-04: GET /products/:id returns specific product

| Field       | Value |
|-------------|-------|
| ID          | API-04 |
| Type        | Positive |
| Automated   | No |
| Priority    | High |
| Module      | Products |

**Endpoint:** `GET https://dummyjson.com/products/1`

**Expected Result:**
- HTTP 200
- `id` = 1
- `title`, `description`, `price`, `category` are present and non-empty

---

### API-05: POST /products/add creates product and returns assigned id

| Field       | Value |
|-------------|-------|
| ID          | API-05 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | High |
| Module      | Products |

**Endpoint:** `POST https://dummyjson.com/products/add`

**Request Body:**
```json
{
  "title": "VMetrix Test Product",
  "price": 49.99,
  "stock": 100,
  "description": "Created by automated test"
}
```

**Expected Result:**
- HTTP 201
- `id` is a positive integer
- `title` = "VMetrix Test Product"
- `price` = 49.99, `stock` = 100

---

### API-06: PUT /products/:id updates product fields

| Field       | Value |
|-------------|-------|
| ID          | API-06 |
| Type        | Positive |
| Automated   | No |
| Priority    | High |
| Module      | Products |

**Endpoint:** `PUT https://dummyjson.com/products/1`

**Request Body:**
```json
{ "price": 999.99 }
```

**Expected Result:**
- HTTP 200
- `id` = 1
- `price` = 999.99 (updated value reflected in response)

---

### API-07: DELETE /products/:id marks product as deleted

| Field       | Value |
|-------------|-------|
| ID          | API-07 |
| Type        | Positive |
| Automated   | No |
| Priority    | Medium |
| Module      | Products |

**Endpoint:** `DELETE https://dummyjson.com/products/1`

**Expected Result:**
- HTTP 200
- `isDeleted` = true
- `deletedOn` field is present (timestamp string)

---

### API-08: GET /users with pagination returns paged users

| Field       | Value |
|-------------|-------|
| ID          | API-08 |
| Type        | Positive |
| Automated   | Yes |
| Priority    | Normal |
| Module      | Users |

**Endpoint:** `GET https://dummyjson.com/users?limit=5&skip=0`

**Expected Result:**
- HTTP 200
- `users` array has exactly 5 items
- `limit` = 5, `skip` = 0
- Each user has `id`, `firstName`, `lastName`, `email`
- A second request with `skip=5` returns a different, non-overlapping set of users

---

### API-09: GET /users/:id returns specific user

| Field       | Value |
|-------------|-------|
| ID          | API-09 |
| Type        | Positive |
| Automated   | No |
| Priority    | Medium |
| Module      | Users |

**Endpoint:** `GET https://dummyjson.com/users/1`

**Expected Result:**
- HTTP 200
- `id` = 1
- `firstName`, `lastName`, `email`, `username` are present

---

### API-10: GET /products/:id with non-existent id returns 404

| Field       | Value |
|-------------|-------|
| ID          | API-10 |
| Type        | Negative |
| Automated   | No |
| Priority    | Medium |
| Module      | Products |

**Endpoint:** `GET https://dummyjson.com/products/9999`

**Expected Result:**
- HTTP 404
- Response body contains a `message` field indicating product not found
