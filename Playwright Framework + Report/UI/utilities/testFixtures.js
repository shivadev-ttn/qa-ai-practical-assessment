const { test: base } = require('@playwright/test');
const logger = require('./logger');
const TestDataGenerator = require('./testDataGenerator');
const UserCredentialsStore = require('./userCredentialsStore');
const { POManager } = require('../pageobjects/POManager');
const { APIManager } = require('../../API/pageObjects/APIManager');

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    if (testInfo.project.name === 'ui') {
      await page.addInitScript(() => {
        const applyZoom = () => {
          if (document.body) {
            document.body.style.zoom = '80%';
          }
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', applyZoom);
        } else {
          applyZoom();
        }
      });
    }

    await use(page);

    if (
      testInfo.project.name === 'ui' &&
      testInfo.status !== testInfo.expectedStatus &&
      page &&
      !page.isClosed()
    ) {
      const screenshotPath = testInfo.outputPath('failure.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logger.error(`Screenshot captured for failed test: ${testInfo.title}`);
    }
  },

  logger: async ({}, use) => {
    await use(logger);
  },

  testData: async ({}, use) => {
    await use(TestDataGenerator);
  },

  credentialsStore: async ({}, use) => {
    const store = new UserCredentialsStore();
    await use(store);
  },

  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },

  apiManager: async ({ request }, use) => {
    await use(new APIManager(request));
  },
});

module.exports = { test };
