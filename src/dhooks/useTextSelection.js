import { useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

const initRect = {
    top: NaN,
    left: NaN,
    bottom: NaN,
    right: NaN,
    height: NaN,
    width: NaN,
};

const initState = {
    text: '',
    ...initRect,
};

function getRectFromSelection(selection) {
    if (!selection || selection.rangeCount < 1) {
        return initRect;
    }

    const range = selection.getRangeAt(0);
    const { height, width, top, left, right, bottom } = range.getBoundingClientRect();
    console.log({ height, width, top, left, right, bottom })
    return {
        height,
        width,
        top,
        left,
        right,
        bottom,
    };
}

/**
 * 选取的文本或当位置获取
 * @param {*} target 
 */
export function useTextSelection(target) {
    const [state, setState] = useState(initState);

    const stateRef = useRef(state);
    stateRef.current = state;

    const mouseupHandler = () => {
        let selObj = null,
            text = '',
            rect = initRect;
        if(window.getSelection){
            selObj = window.getSelection();
            text = selObj ? selObj.toString() : '';
            if (text) {
                rect = getRectFromSelection(selObj);
                setState({ ...state, text, ...rect });
            }
        }
    };

    // 任意点击都需要清空之前的 range
    const mousedownHandler = () => {
        if (window.getSelection){
            if (state.text) {
                setState({ ...initState });
            }
            const selObj = window.getSelection();
            selObj && selObj.removeAllRanges();
        }
    };

    useEventListener('mouseup', mouseupHandler, {
        target
    });

    useEventListener('mousedown', mousedownHandler);


    return state;
}