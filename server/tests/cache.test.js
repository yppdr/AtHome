import Cache from '../libs/cache.js';
import { expect, describe, it } from '@jest/globals';

describe('Cache', function () {
  it('should retrieve data from the cache', async function () {
    let cache = new Cache();
    cache.save('test', 'Hello world !');
    cache.fetch('test').then((data) => {
      expect(data).toBe('Hello world !');
    });

    cache.close();
  });
});
