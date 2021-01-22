
import React, { useState, useCallback, useRef } from 'react';
import { usePersistFn } from '../dhooks';

export const usePersistFnDemo = () => {
  const [count, setCount] = useState(0);

  const showCountPersistFn = usePersistFn(() => {
    setCount(count + 1)
  });

  const showCountCommon = () => {
    setCount(count + 1)
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
            showCountPersistFn();
        }}
      >
        usePersistFn 修改
      </button><br/>
      <button
        type="button"
        onClick={() => {
            showCountCommon();
        }}
      >
        普通修改 修改
      </button>
      <p>{count}</p>
      <p>这个例子不太明显，总之就是usePersistFn包裹的方法达到和普通编写的方法达到效果一致，避免闭包带来的数据无法及时更新的问题</p>
    </>
  );
};