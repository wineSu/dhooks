
import React, { useEffect } from 'react';
import { useDocumentVisibility } from '../yhooks';

export const useDocumentVisibilityDemo = () => {
  const documentVisibility = useDocumentVisibility();

  useEffect(() => {
    if (documentVisibility === 'visible') {
      console.log(`进入: ${documentVisibility}`);
    } else {
      console.log(`离开: ${documentVisibility}`);
    }
  }, [documentVisibility]);

  return <div>控制台查看页面状态: {documentVisibility}</div>;
};