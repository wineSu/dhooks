import { useState } from 'react';
import { useEventListener } from './useEventListener';

const getVisibility = () => {
    return window.document.visibilityState;
};

/**
 * 页面当前状态获取
 */
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
