import {
    useRef,
    useEffect,
    useCallback
} from 'react';

/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} dep 
 */
export function useDebounce(fn, delay = 300, dep = []) {

    const { current } = useRef({ fn, timer: null });

    useEffect(() => {
        current.fn = fn;
    }, [fn]);
  
    return useCallback((...args) => {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn(...args);
        }, delay);
    }, dep)
}