const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const testConfig = require('../../config/testConfig');

const EMPTY_STORE = { ui: null, api: null };

class UserCredentialsStore {
  constructor(filePath = testConfig.generatedUsersFile) {
    this.filePath = path.resolve(process.cwd(), filePath);
    this._ensureFile();
  }

  _ensureFile() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      this._write(EMPTY_STORE);
    }
  }

  _read() {
    this._ensureFile();
    const raw = fs.readFileSync(this.filePath, 'utf8');
    const data = JSON.parse(raw || '{}');

    // Migrate legacy format { users: [...] } to { ui, api }
    if (data.users && Array.isArray(data.users)) {
      const uiUsers = data.users.filter((u) => u.source === 'ui');
      const apiUsers = data.users.filter((u) => u.source === 'api');
      return {
        ui: uiUsers.length ? this._stripSource(uiUsers[uiUsers.length - 1]) : null,
        api: apiUsers.length ? this._stripSource(apiUsers[apiUsers.length - 1]) : null,
      };
    }

    return { ui: data.ui || null, api: data.api || null };
  }

  _stripSource(entry) {
    const { source, ...rest } = entry;
    return rest;
  }

  _write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  /**
   * Save the latest registered user — overwrites previous entry for the given source.
   * @param {object} user
   * @param {'ui'|'api'} source
   */
  saveUser(user, source = 'ui') {
    const data = this._read();
    data[source] = {
      createdAt: new Date().toISOString(),
      ...user,
    };
    this._write(data);
    logger.info(`Saved latest ${source.toUpperCase()} user credentials: ${user.email}`);
    return data[source];
  }

  getUser(source) {
    const data = this._read();
    return source ? data[source] : data;
  }

  getLatestUser(source) {
    return this.getUser(source);
  }
}

module.exports = UserCredentialsStore;
