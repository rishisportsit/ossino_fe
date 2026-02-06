import { CARD_TYPE, PROMOTION_TYPE } from './constants';
import {
  type PromotionDataCommon,
  type Promotion,
  type PromotionDetails,
} from './types';

const commonDetails: PromotionDetails = {
  yourPosition: 143,
  currentPrize: 0,
  yourWagered: 0,
  description: `## Ossino’s $10,000 Daily Race\n\nAt Ossino, we’re giving away $10,000 every 24 hours. The question is: are you ready to race to the top?\n\nEnjoy all of your Ossino favourites across our Casino and Sportsbook and, for every bet you place, you’ll climb our Daily Race Leaderboard. Everyone is eligible so get started and track your progress today!\n\nAs soon as time is up, the top 5,000 racers will earn prizes that are instantly paid out into their account.\n\nGet racing now and don’t forget: the faster you race, the higher you climb, the bigger the prize.\n\n## How to Earn\n\nSimply wager and play on Stake! Once you have started wagering, you are immediately entered in the race!`,
};

const commonData: PromotionDataCommon = {
  title:
    'Pellentesque nulla in in diam. Morbi mauris est in diam arcu imperdiet. Tincidunt aliquet tempo...',
  endDate: new Date().toISOString(),
};

export const promotions: Promotion[] = [
  {
    id: 1,
    promotionType: PROMOTION_TYPE.SPORT,
    cardType: CARD_TYPE.BET_BUILDER,
    details: commonDetails,
    data: commonData,
  },
  {
    id: 2,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.CASINO_BONUS,
    details: commonDetails,
    data: {
      percentage: 50,
      bonusUpTo: 500,
      minDeposit: 50,
      rollover: 30,
      background: 'var(--gradient-sports-promo-2)',
      ...commonData,
    },
  },
  {
    id: 3,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.CASINO_BONUS,
    details: commonDetails,
    data: {
      percentage: 100,
      bonusUpTo: 1000,
      minDeposit: 70,
      rollover: 40,
      background: 'var(--gradient-sports-promo-3)',
      ...commonData,
    },
  },
  {
    id: 4,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.CASINO_BONUS,
    details: commonDetails,
    data: {
      percentage: 150,
      bonusUpTo: 1200,
      minDeposit: 100,
      rollover: 50,
      background: 'var(--gradient-sports-promo-4)',
      ...commonData,
    },
  },
  {
    id: 5,
    promotionType: PROMOTION_TYPE.SPORT,
    cardType: CARD_TYPE.WELCOME_BONUS,
    details: commonDetails,
    data: {
      amount: 300,
      ...commonData,
    },
  },
  {
    id: 6,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.DAILY_RACES,
    details: commonDetails,
    data: {
      amount: 10000,
      ...commonData,
    },
  },
  {
    id: 7,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.BOOST_LEVEL,
    details: commonDetails,
    data: commonData,
  },
  {
    id: 8,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.REFER_CARD_1,
    details: commonDetails,
    data: {
      amount: 50,
      ...commonData,
    },
  },
  {
    id: 9,
    promotionType: PROMOTION_TYPE.CASINO,
    cardType: CARD_TYPE.REFER_CARD_2,
    details: commonDetails,
    data: {
      amount: 50,
      ...commonData,
    },
  },
];
