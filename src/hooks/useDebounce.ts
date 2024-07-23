import { useCallback, useRef } from 'react';
import { DEBOUNCE_TIMEOUT } from '../constants';

export const useDebounce = (timeout = DEBOUNCE_TIMEOUT) => {
  const debounceTimeOut = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (callback: () => void) => {
      if (debounceTimeOut.current) {
        clearTimeout(debounceTimeOut.current);
      }

      debounceTimeOut.current = setTimeout(callback, timeout);
    },
    [timeout],
  );
};
