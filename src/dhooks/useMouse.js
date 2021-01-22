import { useState } from 'react';
import { useEventListener } from './useEventListener';

const initState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  offsetX: NaN,
  offsetY: NaN
};

/**
 * mousemove信息
 * @param {*} target?
 */
export const useMouse = (target) => {
  const [state, setState] = useState(initState);

  useEventListener(
    'mousemove',
    (event) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY, offsetX, offsetY } = event;
      setState({ screenX, screenY, clientX, clientY, pageX, pageY, offsetX, offsetY });
    },
    {
      target,
    },
  );

  return state;
};
