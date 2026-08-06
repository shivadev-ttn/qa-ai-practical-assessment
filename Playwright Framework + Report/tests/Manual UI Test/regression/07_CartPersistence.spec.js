const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');
const { registerAndLogin } = require('../../../UI/utilities/uiAuthHelper');

test.describe('TC_UI_007 - Cart Persistence', () => {
  test('07 - Verify cart persistence after session refresh @Regression @Edge', async ({
    page,
    poManager,
    testData,
    credentialsStore,
    logger,
  }) => {
    const user = await registerAndLogin(page, poManager, testData, credentialsStore);
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();
    const productListingPage = poManager.getProductListingPage();
    const productDetailPage = poManager.getProductDetailPage();
    const cartPage = poManager.getCartPage();

    await test.step('Add products to cart', async () => {
      await homePage.open();
      await productListingPage.searchProduct('Slip Joint Pliers');
      await productListingPage.openProductByName('Slip Joint Pliers');
      await productDetailPage.addToCart();
      logger.info('Products added to cart');
    });

    await test.step('Refresh browser', async () => {
      await page.waitForFunction(() => Number(JSON.parse(sessionStorage.getItem('cart_quantity') || '0')) > 0);
      await page.reload({ waitUntil: 'networkidle' });
      logger.info('Browser refreshed');
    });

    await test.step('Re-login if required and verify cart', async () => {
      const signInVisible = await homePage.signInLink.isVisible().catch(() => false);
      if (signInVisible) {
        await homePage.goToSignIn();
        await loginPage.login(user.email, user.password);
      }
      await cartPage.open();
      await cartPage.waitForProduct('Slip Joint Pliers');
      logger.info('Cart items persisted after refresh');
    });
  });
});
