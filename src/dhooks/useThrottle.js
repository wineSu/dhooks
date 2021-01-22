import {
    useRef,
    useEffect,
    useCallback
} from 'react';

/**
 * 节流
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} dep 
 */
export function useThrottle(fn, delay = 500, dep = []) {

    const { current } = useRef({ fn, timer: null });

    useEffect(() => {
        current.fn = fn;
    }, [fn]);
  
    return useCallback((...args) => {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn(...args);
        }
    }, dep)
}