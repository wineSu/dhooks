
import React, { useState } from 'react';
import { useTimeout } from '../yhooks';

const useTimeoutDemo = () => {
  const [state, setState] = useState(1);

  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return (
    <div>
      <p onClick = { () => {
        setState(state + 1);
      } }>点点 {state} </p>
    </div>
  );
};

export default useTimeoutDemo;
