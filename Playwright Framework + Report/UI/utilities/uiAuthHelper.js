const { expect } = require('@playwright/test');
const logger = require('./logger');

/**
 * Registers a fresh user and logs in via the UI using POManager.
 * @returns {Promise<object>} registered user data
 */
async function registerAndLogin(page, poManager, testData, credentialsStore) {
  const user = testData.generateUser();
  const homePage = poManager.getHomePage();
  const registerPage = poManager.getRegisterPage();
  const loginPage = poManager.getLoginPage();

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

  await loginPage.login(user.email, user.password);
  await expect(page.getByRole('heading', { name: /my account/i })).toBeVisible({ timeout: 15000 });
  logger.info(`UI user registered and logged in: ${user.email}`);
  return user;
}

/**
 * Logs in an existing user via the UI using POManager.
 */
async function loginUser(page, poManager, email, password) {
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  await homePage.open();
  await homePage.goToSignIn();
  await loginPage.login(email, password);
  await expect(page.getByRole('heading', { name: /my account/i })).toBeVisible({ timeout: 15000 });
  logger.info(`UI user logged in: ${email}`);
}

module.exports = { registerAndLogin, loginUser };
