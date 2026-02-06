
// ...existing code...

import bitcoinLogo from '/icons/currencies/bitcoinLogo.svg?url';
import etheriumLogo from '/icons/currencies/etheriumLogo.svg?url';
import metalLogo from '/icons/currencies/metalLogo.svg?url';
import metronomeLogo from '/icons/currencies/metronomeLogo.svg?url';
import nanoLogo from '/icons/currencies/nanoLogo.svg?url';
import oxygenLogo from '/icons/currencies/oxygenLogo.svg?url';
import platoncoinLogo from '/icons/currencies/platoncoinLogo.svg?url';
import tetherLogo from '/icons/currencies/tetherLogo.svg?url';

export type CryptoCurrencyEntity = {
  icon: string; 
  name: string;
  contraction?: string;
  balance?: number;
};

export const CURRENCY_CODE_MAPPING = {
  'BTC_TEST': 'Bitcoin',
  'KES': 'Bitcoin',
  'ETH_TEST': 'Etherium',
  'ETH_TEST5': 'Etherium',
  'ETH': 'Etherium',
  'MTL_TEST': 'Metal',
  'MTL': 'Metal',
  'MET_TEST': 'Metronome',
  'MET': 'Metronome',
  'NANO_TEST': 'Nano',
  'NANO': 'Nano',
  'OXY_TEST': 'Oxygen',
  'OXY': 'Oxygen',
  'PLTC_TEST': 'PlatonCoin',
  'PLTC': 'PlatonCoin',
  'USDT_TEST': 'Tether',
  'USDT': 'Tether',
};

export const CURRENCIES: { [key: string]: CryptoCurrencyEntity } = {
  Bitcoin: {
    icon: bitcoinLogo,
    name: 'Bitcoin',
    contraction: 'BTC',
  },
  Etherium: {
    icon: etheriumLogo,
    name: 'Etherium',
    contraction: 'ETH',
  },
  Metal: {
    icon: metalLogo,
    name: 'Metal',
    contraction: 'MTL',
  },
  Metronome: {
    icon: metronomeLogo,
    name: 'Metronome',
    contraction: 'MET',
  },
  Nano: {
    icon: nanoLogo,
    name: 'Nano',
    contraction: 'NANO',
  },
  Oxygen: {
    icon: oxygenLogo,
    name: 'Oxygen',
    contraction: 'OXY',
  },
  PlatonCoin: {
    icon: platoncoinLogo,
    name: 'PlatonCoin',
    contraction: 'PLTC',
  },
  Tether: {
    icon: tetherLogo,
    name: 'Tether',
    contraction: 'USDT',
  },
};

export const initialBalances = Object.fromEntries(
  Object.entries(CURRENCIES).map(([currencyKey, currencyData]) => [
    currencyKey,
    { ...currencyData, balance: currencyKey === 'Tether' ? 3450.35 : 0.000000 },
  ])
);

export const currencySymbols: { [key: string]: string } = {
    USDT: '₮',
    BTC_TEST: '₿',
    BTC: '₿',
    ETH_TEST5: '♦',
    ETH: '♦',
  };