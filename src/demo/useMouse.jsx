import React, {useRef} from 'react';
import { useMouse } from '../dhooks';

export const useMouseDemo = () => {

    const ref = useRef();
    const mouse = useMouse(ref);

    return <div style = {{height: 200, background: 'lightslategray', color: 'white'}} ref = { ref }>Mouse Pos: {JSON.stringify(mouse)}</div>;
};
