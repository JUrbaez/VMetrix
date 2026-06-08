import { test, expect } from '../../fixtures/saucedemo';
import { allure } from 'allure-playwright';

test.describe('Checkout Flow', () => {
  test('UI-08: Complete full checkout flow (happy path)', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    loggedInPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Checkout');
    await allure.story('Happy path checkout');
    await allure.severity('blocker');

    await allure.step('Navigate to inventory and add product to cart', async () => {
      await inventoryPage.goto();
      await inventoryPage.addToCart('Sauce Labs Backpack');
    });

    await allure.step('Go to cart', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
      await cartPage.assertItemInCart('Sauce Labs Backpack');
    });

    await allure.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.assertOnStepOne();
    });

    await allure.step('Fill checkout information', async () => {
      await checkoutPage.fillInfo({
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345',
      });
      await checkoutPage.continue();
    });

    await allure.step('Verify order summary', async () => {
      await checkoutPage.assertOnStepTwo();
      const total = await checkoutPage.getSummaryTotal();
      expect(total).toContain('Total');
    });

    await allure.step('Finish purchase and verify confirmation', async () => {
      await checkoutPage.finish();
      await checkoutPage.assertOrderComplete();
    });
  });

  test('UI-09: Attempt checkout with missing First Name field', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await allure.epic('SauceDemo UI');
    await allure.feature('Checkout');
    await allure.story('Missing required field validation');
    await allure.severity('critical');

    await allure.step('Add product and navigate to checkout step 1', async () => {
      await inventoryPage.goto();
      await inventoryPage.addToCart('Sauce Labs Bike Light');
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.assertOnStepOne();
    });

    await allure.step('Submit form with only Last Name and Postal Code (no First Name)', async () => {
      await checkoutPage.fillInfo({
        firstName: '',
        lastName: 'Smith',
        postalCode: '67890',
      });
      await checkoutPage.continue();
    });

    await allure.step('Verify error message is shown for missing First Name', async () => {
      await checkoutPage.assertErrorMessage('First Name is required');
    });
  });
});
