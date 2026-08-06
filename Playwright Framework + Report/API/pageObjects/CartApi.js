const ApiClient = require('./ApiClient');
const logger = require('../../UI/utilities/logger');

class CartApi extends ApiClient {
  async createCart() {
    const response = await this.post('/carts');
    logger.info(`Create cart response status: ${response.status()}`);
    return response;
  }

  async getCart(cartId, token) {
    const response = await this.get(`/carts/${cartId}`, {
      headers: this.authHeaders(token),
    });
    logger.info(`Get cart response status: ${response.status()}`);
    return response;
  }

  async addItem(cartId, productId, quantity, token) {
    const response = await this.post(`/carts/${cartId}`, {
      data: { product_id: productId, quantity },
      ...(token ? { headers: this.authHeaders(token) } : {}),
    });
    logger.info(`Add item to cart response status: ${response.status()}`);
    return response;
  }

  async updateItemQuantity(cartId, productId, quantity, token) {
    const response = await this.put(`/carts/${cartId}/product/quantity`, {
      data: { product_id: productId, quantity },
      ...(token ? { headers: this.authHeaders(token) } : {}),
    });
    logger.info(`Update cart quantity response status: ${response.status()}`);
    return response;
  }
}

module.exports = CartApi;
