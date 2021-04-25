import {
    useRef,
    useEffect,
} from 'react';
import echarts from 'echarts/lib/echarts';

/**
 * echarts使用
 * @param {*} id 
 * @param {*} option 
 */
export function useCharts(id, option) {

    const { current } = useRef({});

    useEffect(() => {
        let mapInit = echarts.init(document.getElementById(id));
        mapInit.setOption(option);
        current.render = mapInit;
    }, []);

    return current;
}
