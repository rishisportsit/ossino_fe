import { useState } from 'react';
import { STORAGE_KEYS } from 'constants/storage';
import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';
import { SwiperSlide } from 'swiper/react';
import Icon from 'components/shared/Icon';
import { CURRENCIES, CURRENCY_CODE_MAPPING } from 'constants/currencies';
import { getFormattedBalanceDisplay } from 'helpers/currencyHelpers';
import play from '/icons/Play.svg?url';
import happy from '/icons/emojiHappy.svg?url';
import { Button } from 'components/shared/ui/Button';
import {
  launchDemoGame,
  launchRealGame,
  setSelectedGameUrl,
} from 'store/games/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectWalletState } from 'store/wallet/selectors';
import { selectUserData } from 'store/user/selectors';
import { LocalStorageHelper } from 'helpers/storage';
import { config } from 'config/index';
import type {
  LaunchDemoGameRequest,
  LaunchRealGameRequest,
} from 'api/games/games.types';
import type { Game } from 'api/content/content.types';

interface GameInfoProps {
  game: Game | null;
}

const GameInfo = ({ game }: GameInfoProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = [...(game?.providers || []), ...(game?.categories || [])];
  const userData = useAppSelector(selectUserData);
  const { selectedCurrency, currencies } = useAppSelector(selectWalletState);
  const dispatch = useAppDispatch();

  const getDisplayName = (currencyCode: string) =>
    (CURRENCY_CODE_MAPPING as Record<string, string>)[currencyCode] ||
    currencyCode;

  const getCurrencyEntity = (currencyCode: string) =>
    CURRENCIES[getDisplayName(currencyCode)];

  const hasCurrencies = Array.isArray(currencies) && currencies.length > 0;
  const currentCurrency = hasCurrencies
    ? selectedCurrency || currencies[0]
    : undefined;
  const currentEntity = currentCurrency
    ? getCurrencyEntity(currentCurrency.currencyCode)
    : undefined;

  const handleCurrencySelect = (currencyCode: string) => {
    const currency = currencies.find((c) => c.currencyCode === currencyCode);
    if (currency) {
      dispatch({ type: 'wallet/setSelectedCurrency', payload: currency });
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleOutsideClick = () => setIsDropdownOpen(false);

  const handleFunPlay = async () => {
    if (!game) return;
    const isOriginalsGame = game.categories.some(
      (cat) => cat?.toLowerCase() === 'originals',
    );
    const payload: LaunchDemoGameRequest = {
      playerId: userData?.id?.toString(),
      playerToken: LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '',
      platformId: config.platformId,
      operatorId: config.operatorId,
      brandId: config.brandId,
      gameId: game.id,
      aggregator: isOriginalsGame ? 'negames' : game.aggregator_type,
      provider: isOriginalsGame ? 'negames' : game.provider,
      currencyCode: selectedCurrency?.currencyCode,
      gamePlatform: 'WEB',
      countryCode: LocalStorageHelper.getItem(STORAGE_KEYS.countryCode) as string | undefined,
      timestamp: Date.now(),
      playerIp: LocalStorageHelper.getItem(STORAGE_KEYS.playerIp) as string | undefined,
    };
    try {
      const { launchUrl } = await dispatch(launchDemoGame(payload)).unwrap();
      if (launchUrl) dispatch(setSelectedGameUrl({ url: launchUrl }));
    } catch (err) {
    }
  };

  const handleRealPlay = async () => {
    if (!game) return;
    const isOriginalsGame = game.categories.some(
      (cat) => cat?.toLowerCase() === 'originals',
    );
    const payload: LaunchRealGameRequest = {
      playerId: userData?.id?.toString(),
      playerToken: LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '',
      platformId: config.platformId,
      operatorId: config.operatorId,
      brandId: config.brandId,
      gameId: game.id,
      aggregator: isOriginalsGame ? 'negames' : game.aggregator_type,
      provider: isOriginalsGame ? 'negames' : game.provider,
      currencyCode: selectedCurrency?.currencyCode,
      gamePlatform: 'WEB',
      countryCode: LocalStorageHelper.getItem(STORAGE_KEYS.countryCode) as string | undefined,
      timestamp: Date.now(),
      lobbyUrl: 'https://ossino-stg.negroup-tech.net/',
      depositUrl: 'https://ossino-stg.negroup-tech.net/',
      playerIp: LocalStorageHelper.getItem(STORAGE_KEYS.playerIp) as string | undefined,
    };
    try {
      const { launchUrl } = await dispatch(launchRealGame(payload)).unwrap();
      if (launchUrl) dispatch(setSelectedGameUrl({ url: launchUrl }));
    } catch (err) {
    }
  };

  return (
    <div className="flex z-10 flex-col w-full gap-5 md:bg-fourth-gradient md:p-5 rounded-xl order-2 md:order-1">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold capitalize">{game?.title}</h3>
        <Slider className="overflow-hidden">
          {filters.map((item) => (
            <SwiperSlide
              key={item}
              style={{ width: 'auto' }}
              className="capitalize overflow-hidden"
            >
              <div className="bg-base-700 px-3 py-2 text-center text-xs rounded-lg cursor-pointer md:bg-[rgba(255,255,255,0.10)]">
                {item}
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>

      {/* Currency Selector */}
      <div className="flex flex-col bg-base-800 md:bg-transparent px-4 py-4 md:py-0 md:px-0 rounded-xl gap-4">
        {hasCurrencies && currentCurrency && currentEntity && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-regular">Balance In</span>
            <div className="relative w-full sm:w-auto max-w-full">
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-10 bg-transparent"
                  onClick={handleOutsideClick}
                />
              )}
              <button
                className="flex items-center justify-between h-10 px-3 w-full sm:min-w-[340px] sm:max-w-[400px] max-w-full bg-base-700 rounded-lg border border-base-600 hover:border-base-500 transition-colors"
                onClick={toggleDropdown}
                type="button"
              >
                <span className="flex items-center gap-1.5">
                  <img
                    src={currentEntity?.icon}
                    alt={currentCurrency.currencyCode}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">
                    {currentCurrency.currencyCode}
                  </span>
                  <span className="ml-2 text-xs text-primary-1">
                    {getFormattedBalanceDisplay(currentCurrency)}
                  </span>
                </span>
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isDropdownOpen && 'rotate-180',
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:min-w-[340px] sm:max-w-[400px] max-w-full bg-base-700 rounded-lg border border-base-600 shadow-lg z-20 max-h-60 overflow-y-auto">
                  {currencies.map((currency) => {
                    const entity = getCurrencyEntity(currency.currencyCode);
                    const isSelected =
                      currency.currencyCode === currentCurrency.currencyCode;
                    return (
                      <button
                        key={currency.currencyCode}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-base-600 transition-colors',
                          isSelected && 'bg-base-600',
                        )}
                        onClick={() =>
                          handleCurrencySelect(currency.currencyCode)
                        }
                        type="button"
                      >
                        <img
                          src={entity?.icon}
                          alt={currency.currencyCode}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">
                          {currency.currencyCode}
                        </span>
                        <span className="ml-auto text-xs text-primary-1">
                          {getFormattedBalanceDisplay(currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between gap-2">
          {hasCurrencies && currentCurrency && (
            <Button
              className="text-base-900 flex w-full gap-1 justify-center items-center"
              onClick={handleRealPlay}
            >
              <Icon id="playIconID" href={play} className="w-4 h-4" />
              Real Play
            </Button>
          )}
          <Button
            className="bg-transparent border border-primary-1 text-primary-1 flex w-full gap-1 justify-center items-center"
            onClick={handleFunPlay}
          >
            <Icon id="happyEmojiIcon" href={happy} className="w-4 h-4 text-primary-1 fill-current" />
            Fun Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
