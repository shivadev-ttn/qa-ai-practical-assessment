const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-01 - Auth & Cart', () => {
  test('01 - User registration, login and cart creation @Smoke @Positive', async ({
    apiManager,
    testData,
    credentialsStore,
    logger,
  }) => {
    const authApi = apiManager.getAuthApi();
    const cartApi = apiManager.getCartApi();
    const user = testData.generateApiUser();
    let accessToken;
    let cartId;

    await test.step('Register new user via API', async () => {
      const registerResponse = await authApi.register(user);
      expect(registerResponse.status()).toBe(201);
      const body = await registerResponse.json();
      expect(body.email).toBe(user.email);
      credentialsStore.saveUser(
        { email: user.email, password: user.password, firstName: user.first_name, lastName: user.last_name, userId: body.id },
        'api'
      );
      logger.info(`User registered via API: ${user.email}`);
    });

    await test.step('Login and obtain bearer token', async () => {
      const loginResponse = await authApi.login({ email: user.email, password: user.password });
      expect(loginResponse.status()).toBe(200);
      const loginBody = await loginResponse.json();
      expect(loginBody.access_token).toBeTruthy();
      expect(loginBody.token_type.toLowerCase()).toBe('bearer');
      accessToken = loginBody.access_token;
      logger.info('Bearer token obtained');
    });

    await test.step('Create a new cart', async () => {
      const cartResponse = await cartApi.createCart();
      expect(cartResponse.status()).toBe(201);
      cartId = (await cartResponse.json()).id;
      logger.info(`Cart created with id: ${cartId}`);
    });

    await test.step('Verify cart can be retrieved', async () => {
      const getCartResponse = await cartApi.getCart(cartId, accessToken);
      expect(getCartResponse.status()).toBe(200);
      expect((await getCartResponse.json()).id).toBe(cartId);
      logger.info('Cart retrieval verified');
    });
  });
});
