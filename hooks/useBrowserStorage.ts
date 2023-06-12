import { useEffect, useState } from "react";

const enum STORAGE_TYPE {
  LOCALE = "LOCALE",
  SESSION = "SESSION",
};

const TYPE_TO_STORAGE_MAP = {
  [STORAGE_TYPE.LOCALE]: localStorage,
  [STORAGE_TYPE.SESSION]: sessionStorage,
};

export const useBrowserStorage = (
  key: string,
  initialValue: string,
  type: STORAGE_TYPE = STORAGE_TYPE.LOCALE
) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = TYPE_TO_STORAGE_MAP[type].getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  }, [key, state]);

  return [state, setState];
};
