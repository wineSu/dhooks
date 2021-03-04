import {
    useRef,
    useEffect,
} from 'react';
let echarts = require('echarts');

/**
 * echarts使用
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} dep 
 */
export function useCharts(id, option) {

    const { current } = useRef({});

    useEffect(() => {
        let mapInit = echarts.init(document.getElementById(id));
        mapInit.setOption(option);
        current.render = mapInit.setOption;
    }, []);

    return current;
}