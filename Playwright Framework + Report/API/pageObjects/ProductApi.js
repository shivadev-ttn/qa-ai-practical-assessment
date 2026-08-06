const ApiClient = require('./ApiClient');
const logger = require('../../UI/utilities/logger');

class ProductApi extends ApiClient {
  async getProducts(token) {
    const options = token ? { headers: this.authHeaders(token) } : {};
    const response = await this.get('/products', options);
    logger.info(`Get products response status: ${response.status()}`);
    return response;
  }

  async getProduct(productId, token) {
    const options = token ? { headers: this.authHeaders(token) } : {};
    const response = await this.get(`/products/${productId}`, options);
    logger.info(`Get product response status: ${response.status()}`);
    return response;
  }

  async searchProducts(query, token) {
    const options = token ? { headers: this.authHeaders(token) } : {};
    const response = await this.get('/products/search', {
      ...options,
      params: { q: query },
    });
    logger.info(`Search products response status: ${response.status()}`);
    return response;
  }
}

module.exports = ProductApi;
