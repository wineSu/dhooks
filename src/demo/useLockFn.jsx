import React, { useState } from 'react';
import { useLockFn } from '../dhooks';

function mockApiRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export const useLockFnDemo = () => {
  const [count, setCount] = useState(0);

  const submit = useLockFn(async () => {
    console.info('Start to submit');
    await mockApiRequest();
    setCount((val) => val + 1);
    console.info('Submit finished');
  });

  return (
    <>
      <p>Submit count: {count}</p>
      <button onClick={submit}>Submit</button>
    </>
  );
};
