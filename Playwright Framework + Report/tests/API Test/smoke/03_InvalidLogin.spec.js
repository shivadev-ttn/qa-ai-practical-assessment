const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-03 - Invalid Login', () => {
  test('03 - Login with invalid credentials @Smoke @Negative', async ({ apiManager, testData, logger }) => {
    const authApi = apiManager.getAuthApi();
    const credentials = testData.apiInvalidLoginCredentials();

    await test.step('Attempt login with wrong password', async () => {
      const response = await authApi.login(credentials);
      expect([401, 423]).toContain(response.status());
      const body = await response.json();
      expect(body.error || body.message).toMatch(/invalid|unauthorized|locked|attempt/i);
      logger.info(`Invalid login rejected with status ${response.status()}`);
    });
  });
});
