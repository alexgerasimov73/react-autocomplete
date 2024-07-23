import { RefObject, useEffect } from 'react';

interface UseOutsideClickOptions {
  readonly elementRef: RefObject<HTMLElement>;
  readonly enabled?: boolean;
  readonly handler: () => void;
}

export const useOutsideClick = ({
  elementRef,
  enabled = true,
  handler,
}: UseOutsideClickOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!elementRef.current) return;

      if (!elementRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [elementRef, enabled, handler]);
};
