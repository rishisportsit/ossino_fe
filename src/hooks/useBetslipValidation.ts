import { useEffect, useCallback, useRef } from 'react';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';

interface UseBetslipValidationProps {
  match: Fixture;
  addingSelections: any[];
  setAddingSelections: React.Dispatch<React.SetStateAction<any[]>>;
}

export const useBetslipValidation = ({
  match,
  addingSelections,
  setAddingSelections,
}: UseBetslipValidationProps) => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const lastUpdateTimeRef = useRef<number>(0);
  const validateSelections = useCallback(() => {
    if (!match?.markets || addingSelections.length === 0) return;

    let hasChanges = false;

    const updatedSelections = addingSelections.filter((betslipMatch) => {
      if (betslipMatch.providerFixtureId !== match.providerFixtureId) return true;


      const validMarkets = betslipMatch.markets?.filter((betslipMarket: any) => {
        const currentMarket = match.markets?.find(
          (m) => String(m.marketId) === String(betslipMarket.marketId)
        );

        // Remove market if it doesn't exist
        if (!currentMarket) {
          hasChanges = true;
          return false;
        }
        if (currentMarket.marketStatusName !== "Active") {
          if (betslipMarket.selections && betslipMarket.selections.length > 0) {
            hasChanges = true;
          }
          betslipMarket.selections = [];
          return false;
        }
        if (currentMarket.marketStatusName !== betslipMarket.marketStatusName) {
          betslipMarket.marketStatusName = currentMarket.marketStatusName;
          hasChanges = true;
        }

        const validSelections = betslipMarket.selections?.filter((betslipSelection: any) => {
          const currentSelection = currentMarket.selections?.find(
            (s) => s.selectionId === betslipSelection.selectionId
          );

          // Only remove if selection completely doesn't exist
          if (!currentSelection) {
            hasChanges = true;
            return false;
          }

          // Update selection status without removing (allow user to see status changes)
          if (betslipSelection.selectionStatus !== currentSelection.selectionStatus) {
            betslipSelection.selectionStatus = currentSelection.selectionStatus;
            hasChanges = true;
          }

          if (betslipSelection.selectionSuspended !== currentSelection.selectionSuspended) {
            betslipSelection.selectionSuspended = currentSelection.selectionSuspended;
            hasChanges = true;
          }
          const isLockedOdds = Number(currentSelection.decimalOdds) <= LOCKED_ODDS_THRESHOLD;
          const isSuspended = currentSelection?.selectionSuspended === true;
          const isInactive = currentSelection?.selectionStatus.toLowerCase() !== "active" ;
          const timeSinceLastUpdate = Date.now() - lastUpdateTimeRef.current;
          const gracePeriodExpired = timeSinceLastUpdate > 5000;
          if (isLockedOdds && isSuspended && isInactive && gracePeriodExpired) {
            hasChanges = true;
            return false;
          }
          if (betslipSelection.decimalOdds !== currentSelection.decimalOdds) {
            betslipSelection.decimalOdds = currentSelection.decimalOdds;
            hasChanges = true;
          }

          return true;
        });

        betslipMarket.selections = validSelections;
        return validSelections && validSelections.length > 0;
      });

      betslipMatch.markets = validMarkets;
      return validMarkets && validMarkets.length > 0;
    });

    if (hasChanges) {
      setAddingSelections(updatedSelections);
      window.dispatchEvent(new CustomEvent('betslip_validated', { 
        detail: { 
          hasRemovals: updatedSelections.length < addingSelections.length,
          timestamp: Date.now()
        }
      }));
    }
  }, [match, addingSelections, setAddingSelections]);
  useEffect(() => {
    const handleSocketUpdate = () => {
      lastUpdateTimeRef.current = Date.now();
    };
    window.addEventListener('odds_updated', handleSocketUpdate);
    return () => {
      window.removeEventListener('odds_updated', handleSocketUpdate);
    };
  }, []);
  useEffect(() => {
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    lastUpdateTimeRef.current = Date.now();

    debounceTimeoutRef.current = setTimeout(() => {
      validateSelections();
    }, 2000);
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [validateSelections]);
  useEffect(() => {
    if (!match?.providerFixtureId) return;
    const hasMatchInBetslip = addingSelections.some(
      (betslipMatch) => betslipMatch.providerFixtureId === match.providerFixtureId
    );
    if (!hasMatchInBetslip) return;
    if (!match.markets || match.markets.length === 0) {
      const filteredSelections = addingSelections.filter(
        (betslipMatch) => betslipMatch.providerFixtureId !== match.providerFixtureId
      );
      
      if (filteredSelections.length !== addingSelections.length) {
        setAddingSelections(filteredSelections);
      }
    }
  }, [match?.providerFixtureId, match?.markets, addingSelections, setAddingSelections]);
};