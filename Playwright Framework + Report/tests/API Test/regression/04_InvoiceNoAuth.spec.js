const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-04 - Unauthorized Invoice', () => {
  test('04 - Invoice creation without authentication @Regression @Negative', async ({
    apiManager,
    testData,
    logger,
  }) => {
    const authApi = apiManager.getAuthApi();
    const cartApi = apiManager.getCartApi();
    const productApi = apiManager.getProductApi();
    const invoiceApi = apiManager.getInvoiceApi();
    const user = testData.generateApiUser();
    let cartId;

    await test.step('Setup cart with items (authenticated)', async () => {
      await authApi.register(user);
      const loginResponse = await authApi.login({ email: user.email, password: user.password });
      const token = (await loginResponse.json()).access_token;

      const cartResponse = await cartApi.createCart();
      cartId = (await cartResponse.json()).id;

      const productsResponse = await productApi.getProducts(token);
      const productId = (await productsResponse.json()).data.find((p) => p.in_stock).id;
      await cartApi.addItem(cartId, productId, 1, token);
      logger.info('Cart prepared with items');
    });

    await test.step('Attempt invoice without bearer token', async () => {
      const invoicePayload = testData.generateInvoicePayload(cartId);
      const response = await invoiceApi.createInvoice(invoicePayload);
      expect(response.status()).toBe(401);
      const body = await response.json();
      expect(body.message || body.error).toMatch(/unauthorized/i);
      logger.info('Unauthorized invoice creation rejected');
    });
  });
});
