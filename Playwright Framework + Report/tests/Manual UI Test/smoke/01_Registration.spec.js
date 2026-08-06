const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC_UI_001 - Registration & Login', () => {
  test('01 - Verify user can register and login successfully @Smoke @Regression', async ({
    poManager,
    testData,
    credentialsStore,
    logger,
    page,
  }) => {
    const user = testData.generateUser();
    const homePage = poManager.getHomePage();
    const registerPage = poManager.getRegisterPage();
    const loginPage = poManager.getLoginPage();

    await test.step('Open home page and navigate to register', async () => {
      await homePage.open();
      await homePage.goToRegister();
    });

    await test.step('Register with valid user details', async () => {
      await registerPage.register(user);
      await expect(page).toHaveURL(/\/auth\/login/, { timeout: 20000 });
      logger.info('Registration completed — redirected to login page');
      credentialsStore.saveUser(
        { firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password },
        'ui'
      );
    });

    await test.step('Login with registered credentials', async () => {
      await loginPage.login(user.email, user.password);
      await expect(page.getByRole('heading', { name: /my account/i })).toBeVisible({ timeout: 15000 });
      await expect(page.getByRole('button', { name: `${user.firstName} ${user.lastName}` })).toBeVisible();
      logger.info('User logged in successfully');
    });

    await test.step('Verify profile access', async () => {
      await page.getByRole('button', { name: /profile/i }).click();
      await expect(page.getByText(user.firstName, { exact: false })).toBeVisible();
      await expect(page.getByText(user.lastName, { exact: false })).toBeVisible();
      logger.info('Profile information verified');
    });
  });
});
