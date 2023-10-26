import { RefObject, useEffect } from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai/index';

export const widthAtom = atom<number>(0);

export const useSortableWidth = (ref: RefObject<HTMLUListElement>) => {
  const [width, setWidth] = useAtom(widthAtom);

  useEffect(() => {
    if (!ref.current) return;

    setWidth(ref.current.offsetWidth);

    const handleResize = () => {
      if (!ref.current) return;

      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref, setWidth]);

  return { width };
};
