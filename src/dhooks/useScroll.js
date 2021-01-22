import { useState, useEffect } from 'react';
import { usePersistFn } from './usePersistFn';
import { getTargetElement, useEventListener } from './useEventListener';

/**
 * 滚动处理
 * @param {*} target 
 * @param {*} shouldUpdate 
 */
export function useScroll(target, shouldUpdate = () => true) {
    const [position, setPosition] = useState({
        left: NaN,
        top: NaN,
    });

    const shouldUpdatePersist = usePersistFn(shouldUpdate);

    function updatePosition(currentTarget) {
        let newPosition;
        if (currentTarget === document) {
            if (!document.scrollingElement){
                return;
            };
            newPosition = {
                left: document.scrollingElement.scrollLeft,
                top: document.scrollingElement.scrollTop,
            };
        } else {
            newPosition = {
                left: currentTarget.scrollLeft,
                top: currentTarget.scrollTop,
            };
        }
        if (shouldUpdatePersist(newPosition)){
            setPosition(newPosition);
        };
    }

    function listener(event) {
        updatePosition(event.target);
    }

    useEventListener('scroll', listener, {
        target
    });

    useEffect(() => {
        const el = getTargetElement(target, document);
        updatePosition(el);
    }, [])

    return position;
}