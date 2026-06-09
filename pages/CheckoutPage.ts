import { Page, Locator, expect } from '@playwright/test';
import { ProductInfo } from './InventoryPage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly summaryTotal: Locator;
  readonly completeHeader: Locator;

  readonly pageTitle: Locator;
  readonly itemsTitle: Locator;
  readonly itemsDescription: Locator;
  readonly itemsPrice: Locator;
  readonly itemsQuantity: Locator;
  readonly PaymentInformationTitle: Locator;
  readonly ShippingInformationTitle: Locator;
  readonly ShippingInformationDescription: Locator;
  readonly PaymentTitle: Locator;
  readonly PaymentTotal: Locator;
  readonly TaxTotal: Locator;
  readonly Total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');

    this.pageTitle = page.getByTestId('title');
    this.itemsTitle = page.getByTestId('inventory-item-name');
    this.itemsDescription = page.getByTestId('inventory-item-desc');
    this.itemsPrice = page.getByTestId('inventory-item-price');
    this.itemsQuantity = page.getByTestId('item-quantity');
    this.PaymentInformationTitle = page.getByTestId('payment-info-label');
    this.ShippingInformationTitle = page.getByTestId('shipping-info-label');
    this.ShippingInformationDescription = page.getByTestId('shipping-info-value');
    this.PaymentTitle = page.getByTestId('total-info-label');
    this.PaymentTotal = page.getByTestId('subtotal-label');
    this.TaxTotal = page.getByTestId('tax-label');
    this.Total = page.getByTestId('total-label');
  }

  async fillInfo(info: CheckoutInfo): Promise<void> {
    if (info.firstName) {
      await this.firstNameInput.fill(info.firstName);
    }
    if (info.lastName) {
      await this.lastNameInput.fill(info.lastName);
    }
    if (info.postalCode) {
      await this.postalCodeInput.fill(info.postalCode);
    }
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async assertOnStepOne(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.firstNameInput).toBeVisible();
  }

  async assertOnStepTwo(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.summaryTotal).toBeVisible();
  }

  async assertOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async assertErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async getSummaryTotal(): Promise<string> {
    return (await this.summaryTotal.textContent()) ?? '';
  }

  private calculateTax(price: string): string {
    const amount = parseFloat(price.replace('$', '')) * 0.08;
    return `$${amount.toFixed(2)}`;
  }

  async assertItemInSummary(product: ProductInfo): Promise<void> {
    const tax = this.calculateTax(product.price);

    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.PaymentInformationTitle).toHaveText('Payment Information:');
    await expect(this.ShippingInformationTitle).toHaveText('Shipping Information:');
    await expect(this.ShippingInformationDescription).toHaveText('Free Pony Express Delivery!');
    await expect(this.PaymentTitle).toHaveText('Price Total');
    await expect(this.PaymentTotal).toHaveText(`Item total: ${product.price}`);
    await expect(this.TaxTotal).toHaveText(`Tax: ${tax}`);
    await expect(this.itemsTitle.filter({ hasText: product.name })).toBeVisible();
    await expect(this.itemsDescription.filter({ hasText: product.description })).toBeVisible();
    await expect(this.itemsPrice.filter({ hasText: product.price })).toBeVisible();
  }
}
