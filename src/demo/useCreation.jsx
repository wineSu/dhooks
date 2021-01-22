
import React, { useState } from 'react';
import { useCreation } from '../dhooks';

class Foo {
  constructor() {
    this.data = Math.random();
  }
}

export function useCreationDemo () {

  const foo = useCreation(() => new Foo());

  const [flag, setFlag] = useState(0);

  return (
    <>
      <p>实例化一次：{foo.data}</p>
      <p>变化的数据：{flag}</p>
      <button
        type="button"
        onClick={() => {
          setFlag((v) => ++v);
        }}
      >
        render again
      </button>
    </>
  );
}
