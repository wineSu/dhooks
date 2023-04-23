import { useEffect, useRef } from 'react';

/**
 * 组件属性更新比较提示
 * @param {*} componentName 
 * @param {*} props 
 */
export const useWhyDidYouUpdate = (componentName, props) => {
    const prevProps = useRef({});

    useEffect(() => {
        if (prevProps.current) {
            const allKeys = Object.keys({ ...prevProps.current, ...props });
            const changedProps = {};

            allKeys.forEach((key) => {
                if (!Object.is(prevProps.current[key], props[key])) {
                    changedProps[key] = {
                        from: prevProps.current[key],
                        to: props[key],
                    };
                }
            });

            if (Object.keys(changedProps).length) {
                console.log('[why-did-you-update]', componentName, changedProps);
            }
        }

        prevProps.current = props;
    });
}
