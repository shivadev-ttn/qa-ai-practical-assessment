const ApiClient = require('./ApiClient');
const logger = require('../../UI/utilities/logger');

class AuthApi extends ApiClient {
  async register(userPayload) {
    const response = await this.post('/users/register', { data: userPayload });
    logger.info(`Register response status: ${response.status()}`);
    return response;
  }

  async login(credentials) {
    const response = await this.post('/users/login', { data: credentials });
    logger.info(`Login response status: ${response.status()}`);
    return response;
  }
}

module.exports = AuthApi;
