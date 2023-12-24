import { MAX_LIMIT } from './types';

declare global {
  interface PromiseConstructor {
    allLimitted<T>(promises: Promise<T>[], limit?: number): Promise<T[]>;
  }
}

Promise.allLimitted = function <T>(
  promises: Promise<T>[],
  limit: number = MAX_LIMIT
) {
  return new Promise((resolve, reject) => {
    let activePromises = 0;
    let finishedPromises = 0;

    const totalPromises = promises.length;
    const results: T[] = [];

    function next() {
      if (!promises.length) {
        if (totalPromises === finishedPromises) {
          resolve(results as any);
        }
        return;
      }

      activePromises++;
      const promise = promises.shift()!;

      promise
        .then((result) => {
          results.push(result);
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          activePromises--;
          finishedPromises++;
          next();
        });
    }

    // Run initial promise batch
    for (let i = 0; i < limit && i < totalPromises; i++) {
      next();
    }
  });
};

export { };
