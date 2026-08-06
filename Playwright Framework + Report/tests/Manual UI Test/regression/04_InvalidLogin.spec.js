const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC_UI_004 - Invalid Login', () => {
  test('04 - Verify login with invalid credentials @Regression @Negative', async ({
    poManager,
    testData,
    logger,
    page,
  }) => {
    const invalidUser = testData.invalidLoginCredentials();
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();

    await test.step('Open login page', async () => {
      await homePage.open();
      await homePage.goToSignIn();
      logger.info('Login page opened');
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(invalidUser.email, invalidUser.password);
    });

    await test.step('Verify login failure message', async () => {
      const errorLocator = page.locator('.alert-danger, .invalid-feedback, [role="alert"]');
      await expect(errorLocator.first()).toBeVisible({ timeout: 10000 });
      const errorText = await errorLocator.first().textContent();
      expect(errorText?.toLowerCase()).toMatch(/invalid|incorrect|failed|unauthorized|credentials/i);
      logger.info(`Login rejected as expected: ${errorText}`);
    });

    await test.step('Verify user is not logged in', async () => {
      await expect(homePage.signInLink).toBeVisible();
      logger.info('User remains logged out');
    });
  });
});
