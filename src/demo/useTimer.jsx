
import React, { useState } from 'react';
import { useTimer } from '../dhooks';

export const useTimerDemo = () => {

  const [state] = useTimer(() => {
    console.log('end')
  }, 10);

  return (
    <div>
       倒计时：{state}
    </div>
  );
};
