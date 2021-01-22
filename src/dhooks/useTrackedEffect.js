import { useEffect, useRef } from 'react';

/**
 * 查看依赖项的变化
 * @param {*} effect 
 * @param {*} deps 
 */
export const useTrackedEffect = (effect, deps) => {
    const previousDepsRef = useRef();

    const diffTwoDeps = (deps1, deps2) => {
        return deps1
            ? deps1.map((_ele, i) => (deps1[i] !== deps2[i] ? i : -1)).filter((ele) => ele >= 0)
            : deps2
                ? deps2.map((_ele, i) => i)
                : [];
    };

    useEffect(() => {
        let index = diffTwoDeps(previousDepsRef.current, deps);
        const previousDeps = previousDepsRef.current;
        previousDepsRef.current = deps;
        return effect(index, previousDeps, deps);
    }, deps);
};