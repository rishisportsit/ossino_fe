import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import badgesSlice from './badges/slice';
import benefitsSlice from './benefits/slice';
import bonusesSlice from './bonuses/slice';
import chatSlice from './chat/slice';
import coinsHistorySlice from './coinsHistory/slice';
import coinsOverviewSlice from './coinsOverview/slice';
import dialogSlice from './dialog/slice';
import gamesSlice from './games/slice';
import lastWinsSlice from './lastWins/slice';
import leaderboardSlice from './leaderboard/slice';
import promotionLeaderboardSlice from './promotionLeaderboard/slice';
import levelsSlice from './levels/slice';
import loyaltyDetailsSlice from './loyaltyDetails/slice';
import loyaltyPointsSlice from './loyaltyPoints/slice';
import missionsSlice from './missions/slice';
import notificationsSlice from './notifications/slice';
import promotionsSlice from './promotions/slice';
import providersSlice from './providers/slice';
import redemptionsSlice from './redemptions/slice';
import referralsSlice from './referrals/slice';
import registerBonusesSlice from './registerBonuses/slice';
import rewardsSlice from './rewards/slice';
import sessionsSlice from './sessions/slice';
import settingsSlice from './settings/slice';
import transactionsSlice from './transactions/slice';
import userSlice from './user/slice';
import usersSlice from './users/slice';
import vipSlice from './vip/slice';
import bannerSlice from './banner/slice';
import topGamesSlice from './topGames/slice';
import sidebarSlice from './sidebar/slice';
import categoriesSlice from './categories/slice';
import recentlyPlayedSlice from './recentlyPlayed/slice';
import walletSlice from './wallet/slice';

import footerLinksSlice from './footer/slice';
import footerContentSlice from './footer/footerSlice';
import bonusHistorySlice from './bonusHistory/slice';
import bonusSummarySlice from './bonusSummary/slice';
import favouritesSlice from './favourites/slice';
import emailConfirmationSlice from './emailConfirmation/slice';
import playerInsightsSlice from './playerInsights/slice';
import affiliateGamesSlice from './affiliateGames/slice';
import affiliatePlayerDetailsSlice from './affiliatePlayerDetails/slice';
import siteModeSlice from './siteMode/slice';
import p2pTradeSlice from './p2pTrade/slice';
import betEventSlice from './betEvent/slice';
import SportsHomePageSlice from './SportsHomePage/slice';
import DiscoverySearchSportsSlice from './discoverySearchSports/slice';



import newsReducer from './news/slice';
import standingsReducer from './standings/slice';
import currencyReducer from './currency/slice';

import { errorMiddleware } from './helpers/errorMiddleware';
import { UserPersistTransform } from './helpers/userPersistTransform';

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
  dialog: dialogSlice,
  missions: missionsSlice,
  rewards: rewardsSlice,
  leaderboard: leaderboardSlice,
  promotionLeaderboard: promotionLeaderboardSlice,
  redemptions: redemptionsSlice,
  badges: badgesSlice,
  providers: providersSlice,
  lastWins: lastWinsSlice,
  games: gamesSlice,
  coinsOverview: coinsOverviewSlice,
  coinsHistory: coinsHistorySlice,
  loyaltyPoints: loyaltyPointsSlice,
  benefits: benefitsSlice,
  levels: levelsSlice,
  vip: vipSlice,
  promotions: promotionsSlice,
  users: usersSlice,
  referrals: referralsSlice,
  bonuses: bonusesSlice,
  notifications: notificationsSlice,
  transactions: transactionsSlice,
  sessions: sessionsSlice,
  registerBonuses: registerBonusesSlice,
  bonusHistory: bonusHistorySlice,
  bonusSummary: bonusSummarySlice,
  loyaltyDetails: loyaltyDetailsSlice,
  banner: bannerSlice,
  topGames: topGamesSlice,
  sidebar: sidebarSlice,
  categories: categoriesSlice,
  recentlyPlayed: recentlyPlayedSlice,
  wallet: walletSlice,
  settings: settingsSlice,
  footerLinks: footerLinksSlice,
  footerContent: footerContentSlice,
  favourites: favouritesSlice,
  emailConfirmation: emailConfirmationSlice,
  playerInsights: playerInsightsSlice,
  affiliateGames: affiliateGamesSlice,
  affiliatePlayerDetails: affiliatePlayerDetailsSlice,
  siteMode: siteModeSlice,
  p2pTrade: p2pTradeSlice,
  betEvent: betEventSlice,
  news: newsReducer,
  standings: standingsReducer,
  sportsBook: SportsHomePageSlice,
  discoverySearchSports: DiscoverySearchSportsSlice,
  currency: currencyReducer
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  {
    key: 'root',
    storage,
    whitelist: ['user', 'wallet', 'settings', 'vip', 'siteMode'],
    transforms: [UserPersistTransform],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(errorMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
