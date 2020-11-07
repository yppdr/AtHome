import { promisify } from 'util';
import redis from 'redis';

/**
 * Manage the cache
 *
 * @typedef {Object} CacheEntity
 * @property {string} timestamp - The inert timestamp
 * @property {*} value - The saved value
 *
 */
export default class Cache {
  /**
   * Construct the cache instance
   */
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', console.error);
  }

  /**
   * Save data to the cache
   * @param {string} key
   * @param {*} value
   */
  save(key, value) {
    let timestamp = Date.now();
    this.client.set(key, JSON.stringify({ timestamp, value }));
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
   * @returns {CacheEntity}
   */
  async fetch(key) {
    let response = await this.getAsync(key);
    return JSON.parse(response);
  }

  /**
   * Clear the database
   */
  clear() {
    this.client.keys('*', (err, keys) => {
      if (err) throw new Error(err);
      for (var i = 0, len = keys.length; i < len; i++) {
        this.client.del(keys[i]);
      }
    });
  }

  /**
   * Close the connection
   */
  close() {
    this.clear();
    this.client.end(false);
  }
}
