const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('UI-1 - Site Logo Visibility', () => {
  test('UI-1 - Verify site logo is visible @Regression', async ({ poManager, logger }) => {
    const homePage = poManager.getHomePage();

    await test.step('Open home page', async () => {
      await homePage.open();
      logger.info('Home page opened for logo verification');
    });

    await test.step('Verify site logo is visible', async () => {
      await expect(homePage.siteLogo).toBeVisible({ timeout: 15000 });
      logger.info('Site logo is visible');
    });
  });
});
