
import React, { useState } from 'react';
import { useThrottle } from '../yhooks';

export const useThrottleDemo = () => {
  
  const [throttledValue, setThrottledValue] = useState();

  const throttledVal = useThrottle((val) => {
      console.log(val)
    setThrottledValue(val)
  });

  const change = (v) => {
    let val = v.target.value;
    // console.log(val)
    throttledVal(val)
  }

  return (
    <div>
      <input
        // value={value}
        onChange={change}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
};
