const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.dobInput = page.locator('#dob');
    this.countrySelect = page.locator('#country');
    this.postalCodeInput = page.locator('#postal_code');
    this.houseNumberInput = page.locator('#house_number');
    this.streetInput = page.locator('#street');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.phoneInput = page.locator('#phone');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.getByRole('button', { name: /register/i });
  }

  async register(user) {
    logger.info(`Registering user: ${user.email}`);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);
    await this.countrySelect.selectOption({ label: user.address.country });
    await this.postalCodeInput.fill(user.address.postalCode);
    await this.houseNumberInput.fill(user.address.houseNumber);
    await this.streetInput.fill(user.address.street);
    await this.cityInput.fill(user.address.city);
    await this.stateInput.fill(user.address.state);
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.registerButton.click();
  }
}

module.exports = RegisterPage;
