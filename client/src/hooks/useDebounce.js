import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // Cleanup previous timer
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
