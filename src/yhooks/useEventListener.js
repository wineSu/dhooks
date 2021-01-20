import { useEffect, useRef } from 'react';
import { usePersistFn } from './usePersistFn';

let getTargetElement = (target, defaultElement) => {
    
    if (!target) {
      return defaultElement;
    }
  
    let targetElement;
  
    if (typeof target === 'function') {
      targetElement = target();
    } else if ('current' in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }
  
    return targetElement;
}

export function useEventListener(eventName, handler, options = {}) {

    // 保持同一引用
    const handlerFn = usePersistFn(handler);
    
    useEffect(() => {
        
        const targetElement = getTargetElement(options.target, window);
        if (!targetElement.addEventListener) {
            return;
        }

        const eventListener = (event) => {
            return handlerFn(event);
        };

        targetElement.addEventListener(eventName, eventListener, {
            capture: options.capture,
            once: options.once,
            passive: options.passive,
        });

        return () => {
            targetElement.removeEventListener(eventName, eventListener, {
                capture: options.capture,
            });
        };
    }, [eventName, options.target, options.capture, options.once, options.passive]);
}
