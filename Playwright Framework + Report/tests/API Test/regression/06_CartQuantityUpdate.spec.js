const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-06 - Cart Quantity Update', () => {
  test('06 - Update cart item quantity @Regression @Positive', async ({
    apiManager,
    testData,
    logger,
  }) => {
    const authApi = apiManager.getAuthApi();
    const cartApi = apiManager.getCartApi();
    const productApi = apiManager.getProductApi();
    const user = testData.generateApiUser();
    let accessToken;
    let cartId;
    let productId;

    await test.step('Register, login and prepare cart with one item', async () => {
      await authApi.register(user);
      const loginResponse = await authApi.login({ email: user.email, password: user.password });
      accessToken = (await loginResponse.json()).access_token;

      const cartResponse = await cartApi.createCart();
      cartId = (await cartResponse.json()).id;

      const productsResponse = await productApi.getProducts(accessToken);
      productId = (await productsResponse.json()).data.find((p) => p.in_stock).id;
      await cartApi.addItem(cartId, productId, 1, accessToken);
      logger.info(`Cart ${cartId} prepared with product ${productId}`);
    });

    await test.step('Update cart item quantity', async () => {
      const response = await cartApi.updateItemQuantity(cartId, productId, 2, accessToken);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.result).toMatch(/item added or updated/i);
      logger.info('Cart item quantity updated to 2');
    });

    await test.step('Verify updated quantity in cart', async () => {
      const getCartResponse = await cartApi.getCart(cartId, accessToken);
      expect(getCartResponse.status()).toBe(200);
      const cart = await getCartResponse.json();
      const cartItem = cart.cart_items.find((item) => item.product_id === productId);
      expect(cartItem).toBeTruthy();
      expect(cartItem.quantity).toBe(2);
      logger.info('Cart quantity verified as 2');
    });
  });
});
