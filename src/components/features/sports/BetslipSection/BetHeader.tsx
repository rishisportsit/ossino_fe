import { useState, useEffect } from 'react';
import Icon from 'components/shared/Icon';
import copyIcon from '/icons/copy.svg?url';
import betChanceIcon from '/icons/bet-chance.svg?url';
import { handleRebet } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'store/index';
import { BetPart } from 'api/SportsHomePage/sportsHomePage.types';
import { selectRebetApi } from 'store/SportsHomePage/selectors';

interface BetHeaderProps {
  betId: string;
  cashoutPercentage?: number;
  placedDate: string;
  placedTime: string;
  onCopyBetId: (betId: string) => void;
  betParts?: BetPart[];
  currentTab?: string;
}

const BetHeader = ({ betId, cashoutPercentage, placedDate, placedTime, onCopyBetId, betParts, currentTab }: BetHeaderProps) => {
  const [copied, setCopied] = useState(false);
  const [isRebetting, setIsRebetting] = useState(false);

  const dispatch = useAppDispatch();
  const rebetFixtures = useAppSelector(selectRebetApi);

  useEffect(() => {
    if (!rebetFixtures?.loading && isRebetting) {
      setIsRebetting(false);
    }
  }, [rebetFixtures?.loading, isRebetting]);

  const handleCopyBetId = (id: string) => {
    onCopyBetId(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Bet ID and Cashout Percentage */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleCopyBetId(betId)}
          className="flex items-center gap-2 text-base-400 hover:body-txtColor-1 transition-colors"
        >
          <span className="text-xs font-normal">Bet ID: {betId}</span>
          <Icon
            id="copyIcon"
            href={copyIcon}
            className="w-4 h-4 fill-1"
          />
          {copied && (
            <span className="text-green-500 text-xs">Copied!</span>
          )}
        </button>
        {(cashoutPercentage !== 0) && (
          <div className="flex items-center gap-1">
            <Icon
              id="betChanceIcon"
              href={betChanceIcon}
              className="w-4 h-4 text-secondary-light-2 fill-current"
            />
            <span className="body-txtColor-1 text-xs font-normal">{cashoutPercentage}%</span>
          </div>
        )}
      </div>

      {/* Placed Date and Rebet Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="body-txtColor-1 text-xs font-normal">
          Placed on: {placedDate}, {placedTime}
        </div>
        {currentTab !== "history" && (
          <button
            onClick={() => {
              const selectionIds = betParts?.map(part => part.selectionId).filter(Boolean) || [];
              setIsRebetting(true);
              handleRebet(selectionIds, dispatch);
            }}
            disabled={isRebetting}
            className="px-2 w-[50px] h-[26px] bg-base-100 body-txtColor-2 text-xs font-medium rounded transition-colors hover:bg-base-300 disabled:opacity-50">

            {isRebetting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              </div>
            ) : ("Rebet")}
          </button>
        )}

      </div>
    </>
  );
};

export default BetHeader;
