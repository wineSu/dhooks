import { useState } from 'react';
import { useEventListener } from './useEventListener';
import { usePersistFn } from './usePersistFn';

function getConnection() {
  const nav = navigator;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty() {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  };
}

/**
 * 网络状态监控
 */
export function useNetwork() {
  const [state, setState] = useState(() => {
    return {
      since: undefined,
      online: navigator.onLine,
      ...getConnectionProperty(),
    };
  });

  
  const onOnline = () => {
    setState((prevState) => ({
      ...prevState,
      online: true,
      since: new Date(),
    }));
  };

  const onOffline = () => {
    setState((prevState) => ({
      ...prevState,
      online: false,
      since: new Date(),
    }));
  };

  const onConnectionChange = () => {
    setState((prevState) => ({
      ...prevState,
      ...getConnectionProperty(),
    }));
  };

  useEventListener('online', onOnline);
  useEventListener('offline', onOffline);

  const connection = usePersistFn(getConnection)();
  useEventListener('change', onConnectionChange, {
    target: connection
  });

  return state;
}