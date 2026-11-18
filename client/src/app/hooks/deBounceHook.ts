import {useEffect, useState} from "react";

export const useDebounce = (value: string, delay: number = 400) => {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debounceVal;
};
