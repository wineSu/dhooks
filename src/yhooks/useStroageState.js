import { useCallback, useState } from 'react';

export function useCookieState(cookieKey, {dafaultVal, expire}) {
    const [state, setState] = useState(() => {
        return getCookie(cookieKey) || dafaultVal;
    }); 

    const updateState = useCallback(
        (newValue) => {
            setState(() => {
                setCookie(cookieKey, newValue, newValue ? expire : -1);
                return newValue;
            });
        },
        [cookieKey, expire]
    );

    return [state, updateState];
}
