import { useState } from 'react';
import { useEventListener } from './useEventListener';

const getVisibility = () => {
    return window.document.visibilityState;
};

export function useDocumentVisibility() {
  const [status, setStatus] = useState(() => getVisibility());

  useEventListener(
    'visibilitychange',
    () => {
        setStatus(getVisibility());
    },{
      target: window.document,
    },
  );

  return status;
}
