
import React, { useState } from 'react';
import { useRaf } from '../dhooks';

export const useRafDemo = () => {
  const [state, setState] = useState(1);

  useRaf(() => {
    setState(state + 1);
  });

  return (
    <div>
      <p >Raf {state} </p>
    </div>
  );
};
