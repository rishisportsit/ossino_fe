import { useEffect, useCallback, useRef, useState } from 'react';
import { sportsBookSignalR } from '../services/signalrService';

export interface UseSignalRResult {
  isConnected: boolean;
  connectionState: string;
  subscribe: (methodName: string, callback: (data: any) => void) => void;
  unsubscribe: (methodName: string, callback?: (data: any) => void) => void;
  invoke: (methodName: string, ...args: any[]) => Promise<any>;
  send: (methodName: string, ...args: any[]) => Promise<void>;
}


export function useSignalRConnection(): UseSignalRResult {
  const signalR = sportsBookSignalR;
  const [isConnected, setIsConnected] = useState(signalR.isConnected);
  const [connectionState, setConnectionState] = useState(signalR.connectionState);

  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
      setConnectionState(signalR.connectionState);
    };

    signalR.onConnectionStateChanged(handleConnectionChange);

    setIsConnected(signalR.isConnected);
    setConnectionState(signalR.connectionState);

    return () => {
      signalR.offConnectionStateChanged(handleConnectionChange);
    };
  }, [signalR]);

  const subscribe = useCallback((methodName: string, callback: (data: any) => void) => {
    signalR.on(methodName, callback);
  }, [signalR]);

  const unsubscribe = useCallback((methodName: string, callback?: (data: any) => void) => {
    signalR.off(methodName, callback);
  }, [signalR]);

  const invoke = useCallback((methodName: string, ...args: any[]) => {
    return signalR.invoke(methodName, ...args);
  }, [signalR]);

  const send = useCallback((methodName: string, ...args: any[]) => {
    return signalR.send(methodName, ...args);
  }, [signalR]);

  return {
    isConnected,
    connectionState,
    subscribe,
    unsubscribe,
    invoke,
    send,
  };
}


export function useSignalRMethod(
  methodName: string, 
  callback: (data: any) => void,
  dependencies: React.DependencyList = []
) {
  const signalR = sportsBookSignalR;
  const callbackRef = useRef(callback);

  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (data: any) => {
      callbackRef.current(data);
    };

    signalR.on(methodName, handler);

    return () => {
      signalR.off(methodName, handler);
    };
  }, [methodName, signalR, ...dependencies]);
}


export function useSignalRStatus() {
  const { isConnected, connectionState } = useSignalRConnection();

  return {
    isConnected,
    connectionState,
  };
}


export function useSignalRInvoke() {
  const signalR = sportsBookSignalR;
  const [isConnected, setIsConnected] = useState(signalR.isConnected);

  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
    };

    signalR.onConnectionStateChanged(handleConnectionChange);
    setIsConnected(signalR.isConnected);

    return () => {
      signalR.offConnectionStateChanged(handleConnectionChange);
    };
  }, [signalR]);

  const safeInvoke = useCallback(async (methodName: string, ...args: any[]) => {
    if (!isConnected) {
    }

    try {
      return await signalR.invoke(methodName, ...args);
    } catch (error) {
      throw error;
    }
  }, [signalR, isConnected]);

  const safeSend = useCallback(async (methodName: string, ...args: any[]) => {
    if (!isConnected) {
      return;
    }

    try {
      await signalR.send(methodName, ...args);
    } catch (error) {
    }
  }, [signalR, isConnected]);

  return {
    invoke: safeInvoke,
    send: safeSend,
    isConnected,
  };
}


export function useSignalRGroups() {
  const signalR = sportsBookSignalR;
  const [isConnected, setIsConnected] = useState(signalR.isConnected);

  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
    };

    signalR.onConnectionStateChanged(handleConnectionChange);
    setIsConnected(signalR.isConnected);

    return () => {
      signalR.offConnectionStateChanged(handleConnectionChange);
    };
  }, [signalR]);

  const joinGroups = useCallback(async (groupNames: string[]) => {
    if (!isConnected) {
      return;
    }
    
    try {
      await signalR.joinGroups(groupNames);
    } catch (error) {
    }
  }, [signalR, isConnected]);

  const leaveGroups = useCallback(async (groupNames: string[], shouldRemove: boolean = true) => {
    if (!isConnected) {
      return;
    }
    
    try {
      await signalR.leaveGroups(groupNames, shouldRemove);
    } catch (error) {
    }
  }, [signalR, isConnected]);

  const joinGroup = useCallback(async (groupName: string) => {
    return joinGroups([groupName]);
  }, [joinGroups]);

  const leaveGroup = useCallback(async (groupName: string, shouldRemove: boolean = true) => {
    return leaveGroups([groupName], shouldRemove);
  }, [leaveGroups]);

  return {
    joinGroups,
    leaveGroups,
    joinGroup,
    leaveGroup,
    isConnected,
  };
}