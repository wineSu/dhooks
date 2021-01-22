import { useRef } from 'react';

/**
 * 避免实例被重复创建，没有使用 useEffect 为了避免再次渲染
 * @param {*} factory 
 * @param {*} deps 
 */
export function useCreation(factory, deps) {

    const { current } = useRef({
        deps,
        initialized: false,
    });
    if (!current.initialized) {
        current.obj = factory();
        current.initialized = true;
    }
    return current.obj;
}
