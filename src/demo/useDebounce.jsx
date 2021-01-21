
import React, { useState } from 'react';
import { useDebounce } from '../yhooks';

export const useDebounceDemo = () => {
  
  const [debouncedValue, setDebouncedVal] = useState();

  const debouncedVal = useDebounce((val) => {
      setDebouncedVal(val)
  });

  const change = (v) => {
    let val = v.target.value;
    debouncedVal(val)
  }

  return (
    <div>
      <input
        onChange={change}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>debouncedValue: {debouncedValue}</p>
    </div>
  );
};
