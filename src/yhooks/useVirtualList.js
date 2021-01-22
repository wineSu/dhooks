import { useEffect, useState, useMemo, useRef } from 'react';

/**
 * 虚拟列表
 * @param {*} list 
 * @param {*} options 
 */
export let useVirtualList = (list, options) => {
    const { itemHeight = 50, overscan = 5 } = options;
    const [state, setState] = useState({ start: 0, end: overscan });
    const containerRef = useRef();
    
    // 外容器中能展示的列表数
    const getViewCapacity = (containerHeight) => {
        if (typeof itemHeight === 'number') {
            return Math.ceil(containerHeight / itemHeight);
        }
        // 动态高度的计算
        const { start = 0 } = state;
        let sum = 0, capacity = 0, len = list.length;
        for (let i = start; i < len; i++) {
            const height = itemHeight(i);
            sum += height;
            if (sum >= containerHeight) {
                capacity = i;
                break;
            }
        }
        return capacity - start;
    };

    // 滚动后 计算出现在顶部的元素坐标
    const getOffset = (scrollTop) => {
        if (typeof itemHeight === 'number') {
            return Math.floor(scrollTop / itemHeight) + 1;
        }
        let sum = 0, offset = 0, len = list.length;
        for (let i = 0; i < len; i++) {
            const height = itemHeight(i);
            sum += height;
            if (sum >= scrollTop) {
                offset = i;
                break;
            }
        }
        return offset + 1;
    };

    // index 设置
    const calculateRange = () => {
        const element = containerRef.current;
        if (element) {
            const offset = getOffset(element.scrollTop);
            const viewCapacity = getViewCapacity(element.clientHeight);
            
            const from = offset - overscan;
            const to = offset + viewCapacity + overscan;

            setState({
                start: Math.max(from, 0),
                end: Math.min(to, list.length)
            });
        }
    };

    // 外部可控制滚动位置
    const scrollTo = (index) => {
        if (containerRef.current) {
            containerRef.current.scrollTop = getDistanceTop(index);
            calculateRange();
        }
    };

    // 内容器总高度计算
    const totalHeight = useMemo(() => {
        if (typeof itemHeight === 'number') {
            return list.length * itemHeight;
        }
        return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
    }, [list.length]);

    // 高度计算 支持 函数传入指定不同高度
    const getDistanceTop = (index) => {
        if (typeof itemHeight === 'number') {
            const height = index * itemHeight;
            return height;
        }
        // 函数传入高度 ((index) => number)
        const height = list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
        return height;
    };

    const offsetTop = useMemo(() => getDistanceTop(state.start), [state.start]);

    useEffect(calculateRange, []);

    return {
        list: list.slice(state.start, state.end).map((ele, index) => ({
            data: ele,
            index: index + state.start,
        })),
        scrollTo,
        containerProps: {
            ref: (ele) => {
                containerRef.current = ele;
            },
            onScroll: (e) => {
                e.preventDefault();
                calculateRange();
            },
            style: { overflowY: 'auto' },
        },
        wrapperProps: {
            style: {
                width: '100%',
                height: totalHeight - offsetTop,
                paddingTop: offsetTop,
            },
        },
    };
};
