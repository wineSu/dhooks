import { useEffect, useState } from 'react';
import { getTargetElement } from './useEventListener';

function isInViewPort(el) {
    if (!el) {
        return undefined;
    }
    const viewPortWidth =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const viewPortHeight =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect) {
        const { top, bottom, left, right } = rect;
        return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0;
    }
    return false;
}

/**
 * 元素是否出现在视野
 * @param {*} target 
 */
export function useInViewport(target) {
    const [inViewPort, setInViewport] = useState(() => {
        const el = getTargetElement(target);

        return isInViewPort(el);
    });

    useEffect(() => {
        const el = getTargetElement(target);
        if (!el) {
            return () => { };
        }

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setInViewport(true);
                } else {
                    setInViewport(false);
                }
            }
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [target]);

    return inViewPort;
}
