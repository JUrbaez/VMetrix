import { test, expect } from '../../fixtures/saucedemo';
import { allure } from 'allure-playwright';

test.describe('Product Detail Page', () => {
  test('UI-07: View product detail page and verify all fields are displayed', async ({
    inventoryPage,
    loggedInPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Product Detail');
    await allure.story('View product details');
    await allure.severity('normal');

    const targetProduct = 'Sauce Labs Backpack';

    await allure.step('Navigate to inventory', async () => {
      await inventoryPage.goto();
    });

    await allure.step(`Click on product "${targetProduct}"`, async () => {
      await inventoryPage.openProduct(targetProduct);
    });

    await allure.step('Verify detail page URL', async () => {
      await expect(loggedInPage).toHaveURL(/inventory-item\.html/);
    });

    await allure.step('Verify product name, description, price, and image are visible', async () => {
      const { ProductDetailPage } = await import('../../pages/ProductDetailPage');
      const detailPage = new ProductDetailPage(loggedInPage);
      await detailPage.assertProductVisible();
      await detailPage.assertProductName(targetProduct);
    });

    await allure.step('Verify Add to Cart button is present', async () => {
      const { ProductDetailPage } = await import('../../pages/ProductDetailPage');
      const detailPage = new ProductDetailPage(loggedInPage);
      await detailPage.assertAddToCartButtonVisible();
    });
  });
});
