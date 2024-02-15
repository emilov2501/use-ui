/**
 * Функция wait возвращает обещание, которое разрешается после указанной задержки.
 * @returns Функция wait возвращает функцию, которая принимает необязательный параметр Delay. Эта
 * внутренняя функция возвращает обещание, которое принимает значение true после указанной задержки с
 * использованием setTimeout.
 */
export const wait = (delay?: number) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};
