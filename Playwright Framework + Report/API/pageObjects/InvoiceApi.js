const ApiClient = require('./ApiClient');
const logger = require('../../UI/utilities/logger');

class InvoiceApi extends ApiClient {
  async createInvoice(payload, token) {
    const options = {
      data: payload,
      ...(token ? { headers: this.authHeaders(token) } : {}),
    };
    const response = await this.post('/invoices', options);
    logger.info(`Create invoice response status: ${response.status()}`);
    return response;
  }
}

module.exports = InvoiceApi;
