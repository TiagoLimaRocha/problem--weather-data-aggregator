import { TimeoutError } from './error/Timeout.error';
import { MAX_TIMEOUT } from './types';

export async function withTimeout<T>(
  callback: (args?: any[]) => Promise<T> | T,
  timeout = MAX_TIMEOUT
) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError('Execution timed out'));
    }, timeout);
  });

  const callbackPromise = callback();

  return Promise.race([timeoutPromise, callbackPromise]);
}
