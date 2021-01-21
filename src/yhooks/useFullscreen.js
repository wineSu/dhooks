
import { useRef } from 'react';
import { getTargetElement, useEventListener } from './useEventListener';

const launchFullScreen = (element) => {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    }else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
const exitFullScreen = () => {
    if(document.exitFullscreen){
        document.exitFullscreen();
    }
    else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }
    else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
    else if(document.webkitCancelFullScreen){
        document.webkitCancelFullScreen();
    }
}

const isFullScreen = () => {
    if(document.mozFullScreen){
        return true;
    }else if(document.webkitIsFullScreen){
        return true;
    }else if(document.msFullscreenElement){
        return true;
    }else{
        return false;
    }
}

export function useFullscreen(target, options = {
    onFullRef: () => {},
    onExitFullRef: () => {},
}) {

    const optionsRef = useRef(options);
    optionsRef.current = options;

    const onChange = () => {
        if (isFullScreen()) {
            optionsRef.current.onFullRef();
        } else {
            optionsRef.current.onExitFullRef();
        }
    };

    const setFull = () => {
        let ele = getTargetElement(target);
        launchFullScreen(ele);
    };

    const exitFull = () => {
        exitFullScreen();
    };

    const toggleFull = () => {
        isFullScreen() ? exitFull() : setFull();
    };
    
    useEventListener('fullscreenchange', onChange, {
        target
    });

    return [
        isFullScreen(),
        {
            setFull,
            exitFull,
            toggleFull,
        },
    ];
};
