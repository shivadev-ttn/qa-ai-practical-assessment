const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-05 - Product Search', () => {
  test('05 - Search products by keyword @Regression @Positive', async ({ apiManager, logger }) => {
    const productApi = apiManager.getProductApi();
    const searchTerm = 'hammer';

    await test.step(`Search products with query: ${searchTerm}`, async () => {
      const response = await productApi.searchProducts(searchTerm);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.data).toBeDefined();
      expect(body.data.length).toBeGreaterThan(0);
      expect(body.data[0].name.toLowerCase()).toContain(searchTerm);
      logger.info(`Product search returned ${body.data.length} result(s)`);
    });
  });
});
