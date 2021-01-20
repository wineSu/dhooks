import { useRef } from 'react';

/**
 * 拿到上次引用 fn，避免闭包带来的无法更新的问题
 * @param {*} fn 
 */
export function usePersistFn(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  
  const persistFn = useRef();

  if (!persistFn.current) {
    persistFn.current = function (...args) {
      // 上一次的引用
      return fnRef.current.apply(this, args);
    };
  }

  return persistFn.current;
}
