const logger = require('../../UI/utilities/logger');

class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  async get(url, options = {}) {
    logger.info(`API GET ${url}`);
    return this.request.get(url, options);
  }

  async post(url, options = {}) {
    logger.info(`API POST ${url}`);
    return this.request.post(url, options);
  }

  async put(url, options = {}) {
    logger.info(`API PUT ${url}`);
    return this.request.put(url, options);
  }

  async delete(url, options = {}) {
    logger.info(`API DELETE ${url}`);
    return this.request.delete(url, options);
  }

  authHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

module.exports = ApiClient;
