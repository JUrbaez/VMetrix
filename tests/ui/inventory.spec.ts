import { test, expect } from '../../fixtures/saucedemo';
import { allure } from 'allure-playwright';

test.describe('Inventory - Product Sorting and Cart', () => {
  test('UI-01: Filter products by price Low to High', async ({ inventoryPage }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Product Sorting');
    await allure.story('Sort by price ascending');
    await allure.severity('normal');

    await allure.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
    });

    await allure.step('Apply sort: Price (low to high)', async () => {
      await inventoryPage.filterBy('lohi');
    });

    await allure.step('Verify products are sorted ascending by price', async () => {
      const prices = await inventoryPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });
  });

  test('UI-04: Add a single product to cart from inventory', async ({ inventoryPage }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Shopping Cart');
    await allure.story('Add product from inventory');
    await allure.severity('critical');

    await allure.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
    });

    await allure.step('Add "Sauce Labs Backpack" to cart', async () => {
      await inventoryPage.addToCart('Sauce Labs Backpack');
    });

    await allure.step('Verify cart badge shows count of 1', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(1);
    });
  });
});
