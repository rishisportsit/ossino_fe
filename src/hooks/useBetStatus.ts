import { useState, useEffect, useCallback, useRef } from 'react';
import { getBetHistory, validateBetFromHistory } from '../api/betting/betHistory';
import { getChannel } from '../api/betting/placeBet';
import { sportsBookSignalR } from '../services/signalrService';
import { useAppDispatch } from 'store/index';
import { getBetHistoryInSportsBook } from 'store/SportsHomePage/slice';

export interface BetStatusResult {
  status: 'pending' | 'success' | 'rejected' | 'cancelled' | 'error';
  message: string;
  shortBetId?: string;
  details?: any;
}

export const useBetStatus = (ticketId: string | null, accessToken: string) => {
  const [result, setResult] = useState<BetStatusResult>({
    status: 'pending',
    message: 'Processing your bet...'
  });
   const dispatch = useAppDispatch();
   const xClientId = import.meta.env.VITE_X_Client_Id;
  const signalRReceivedRef = useRef(false);
  const checkBetHistory = useCallback(async () => {
    if (!ticketId || !accessToken) return;
    try {
      const historyResponse = await getBetHistory({
        accessToken,
        channel: getChannel(),
        limit: 1,
        offset: 0,
        settled: false
      });
      dispatch(
        getBetHistoryInSportsBook({
          'X-Client-Id':xClientId,
          accessToken,
          channel: getChannel(),
          settled: false,
        })
      );
      const validation = validateBetFromHistory(historyResponse, ticketId);
      if (validation.found) {
        const bet = validation.bet;
        let status: BetStatusResult['status'] = 'pending';
        let message = 'Processing your bet...';
        switch (validation.status) {
          case 'ACCEPTED':
            status = 'success';
            message = 'Bet placed successfully!';
            break;
          case 'REJECTED':
            status = 'rejected';
            message = 'Bet was rejected';
            break;
          case 'CANCELLED':
            status = 'cancelled';
            message = 'Bet was cancelled';
            break;
          default:
            status = 'pending';
            message = 'Processing your bet...';
        }
        setResult({
          status,
          message,
          shortBetId: validation.shortBetId || undefined,
          details: bet
        });
      } else {
        setResult({
          status: 'error',
          message: 'Could not find bet details. Please check your bet history.'
        });
      }
    } catch (error) {
      console.error('Bet history check failed:', error);
      setResult({
        status: 'error',
        message: 'Failed to check bet status. Please try again.'
      });
    }
  }, [ticketId, accessToken]);

  const handleSignalRMessage = useCallback((message: any) => {
    if (!ticketId) {
      return;
    }
    const betData = message;
    if (betData.betId === ticketId) {
      signalRReceivedRef.current = true;
      let status: BetStatusResult['status'] = 'pending';
      let resultMessage = 'Processing your bet...';
      switch (betData.betStatus) {
        case 'Running':
          status = 'success';
          resultMessage = 'Bet placed successfully!';
          break;
        case 'Rejected':
          status = 'rejected';
          resultMessage = betData.message || 'Bet was rejected';
          break;
        case 'Cancelled':
          status = 'cancelled';
          resultMessage = betData.message || 'Bet was cancelled';
          break;
        default:
          console.warn('Unknown bet status:', betData.betStatus);
          status = 'pending';
          resultMessage = 'Processing your bet...';
      }

      setResult({
        status,
        message: resultMessage,
        shortBetId: betData.shortBetId,
        details: betData
      });

      checkBetHistory();
    }
  }, [ticketId, checkBetHistory]);

  useEffect(() => {
    if (!ticketId) {
      setResult({
        status: 'pending',
        message: 'Processing your bet...'
      });
      return;
    }

    signalRReceivedRef.current = false;
    const handleBetUpdate = (message: any) => {
      handleSignalRMessage(message);
      
    };
    sportsBookSignalR.on('receiveBetStatusFeed', handleBetUpdate);
    const fallbackTimer = setTimeout(() => {
      if (!signalRReceivedRef.current) {
        checkBetHistory();
      } 
    }, 8000);
    return () => {
      sportsBookSignalR.off('receiveBetStatusFeed', handleBetUpdate);
      clearTimeout(fallbackTimer);
    };
  }, [ticketId, handleSignalRMessage, checkBetHistory]);

  return {
    status: result.status,
    message: result.message,
    shortBetId: result.shortBetId,
    details: result.details,
    isLoading: result.status === 'pending'
  };
};