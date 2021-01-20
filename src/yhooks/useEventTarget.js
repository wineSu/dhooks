import { useState, useCallback, useRef } from 'react';

/**
 * 输入框控制增强
 * @param {*} options 
 */
export function useEventTarget(options = {}) {
  const { initialValue, transformer } = options;
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => setValue(initialValue), []);

  const transformerRef = useRef(transformer);
  transformerRef.current = transformer;

  const onChange = useCallback((e) => {
    const _value = e.target.value;
    if (typeof transformerRef.current === 'function') {
      return setValue(transformerRef.current(_value));
    }
    return setValue(_value);
  }, []);

  return [
    value,
    {
      onChange,
      reset,
    },
  ];
}
