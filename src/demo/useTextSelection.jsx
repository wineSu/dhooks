import React from 'react';
import { useTextSelection } from '../dhooks';

export const useTextSelectionDemo = () => {
  const { text } = useTextSelection();
  return (
    <div>
      <p>You can select text all page.</p>
      <p>Result：{text}</p>
    </div>
  );
};
