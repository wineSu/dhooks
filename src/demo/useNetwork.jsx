import React from 'react';
import { useNetwork } from '../dhooks';

export const useNetworkDemo = () => {
    const networkState = useNetwork();

    return (
        <div>
            <p>网络：{JSON.stringify(networkState)}</p>
        </div>
    );
};
