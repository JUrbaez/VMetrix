import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async removeItem(productName: string): Promise<void> {
    await this.page.getByTestId('cart-item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async assertOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async assertItemInCart(productName: string): Promise<void> {
    await expect(
      this.cartItems.filter({ hasText: productName })
    ).toBeVisible();
  }
}
