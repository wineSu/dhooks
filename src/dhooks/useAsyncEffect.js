import { useEffect } from '@framework/FOXRax.js';

const isFunction = (value) => typeof value === 'function';

// Generator: function* () {}
const isAsyncGenerator = (val) => isFunction(val[Symbol.asyncIterator]);

/**
 * useEffect 封装异步函数
 * @param {function} effect 
 * @param {array} deps 
 * use:
 *  useAsyncEffect(async () => {
        const newData = await effect;
        setData(newData);
    }, []);
 */
function useAsyncEffect(effect, deps) {
    useEffect(() => {
        const e = effect();
        let cancelled = false;
        async function execute() {
            if (isAsyncGenerator(e)) {
                while (true) {
                    const result = await e.next();
                    if (result.done || cancelled) {
                        break;
                    }
                }
            } else {
                await e;
            }
        }
        execute();
        return () => {
            cancelled = true;
        };
    }, deps);
}

export default useAsyncEffect;
