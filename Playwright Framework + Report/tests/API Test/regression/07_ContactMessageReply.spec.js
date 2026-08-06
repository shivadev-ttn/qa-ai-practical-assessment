const { test } = require('../../../UI/utilities/testFixtures');
const { expect } = require('@playwright/test');

test.describe('TC-07 - Contact Message & Reply', () => {
  test('07 - Send contact message and add reply @Regression @Positive', async ({
    apiManager,
    testData,
    logger,
  }) => {
    const authApi = apiManager.getAuthApi();
    const messageApi = apiManager.getMessageApi();
    const user = testData.generateApiUser();
    let accessToken;
    let messageId;

    await test.step('Register and login user', async () => {
      await authApi.register(user);
      const loginResponse = await authApi.login({ email: user.email, password: user.password });
      accessToken = (await loginResponse.json()).access_token;
      logger.info(`User authenticated: ${user.email}`);
    });

    await test.step('Send contact message', async () => {
      const payload = testData.generateContactMessagePayload();
      const response = await messageApi.sendMessage(payload, accessToken);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBeTruthy();
      expect(body.subject).toBe(payload.subject);
      messageId = body.id;
      logger.info(`Contact message created with id: ${messageId}`);
    });

    await test.step('Add reply to contact message', async () => {
      const replyMessage = testData.generateContactReplyMessage();
      const response = await messageApi.replyToMessage(messageId, replyMessage, accessToken);
      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body.message).toBe(replyMessage);
      expect(body.id).toBeTruthy();
      logger.info('Reply added to contact message');
    });

    await test.step('Verify message appears in user message list', async () => {
      const response = await messageApi.getMessages(accessToken);
      expect(response.status()).toBe(200);
      const body = await response.json();
      const message = body.data.find((item) => item.id === messageId);
      expect(message).toBeTruthy();
      logger.info('Contact message listed for authenticated user');
    });
  });
});
