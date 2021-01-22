import { useState } from 'react';
import { useEventListener } from './useEventListener';

/**
 * 元素鼠标划上
 * @param {*} target 
 * @param {*} options 
 */
export const useHover = (target, options) => {
    const { onEnter, onLeave } = options || {};

    const [state, setstate] = useState(false);

    useEventListener('mouseenter', () => {
        onEnter && onEnter();
        setstate(true);
    }, {
        target,
    });

    useEventListener( 'mouseleave', () => {
        onLeave && onLeave();
        setstate(false);
    }, {
        target,
    });

    return state;
};
