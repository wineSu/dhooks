import { useEffect, useState } from 'react';

/**
 * 请求并发量控制，具体请求可由业务实现
 * @param {普通的请求方法} fetch 
 * @param {并发量} limit 
 */
export function useFetch(request, urls, limit) {

    const [res, SetRes] = useState([]);

    useEffect(() => {

        let index = limit,
            result = [];
        
        const next = (i) => {
            index += 1;
            if (index <= urls.length) {
                return request(urls[index], index).then(res => {
                    result.push(res)
                    next(index)
                });
            } else {
                SetRes(result)
            }
        }

        for (let i = 0; i < limit; i++) {
            request(urls[i], i+1).then(res => {
                result.push(res)
                next(i)
            }); 
        }
    }, []);
    return [res]
}
