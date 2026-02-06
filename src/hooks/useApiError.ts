import { useState, useCallback, useRef, useEffect } from 'react';

export const useApiError = (timeoutMs: number = 30000) => {
  const [apiError, setApiErrorState] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearApiError = useCallback(() => {
    setApiErrorState(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setApiError = useCallback((error: string | null) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setApiErrorState(error);
    if (error && timeoutMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setApiErrorState(null);
        timeoutRef.current = null;
      }, timeoutMs);
    }
  }, [timeoutMs]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    apiError,
    setApiError,
    clearApiError
  };
};