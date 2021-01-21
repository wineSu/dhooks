import { useEffect, useState } from 'react';
import { usePersistFn } from './usePersistFn'

/**
 * 定时器 setTimeout模拟
 * @param {*} fn 
 */
export function useInterval(fn, delay) {

    const timerFn = usePersistFn(fn);

    useEffect(() => {
        let timerId;
        let loop = () => {
            if(!delay){
                clearTimeout(timerId);
                return false;
            }
            timerId = setTimeout(() => {
                timerFn();
                loop();
            }, delay);
        }
        loop();
        return () => {
            clearTimeout(timerId);
        };
    }, [delay]);
}
