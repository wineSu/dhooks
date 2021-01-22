import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * 输入框控制增强
 * @param {*} options 
 */
export function useInputTarget(options = {}) {
    const { initialValue, transformer, setInitVal } = options;
    const [value, setValue] = useState(initialValue);
    const inputControl = useRef({});

    const reset = useCallback(() => setValue(initialValue), []);

    const transformerRef = useRef(transformer);
    transformerRef.current = transformer;

    const onChange = useCallback((e) => {
      if(!inputControl.current.flag){
          const _value = e.target.value;
          if (typeof transformerRef.current === 'function') {
            return setValue(transformerRef.current(_value));
          }
          return setValue(_value);
      }
    }, []);

    const onCompositionEnd = useCallback((e) => {
        inputControl.current.flag = false;
        onChange(e)
    }, []);

    const onCompositionStart = useCallback((e) => {
      inputControl.current.flag = true;
    }, []);

    useEffect(() => {
      setInitVal && (setInitVal.current.value = initialValue)
    }, [])

    return [
        value,
        {
          onChange,
          reset,
          onCompositionStart,
          onCompositionEnd
        },
    ];
}
