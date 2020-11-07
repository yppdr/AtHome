import { promisify } from 'util';
import redis from 'redis';

/**
 * Manage the cache
 */
export default class Cache {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', console.error);
  }

  /**
   * Save data to the cache
   * @param {string} key
   * @param value
   */
  save(key, value) {
    this.client.set(key, value);
  }

  /**
   *  Check if data is in the cache
   * @param {string} key
   *
   * @returns {boolean}
   */
  async has(key) {
    let response = await this.fetch(key);
    return response !== null;
  }

  /**
   * Retrieve data from the cache
   * @param {string} key
   * @returns {Promise}
   */
  async fetch(key) {
    let response = await this.getAsync(key);
    return response;
  }

  clear() {
    this.client.keys('*', (err, keys) => {
      if (err) throw new Error(err);
      for (var i = 0, len = keys.length; i < len; i++) {
        this.client.del(keys[i]);
      }
    });
  }

  close() {
    this.clear();
    this.client.end(false);
  }
}
