import { useMemo } from 'react';

export function usePromise(arr = []) {
  return useMemo(() => {
    let res = null;
    let rej = null;
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    return {
      promise,
      res: (res as unknown) as (value?: unknown) => void,
      rej: (rej as unknown) as (reason?: any) => void,
    };
  }, arr);
}