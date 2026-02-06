import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
// import { STORAGE_KEYS } from 'constants/storage';
import { useEffect } from 'react';
// import { LocalStorageHelper } from 'helpers/storage';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectWalletState } from 'store/wallet/selectors';
import { setSelectedCurrency, toggleUsdDisplay } from 'store/wallet/slice';
import { selectCurrencyData } from 'store/currency/selectors';
import { getFormattedBalanceWithUSD, getFormattedBalanceString, getCleanCurrencyCode } from 'helpers/usdConversion';
import { Switch } from '../../shared/ui/Switch';
import Select from '../Select';
import { useBetConfig } from '../../../hooks/useBetConfig';

// const { sportsBookPlatformEvents } = window;

export function getCurrencyIconByCode(code: string): string | undefined {
  const mapped = (CURRENCY_CODE_MAPPING as Record<string, string>)[code];
  if (mapped && CURRENCIES[mapped]?.icon) return CURRENCIES[mapped].icon;
  for (const key in CURRENCIES) {
    if (CURRENCIES[key].contraction === code && CURRENCIES[key].icon) {
      return CURRENCIES[key].icon;
    }
  }
  return undefined;
}



const CurrencyDropdown = () => {
  const { refetch } = useBetConfig();
  const dispatch = useAppDispatch();
  const { currencies, selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);
  const conversionData = useAppSelector(selectCurrencyData);

  useEffect(() => {
    if (currencies && currencies.length > 0 && !selectedCurrency) {
      const initialCurrency =
        currencies.find((currency: typeof currencies[0]) => currency.userDefaultCurrency) ||
        currencies.find((currency: typeof currencies[0]) => currency.brandDefaultCurrency) ||
        currencies[0];
      if (initialCurrency) {
        dispatch(setSelectedCurrency(initialCurrency));
      }
    }
  }, [currencies, selectedCurrency, dispatch]);

  const handleCurrencySelect = (currency: (typeof currencies)[0]) => {
    dispatch(setSelectedCurrency(currency));
    refetch();
  };

  const displayCurrencyCode = selectedCurrency
    ? getCleanCurrencyCode(selectedCurrency.currencyCode)
    : '';

  const getFormattedBalance = (currency: typeof currencies[0]) => {
    const activeConversionData = conversionData || [];
    return getFormattedBalanceString(
      currency,
      currency.totalBalance,
      usdToggleEnabled,
      activeConversionData
    );
  };

  const getFormattedBalanceWithIcon = (currency: typeof currencies[0]) => {
    const activeConversionData = conversionData || [];
    return getFormattedBalanceWithUSD(
      currency,
      currency.totalBalance,
      usdToggleEnabled,
      activeConversionData
    );
  };
  const handleUsdToggleChange = (checked: boolean) => {
    dispatch(toggleUsdDisplay(checked));
  };

  function DropdownSwitch() {
    return (
      <Switch
        checked={usdToggleEnabled}
        onCheckedChange={handleUsdToggleChange}
        aria-label="Display in USD"
        onPointerDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      />
    );
  }
  return (
    <Select
      dropDownClassName="min-w-[245px] max-w-[310px] bg-base-700 left-0"
      className="min-w-28 bg-base-700"
      withChevron
      closeOnClick
      additionalChild={
        <div className="flex items-center justify-between w-full max-w-[100px]">
          <span className="xl:hidden block text-xs">{displayCurrencyCode}</span>
          <span className="xl:block hidden h-fit">
            <div style={{ maxWidth: '95px' }}
              className="font-medium text-xs h-fit ml-2 flex items-center gap-1 overflow-hidden">
              {selectedCurrency && getFormattedBalanceWithIcon(selectedCurrency).iconPath && (
                <img
                  src={getFormattedBalanceWithIcon(selectedCurrency).iconPath}
                  alt="USD"
                  className="h-3 w-3 flex-shrink-0"
                />
              )}
              <span className="truncate">{selectedCurrency ? getFormattedBalanceWithIcon(selectedCurrency).value : '0.00'}</span>
            </div>
          </span>
        </div>
      }
      list={
        <>
          {currencies.map((currency) => {
            const iconPath = getCurrencyIconByCode(currency.currencyCode);
            const displayCode = getCleanCurrencyCode(currency.currencyCode);
            return (
              <div
                key={currency.currencyCode}
                className="border-b border-base-600 last:border-none flex items-center gap-2 px-3 py-2"
                onClick={() => handleCurrencySelect(currency)}
              >
                <img
                  src={iconPath || '/icons/currencies/etheriumLogo.svg'}
                  alt={displayCode}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="text-base font-semibold body-txtColor-1">{displayCode}</span>
                <span className="text-base ml-auto font-medium text-primary-1 flex items-center gap-1">
                  {getFormattedBalanceWithIcon(currency).iconPath && (
                    <img
                      src={getFormattedBalanceWithIcon(currency).iconPath}
                      alt="USD"
                      className="h-3 w-3"
                    />
                  )}
                  {getFormattedBalanceWithIcon(currency).value}
                </span>
              </div>
            );
          })}
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="flex items-center">
              <span className="text-xs font-regular body-txtColor-1 ml-2">Display in Fiat</span>
            </div>
            <DropdownSwitch />
          </div>
        </>
      }
    // USD Calculation Switch styled for the dropdown

    >
      <div className="flex items-center justify-between xl:justify-center gap-1 pr-1 max-lg:pr-0 lg:pr-1.5">
        <span className="flex items-center w-4 h-4">
          {selectedCurrency && (
            <img
              src={
                getCurrencyIconByCode(selectedCurrency.currencyCode) ||
                '/icons/currencies/etheriumLogo.svg'
              }
              alt={displayCurrencyCode}
              className="h-6 w-6 mr-1"
            />
          )}
        </span>
        <span className="flex items-center font-semibold">
          <span className="xl:flex hidden text-xs">{displayCurrencyCode}</span>
          <span className="xl:hidden flex items-center max-w-[90px] gap-1">
            {selectedCurrency && getFormattedBalanceWithIcon(selectedCurrency).iconPath && (
              <img
                src={getFormattedBalanceWithIcon(selectedCurrency).iconPath}
                alt="USD"
                className="h-3 w-3 flex-shrink-0"
              />
            )}
            <span
              className="font-medium text-xs truncate block whitespace-nowrap"
              style={{ maxWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              title={selectedCurrency ? getFormattedBalanceWithIcon(selectedCurrency).value : '0.00'}
            >
              {selectedCurrency ? getFormattedBalanceWithIcon(selectedCurrency).value : '0.00'}
            </span>
          </span>
        </span>
      </div>
    </Select>
  );
};

export default CurrencyDropdown;
