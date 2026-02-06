export type ParlayBetData = {
  id: number;
  type: string;
  name: string;
  image: string;
  rate: string;
};

export type ParlayData = {
  id: number;
  total: number;
  pays: number;
  bets: ParlayBetData[];
};
