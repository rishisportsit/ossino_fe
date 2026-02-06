export type TradeHolding = {
  type: 'holding';
};

export type TradeExplore = {
  type: 'explore';
};

export type Trade = TradeHolding | TradeExplore;
