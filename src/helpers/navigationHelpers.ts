import { NavigateFunction } from 'react-router-dom';
import { 
  shouldRedirectToDeposit, 
  clearPendingBonusRedirect, 
  getStoredBonusSelection,
  clearStoredBonusSelection 
} from './bonusHelpers';
import { openDialog, DIALOG_TYPE } from 'store/dialog/slice';
import { AppDispatch } from 'store/index';

export const handlePostRegistrationRedirect = (
  navigate: NavigateFunction, 
  dispatch: AppDispatch,
  defaultRoute: string = '/'
): void => {
  try {
    if (shouldRedirectToDeposit()) {
      const storedBonus = getStoredBonusSelection();
      
      if (storedBonus && storedBonus.bonusType !== 'NONE') {

        
        clearPendingBonusRedirect();
        
        dispatch(openDialog({ 
          id: DIALOG_TYPE.wallet, 
          data: { 
            tab: 'deposit',
            fromRegistration: true,
            selectedBonus: storedBonus 
          } 
        }));
        
        navigate(defaultRoute);
        return;
      }
    }
    
    navigate(defaultRoute);
  } catch (error) {
    console.error('Error handling post-registration redirect:', error);
    navigate(defaultRoute);
  }
};

export const clearBonusRedirectData = (): void => {
  clearPendingBonusRedirect();
  clearStoredBonusSelection();
};

export const hasActiveBonusSelection = (): boolean => {
  const storedBonus = getStoredBonusSelection();
  return storedBonus !== null && storedBonus.bonusType !== 'NONE';
};

export const getBonusForDepositPage = () => {
  const storedBonus = getStoredBonusSelection();
  
  if (!storedBonus || storedBonus.bonusType === 'NONE') {
    return null;
  }
  
  return {
    id: storedBonus.actualBonusId,
    type: storedBonus.bonusType,
    title: storedBonus.bonusDetails?.title || '',
    description: storedBonus.bonusDetails?.description || '',
    percentage: storedBonus.bonusDetails?.percentage,
    maxAmount: storedBonus.bonusDetails?.maxAmount,
    selectedAt: storedBonus.selectedAt,
  };
};