import { useEffect } from 'react';
import { usePersistFn } from './usePersistFn';
/**
 * 定时器
 * @param {*} fn 
 * @param {*} delay 
 */
export function useTimeout(fn, delay = 1) {

    // 避免 fn 中被重复渲染 保持同一引用
    const timerFn = usePersistFn(fn);

    useEffect(() => {
        
        if (!delay){
            return;
        };

        const timer = setTimeout(() => {
            timerFn();
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [delay, timerFn]);
}
