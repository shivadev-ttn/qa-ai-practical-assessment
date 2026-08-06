const { test } = require('../../../UI/utilities/testFixtures');

const { expect } = require('@playwright/test');

const { registerAndLogin } = require('../../../UI/utilities/uiAuthHelper');

const { saveEnvValue } = require('../../../UI/utilities/envStore');



test.describe('TC_UI_002 - Purchase Flow', () => {

  test('02 - Verify complete purchase flow using Cash on Delivery @Smoke @Regression', async ({

    page,

    poManager,

    testData,

    credentialsStore,

    logger,

  }) => {

    const user = await registerAndLogin(page, poManager, testData, credentialsStore);

    const homePage = poManager.getHomePage();

    const productListingPage = poManager.getProductListingPage();

    const productDetailPage = poManager.getProductDetailPage();

    const cartPage = poManager.getCartPage();

    const checkoutPage = poManager.getCheckoutPage();



    await test.step('Search and open product', async () => {

      await homePage.open();

      await productListingPage.searchProduct('Slip Joint Pliers');

      await productListingPage.openProductByName('Slip Joint Pliers');

      await expect(page.locator('[data-test="product-name"]')).toHaveText('Slip Joint Pliers');

      logger.info('Product page opened');

    });



    await test.step('Add product to cart and update quantity', async () => {

      await productDetailPage.setQuantity(2);

      await productDetailPage.addToCart();

      await cartPage.goToCartViaNav();

      await cartPage.waitForProduct('Slip Joint Pliers');

      logger.info('Product added to cart');

    });



    let invoiceNumber;



    await test.step('Proceed to checkout and place COD order', async () => {

      await cartPage.proceedToCheckout();

      await checkoutPage.proceedFromSignInIfRequired();

      await checkoutPage.fillBillingAddress({ houseNumber: user.address.houseNumber || '42' });

      await checkoutPage.proceedFromBillingAddress();

      await checkoutPage.selectCashOnDelivery();

      await checkoutPage.confirmPayment();

      invoiceNumber = await checkoutPage.getInvoiceNumber();

      logger.info('Order placed with Cash on Delivery');

    });



    await test.step('Verify invoice number and save to .env', async () => {

      expect(invoiceNumber).toBeTruthy();

      expect(invoiceNumber).toMatch(/^INV-/i);

      await expect(page.locator('#order-confirmation span')).toHaveText(invoiceNumber);

      saveEnvValue('UI_INVOICE_NUMBER', invoiceNumber);

      logger.info(`Invoice verified and saved: ${invoiceNumber}`);

    });

  });

});

