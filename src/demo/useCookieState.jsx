
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
      placeholder="Please enter some words..."
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: 300 }}
    />
  );
};
export default useCookieStateDemo;