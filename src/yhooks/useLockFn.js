import { useRef, useCallback } from 'react';

/**
 * 避免重复提交
 * @param {*} fn 
 */
export function useLockFn(fn) {
    const lockRef = useRef(false);

    return useCallback(
        async (...args) => {
            if (lockRef.current) {
                return;
            };
            lockRef.current = true;
            try {
                const ret = await fn(...args);
                lockRef.current = false;
                return ret;
            } catch (e) {
                lockRef.current = false;
                throw e;
            }
        },
        [fn],
    );
}
