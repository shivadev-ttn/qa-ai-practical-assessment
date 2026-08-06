const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');
const sortOptions = require('../../../UI/resources/sortOptions');

test.describe('TC_UI_003 - Search, Filter & Sort', () => {
  test('03 - Verify search, filter and sorting functionality @Smoke @Regression', async ({
    page,
    poManager,
    logger,
  }) => {
    const homePage = poManager.getHomePage();
    const productListingPage = poManager.getProductListingPage();

    await test.step('Open home and search for Hammer', async () => {
      await homePage.open();
      await productListingPage.searchProduct('Hammer');
      await expect(page.getByText(/hammer/i).first()).toBeVisible({ timeout: 15000 });
      logger.info('Search results displayed for Hammer');
    });

    await test.step('Apply category filter Hand Tools', async () => {
      await productListingPage.selectCategory('Hand Tools');
      await expect(page).toHaveURL(/hand-tools/i);
      await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
      logger.info('Category filter applied');
    });

    await test.step('Apply price range filter', async () => {
      await productListingPage.setPriceRange(10, 50);
      logger.info('Price range filter applied');
    });

    await test.step('Sort by Price Low to High via Sort dropdown', async () => {
      await productListingPage.sortBy(sortOptions.PRICE_LOW_TO_HIGH);
      const productNames = await productListingPage.getVisibleProductNames();
      expect(productNames.length).toBeGreaterThan(0);
      logger.info(`Products displayed after sort: ${productNames.length}`);
    });
  });
});
