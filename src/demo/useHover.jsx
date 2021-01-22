import React, { useRef } from 'react';
import { useHover } from '../dhooks';

export const useHoverDemo = () => {
  const ref = useRef();
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};