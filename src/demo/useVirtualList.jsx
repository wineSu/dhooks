import React from 'react';
import { useVirtualList } from '../dhooks';

let vnode = Array.from(Array(99999).keys());

export const useVirtualListDemo = () => {
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(vnode, {
    overscan: 5,
    itemHeight: 60, // 需要加上padding | margin
  });

  return (
    <>
      <button onClick = {
        () => { scrollTo(1115) }
      }>跳转到 1115</button>
      <div {...containerProps} style={{ height: '200px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
