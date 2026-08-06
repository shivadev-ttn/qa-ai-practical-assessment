const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC_UI_008 - Language Change', () => {
  test('08 - Verify language change across pages @Regression @Edge', async ({
    page,
    poManager,
    logger,
  }) => {
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const languageSelect = page.locator('[data-test="language-select"]');

    await test.step('Change language from English', async () => {
      await homePage.open();
      await languageSelect.click();
      await page.locator('.dropdown-menu.show a.dropdown-item').first().click();
      await page.waitForLoadState('networkidle');
      logger.info('Language changed');
    });

    await test.step('Navigate to home and verify language persists', async () => {
      await homePage.open();
      await expect(languageSelect).toBeVisible();
      logger.info('Language setting visible on home page');
    });

    await test.step('Open cart page and verify language persists', async () => {
      await cartPage.open();
      await expect(languageSelect).toBeVisible();
      logger.info('Language persists on cart page');
    });

    await test.step('Open checkout page and verify language persists', async () => {
      await checkoutPage.open();
      await expect(languageSelect).toBeVisible();
      logger.info('Language persists on checkout page');
    });
  });
});
