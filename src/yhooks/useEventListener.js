import { useEffect } from 'react';
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

/**
 * 事件监听
 * @param {*} eventName 
 * @param {*} handler 
 * @param {*} options 
 */
export function useEventListener(eventName, handler, options = {}) {

    // 数据变化后更新handler  使得内部数据得以更新再次触发事件取得最新值
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
