import { useEffect, useRef, useState } from 'react';
import { usePersistFn } from './usePersistFn';

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3,
}

/**
 * useWebSocket
 * @param {*} socketUrl 
 * @param {*} options 
 */
export function useWebSocket(socketUrl, options = {}) {
    const {
        reconnectLimit = 3,
        reconnectInterval = 3 * 1000,
        onOpen,
        onClose,
        onMessage,
        onError,
    } = options;

    const reconnectTimesRef = useRef(0);
    const reconnectTimerRef = useRef();
    const websocketRef = useRef();

    const [latestMessage, setLatestMessage] = useState();
    const [readyState, setReadyState] = useState(ReadyState.Closed);

    /**
     * 重连
     */
    const reconnect = usePersistFn(() => {
        let times = reconnectTimesRef.current,
            timer = reconnectTimerRef.current,
            socket = websocketRef.current;

        if (times < reconnectLimit && socket.readyState !== ReadyState.Open) {
            timer && clearTimeout(timer);
            reconnectTimerRef.current = setTimeout(() => {
                connectWs();
                reconnectTimesRef.current++;
            }, reconnectInterval);
        }
    });

    const connectWs = usePersistFn(() => {
        let timer = reconnectTimerRef.current,
            socket = websocketRef.current;

        timer && clearTimeout(timer);
        socket && socket.close();
        try {
            socket = websocketRef.current = new WebSocket(socketUrl);
            socket.onerror = (event) => {
                reconnect();
                onError && onError(event);
                setReadyState(socket.readyState || ReadyState.Closed);
            };
            socket.onopen = (event) => {
                onOpen && onOpen(event);
                reconnectTimesRef.current = 0;
                setReadyState(socket.readyState || ReadyState.Closed);
            };
            socket.onmessage = (message) => {
                onMessage && onMessage(message);
                setLatestMessage(message);
            };
            socket.onclose = (event) => {
                reconnect();
                onClose && onClose(event);
                setReadyState(socket.readyState || ReadyState.Closed);
            };
        } catch (error) {
            throw error;
        }
    });

    /**
     * 发送消息
     * @param message
     */
    const sendMessage = usePersistFn((message) => {
        if (readyState === ReadyState.Open) {
            websocketRef.current.send(message);
        } else {
            throw new Error('WebSocket disconnected');
        }
    });
    
    const connect = usePersistFn(() => {
        reconnectTimesRef.current = 0;
        connectWs();
    });

    const disconnect = usePersistFn(() => {
        reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

        reconnectTimesRef.current = reconnectLimit;
        websocketRef.current.close();
    });

    useEffect(() => {
        connect();
        return disconnect;
    }, [socketUrl]);

    return {
        latestMessage,
        sendMessage,
        connect,
        disconnect,
        readyState,
        webSocketIns: websocketRef.current,
    };
}
