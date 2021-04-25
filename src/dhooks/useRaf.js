import { useRef, useEffect } from 'react';
import { usePersistFn } from './usePersistFn';
/**
 * Raf
 * @param {*} fn 
 */
export function useRaf(fn) {

    const rafFn = usePersistFn(fn);
    const {current} = useRef({});

    useEffect(() => {
        const animation = () => {
          current.rafId = requestAnimationFrame(() => {
            rafFn();
            animation();
          });
        }
        animation();
        
        return () => {
          cancelAnimationFrame(current.rafId);
        };
    }, [rafFn]);
    return current;
}
