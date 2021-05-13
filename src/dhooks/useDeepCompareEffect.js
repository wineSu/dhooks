import { useRef, useEffect } from "react";
import { fromJS, is } from 'immutable';

/**
 * 目前仅暂时支持单个依赖项
 * @param {*} fn 
 * @param {*} deps 
 * @returns 
 */
export function useDeepCompareEffect(fn, deps = {}) {
  
  let renderRef = useRef(0);
  let depsRef = useRef(deps);
  
  if (!is(fromJS(deps), fromJS(depsRef.current))) {
    renderRef.current++;
  }
  depsRef.current = deps;

  return useEffect(fn, [renderRef.current]);
}
