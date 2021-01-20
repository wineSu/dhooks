import { useCallback, useState } from 'react';

const setCookie = (name, value, expire) => {   
    window.document.cookie = name + 
                                "=" + 
                                escape(value) + 
                                (!expire ? "" : ("; expires=" + expire.toGMTString()));
}

const getCookie = (Name) => {   
    let findcookie = Name + "=",
        cookie = window.document.cookie,
        offset, end;
    if (cookie.length > 0) {
        offset = cookie.indexOf(findcookie);
        if (offset != -1) {
            offset += findcookie.length;
            end = cookie.indexOf(";", offset);
            if (end == -1){
                end = cookie.length;
            }
            return unescape(cookie.substring(offset, end));
        }
    }
    return null;
}

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
