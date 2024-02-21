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
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const matchMedia: MediaQueryList = window.matchMedia(query);

    // Обновляем состояние, если соответствие медиа-запросу изменяется
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // Устанавливаем начальное значение
    setMatches(matchMedia.matches);

    // Подписываемся на изменения медиа-запроса
    matchMedia.addEventListener("change", handleChange);

    // Очистка подписки при размонтировании компонента
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query, isClient]);

  return matches;
}

export default useMediaQuery;
