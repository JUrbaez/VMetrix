import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

const CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
};

interface SauceDemoFixtures {
  loggedInPage: Page;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productDetailPage: ProductDetailPage;
}

export const test = base.extend<SauceDemoFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);
    await use(page);
  },

  inventoryPage: async ({ loggedInPage }, use) => {
    await use(new InventoryPage(loggedInPage));
  },

  cartPage: async ({ loggedInPage }, use) => {
    await use(new CartPage(loggedInPage));
  },

  checkoutPage: async ({ loggedInPage }, use) => {
    await use(new CheckoutPage(loggedInPage));
  },

  productDetailPage: async ({ loggedInPage }, use) => {
    await use(new ProductDetailPage(loggedInPage));
  },
});

export { expect } from '@playwright/test';
export { CREDENTIALS };
