const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    this.registerLink = page.getByRole('link', { name: /register/i });
    this.contactLink = page.getByRole('link', { name: /contact/i });
    this.userMenuButton = page.locator('[data-test="nav-user-menu"], nav button').filter({ hasText: /.+/ });
    this.siteLogo = page.locator('a.navbar-brand').first();
    this.productListingSection = page.locator('[data-test="product-name"]');
    this.practiceBanner = page.locator('.container').filter({
      hasText: /Practice Black Box Testing/i,
    });
    this.testingGuideButton = page.locator('.testing-guide-btn');
    this.bugHuntingButton = page.locator('.bug-hunting-btn');
  }

  async open() {
    await this.goto('/');
    logger.info('Home page opened');
  }

  async goToSignIn() {
    await this.signInLink.click();
    logger.info('Navigated to Sign In');
  }

  async goToContact() {
    await this.contactLink.click();
    logger.info('Navigated to Contact');
  }

  async goToRegister() {
    const register = this.registerLink.first();
    if (await register.isVisible().catch(() => false)) {
      await register.click();
    } else {
      await this.signInLink.click();
      await this.page.getByRole('link', { name: /register/i }).click();
    }
    logger.info('Navigated to Register');
  }

  async isLoggedIn() {
    const signInVisible = await this.signInLink.isVisible().catch(() => false);
    return !signInVisible;
  }

  async isUserDisplayed(userName) {
    await this.page.waitForTimeout(1000);
    return this.page.getByRole('button', { name: userName }).isVisible();
  }
}

module.exports = HomePage;
