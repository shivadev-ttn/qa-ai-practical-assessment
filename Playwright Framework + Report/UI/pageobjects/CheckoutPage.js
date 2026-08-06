const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.houseNumberInput = page.locator('[data-test="house_number"], #house_number');
    this.streetInput = page.locator('[data-test="street"], #street');
    this.postalCodeInput = page.locator('[data-test="postal_code"], #postal_code');
    this.cityInput = page.locator('[data-test="city"], #city');
    this.stateInput = page.locator('[data-test="state"], #state');
    this.countrySelect = page.locator('[data-test="country"], #country');
    this.proceedFromSignInButton = page.locator('[data-test="proceed-2"]');
    this.proceedFromBillingButton = page.locator('[data-test="proceed-3"]');
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.confirmButton = page.locator('[data-test="finish"]');
    this.orderConfirmation = page.locator('#order-confirmation');
    this.invoiceNumber = page.locator('#order-confirmation span');
    this.validationErrors = page.locator('.invalid-feedback, .alert-danger, [role="alert"]');
  }

  async open() {
    await this.page.waitForTimeout(1000);
    await this.goto('/checkout');
    logger.info('Checkout page opened');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clearBillingFields() {
    if (await this.houseNumberInput.first().isVisible().catch(() => false)) {
      await this.houseNumberInput.first().clear();
    }
    logger.info('Cleared house number on billing form');
  }

  async proceedFromSignInIfRequired() {
    if (await this.proceedFromSignInButton.isVisible().catch(() => false)) {
      logger.info('Already logged in — proceeding from Sign In step (proceed-2)');
      await this.proceedFromSignInButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Billing fields auto-populate from country + postal code.
   * Only house number must be entered manually; wait for proceed-3 to enable.
   */
  async fillBillingAddress(address = {}) {
    const houseNumber = address.houseNumber || '42';
    await this.houseNumberInput.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.houseNumberInput.first().fill(houseNumber);
    logger.info(`Filled house_number: ${houseNumber}`);

    logger.info('Waiting 2s for billing address auto-fill and proceed-3 to enable');
    await this.page.waitForTimeout(2000);

    const street = await this.streetInput.first().inputValue().catch(() => '');
    const city = await this.cityInput.first().inputValue().catch(() => '');
    const state = await this.stateInput.first().inputValue().catch(() => '');
    logger.info(`Auto-filled billing => street: "${street}", city: "${city}", state: "${state}"`);

    await expect(this.proceedFromBillingButton).toBeEnabled({ timeout: 10000 });
    logger.info('proceed-3 is enabled');
  }

  async proceedFromBillingAddress() {
    logger.info('Clicking proceed-3 on billing address step');
    await this.proceedFromBillingButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectCashOnDelivery() {
    logger.info('Selecting Cash on Delivery');
    await this.paymentMethodSelect.selectOption({ value: 'cash-on-delivery' });
    await this.page.waitForTimeout(500);
  }

  async confirmPayment() {
    logger.info('First Confirm click — process payment');
    await expect(this.confirmButton).toBeEnabled({ timeout: 15000 });
    await this.confirmButton.click();

    await this.page.getByText(/payment was successful/i).waitFor({ state: 'visible', timeout: 30000 });
    logger.info('Payment was successful');

    logger.info('Second Confirm click — generate invoice');
    await expect(this.confirmButton).toBeEnabled({ timeout: 15000 });
    await this.confirmButton.click();

    await this.orderConfirmation.waitFor({ state: 'visible', timeout: 30000 });
    logger.info('Order confirmation displayed');
  }

  async getInvoiceNumber() {
    await this.orderConfirmation.waitFor({ state: 'visible', timeout: 20000 });
    return (await this.invoiceNumber.textContent())?.trim();
  }

  async getValidationErrors() {
    const errors = await this.validationErrors.allTextContents();
    return errors.map((e) => e.trim()).filter(Boolean);
  }

  async isProceedToCheckoutDisabled() {
    return this.proceedFromBillingButton.isDisabled();
  }
}

module.exports = CheckoutPage;
