const ApiClient = require('./ApiClient');
const logger = require('../../UI/utilities/logger');

class MessageApi extends ApiClient {
  async sendMessage(payload, token) {
    const options = {
      data: payload,
      ...(token ? { headers: this.authHeaders(token) } : {}),
    };
    const response = await this.post('/messages', options);
    logger.info(`Send message response status: ${response.status()}`);
    return response;
  }

  async replyToMessage(messageId, message, token) {
    const response = await this.post(`/messages/${messageId}/reply`, {
      data: { message },
      headers: this.authHeaders(token),
    });
    logger.info(`Reply to message response status: ${response.status()}`);
    return response;
  }

  async getMessages(token) {
    const response = await this.get('/messages', {
      headers: this.authHeaders(token),
    });
    logger.info(`Get messages response status: ${response.status()}`);
    return response;
  }
}

module.exports = MessageApi;
