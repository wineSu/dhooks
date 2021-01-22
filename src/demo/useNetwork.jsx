import React from 'react';
import { useNetwork } from '../yhooks';

export const useNetworkDemo = () => {
    const networkState = useNetwork();

    return (
        <div>
            <p>网络：{JSON.stringify(networkState)}</p>
        </div>
    );
};
