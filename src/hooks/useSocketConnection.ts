import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketService } from '../services/socketService';
import { updateWalletBalance } from '../store/wallet/slice';
import { selectIsLoggedIn } from '../store/user/selectors';

export const useSocketConnection = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      socketService.connect();

      const handleBalanceUpdate = (data: any) => {
        console.log('Socket balance update received:', data);
        if (data) {
          dispatch(updateWalletBalance(data));
        }
      };

      socketService.on('balanceupdate', handleBalanceUpdate);

      return () => {
        socketService.off('balanceupdate', handleBalanceUpdate);
      };
    } else {
      socketService.disconnect();
    }
  }, [isLoggedIn, dispatch]);
};
