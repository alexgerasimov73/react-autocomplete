import { useCallback, useRef } from 'react';

import { DEBOUNCE_TIMEOUT } from '../constants';

export const useDebounce = (timeout = DEBOUNCE_TIMEOUT) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((callback: () => void) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      callback();
    }, timeout);
  }, [timeout]);

  return debounce;
};
