const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('UI-4 - Product Listing Visibility', () => {
  test('UI-4 - Verify product listing section is visible on home page @Regression', async ({
    poManager,
    logger,
  }) => {
    const homePage = poManager.getHomePage();

    await test.step('Open home page', async () => {
      await homePage.open();
      logger.info('Home page opened for product listing verification');
    });

    await test.step('Verify product listing section is visible', async () => {
      await expect(homePage.productListingSection.first()).toBeVisible({ timeout: 15000 });
      const productCount = await homePage.productListingSection.count();
      expect(productCount).toBeGreaterThan(0);
      logger.info(`Product listing section visible with ${productCount} product(s)`);
    });
  });
});
