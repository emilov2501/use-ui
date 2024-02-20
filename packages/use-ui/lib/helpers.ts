/**
 * The `wait` function returns a promise that resolves after a specified delay.
 * @param {number} [delay] - The `delay` parameter in the `wait` function is an optional parameter of
 * type `number`. It represents the time in milliseconds that the function will wait before resolving
 * the promise. If no `delay` value is provided, the default value is `undefined`.
 * @returns A Promise is being returned.
 */
export const wait = (delay?: number) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};

const roundWithPrecision = (n: number, precision: number): number => {
  const m = 10 ** precision;
  return Math.round(n * m) / m;
};

/**
 * The `pxToRem` function converts pixel values to rem units in TypeScript, handling relative
 * measurements and returning the converted value with a precision of 4 decimal places.
 * @param {string | number} v - The `v` parameter in the `pxToRem` function represents the value that
 * you want to convert from pixels to rems. It can be either a string or a number, such as a pixel
 * value like '16px' or 16.
 * @returns The `pxToRem` function returns a string with the value converted from pixels to rems with a
 * precision of 4 decimal places followed by the "rem" unit. If the input value is not a valid number
 * or already in a relative measurement unit (such as %, vh, vw, rem, em, auto), it returns the
 * original input value.
 */
export const pxToRem = (v: string | number): string | number => {
  const ratio = 16;
  const px = parseFloat(String(v));
  const isRelativemeasurement = /(\%|vh|vw|rem|em|auto)$/.test(String(v)); // return if value is 50% 100vh ...

  if (Number.isNaN(px) || isRelativemeasurement) {
    return v;
  }

  try {
    return `${roundWithPrecision(px / ratio, 4)}rem`;
  } catch (e) {
    return v;
  }
};
