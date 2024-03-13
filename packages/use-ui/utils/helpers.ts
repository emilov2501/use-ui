/**
 * The `wait` function returns a promise that resolves after a specified delay.
 * @param {number} [delay] - The `delay` parameter in the `wait` function is an optional parameter of
 * type `number`. It represents the time in milliseconds that the function will wait before resolving
 * the promise. If no `delay` value is provided, the default value is `undefined`.
 * @returns A Promise is being returned
 */
export const wait = (delay?: number) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};
