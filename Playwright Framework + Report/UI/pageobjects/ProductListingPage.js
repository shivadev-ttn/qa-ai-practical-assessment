const BasePage = require('./BasePage');
const logger = require('../utilities/logger');

class ProductListingPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"], input[placeholder*="Search"]').first();
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.productCards = page.locator('[data-test="product-name"], .card-title, h5');
    this.sortDropdown = page.locator('[data-test="sort"]').or(
      page.locator('label', { hasText: /^Sort$/i }).locator('..').locator('select')
    ).or(page.locator('select').first());
    this.minPriceInput = page.locator('[data-test="min-price"], input[placeholder*="Min"]').first();
    this.maxPriceInput = page.locator('[data-test="max-price"], input[placeholder*="Max"]').first();
    this.filterButton = page.getByRole('button', { name: /filter/i });
  }

  async waitForProductsToLoad() {
    await this.page.waitForTimeout(1000);
    await this.page.locator('[data-test="product-name"]').first().waitFor({ state: 'visible', timeout: 20000 });
    logger.info('Product listing loaded');
  }

  async searchProduct(keyword) {
    await this.page.waitForTimeout(1000);
    logger.info(`Searching for product: ${keyword}`);
    await this.searchInput.fill(keyword);
    if (await this.searchButton.isVisible().catch(() => false)) {
      await this.searchButton.click();
    } else {
      await this.searchInput.press('Enter');
    }
    await this.page.waitForLoadState('networkidle');
  }

  async openProductByName(productName) {
    await this.page.waitForTimeout(1000);
    logger.info(`Opening product: ${productName}`);
    await this.page.getByRole('link', { name: productName }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCategory(categoryName) {
    await this.page.waitForTimeout(1000);
    logger.info(`Selecting category: ${categoryName}`);
    await this.page.getByRole('button', { name: /categories/i }).click();
    await this.page.getByRole('link', { name: categoryName, exact: true }).click();
    await this.page.waitForURL(/category/i, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async setPriceRange(min, max) {
    await this.page.waitForTimeout(1000);
    logger.info(`Setting price range: ${min} - ${max}`);
    if (await this.minPriceInput.isVisible().catch(() => false)) {
      await this.minPriceInput.fill(String(min));
      await this.maxPriceInput.fill(String(max));
      if (await this.filterButton.isVisible().catch(() => false)) {
        await this.filterButton.click();
      }
    }
  }

  async sortBy(optionLabel) {
    await this.page.waitForTimeout(1000);
    logger.info(`Sorting by: ${optionLabel}`);
    await this.sortDropdown.selectOption({ label: optionLabel });
    await this.page.waitForLoadState('networkidle');
  }

  async getSortOptions() {
    return this.sortDropdown.locator('option').allTextContents();
  }

  async getVisibleProductNames() {
    const names = await this.page.locator('[data-test="product-name"]').allTextContents();
    return names.map((n) => n.trim()).filter(Boolean);
  }
}

module.exports = ProductListingPage;
