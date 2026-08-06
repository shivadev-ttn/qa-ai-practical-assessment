const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');
const { registerAndLogin } = require('../../../UI/utilities/uiAuthHelper');

test.describe('TC_UI_005 - Checkout Validation', () => {
  test('05 - Verify checkout without mandatory fields @Regression @Negative', async ({
    page,
    poManager,
    testData,
    credentialsStore,
    logger,
  }) => {
    await registerAndLogin(page, poManager, testData, credentialsStore);
    const homePage = poManager.getHomePage();
    const productListingPage = poManager.getProductListingPage();
    const productDetailPage = poManager.getProductDetailPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();

    await test.step('Add product to cart', async () => {
      await homePage.open();
      await productListingPage.searchProduct('Slip Joint Pliers');
      await productListingPage.openProductByName('Slip Joint Pliers');
      await productDetailPage.addToCart();
      await cartPage.goToCartViaNav();
      logger.info('Product added to cart');
    });

    await test.step('Proceed to checkout with blank mandatory fields', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.proceedFromSignInIfRequired();
      await checkoutPage.clearBillingFields();
      logger.info('Attempted checkout with blank fields');
    });

    await test.step('Verify validation messages and order not placed', async () => {
      const proceedDisabled = await checkoutPage.isProceedToCheckoutDisabled();
      const invalidFields = await page.locator('.ng-invalid').count();
      expect(proceedDisabled || invalidFields > 0).toBeTruthy();
      await expect(page.locator('#order-confirmation')).not.toBeVisible();
      logger.info('Mandatory field validation triggered');
    });
  });
});
