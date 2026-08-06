const AuthApi = require('./AuthApi');
const CartApi = require('./CartApi');
const ProductApi = require('./ProductApi');
const InvoiceApi = require('./InvoiceApi');
const MessageApi = require('./MessageApi');

/** Central API Manager — single entry point for all API service classes. */
class APIManager {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.AuthApi = new AuthApi(this.request);
    this.CartApi = new CartApi(this.request);
    this.ProductApi = new ProductApi(this.request);
    this.InvoiceApi = new InvoiceApi(this.request);
    this.MessageApi = new MessageApi(this.request);
  }

  getAuthApi() {
    return this.AuthApi;
  }

  getCartApi() {
    return this.CartApi;
  }

  getProductApi() {
    return this.ProductApi;
  }

  getInvoiceApi() {
    return this.InvoiceApi;
  }

  getMessageApi() {
    return this.MessageApi;
  }
}

module.exports = { APIManager };
