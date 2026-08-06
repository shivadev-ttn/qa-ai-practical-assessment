const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('UI-3 - Related Products Section', () => {
  test('UI-3 - Verify related products section is visible on product page @Regression', async ({
    poManager,
    logger,
  }) => {
    const homePage = poManager.getHomePage();
    const productListingPage = poManager.getProductListingPage();
    const productDetailPage = poManager.getProductDetailPage();

    await test.step('Open a product page', async () => {
      await homePage.open();
      await productListingPage.waitForProductsToLoad();
      const productNames = await productListingPage.getVisibleProductNames();
      expect(productNames.length).toBeGreaterThan(0);
      await productListingPage.openProductByName(productNames[0]);
      await productDetailPage.waitForProductPage();
      logger.info(`Opened product: ${productNames[0]}`);
    });

    await test.step('Verify related products section is visible', async () => {
      await expect(productDetailPage.relatedProductsSection).toBeVisible({ timeout: 15000 });
      logger.info('Related products section is visible');
    });
  });
});
