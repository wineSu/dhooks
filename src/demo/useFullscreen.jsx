import React, { useRef, useState } from 'react';
import { useFullscreen } from '../dhooks';

export const useFullscreenDemo = () => {
  const ref = useRef();

  const [state, setstate] = useState('');

  const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(ref, {
    onFullRef: () => {
        setstate('全屏')
    },
    onExitFullRef: () => {
        setstate('非全屏')
    }
  });
  return (
    <div ref={ref} style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <p>{state}</p>
      <div>
        <button type="button" onClick={setFull}>
          setFull
        </button>
        <button type="button" onClick={exitFull} style={{ margin: '0 8px' }}>
          exitFull
        </button>
        <button type="button" onClick={toggleFull}>
          toggle
        </button>
      </div>
    </div>
  );
};