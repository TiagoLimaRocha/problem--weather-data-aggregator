import './promise';
import { InMemoryCache } from './cache';
import { aggregate } from './aggregate';
import { APINameEnum, PromiseStatusEnum, RESULT_KEY } from './types';

async function settled() {
  const cache = new InMemoryCache(60 * 1000, 10);
  cache.set(RESULT_KEY, {});

  const endpoints = [...Object.values(APINameEnum), 'unknown'];
  const promises = endpoints.map((endpoint) =>
    aggregate(endpoint as APINameEnum, cache)
  );

  Promise.allSettled(promises)
    .then((results) => {
      if (
        results.every((result) => result.status === PromiseStatusEnum.FULFILLED)
      ) {
        console.log('\nAll promises fulfilled');
        return;
      }

      console.log('\nSome promises rejected');
      results
        .filter((result) => result.status === PromiseStatusEnum.REJECTED)
        .forEach((result) => console.error(result));
    })
    .catch((error) => console.log({ error }));

  setTimeout(() => {
    console.log('\nData Aggregation:');
    console.log(cache.get(RESULT_KEY)!.value);
  }, 10000);
}

async function limitted() {
  const cache = new InMemoryCache(60 * 1000, 10);
  cache.set(RESULT_KEY, {});

  const endpoints = [...Object.values(APINameEnum), 'unknown'];
  const promises = endpoints.map((endpoint) =>
    aggregate(endpoint as APINameEnum, cache)
  );

  Promise.allLimitted(promises)
    .then((_) => {
      console.log('\nAll promises fulfilled');
    })
    .catch((error) => console.log({ error }));

  setTimeout(() => {
    console.log('\nData Aggregation:');
    console.log(cache.get(RESULT_KEY)!.value);
  }, 10000);
}

async function main() {
  await settled();
  await limitted();
}
main();
