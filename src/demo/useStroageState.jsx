
import * as React from 'react';
import { useStroageState } from '../dhooks';

export const useStroageStateDemo = () => {
  const [message, setMessage] = useStroageState('useStroageStateString', {
      dafaultVal: 11,
  });
  return (
    <input
      value={message}
      placeholder="输入后刷新页面保留数据"
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: 300 }}
    />
  );
};