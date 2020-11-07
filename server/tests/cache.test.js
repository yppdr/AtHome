import Cache from '../libs/cache.js';
import { expect, describe, it, beforeEach, afterAll } from '@jest/globals';

describe('Cache', () => {
  let cache = null;

  beforeAll(() => {
    cache = new Cache();
  });

  afterEach(() => {
    cache.clear();
  });

  afterAll(() => {
    cache.close();
  });

  it('should not be in the cache', async () => {
    let isInCache = await cache.has('test');
    expect(isInCache).toBe(false);
    let response = await cache.fetch('test');
    expect(response).toBe(null);
  });

  it('should be in the cache', async () => {
    cache.save('test', 'Hello world !');
    let response = await cache.has('test');
    expect(response).toBe(true);
  });

  it('should retrieve data from the cache', async () => {
    cache.save('test', 'Hello world !');
    let response = await cache.fetch('test');
    expect(response.value).toBe('Hello world !');
  });
});
