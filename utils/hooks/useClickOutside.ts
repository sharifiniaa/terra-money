import {MutableRefObject, RefObject, useEffect} from 'react';

export const useClickOutside = (ref: RefObject<HTMLDivElement> | MutableRefObject<undefined>, handler: (e: unknown) => void) => {
  useEffect(() => {
    const subscriber = (e: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      // @ts-ignore
      if (!el || el?.contains(e?.target)) {
        return;
      }
      handler(e);
    };
    document.addEventListener('mousedown', subscriber);
    document.addEventListener('touchstart', subscriber);
    return () => {
      document.removeEventListener('mousedown', subscriber);
      document.removeEventListener('touchstart', subscriber);
    };
  }, [ref, handler]);
};
