
import React, { useState } from 'react';
import { useTrackedEffect } from '../yhooks';

export const useTrackedEffectDemo = () => {
    const [dep1, setDep1] = useState(0);
    const [dep2, setDep2] = useState(0);
    const [dep3, setDep3] = useState(0);
    const [text, setText] = useState();

    useTrackedEffect(
        (index, previousDeps) => {
            setText(index)
        },
        [dep1, dep2, dep3],
    );
    return (
        <div>
            <p onClick={() => {
                setDep1(v => ++v)
            }}>
                Dependency0 值：{dep1}
            </p>
            <p onClick={() => {
                setDep2(v => ++v)
            }}>
                Dependency1 值：{dep2}
            </p>
            <p onClick={() => {
                setDep3(v => ++v)
            }}>
                Dependency2 值：{dep3}
            </p>
            <p>变化的依赖项：{text}</p>
        </div>
    );
};
