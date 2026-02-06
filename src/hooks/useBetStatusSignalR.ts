import { useState, useCallback, useEffect, useRef } from 'react';
import { sportsBookSignalR } from '../services/signalrService';

export type BetStatus = 'pending' | 'success' | 'failed' | 'rejected' | null;

export interface SignalRBetResponse {
  clientId: string;
  userId: string;
  betId: string;
  betStatus: string;
  message?: string;
  shortBetId: string;
  code?: string;
  tId: number;
}

export const useBetStatusSignalR = () => {
  const [betStatus, setBetStatus] = useState<BetStatus>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [currentBetId, setCurrentBetId] = useState<string | null>(null);
  const signalRTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBetStatusUpdate = useCallback((data: SignalRBetResponse) => {
    if (!currentBetId || data.betId !== currentBetId) return;
    

    
    if (signalRTimeoutRef.current) {
      clearTimeout(signalRTimeoutRef.current);
      signalRTimeoutRef.current = null;
    }
    
    const status = data.betStatus.toLowerCase();
    setStatusMessage(data.message || null);
    
    if (status === 'accepted' || status === 'running' || status === 'settled') {
      setBetStatus('success');
    } else if (status === 'rejected' || status === 'failed' || status === 'cancelled') {
      setBetStatus('failed');
    } else {
      setBetStatus('pending');
    }
  }, [currentBetId]);

  useEffect(() => {
    if (currentBetId) {
      sportsBookSignalR.on('receiveBetStatusFeed', handleBetStatusUpdate);
      return () => {
        sportsBookSignalR.off('receiveBetStatusFeed', handleBetStatusUpdate);
      };
    }
    return undefined;
  }, [currentBetId, handleBetStatusUpdate]);

  const startMonitoring = useCallback((betId: string, timeoutMs: number = 8000) => {
    setCurrentBetId(betId);
    setBetStatus('pending');
    
    // Set timeout for SignalR response
    signalRTimeoutRef.current = setTimeout(() => {

      setBetStatus('success');
      setStatusMessage('Bet placed successfully');
    }, timeoutMs);
  }, []);

  const stopMonitoring = useCallback(() => {
    setCurrentBetId(null);
    setBetStatus(null);
    setStatusMessage(null);
    
    if (signalRTimeoutRef.current) {
      clearTimeout(signalRTimeoutRef.current);
      signalRTimeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setBetStatus(null);
    setStatusMessage(null);
    setCurrentBetId(null);
    
    if (signalRTimeoutRef.current) {
      clearTimeout(signalRTimeoutRef.current);
      signalRTimeoutRef.current = null;
    }
  }, []);

  return {
    betStatus,
    statusMessage,
    currentBetId,
    startMonitoring,
    stopMonitoring,
    reset,
    setBetStatus,
    setStatusMessage
  };
};