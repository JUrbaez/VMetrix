import { test, expect } from '../../fixtures/saucedemo';
import * as allure from 'allure-js-commons';

test.describe('Página de detalle de producto', () => {
  test('UI-01: Verificar la página de detalle y que todos los campos se muestran', async ({
    inventoryPage,
    productDetailPage,
    loggedInPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Detalle de producto');
    await allure.story('Ver detalles del producto');
    await allure.severity('normal');

    const targetProduct = 'Sauce Labs Backpack';

    await allure.step('Navegar al inventario', async () => {
      await inventoryPage.goto();
    });

    await allure.step(`Hacer clic en el producto "${targetProduct}"`, async () => {
      await inventoryPage.openProduct(targetProduct);
    });

    await allure.step('Verificar la URL de la página de detalle', async () => {
      await expect(loggedInPage).toHaveURL(/inventory-item\.html/);
    });

    await allure.step('Verificar que nombre, descripción, precio e imagen del producto son visibles', async () => {
      await productDetailPage.assertProductVisible();
      await productDetailPage.assertProductName(targetProduct);
    });

    await allure.step('Verificar que el botón Add to cart está presente', async () => {
      await productDetailPage.assertAddToCartButtonVisible();
    });
  });
});
