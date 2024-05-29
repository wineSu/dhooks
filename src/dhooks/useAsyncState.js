import { useState } from '@framework/FOXRax.js';
import useAsyncEffect from 'useAsyncEffect';

/**
 * useState 获取状态异步变同步
 * @param {function} effect
 * @param {any} defaultData
 * use:
 *  const title = useAsyncState(async() => {return await xxx}), '');
 */
function useAsyncState(effect, defaultData) {
    const [data, setData] = useState(defaultData);

    useAsyncEffect(async () => {
        const newData = await effect;
        setData(newData);
    }, []);

    return data;
}

export default useAsyncState;
