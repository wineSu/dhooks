
import React, { useState } from 'react';
import { useInterval } from '../dhooks';

export const useIntervalDemo = () => {
  const [state, setState] = useState(1);

  useInterval(() => {
    setState(state + 1);
  }, 1000);

  return (
    <div>
      <p onClick = { () => {
        setState(state + 1);
      } }>点点 {state} </p>
    </div>
  );
};
