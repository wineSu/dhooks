import { useEffect } from 'react';
import { usePersistFn } from './usePersistFn'
/**
 * 定时器
 * @param {*} fn 
 * @param {*} delay 
 */
export function useTimeout(fn, delay = 1) {

    // 重新更新 fn 中的 state  避免fn同一引用 返回值是保持同一引用的
    // useCallback 则是对fn保持同一引用
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
