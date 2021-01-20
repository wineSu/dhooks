
import * as React from 'react';
import { useStroageState } from '../yhooks';

const useStroageStateDemo = () => {
  const [message, setMessage] = useStroageState('useStroageStateString', {
      dafaultVal: 11,
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
export default useStroageStateDemo;