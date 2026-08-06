const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-08 - View Product', () => {
  test('08 - Retrieve single product by ID @Regression @Positive', async ({ apiManager, logger }) => {
    const productApi = apiManager.getProductApi();
    let productId;
    let productName;

    await test.step('Get a product ID from product list', async () => {
      const listResponse = await productApi.getProducts();
      expect(listResponse.status()).toBe(200);
      const product = (await listResponse.json()).data.find((p) => p.in_stock);
      expect(product).toBeTruthy();
      productId = product.id;
      productName = product.name;
      logger.info(`Selected product from list: ${productName}`);
    });

    await test.step('View single product by ID', async () => {
      const response = await productApi.getProduct(productId);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(productId);
      expect(body.name).toBe(productName);
      expect(body.price).toBeGreaterThan(0);
      logger.info(`Product details retrieved for: ${body.name}`);
    });
  });
});
