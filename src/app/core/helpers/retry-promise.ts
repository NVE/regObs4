import { from } from 'rxjs';
import { retryWhen, delay, take } from 'rxjs/operators';

/**
 * @async
 * @function tryNTimes<T> Tries to resolve a {@link Promise<T>} N times, with a delay between each attempt.
 * @param {Object} options Options for the attempts.
 * @param {() => Promise<T>} options.toTry The {@link Promise<T>} to try to resolve.
 * @param {number} [options.times=5] The maximum number of attempts (must be greater than 0).
 * @param {number} [options.intervalMS=1] The interval of time between each attempt in seconds.
 * @returns {Promise<T>} The resolution of the {@link Promise<T>}.
 */
export async function tryNTimes<T>({
  toTry,
  times = 5,
  intervalMS = 1000,
}: {
  toTry: () => Promise<T>;
  times?: number;
  intervalMS?: number;
}): Promise<T> {
  if (times < 1) {
    throw new Error(`Bad argument: 'times' must be greater than 0, but ${times} was received.`);
  }

  return from(toTry())
    .pipe(retryWhen((errors) => errors.pipe(delay(intervalMS), take(times - 1))))
    .toPromise();
}
