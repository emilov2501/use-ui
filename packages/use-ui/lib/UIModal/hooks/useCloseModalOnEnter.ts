import { useEffect } from "react";

export const useCloseModalOnEscape = (
  closeModal: (id: string) => void,
  id: string
): void => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [id]);
};
