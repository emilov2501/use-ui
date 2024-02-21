import { useEffect, useState } from "react";

/**
 * The function `useMediaQuery` in TypeScript is used to track the match status of a given media query
 * in a browser environment.
 * @param {string} query - The `query` parameter in the `useMediaQuery` function is a string
 * representing a media query that you want to match against. This media query can include conditions
 * like screen width, device orientation, resolution, etc. The function uses this query to determine if
 * the current viewport matches the specified conditions.
 * @returns The `useMediaQuery` function returns the current state of whether the media query specified
 * in the `query` parameter is currently matching or not. It uses React's `useState` and `useEffect`
 * hooks to manage the state and update it based on changes to the media query.
 */
function useMediaQuery(query: string) {
  // Проверяем, выполняется ли код в среде браузера
  const isClient = typeof window === "object";

  // Состояние для хранения текущего соответствия медиа-запросу
  const [matches, setMatches] = useState(() => {
    if (isClient) {
      return window.matchMedia(query).matches;
    }
    // Возвращаем false или другое значение по умолчанию для SSR
    return false;
  });

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    // Функция для обновления состояния соответствия медиа-запросу
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Создаем MediaQueryList и подписываемся на событие изменения
    const matchMedia: MediaQueryList = window.matchMedia(query);
    matchMedia.addEventListener("change", handler);

    // Первоначальная проверка соответствия
    setMatches(matchMedia.matches);

    // Отписываемся от события при размонтировании компонента
    return () => matchMedia.removeEventListener("change", handler);
  }, [query, isClient]); // Перезапускаем эффект при изменении запроса или при изменении среды выполнения

  return matches;
}

export default useMediaQuery;
