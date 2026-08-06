const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class ForgotPasswordPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.submitButton = page.getByRole('button', { name: /set new password/i });
    this.successAlert = page.locator('[role="alert"].alert.alert-success');
    this.errorAlert = page.locator('[role="alert"].alert.alert-danger');
  }

  async open() {
    await this.goto('/auth/forgot-password');
    logger.info('Forgot password page opened');
  }

  async requestPasswordReset(email) {
    logger.info(`Requesting password reset for: ${email}`);
    await this.emailInput.fill(email);

    // Success/error alert may only be visible for ~1 second — wait in parallel with submit.
    const alertLocator = this.page.locator('[role="alert"].alert');
    const alertPromise = alertLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitButton.click();
    await alertPromise;

    const alertText = (await alertLocator.textContent())?.trim();
    const isError = await this.errorAlert.isVisible().catch(() => false);
    if (isError) {
      logger.error(`Password reset failed: ${alertText}`);
    }
    return alertText;
  }

  async getSuccessMessage() {
    await this.successAlert.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.successAlert.textContent())?.trim();
  }
}

module.exports = ForgotPasswordPage;
