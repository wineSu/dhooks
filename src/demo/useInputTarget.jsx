import React, { Fragment, useRef } from 'react';
import { useInputTarget } from '../yhooks';

/**
 * 1. 需要进行 onCompositionEnd 的控制并且需要赋初始值的情况需要给input增加ref标识
 * 2. 不需要 onCompositionEnd 的控制则可以加上 value = {value} 进行状态受控
 * 3. onCompositionEnd 和受控情况不允许同时出现
 */
const useInputTargetDemo = () => {
    let input = useRef();
    const [value, { 
        reset,
        onChange,
        onCompositionStart,
        onCompositionEnd,
    }] = useInputTarget({
        initialValue: '111',
        id: 'setinitVal',
        setInitVal: input
    });

    return (
        <Fragment>
            <input
                ref = { input }
                onCompositionEnd = { onCompositionEnd }
                onCompositionStart = { onCompositionStart } 
                onChange = { onChange }
            />
            <p>值：{value}</p>
            <button type="button" onClick={reset}>
                reset
            </button>
        </Fragment>
    );
};

export default useInputTargetDemo;