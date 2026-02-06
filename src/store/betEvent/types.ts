export type BetEventType = 'soccer' | 'politics';

export type BetEvent = {
  type: BetEventType | null;
};

type BetBaseData = {
  id: number;
  label: string;
  type: string;
};

export type BetSelectData = BetBaseData & {
  value: number[];
};

export type BetData = BetBaseData & {
  value: number;
};

export type SoccerBetData = {
  id: number;
  name: string;
  type: string;
};
