const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-02 - Product & Invoice', () => {
  test('02 - Product selection, cart verification and invoice generation @Smoke @Regression @Positive', async ({
    apiManager,
    testData,
    credentialsStore,
    logger,
  }) => {
    const authApi = apiManager.getAuthApi();
    const cartApi = apiManager.getCartApi();
    const productApi = apiManager.getProductApi();
    const invoiceApi = apiManager.getInvoiceApi();
    const user = testData.generateApiUser();
    let accessToken;
    let cartId;

    await test.step('Register and login', async () => {
      const registerResponse = await authApi.register(user);
      expect(registerResponse.status()).toBe(201);
      credentialsStore.saveUser(
        { email: user.email, password: user.password, firstName: user.first_name, lastName: user.last_name },
        'api'
      );

      const loginResponse = await authApi.login({ email: user.email, password: user.password });
      expect(loginResponse.status()).toBe(200);
      accessToken = (await loginResponse.json()).access_token;
      logger.info('User authenticated');
    });

    await test.step('Create cart and get products', async () => {
      const cartResponse = await cartApi.createCart();
      expect(cartResponse.status()).toBe(201);
      cartId = (await cartResponse.json()).id;

      const productsResponse = await productApi.getProducts(accessToken);
      expect(productsResponse.status()).toBe(200);
      const inStockProduct = (await productsResponse.json()).data.find((p) => p.in_stock);
      expect(inStockProduct).toBeTruthy();

      const addResponse = await cartApi.addItem(cartId, inStockProduct.id, 1, accessToken);
      expect(addResponse.status()).toBe(200);
      logger.info(`Selected product: ${inStockProduct.name}`);
    });

    await test.step('Verify cart contents', async () => {
      const getCartResponse = await cartApi.getCart(cartId, accessToken);
      expect(getCartResponse.status()).toBe(200);
      expect((await getCartResponse.json()).id).toBe(cartId);
      logger.info('Cart contents verified');
    });

    await test.step('Generate invoice', async () => {
      const invoicePayload = testData.generateInvoicePayload(cartId);
      const invoiceResponse = await invoiceApi.createInvoice(invoicePayload, accessToken);
      expect(invoiceResponse.status()).toBe(201);
      const invoice = await invoiceResponse.json();
      expect(invoice.invoice_number).toBeTruthy();
      expect(invoice.billing_street).toBe(invoicePayload.billing_street);
      expect(invoice.total).toBeGreaterThan(0);
      logger.info(`Invoice generated: ${invoice.invoice_number}`);
    });
  });
});
