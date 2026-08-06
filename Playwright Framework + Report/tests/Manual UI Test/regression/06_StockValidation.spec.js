const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC_UI_006 - Stock Validation', () => {
  test('06 - Verify quantity exceeding available stock @Regression @Negative', async ({
    page,
    poManager,
    logger,
  }) => {
    const homePage = poManager.getHomePage();
    const productListingPage = poManager.getProductListingPage();
    const productDetailPage = poManager.getProductDetailPage();

    await test.step('Open in-stock product', async () => {
      await homePage.open();
      await productListingPage.searchProduct('Claw Hammer');
      await productListingPage.openProductByName('Claw Hammer');
      logger.info('Product detail page opened');
    });

    await test.step('Enter quantity greater than stock and add to cart', async () => {
      const stockCount = await productDetailPage.getStockCount();
      const excessiveQty = stockCount ? Math.min(stockCount + 5, 99) : 99;
      await productDetailPage.setQuantity(excessiveQty);
      await productDetailPage.addToCart();
      logger.info(`Attempted to add quantity: ${excessiveQty}`);
    });

    await test.step('Verify system prevents excessive quantity', async () => {
      const alertText = await productDetailPage.getAlertMessage().catch(() => '');
      const hasError =
        /stock|quantity|exceed|not enough|available/i.test(alertText || '') ||
        (await page.locator('.alert-danger, [role="alert"]').count()) > 0;
      expect(hasError).toBeTruthy();
      logger.info('Stock validation message displayed');
    });
  });
});
