import MobileSideBar from 'components/shared/SideBar/MobileSideBar';
import Loader from 'components/shared/ui/Loader';
import { useInitialData } from 'components/app/layouts/MainLayout/useInitialData';
import AuthDialogs from 'components/features/auth/AuthDialogs';
import ForgotPasswordDialog from 'components/features/auth/ForgotPasswordDialog';
import LogOutDialog from 'components/features/auth/LogOutDialog';
import NewPasswordDialog from 'components/features/auth/NewPasswordDialog';
import PasswordLinkDialog from 'components/features/auth/PasswordLinkDialog';
import EmailConfirmationSuccessDialog from 'components/features/emailConfirmation/EmailConfirmationSuccessDialog';
import ChatBlock from 'components/features/chat/ChatBlock';
import TipDialog from 'components/features/chat/TipDialog';
import DialogBurnCoins from 'components/features/coins/DialogBurnCoins';
import NotificationDetailsSheet from 'components/features/notifications/NotificationDetailsSheet';
import NotificationsSheet from 'components/features/notifications/NotificationsSheet';
import DialogRedemption from 'components/features/redemptions/DialogRedemption';
import WalletBlock from 'components/features/wallet/WalletBlock';
import BonusesSheet from 'components/shared/BonusesSheet';
import CoinsFilterSheet from 'components/shared/CoinsFilterSheet';
import ErrorDialog from 'components/shared/ErrorDialog';
import SuccessDialog from 'components/shared/SuccessDialog';
import Footer from 'components/shared/Footer/Footer';
import Header from 'components/shared/Header';
import NavBar from 'components/shared/NavBar';
import SideBar from 'components/shared/SideBar';
import { Toaster } from 'components/shared/ui/Toaster';
import { Sheet, SheetContent } from 'components/shared/ui/Sheet';
import { setScrollBarWidth } from 'helpers/common';
import {
  BREAKPOINTS,
  useBreakpoint,
  useOutsideClick,
  useDialog,
} from 'helpers/hooks';
import { usePostRegistrationRedirect } from '../../../../hooks/usePostRegistrationRedirect';
import { useSignalRGroups } from '../../../../hooks/useSignalRGroups';
import { useSignalRUpdates } from '../../../../hooks/useSignalRUpdates';
import { cn } from 'helpers/ui';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { toggleChat } from 'store/chat/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { DIALOG_TYPE } from 'store/dialog/slice';
import GameDialog from 'components/features/game-detail/GameModal';
import BetslipDialog from 'components/shared/BetslipDialog';
import PurchaseDetailsDialog from 'components/features/p2pTrade/PurchaseDetailsDialog';
import DetailsDialog from 'components/features/p2pTrade/DetailsDialog';
import ConfirmDialog from 'components/features/p2pTrade/ConfirmDialog';
import FilterDialog from 'components/features/p2pTrade/FilterDialog';
import { useCurrencyConversion } from 'hooks/useCurrencyConversion';
import { selectWalletState } from 'store/wallet/selectors';
import { selectIsLoggedIn } from 'store/user/selectors';
import styles from './layout.module.css';

const MainLayout = () => {
  const [isOpenDesktopSideBar, setIsOpenDesktopSideBar] = useState(true);
  const [isOpenMobileSideBar, setIsOpenMobileSideBar] = useState(false);
  const { pathname, search } = useLocation();
  const { screenWidth } = useBreakpoint();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const sideChatRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const isChatShown = useAppSelector((state) => state.chat.isChatOpen);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isLargeScreen = screenWidth >= BREAKPOINTS.xl;
  const isSmallScreen = screenWidth < BREAKPOINTS.md;
  const isMediumScreen = screenWidth >= BREAKPOINTS.md;

  const closeHandler = () => {
    if (!isLargeScreen) {
      setIsOpenDesktopSideBar(false);
    }
  };

  const closeChatHandler = useCallback(() => {
    if (isOpenDesktopSideBar) {
      dispatch(toggleChat(false));
    }
  }, [dispatch, isOpenDesktopSideBar]);

  const closeChat = useCallback(() => {
    if (!isLargeScreen) {
      dispatch(toggleChat(false));
    }
  }, [dispatch, isLargeScreen]);

  useEffect(() => {
    if (pathname.startsWith('/sports')) {
      dispatch({ type: 'siteMode/setSiteMode', payload: 'sports' });
    } else if (pathname?.toLowerCase().includes('promotions')) {
    } else {
      dispatch({ type: 'siteMode/setSiteMode', payload: 'casino' });
    }
  }, [pathname, dispatch]);

  useInitialData();
  useOutsideClick(sideBarRef, closeHandler);
  useOutsideClick(sideChatRef, closeChat);
  usePostRegistrationRedirect();
  useSignalRGroups();
  useSignalRUpdates();

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const token = urlParams.get('token');

    if (token) {
      if (pathname.includes('/settings/verify')) {
        return;
      } else {
        openDialog(DIALOG_TYPE.newPassword, { token });

        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [search, openDialog, pathname]);

  useEffect(() => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.scrollTo(0, 0);
    } else {
      const scrollableContainer = document.querySelector('.scrollable-element');
      if (scrollableContainer) {
        scrollableContainer.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (isChatShown) {
      setIsOpenDesktopSideBar(false);
    }
  }, [isChatShown]);

  useEffect(() => {
    closeChatHandler();
  }, [closeChatHandler, dispatch, isOpenDesktopSideBar]);

  useEffect(() => {
    setScrollBarWidth();
    const handleResize = () => {
      setScrollBarWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const { currencies } = useAppSelector(selectWalletState);

  useCurrencyConversion({
    fromCurrencies: currencies?.map((c: { currencyCode: string }) => c.currencyCode.replace(/_TEST\d*$/, '')) || [],
    toCurrency: 'USD',
    enabled: isLoggedIn && currencies && currencies.length > 0,
  });

  return (
    <>
      {isMediumScreen && (
        <>
          <div
            className={cn(styles.layout, {
              [styles.isNavOpened]: isOpenDesktopSideBar,
              [styles.isChatOpened]: isChatShown,
            })}
          >
            <aside
              ref={sideBarRef}
              className={cn(
                'bg-base-800 md:background-2 xl:bg-base-800 z-[600]',
                styles.sideNav,
              )}
            >
              <SideBar
                isOpen={isOpenDesktopSideBar}
                toggleSidebar={setIsOpenDesktopSideBar}
              />
            </aside>
            <aside
              ref={sideChatRef}
              className={cn(`background-2 xl:z-10`, styles.sideChat)}
            >
              <ChatBlock />
            </aside>
            <div className="flex flex-col flex-grow h-svh w-full p-0 transition-all duration-300 overflow-auto">
              <div
                className={cn(
                  'scrollable-element relative flex h-screen w-full flex-col overflow-auto overflow-x-hidden transition-all duration-300  pr-[calc((100vw-1440px)/2)] ',
                  { scrollbar: isSmallScreen },
                )}
              >
                <Header />
                <main
                  className={cn('w-full transition-all duration-300 flex-1', {
                    'xl:w-[calc(100%-340px)] transition-all duration-300 ':
                      isChatShown,
                  })}
                >
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center h-full w-full">
                        <Loader />
                      </div>
                    }
                  >
                    <Outlet />
                  </Suspense>
                </main>
                <Footer />
              </div>
            </div>
          </div>
          <NavBar
            isOpen={isOpenDesktopSideBar}
            setIsOpen={setIsOpenDesktopSideBar}
          />
        </>
      )}

      {isSmallScreen && (
        <>
          <div className="min-h-screen flex flex-col">
            <MobileSideBar
              isOpen={isOpenMobileSideBar}
              onOpenChange={setIsOpenMobileSideBar}
              showActions
            />
            <Header />
            <div className="flex flex-grow flex-1 w-full flex-col overflow-y-auto -webkit-overflow-scrolling-touch">
              <main className="flex-1">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full w-full">
                      <Loader />
                    </div>
                  }
                >
                  <Outlet />
                </Suspense>
              </main>
              <Footer />
            </div>
          </div>
          <Sheet open={isChatShown} onOpenChange={() => dispatch(toggleChat(false))}>
            <SheetContent
              side="right"
              className="w-full p-0 bg-base-800 flex flex-col z-[120]"
              overlayClassName="z-[110]"
            >
              <ChatBlock />
            </SheetContent>
          </Sheet>
          <NavBar
            isOpen={isOpenMobileSideBar}
            setIsOpen={setIsOpenMobileSideBar}
          />
        </>
      )}

      <AuthDialogs />
      <NewPasswordDialog />
      <LogOutDialog />
      <ForgotPasswordDialog />
      <PasswordLinkDialog />
      <BonusesSheet />
      <WalletBlock />
      <TipDialog />
      <NotificationsSheet />
      <NotificationDetailsSheet />
      <ErrorDialog />
      <SuccessDialog />
      <EmailConfirmationSuccessDialog />
      <DialogBurnCoins />
      <DialogRedemption />
      <CoinsFilterSheet />
      <Toaster />
      <GameDialog />
      <BetslipDialog />
      <PurchaseDetailsDialog />
      <DetailsDialog />
      <ConfirmDialog />
      <FilterDialog />
    </>
  );
};

export default MainLayout;
