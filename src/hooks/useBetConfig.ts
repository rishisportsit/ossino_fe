import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { selectWalletState } from 'store/wallet/selectors';
import { BetConfigApi } from 'api/betConfig/betConfig.api';
import type { ProcessedBetConfig } from 'api/betConfig/betConfig.types';
import { STORAGE_KEYS } from 'constants/storage';

interface UseBetConfigOptions {
  forceRefresh?: boolean;
}

interface BetConfigCache {
  data: ProcessedBetConfig;
  currency: string;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY = STORAGE_KEYS.betconfig;

export const useBetConfig = (options: UseBetConfigOptions = {}) => {
  const location = useLocation();
  const [betConfig, setBetConfig] = useState<ProcessedBetConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedCurrency } = useAppSelector(selectWalletState);
  const currentCurrency = selectedCurrency?.currencyCode || 'USDT';
  const isSportsRoute = location.pathname.includes('/sports');

  const processConfigs = (configs: any[], bonusStatus: string) => {
    if (bonusStatus !== 'ACTIVE') {
      return [];
    }

    const activeConfigs = configs
      .filter(config => config.eventCount && config.bonusPercentage)
      .sort((a, b) => a.eventCount - b.eventCount);

    const processedConfigs: Array<{ eventCount: number; bonusPercentage: number }> = [];
    let currentBonusPercentage = 0;
    let configIndex = 0;

    for (let eventCount = 2; eventCount <= 45; eventCount++) {
      if (configIndex < activeConfigs.length && activeConfigs[configIndex].eventCount === eventCount) {
        currentBonusPercentage = activeConfigs[configIndex].bonusPercentage;
        configIndex++;
      }
      
      if (currentBonusPercentage > 0) {
        processedConfigs.push({
          eventCount,
          bonusPercentage: currentBonusPercentage,
        });
      }
    }

    return processedConfigs;
  };

  // const loadFromCache = (): ProcessedBetConfig | null => {
  //   try {
  //     const cached = localStorage.getItem(STORAGE_KEY);
  //     if (!cached) return null;

  //     const parsedCache: BetConfigCache = JSON.parse(cached);
  //     const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;
  //     const isSameCurrency = parsedCache.currency === currentCurrency;

  //     if (!isExpired && isSameCurrency) {
  //       return parsedCache.data;
  //     }

  //     // Remove expired or different currency cache
  //     localStorage.removeItem(STORAGE_KEY);
  //     return null;
  //   } catch {
  //     localStorage.removeItem(STORAGE_KEY);
  //     return null;
  //   }
  // };

  const saveToCache = (data: ProcessedBetConfig) => {
    try {
      const cache: BetConfigCache = {
        data,
        currency: currentCurrency,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
      // Silent fail
    }
  };

  const fetchBetConfig = async () => {
    const xApiKey = import.meta.env.VITE_X_Api_Key;
    const xClientId = import.meta.env.VITE_X_Client_Id;
    
    // ...existing code...
    
    if (!xApiKey || !xClientId) {
      setError('Missing API credentials');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await BetConfigApi.getBetConfig({
        'X-Client-Id': xClientId,
        'X-Currency-Code': currentCurrency,
      });

      const { defaultSportConfig } = response.data.result;
      const { parlayconfig } = response.data;
      // ...existing code...
      if (!parlayconfig?.result?.data) {
        throw new Error('Invalid parlay config data');
      }

      const parlayData = parlayconfig.result.data;
      const processedConfigs = processConfigs(parlayData.configs, parlayData.bonusStatus);
      
      const processedData: ProcessedBetConfig = {
        minStake: defaultSportConfig.minStake,
        maxStake: defaultSportConfig.maxStake,
        maxPayout: defaultSportConfig.maxPayout,
        currency_data: response.data.currency_data,
        oddsThreshold: parlayData.oddsThreshold,
        configs: processedConfigs,
        satkeTaxPercentage: parlayData.stakeTaxPercentage,
        winningsTaxPercentage: parlayData.winningsTaxPercentage,
      };

      setBetConfig(processedData);
      saveToCache(processedData);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch bet config';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  // Load from cache or fetch if needed
  useEffect(() => {

    if (!isSportsRoute) {
      return;
    }

    fetchBetConfig();
  }, [isSportsRoute, currentCurrency, options.forceRefresh]);

  return {
    betConfig,
    loading,
    error,
    currentCurrency,
    isSportsRoute,
    refetch: fetchBetConfig,
    getStakeLimits: () => ({
      minStake: betConfig?.minStake || 1,
      maxStake: betConfig?.maxStake || 500000000,
      maxPayout: betConfig?.maxPayout || 500000000,
    }),
    getOddsThreshold: () => betConfig?.oddsThreshold || 1.2,
    getWhattaxPercentages: () => ({
      stakeTaxPercentage: betConfig?.satkeTaxPercentage || 0,
      winningsTaxPercentage: betConfig?.winningsTaxPercentage || 0,
    }),
    getBonusPercentage: (eventCount: number, odds?: number[]) => {
      const config = betConfig?.configs.find(c => c.eventCount === eventCount);
      if (!config) return 0;
      if (odds && odds.length > 0) {
        const oddsThreshold = betConfig?.oddsThreshold || 1.2;
        const validOdds = odds.filter(odd => odd >= oddsThreshold);
        if (validOdds.length === 0) return 0;
        const thresholdMet = validOdds.length >= Math.min(2, eventCount);
        return thresholdMet ? config.bonusPercentage : 0;
      }
      return config.bonusPercentage || 0;
    },
  };
};