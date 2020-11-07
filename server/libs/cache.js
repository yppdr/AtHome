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
   * Retrieve data from the cache
   * @param {string} key
   * @returns {Promise}
   */
  async fetch(key) {
    return await this.getAsync(key);
  }

  close() {
    this.client.end(true);
  }
}
