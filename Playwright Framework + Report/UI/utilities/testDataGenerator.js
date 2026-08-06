/**
 * Generates dynamic test data for UI and API tests.
 */
class TestDataGenerator {
  static uniqueSuffix() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
    return `${date}_${time}`;
  }

  static generateEmail(prefix = 'john.doe') {
    return `${prefix}.${this.uniqueSuffix()}@example.com`;
  }

  static generatePassword() {
    return `PstQa@${this.uniqueSuffix()}!`;
  }

  static generateUser(overrides = {}) {
    const suffix = this.uniqueSuffix();
    const password = this.generatePassword();
    return {
      firstName: 'John',
      lastName: 'Carter',
      email: this.generateEmail('john.carter'),
      password,
      confirmPassword: password,
      dob: '1995-08-15',
      phone: '9876543210',
      address: {
        street: '221 Baker Street',
        houseNumber: '12',
        city: 'New York',
        state: 'New York',
        country: 'United States of America (the)',
        postalCode: '10001',
      },
      ...overrides,
    };
  }

  static generateApiUser(overrides = {}) {
    return {
      first_name: 'John',
      last_name: 'Doe',
      email: this.generateEmail('john.doe'),
      password: this.generatePassword(),
      phone: '0987654321',
      dob: '1990-05-15',
      address: {
        street: 'Street 1',
        house_number: '12',
        city: 'City',
        state: 'State',
        country: 'Country',
        postal_code: '1234AA',
      },
      ...overrides,
    };
  }

  static generateLoginPayload(email, password) {
    return { email, password };
  }

  static generateCartItem(productId, quantity = 1) {
    return { product_id: productId, quantity };
  }

  static generateInvoicePayload(cartId, overrides = {}) {
    return {
      billing_street: 'Zoey Shore',
      billing_city: 'Hesselbury',
      billing_state: 'Florida',
      billing_country: 'TG',
      billing_postal_code: '1234AA',
      payment_method: 'cash-on-delivery',
      cart_id: cartId,
      payment_details: {},
      ...overrides,
    };
  }

  static invalidLoginCredentials() {
    return {
      email: 'invalid.user@example.com',
      password: 'Wrong@123',
    };
  }

  static apiInvalidLoginCredentials() {
    return {
      email: 'customer@practicesoftwaretesting.com',
      password: 'WrongPassword@99',
    };
  }

  static contactFormMessage() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero.";
  }

  static contactSuccessMessage() {
    return 'Thanks for your message! We will contact you shortly.';
  }

  static forgotPasswordResetValue() {
    return 'welcome02';
  }

  static forgotPasswordSuccessMessage() {
    return 'Your password is successfully updated!';
  }

  static forgotPasswordSuccessPattern() {
    return /successfully updated|page\.forgot-password\.confirm/i;
  }

  static generateContactMessagePayload(overrides = {}) {
    return {
      subject: 'Customer service',
      message:
        'API test contact message with sufficient length for validation rules in the practice application.',
      ...overrides,
    };
  }

  static generateContactReplyMessage() {
    return 'API test follow-up reply message for the submitted contact request.';
  }
}

module.exports = TestDataGenerator;
