import { useRef } from 'react';

/**
 * 同一引用
 * @param {*} fn 
 */
export function usePersistFn(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  
  const persistFn = useRef();

  if (!persistFn.current) {
    persistFn.current = function (...args) {
      // 保持第一次的引用
      return fnRef.current.apply(this, args);
    };
  }

  return persistFn.current;
}
