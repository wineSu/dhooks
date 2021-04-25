import {
  useRef,
  useEffect,
} from 'react';
import * as echarts from "echarts";

/**
* echarts使用
* @param {*} id 
* @param {*} option 
*/
export function useCharts(id, option = {}) {

  const { current } = useRef({});

  useEffect(() => {
      let mapInit = echarts.init(document.getElementById(id));
      mapInit.setOption(option);
      current.render = mapInit;
      return () => {
        mapInit.dispose();
      }
  }, []);

  return current;
}
