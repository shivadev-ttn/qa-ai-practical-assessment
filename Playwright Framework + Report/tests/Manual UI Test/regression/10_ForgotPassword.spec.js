const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC_UI_010 - Forgot Password', () => {
  test('10 - Verify forgot password flow using recent registered credentials @Regression', async ({
    poManager,
    testData,
    credentialsStore,
    logger,
    page,
  }) => {
    let user = credentialsStore.getLatestUser('ui');
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();
    const forgotPasswordPage = poManager.getForgotPasswordPage();
    const resetPassword = testData.forgotPasswordResetValue();

    await test.step('Ensure a registered user exists', async () => {
      // Register a fresh user so the email is guaranteed to exist on the server.
      user = testData.generateUser();
      const registerPage = poManager.getRegisterPage();
      await homePage.open();
      await homePage.goToRegister();
      await registerPage.register(user);
      await expect(page).toHaveURL(/\/auth\/login/, { timeout: 20000 });
      credentialsStore.saveUser(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
        'ui'
      );
      logger.info(`Registered user for forgot-password flow: ${user.email}`);
    });

    await test.step('Navigate to forgot password page', async () => {
      await homePage.open();
      await homePage.goToSignIn();
      await loginPage.goToForgotPassword();
      await expect(page).toHaveURL(/\/auth\/forgot-password/);
      logger.info('Forgot password page opened');
    });

    await test.step('Submit registered email for password reset', async () => {
      const alertMessage = await forgotPasswordPage.requestPasswordReset(user.email);
      expect(alertMessage).not.toMatch(/invalid/i);
      expect(alertMessage).toMatch(testData.forgotPasswordSuccessPattern());
      logger.info(`Password reset confirmed: ${alertMessage}`);
    });

    await test.step('Login with updated password', async () => {
      await homePage.open();
      await homePage.goToSignIn();
      await loginPage.login(user.email, resetPassword);
      await expect(page.getByRole('heading', { name: /my account/i })).toBeVisible({ timeout: 15000 });
      logger.info('Login successful with updated password');
    });

    await test.step('Update stored credentials with new password', async () => {
      credentialsStore.saveUser(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: resetPassword,
        },
        'ui'
      );
      logger.info('Stored credentials updated with new password');
    });
  });
});
