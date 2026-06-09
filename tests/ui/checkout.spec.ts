import { test, expect } from '../../fixtures/saucedemo';
import * as allure from 'allure-js-commons';
import { ProductInfo } from '../../pages/InventoryPage';

test.describe('Flujo de checkout', () => {
  test('UI-05: Verificar el flujo de checkout', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    loggedInPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Checkout');
    await allure.story('Checkout exitoso');
    await allure.severity('blocker');

    let product: ProductInfo;

    await allure.step('Navegar al inventario y agregar un producto al carrito', async () => {
      await inventoryPage.goto();
      product = await inventoryPage.addToCart('Sauce Labs Backpack');
    });

    await allure.step('Ir al carrito', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
      await cartPage.assertItemInCart('Sauce Labs Backpack');
    });

    await allure.step('Proceder al checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.assertOnStepOne();
    });

    await allure.step('Completar la información de checkout', async () => {
      await checkoutPage.fillInfo({
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345',
      });
      await checkoutPage.continue();
    });

    await allure.step('Verificar el resumen del pedido', async () => {
      await checkoutPage.assertOnStepTwo();
      await checkoutPage.assertItemInSummary(product);
      const total = await checkoutPage.getSummaryTotal();
      expect(total).toContain('Total');
    });

    await allure.step('Finalizar la compra y verificar la confirmación', async () => {
      await checkoutPage.finish();
      await checkoutPage.assertOrderComplete();
    });
  });

  test('UI-07: Finalizar proceso de checkout sin introducir ningun dato del usuario', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Checkout');
    await allure.story('Validación de campos requeridos');
    await allure.severity('critical');

    await allure.step('Agregar producto y navegar al paso 1 del checkout', async () => {
      await inventoryPage.goto();
      await inventoryPage.addToCart('Sauce Labs Bike Light');
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.assertOnStepOne();
    });

    await allure.step('Enviar formulario solo con apellido y código postal (sin nombre)', async () => {
      await checkoutPage.fillInfo({
        firstName: '',
        lastName: 'Smith',
        postalCode: '67890',
      });
      await checkoutPage.continue();
    });

    await allure.step('Verificar que se muestra el mensaje de error por nombre faltante', async () => {
      await checkoutPage.assertErrorMessage('First Name is required');
    });
  });
});
