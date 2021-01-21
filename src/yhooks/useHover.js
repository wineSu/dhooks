import { useState } from 'react';
import { useEventListener } from './useEventListener';

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
