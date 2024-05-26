import { DependencyList, useEffect } from 'react';

const useDevEffect = (cb: any, deps: DependencyList | undefined) => {
  let ran = false;
  useEffect(() => {
    if (ran) return;
    cb();
    return () => {
      ran = true;
    };
  }, deps);
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const useOnceEffect = isDev ? useDevEffect : useEffect;
