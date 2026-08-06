// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
require('dotenv').config();

const uiBaseURL = process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com';
const apiBaseURL = process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ],
  outputDir: 'test-results',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/Manual UI Test',
      timeout: 60000,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
        baseURL: uiBaseURL,
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'api',
      testDir: './tests/API Test',
      use: {
        baseURL: apiBaseURL,
        screenshot: 'off',
        video: 'off',
        trace: 'off',
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
