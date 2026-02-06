import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
import { handleRebet } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectRebetApi } from 'store/SportsHomePage/selectors';
import { useState } from 'react';
import Icon from 'components/shared/Icon';
import copyIcon from '/icons/copy.svg?url';

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
interface BetReceiptProps {
  betId?: string;
  totalOdds?: number;
  totalStake?: number;
  estimatedPayout?: number;
  selections?: Array<{
    id: string;
    market: string;
    selection: string;
    odds: number;
    eventName: string;
    eventId: string;
  }>;
  multiplier?: number;
  status?: 'pending' | 'success' | 'failed' | 'rejected';
  message?: string;
  selectedCurrency?: string;
  usdToggleEnabled?: boolean;
  conversionData?: any;
  onClearBetslip?: () => void;
}

const BetReceipt = ({
  betId = 'Processing...',
  totalOdds = 0,
  totalStake = 0,
  estimatedPayout = 0,
  selections = [],
  status = 'pending',
  message,
  selectedCurrency = 'USD',
  usdToggleEnabled = false,
  onClearBetslip
}: BetReceiptProps) => {
  const [copied, setCopied] = useState(false);
  let safeOdds = Number(totalOdds) || 0;
  let safeStake = Number(totalStake) || 0;
  let safePayout = Number(estimatedPayout) || 0;

  if (!usdToggleEnabled) {
      if(selectedCurrency === 'USDT'){
          safeStake = Number((safeStake).toFixed(2));
          safePayout = Number((safePayout).toFixed(2));
      }
      else{
          safeStake = Number((safeStake ).toFixed(10));
          safePayout = Number((safePayout).toFixed(10));
      }
  }
  else{
      let stakeTruncated = Math.floor(safeStake * 100) / 100;
      let payoutTruncated = Math.floor(safePayout * 100) / 100;
      safeStake = stakeTruncated;
      safePayout = payoutTruncated;
  }
  let truncateOddsValue = Math.floor(safeOdds * 100) / 100;
  safeOdds = truncateOddsValue;

  const dispatch = useAppDispatch();
  const rebetFixtures = useAppSelector(selectRebetApi);

  const handleCopyBetId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearBetslip = () => {
    if (onClearBetslip) {
      onClearBetslip();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-4">
        {/* Dynamic Status */}
        {status === 'success' && (
          <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 fill-green-500">
                <use href="/sprite-other-icons.svg#icon-check"></use>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold body-txtColor-1">Accepted</p>
              <p className="text-xs text-base-400">{message || 'Bet Accepted successfully'}</p>
            </div>
          </div>
        )}

        {(status === 'failed' || status === 'rejected') && (
          <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg className="w-4 h-4 fill-red-500">
                <use href="/sprite-other-icons.svg#icon-close"></use>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold body-txtColor-1">Failed</p>
              <p className="text-xs text-base-400">{message || 'Bet placement failed'}</p>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 fill-yellow-400"
                viewBox="0 0 50 50"
              >
                <path
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068
                    c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold body-txtColor-1">Waiting</p>
              <p className="text-xs text-base-400">{message || 'Processing your bet'}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleCopyBetId(betId)}
          className="flex items-center gap-2 text-base-400 hover:body-txtColor-1 transition-colors"
        >
          <span className="text-xs font-medium text-base-300">
            Bet Id: <span className="text-special-2 font-semibold">#{betId}</span>
          </span>
          <Icon
            id="copyIcon"
            href={copyIcon}
            className="w-4 h-4 fill-current body-txtColor-1"
          />
          {copied && (
            <span className="text-green-500 text-xs">Copied!</span>
          )}
        </button>
      </div>
      <div className="flex mb-2">
        <span className="text-xs body-txtColor-1">
          {selections.length === 1 ? 'Single' : `Multiple (${selections.length})`}
        </span>
      </div>
      <div className="bg-base-725 flex flex-col gap-2 rounded-lg p-4">
        {selections.length > 0 ? (
          selections.map((selection, index) => (
            <div
              key={selection.id}
              className={`flex flex-col gap-1 ${index < selections.length - 1 ? 'border-b border-base-600 pb-3' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-sm font-medium body-txtColor-1">{selection.market}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 justify-between w-full">
                  <span className="text-sm font-medium body-txtColor-1">{selection.selection}</span>
                  <span className="text-sm text-secondary-light-1">{Number(selection.odds).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between leading-4">
                <a href={`/sports/event/${selection.eventId}`}>
                  <span className="text-sm text-base-400">{selection.eventName}</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <span className="text-sm text-base-400">No selections available</span>
          </div>
        )}
      </div>

      <div className="bg-base-725 rounded-lg p-4 mt-4 mb-4 shadow-[0_-6px_12px_rgba(0,0,0,0.4)]">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-300">Total Odds</span>
            <span className="text-sm font-medium text-secondary-light-1">{safeOdds}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-300">Total Stake</span>
            <div className="flex items-center gap-1">
              {usdToggleEnabled ? (
                <>
                  <img
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
                    className="w-4 h-4"
                  />
                  <img
                    src="/icons/currencies/dollarUsd.svg"
                    alt="USD"
                    className="h-3 w-3"
                  />
                </>
              ) : (
                <img
                  src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                  alt={selectedCurrency}
                  className="w-4 h-4"
                />
              )}
              <span className="text-sm font-medium text-secondary-light-1">{safeStake}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-300">Est. Payout</span>
            <div className="flex items-center gap-1">
              {usdToggleEnabled ? (
                <>
                  <img
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
                    className="w-4 h-4"
                  />
                  <img
                    src="/icons/currencies/dollarUsd.svg"
                    alt="USD"
                    className="h-3 w-3"
                  />
                </>
              ) : (
                <img
                  src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                  alt={selectedCurrency}
                  className="w-4 h-4"
                />
              )}
              <span className="text-sm font-medium text-secondary-light-1">{safePayout}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={clearBetslip}
          className="w-[38px] h-[38px] bg-base-640 rounded-lg flex items-center justify-center hover:bg-base-600 transition-colors"
        >
          <img
            src="/icons/trash.svg"
            alt="trash"
            className="w-5 h-5"
          />
        </button>

        <button
          onClick={() => {
            const selectionIds = selections?.map(selection => selection.id).filter(Boolean) || [];
            handleRebet(selectionIds, dispatch);
          }}
          className="flex-1 h-[38px] bg-button-gradient btn-textColor rounded-lg text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center"
        >
          {rebetFixtures?.loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ("Rebet")}
        </button>
      </div>
    </div>
  );
};

export default BetReceipt;