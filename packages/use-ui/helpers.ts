/**
 * Функция wait возвращает обещание, которое разрешается после указанной задержки.
 * @returns Функция wait возвращает функцию, которая принимает необязательный параметр Delay. Эта
 * внутренняя функция возвращает обещание, которое принимает значение true после указанной задержки с
 * использованием setTimeout.
 */
let timerId: number | boolean;

export const wait = (delay?: number) => {
  timerId = false;
  return new Promise(function (resolve) {
    if (!timerId) {
      timerId = setTimeout(() => {
        resolve(true);
        timerId = true;
      }, delay);
    }
  });
};

/**
 * Функция roundWithPrecision округляет число до указанной точности.
 * @param {number} n - Параметр n — это число, которое вы хотите округлить до определенной точности.
 * @param {number} precision - Параметр `precision` в функции `roundWithPrecision` указывает количество
 * десятичных знаков, до которых нужно округлить число `n`. Например, если точность равна 2, функция
 * округлит число n до 2 знаков после запятой.
 * @returns Функция roundWithPrecision возвращает число, округленное до указанной точности.
 */
const roundWithPrecision = (n: number, precision: number): number => {
  const m = 10 ** precision;
  return Math.round(n * m) / m;
};

/**
 * Функция pxToRem преобразует значения пикселей в единицы измерения rem в TypeScript, обрабатывая
 * относительные измерения и возвращая преобразованное значение с точностью до 4 десятичных знаков.
 * @param {string | number} v - Параметр v в функции pxToRem представляет значение, которое вы хотите
 * преобразовать из пикселей в rems. Это может быть строка или число, например значение пикселя,
 * например «16 пикселей» или 16.
 * @returns Функция pxToRem возвращает строку со значением, преобразованным из пикселей в rem с
 * точностью до 4 десятичных знаков, за которым следует единица измерения «rem». Если входное значение
 * не является допустимым числом или уже находится в относительных единицах измерения (например, %, vh,
 * vw, rem, em, auto), оно возвращает исходное входное значение без преобразования.
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
