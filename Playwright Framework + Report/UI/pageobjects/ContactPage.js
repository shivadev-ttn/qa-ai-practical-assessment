const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.emailInput = page.locator('#email');
    this.subjectSelect = page.locator('#subject');
    this.messageInput = page.locator('#message');
    this.sendButton = page.getByRole('button', { name: /send/i });
    this.confirmationMessage = page.locator('[role="alert"].alert.alert-success');
  }

  async open() {
    await this.goto('/contact');
    logger.info('Contact page opened');
  }

  async submitContactForm({ firstName, lastName, email, subject, message }) {
    logger.info(`Submitting contact form for: ${email}`);
    if (await this.firstNameInput.isVisible().catch(() => false)) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
    }
    await this.subjectSelect.selectOption({ label: subject });
    await this.messageInput.fill(message);
    await this.messageInput.blur();
    await this.sendButton.click();
    await this.page.waitForTimeout(2000);
    logger.info('Contact form submitted — waiting for success alert');
  }

  async getConfirmationText() {
    await this.confirmationMessage.waitFor({ state: 'visible', timeout: 15000 });
    return (await this.confirmationMessage.textContent())?.trim();
  }
}

module.exports = ContactPage;
