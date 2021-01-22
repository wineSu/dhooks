import React, { useRef } from 'react';
import { useInViewport } from '../dhooks';

export const useInViewportDemo = () => {
  const ref = useRef();
  const inViewPort = useInViewport(ref);
  return (
    <div style={{ height: 120, overflow: 'auto' }}>
      <div style={{ height: 500 }}>
        <div ref={ref}>observer dom</div>
        <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
          {inViewPort ? 'visible' : 'hidden'}
        </div>
      </div>
    </div>
  );
};
