import { test, expect } from '../../fixtures/saucedemo';
import * as allure from 'allure-js-commons';

test.describe('Inventory - Product Sorting and Cart', () => {
  test('UI-03: Remover productos del carrito desde la página de inventario', async ({
    inventoryPage,
    cartPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Carrito de compras');
    await allure.story('Remover producto desde inventario');
    await allure.severity('critical');

    await allure.step('Navegar a la página de inventario', async () => {
      await inventoryPage.goto();
    });

    await allure.step('Agregar dos productos al carrito', async () => {
      await inventoryPage.addToCart('Sauce Labs Backpack');
      await inventoryPage.addToCart('Sauce Labs Bike Light');
    });

    await allure.step('Verificar que el badge del carrito muestra 2', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(2);
    });

    await allure.step('Remover "Sauce Labs Bike Light" desde el inventario', async () => {
      await inventoryPage.removeFromInventory('Sauce Labs Bike Light');
    });

    await allure.step('Verificar que el badge del carrito se actualiza a 1', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(1);
    });

    await allure.step('Ir al carrito y verificar que solo el producto no removido está presente', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
      await cartPage.assertItemInCart('Sauce Labs Backpack');
      expect(await cartPage.getItemCount()).toBe(1);
    });
  });
  
  test('UI-06: Ordenar productos de menor a mayor segun su precio', async ({ inventoryPage }) => {
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
});
