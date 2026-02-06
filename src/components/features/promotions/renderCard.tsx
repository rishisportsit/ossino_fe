// import type { CARD_TYPE } from 'store/promotions/constants';
// import type { BonusAmountData, CasinoBonusData } from 'store/promotions/types';
// import BetBuilderCard from './BetBuilderCard';
// import BoostLevelCard from './BoostLevelCard';
// import CasinoBonusCard from './CasinoBonusCard';
// import DailyRacesCard from './DailyRacesCard';
// import ReferCard1 from './ReferCard1';
// import ReferCard2 from './ReferCard2';
// import WelcomeBonusCard from './WelcomeBonusCard';

// export type RenderCardProps =
//   | { type: typeof CARD_TYPE.BET_BUILDER; props: NonNullable<unknown> }
//   | { type: typeof CARD_TYPE.BOOST_LEVEL; props: NonNullable<unknown> }
//   | { type: typeof CARD_TYPE.CASINO_BONUS; props: CasinoBonusData }
//   | { type: typeof CARD_TYPE.DAILY_RACES; props: BonusAmountData }
//   | { type: typeof CARD_TYPE.REFER_CARD_1; props: BonusAmountData }
//   | { type: typeof CARD_TYPE.REFER_CARD_2; props: BonusAmountData }
//   | { type: typeof CARD_TYPE.WELCOME_BONUS; props: BonusAmountData };

// export const renderCard = ({ type, props }: RenderCardProps) => {
//   switch (type) {
//   case 'betBuilder':
//     return <BetBuilderCard {...props} />;
//   case 'boostLevel':
//     return <BoostLevelCard {...props} />;
//   case 'casinoBonus':
//     return <CasinoBonusCard {...props} />;
//   case 'dailyRaces':
//     return <DailyRacesCard {...props} />;
//   case 'referCard1':
//     return <ReferCard1 {...props} />;
//   case 'referCard2':
//     return <ReferCard2 {...props} />;
//   case 'welcomeBonus':
//     return <WelcomeBonusCard {...props} />;
//   default:
//     return null;
//   }
// };
