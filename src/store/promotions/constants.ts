export const PROMOTION_TYPE = {
  SPORT: 'sport',
  CASINO: 'casino',
} as const;

export const CARD_TYPE = {
  BET_BUILDER: 'betBuilder',
  BOOST_LEVEL: 'boostLevel',
  CASINO_BONUS: 'casinoBonus',
  DAILY_RACES: 'dailyRaces',
  REFER_CARD_1: 'referCard1',
  REFER_CARD_2: 'referCard2',
  WELCOME_BONUS: 'welcomeBonus',
} as const;

export const PROMOTION_TYPE_EXTENDED = {
  ALL: 'all',
  ...PROMOTION_TYPE,
} as const;
