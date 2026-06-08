import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('button[id^="add-to-cart"]');
    this.removeButton = page.locator('button[id^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async getName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getPrice(): Promise<number> {
    const text = (await this.productPrice.textContent()) ?? '$0';
    return parseFloat(text.replace('$', ''));
  }

  async assertProductVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }

  async assertProductName(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }

  async assertAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }
}
