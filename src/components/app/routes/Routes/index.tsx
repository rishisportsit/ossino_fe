import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from 'components/app/layouts/ErrorBoundary';
import LoyaltyLayout from 'components/app/layouts/LoyaltyLayout';
import MainLayout from 'components/app/layouts/MainLayout';
import PrivateLayout from 'components/app/layouts/PrivateLayout';
import PromotionsLayout from 'components/app/layouts/PromotionsLayout';
import SearchLayout from 'components/app/layouts/SearchLayout';
import SettingsLayout from 'components/app/layouts/SettingsLayout';
import PrivateRoute from '../PrivateRoute';
import StandingsPage from 'components/pages/StandingsPage';
import LeaguePage from 'components/pages/LeaguePage';

const RegisterRoute = lazy(() => import('components/pages/RegisterRoute'));
const SportsPage = lazy(() => import('components/pages/SportsPage'));

const HomePage = lazy(() => import('components/pages/HomePage'));
const BadgesPage = lazy(() => import('components/pages/BadgesPage'));
const CategoryPage = lazy(() => import('components/pages/CategoryPage'));
const CoinsHistoryPage = lazy(
  () => import('components/pages/CoinsHistoryPage'),
);
const CoinsPage = lazy(() => import('components/pages/CoinsPage'));
const LeaderboardPage = lazy(() => import('components/pages/LeaderboardPage'));
const PromotionLeaderboardPage = lazy(
  () => import('components/pages/PromotionLeaderboardPage'),
);
const MissionsPage = lazy(() => import('components/pages/MissionsPage'));
const OverviewPage = lazy(() => import('components/pages/OverviewPage'));
const ProviderPage = lazy(() => import('components/pages/ProviderPage'));
const ProvidersPage = lazy(() => import('components/pages/ProvidersPage'));
const RedemptionsPage = lazy(() => import('components/pages/RedemptionsPage'));
const ReferralPage = lazy(() => import('components/pages/ReferralPage'));
const RewardsPage = lazy(() => import('components/pages/RewardsPage'));
const VipDetailsPage = lazy(() => import('components/pages/VipDetailsPage'));
const VipEarningHistoryPage = lazy(
  () => import('components/pages/VipEarningHistoryPage'),
);
const VipEditPage = lazy(() => import('components/pages/VipEditPage'));
const VipNewPage = lazy(() => import('components/pages/VipNewPage'));

const AccountPage = lazy(() => import('components/pages/AccountPage'));
const FavoritesPage = lazy(() => import('components/pages/FavoritesPage'));
const NotificationsSettingsPage = lazy(
  () => import('components/pages/NotificationsSettingsPage'),
);
const PromotionsPage = lazy(() => import('components/pages/PromotionsPage'));
const SearchPage = lazy(() => import('components/pages/SearchPage'));
const GameDetailsPage = lazy(() => import('components/pages/GameDetailsPage'));
const Error404Page = lazy(() => import('components/pages/Error404Page'));
const TransactionsPage = lazy(
  () => import('components/pages/TransactionsPage'),
);
const NotificationsPage = lazy(
  () => import('components/pages/NotificationsPage'),
);
const NotificationDetailsPage = lazy(
  () => import('components/pages/NotificationDetailsPage'),
);
const BonusesPage = lazy(() => import('components/pages/BonusesPage'));
const SecurityPage = lazy(() => import('components/pages/SecurityPage'));
const SessionsPage = lazy(() => import('components/pages/SessionsPage'));
const VerifyPage = lazy(() => import('components/pages/VerifyPage'));
const SportsHomePage = lazy(() => import('components/pages/SportsHomePage'));
const SportsBetSlipPage = lazy(
  () => import('components/pages/SportsBetSlipPage'),
);
const DiscoverySearchPage = lazy(
  () => import('components/pages/DiscoverySearchPage'),
);
const P2PTradePage = lazy(() => import('components/pages/P2PTradePage'));
const EventPage = lazy(() => import('components/pages/EventPage'));
const PoliticsPage = lazy(() => import('components/pages/PoliticsPage'));
const SoccerPage = lazy(() => import('components/pages/SoccerPage'));
const LiveEventsPage = lazy(() => import('components/pages/LiveEventsPage'));
const PlayersPage = lazy(() => import('components/pages/PlayersPage'));
const SportsSearchPage = lazy(
  () => import('components/pages/SportsSearchPage'),
);
const SportsPromotionsPage = lazy(
  () => import('components/pages/SportsPromotionsPage'),
);

const HelpPage = lazy(() => import('components/pages/HelpPage'));

const CaseSensitiveRedirect = ({ children }: { children: React.ReactNode }) => {
  const location = window.location;
  if (location.pathname !== location.pathname?.toLowerCase()) {
    return <Navigate to={location.pathname?.toLowerCase()} replace />;
  }
  return <>{children}</>;
};

const routes: RouteObject[] = [
  {
    element: (
      <CaseSensitiveRedirect>
        <MainLayout />
      </CaseSensitiveRedirect>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'register', element: <RegisterRoute /> },
      { path: '/sports', element: <SportsHomePage /> },
      { path: '/sports/betslip', element: <SportsBetSlipPage /> },
      { path: '/sports/discovery-search', element: <DiscoverySearchPage /> },
      { path: '/sports/p2p', element: <P2PTradePage /> },
      { path: `/sports/:sport/:sportId`, element: <SoccerPage /> },
      { path: '/sports/politics', element: <PoliticsPage /> },
      { path: '/sports/event/:eventId', element: <EventPage /> },
      { path: '/sports/live', element: <LiveEventsPage /> },
      { path: '/sports/player-props', element: <PlayersPage /> },
      { path: '/sports/search', element: <SportsSearchPage /> },
      { path: '/sports/promotions', element: <SportsPromotionsPage /> },
      { path: '/sports/standings', element: <StandingsPage /> },
      { path: '/sports/league/:sportsId/:segmentId/:leagueIds', element: <LeaguePage /> },
      {
        path: 'categories',
        element: <SearchLayout />,
        children: [{ path: ':categoryId', element: <CategoryPage /> }],
      },
      {
        path: 'providers',
        element: <SearchLayout />,
        children: [
          { path: '', element: <ProvidersPage /> },
          { path: ':providerId', element: <ProviderPage /> },
        ],
      },
      {
        path: 'discovery-search',
        element: <SearchLayout />,
        children: [{ path: '', element: <SearchPage /> }],
      },
      {
        path: 'game-details/:name',
        element: <GameDetailsPage />,
      },
      {
        path: 'promotions',
        element: <PromotionsLayout />,
        children: [{ path: '', element: <PromotionsPage /> }],
      },
      {
        path: 'promotion',
        children: [
          { path: 'leaderboard', element: <PromotionLeaderboardPage /> },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <PrivateLayout />,
            children: [
              {
                path: 'loyalty',
                children: [
                  {
                    element: <LoyaltyLayout />,
                    children: [
                      { path: 'coins', element: <CoinsPage /> },
                      { path: 'overview', element: <OverviewPage /> },
                      { path: 'rewards', element: <RewardsPage /> },
                    ],
                  },
                  {
                    path: 'rewards',
                    children: [
                      { path: 'missions', element: <MissionsPage /> },
                      { path: 'leaderboard', element: <LeaderboardPage /> },
                      { path: 'badges', element: <BadgesPage /> },
                      { path: 'redemption', element: <RedemptionsPage /> },
                    ],
                  },
                  {
                    path: 'coins',
                    children: [
                      { path: 'history', element: <CoinsHistoryPage /> },
                    ],
                  },
                  {
                    path: 'vip',
                    children: [
                      {
                        path: '',
                        element: <VipDetailsPage />,
                      },
                      {
                        path: 'new',
                        element: <VipNewPage />,
                      },
                      {
                        path: 'edit',
                        element: <VipEditPage />,
                      },
                      {
                        path: 'history',
                        element: <VipEarningHistoryPage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'favorites',
                element: <SearchLayout />,
                children: [{ path: '', element: <FavoritesPage /> }],
              },
              { path: 'notifications', element: <NotificationsPage /> },
              {
                path: 'notification-details',
                element: <NotificationDetailsPage />,
              },
              { path: 'referral', element: <ReferralPage /> },
              { path: 'bonuses', element: <BonusesPage /> },
              { path: 'transactions', element: <TransactionsPage /> },
              {
                path: 'settings',
                children: [
                  {
                    element: <SettingsLayout />,
                    children: [
                      { path: '', element: <Navigate to="account" replace /> },
                      { path: 'account', element: <AccountPage /> },
                      { path: 'verify', element: <VerifyPage /> },
                      { path: 'security', element: <SecurityPage /> },
                      {
                        path: 'notifications',
                        element: <NotificationsSettingsPage />,
                      },
                      { path: 'sessions', element: <SessionsPage /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'sports',
        element: <SportsPage />,
      },
      {
        path: 'help/:slug',
        element: <HelpPage />,
      },
      {
        path: '*',
        element: <Error404Page />,
      },
    ],
  },
];

import { useSocketConnection } from 'hooks/useSocketConnection';

const router = createBrowserRouter(routes);

const Routes = () => {
  useSocketConnection();
  return <RouterProvider router={router} />;
};

export default Routes;
