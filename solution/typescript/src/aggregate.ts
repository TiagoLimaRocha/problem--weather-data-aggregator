import { APINameEnum, RESULT_KEY } from './types';
import { get } from './request';
import { withTimeout } from './hooks';
import { InMemoryCache } from './cache';

function merge(cache: InMemoryCache, data: any) {
  const result = cache.get(RESULT_KEY)!;
  const aggregated = {
    ...result.value,
    ...data,
  };

  cache.set('result', aggregated);
  return aggregated;
}

export async function aggregate(endpoint: APINameEnum, cache: InMemoryCache) {
  return withTimeout(
    () =>
      new Promise((resolve, reject) => {
        const inCache = cache.has(endpoint);

        if (inCache) {
          console.log('Cache hit...');

          const { data } = cache.get(endpoint)!.value;

          resolve(merge(cache, data));
        } else {
          get(endpoint)
            .then(({ data }) => {
              console.log('Cache miss...');

              cache.set(endpoint, data);
              resolve(merge(cache, data));
            })
            .catch((error) => reject(error));
        }
      })
  );
}
