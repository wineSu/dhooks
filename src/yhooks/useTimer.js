import { useEffect, useState } from 'react';

/**
 * 倒计时 验证码
 * @param {*} fn 
 * @param {*} second 
 */
export function useTimer(fn, second = 5) {

    const [time, setTime] = useState(second);

    useEffect(() => {
        let timerId;
        let count = () => {
            timerId = setTimeout(() => {
                setTime(v => {
                    if(v == 1){
                        clearTimeout(timerId);
                        fn && fn();
                        return 0;
                    }
                    count();
                    return --v;
                })
            }, 1000);
        }
        count();
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return [time]
}
