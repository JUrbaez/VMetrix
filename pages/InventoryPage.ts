import { Page, Locator, expect } from '@playwright/test';

export type SortOption =
  | 'az'
  | 'za'
  | 'lohi'
  | 'hilo';

export interface ProductInfo {
  name: string;
  description: string;
  price: string;
}

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async filterBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async addToCart(productName: string): Promise<ProductInfo> {
    const item = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    const description = (await item.locator('.inventory_item_desc').textContent() ?? '').trim();
    const price = (await item.getByTestId('inventory-item-price').textContent() ?? '').trim();
    await item.getByRole('button', { name: 'Add to cart' }).click();
    return { name: productName, description, price };
  }

  async removeFromInventory(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    await item.locator('button[id^="remove"]').click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.cartBadge;
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() ?? '0', 10);
    }
    return 0;
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async assertOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.productList.first()).toBeVisible();
  }
}
