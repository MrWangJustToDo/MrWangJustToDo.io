import { useEffect, useRef } from 'react';

export const usePrevious = <T = any>(value: T) => {
  const valueRef = useRef<T>(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};
