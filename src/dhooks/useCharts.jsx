import { useRef, useEffect } from "react";
import * as echarts from "echarts";
//import { useDeepCompareEffect } from './compare';

/**
 * echarts使用
 * @param {*} id
 * @param {*} option
 * @param {*} dep
 */
export function useCharts(id, option = {}, dep) {
  const { current } = useRef({});
  const onResize = map => {
    map.resize();
  };

  // useDeepCompareEffect(() => {
  //   current.render && current.render.setOption(option)
  // }, dep)

  useEffect(() => {
    let mapInit = echarts.init(document.getElementById(id));
    mapInit.setOption(option);
    current.render = mapInit;

    window.addEventListener("resize", () => onResize(mapInit));

    return () => {
      mapInit.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return current;
}
