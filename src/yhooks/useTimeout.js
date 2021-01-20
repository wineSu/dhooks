import { useEffect, useCallback } from 'react';

/**
 * 定时器
 * @param {*} fn 
 * @param {*} delay 
 */
export function useTimeout(fn, delay = 1) {

    // 避免 fn 中被重复渲染 保持同一引用
    const timerFn = useCallback(fn, []);

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
