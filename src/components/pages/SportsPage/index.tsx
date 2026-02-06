import { STORAGE_KEYS } from 'constants/storage';
import { LocalStorageHelper } from 'helpers/storage';
import { useRef, useEffect, useState } from 'react';
import { FaTimes, FaReceipt } from 'react-icons/fa';
import SportsPageLoader from 'components/shared/ui/SportsPageLoader';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn, selectUserData } from 'store/user/selectors';

const { sportsBookPlatformEvents } = window;

const SportsPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isBetslipOpen, setIsBetslipOpen] = useState(false);
  const [iFrameHeight, setIFrameHeight] = useState(0);
  const [betslipCount, setBetslipCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get login state and user data from the store
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userData = useAppSelector(selectUserData);

  // Dynamically load PlatformEvents.js only on SportsPage
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pepeta-stg.negroup-tech.net/js/PlatformEvents.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleIframeLoad = () => {
    // sendMessageToChild("navigate-to", {
    //   scope: "PREMATCH",
    //   to: "SPORT",
    //   sportId: 123,
    // });
  };

  useEffect(() => {
    const handleMessageFromChild = (event: MessageEvent) => {
      if (event.origin !== 'https://pepeta-stg.negroup-tech.net') return; // 🔒 security

      try {
        const payload =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;


        if (payload.eventType === 'user-unauthorized') {

        } else if (payload.eventType === 'on-page-height-change') {
          setIFrameHeight(payload.eventData.height);
        } else if (payload.eventType === 'on-betslip-count-update') {
          const count = payload.eventData?.betslipSelectionsCount ?? 0;
          setBetslipCount(count);
        } else if (payload.eventType === 'on-page-load') {

          // setIsLoading(false);
          const accessToken = LocalStorageHelper.getItem(
            STORAGE_KEYS.accessToken,
          ) as string;
          const userId = LocalStorageHelper.getItem(
            STORAGE_KEYS.userId,
          ) as string;
          if (
            payload.eventData.isLoaded &&
            isLoggedIn &&
            userData &&
            accessToken &&
            userId
          ) {
            sportsBookPlatformEvents?.sendPostMessage('user-authorization', {
              operatorToken: accessToken,
              userId: userData.id,
              currencyCode: 'USDT',
              currencySymble: '$',
              languageCode: 'en',
            });
          }
        } else if (payload.eventType === 'on-betslip-collapse') {
          setIsBetslipOpen(false);
        }
      } catch (err) {
        console.error('Invalid message from child:', err);
      }
    };

    window.addEventListener('message', handleMessageFromChild);
    return () => window.removeEventListener('message', handleMessageFromChild);
  }, []);

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        src="https://pepeta-stg.negroup-tech.net/"
        className="w-full border-0 mt-[75px] md:mt-0"
        style={{ height: iFrameHeight || 'calc(100vh - 85px)' }}
        title="Sports Page"
        onLoad={handleIframeLoad}
        id="sports-client"
      />
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background-2/60">
          <SportsPageLoader />
        </div>
      )}
      {/* Floating Betslip Icon */}
      {betslipCount > 0 && (
        <button
          type="button"
          className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-black via-green-600 to-green-400 shadow-lg body-txtColor-1 text-3xl hover:scale-105 transition-transform md:hidden"
          style={{ bottom: '75px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
          aria-label={isBetslipOpen ? 'Close Betslip' : 'Open Betslip'}
          onClick={() => {
            if (isBetslipOpen) {
              setIsBetslipOpen(false);
              sportsBookPlatformEvents?.sendPostMessage('collapse-bet-slip', {});
            } else {
              setIsBetslipOpen(true);
              sportsBookPlatformEvents?.sendPostMessage('expand-bet-slip', {});
            }
          }}
        >
          <FaReceipt className="text-green-400" />
        </button>
      )}
    </div>
  );
};

export default SportsPage;
