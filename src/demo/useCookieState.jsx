
import * as React from 'react';
import { useCookieState } from '../yhooks';

const useCookieStateDemo = () => {
  const [message, setMessage] = useCookieState('useCookieStateString', {
      dafaultVal: 11,
      expire: null
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
export default useCookieStateDemo;