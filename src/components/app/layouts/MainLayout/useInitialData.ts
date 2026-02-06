import { useEffect } from 'react';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { fetchGames } from 'store/games/slice';
import { useAppDispatch } from 'store/index';
import { fetchProviders } from 'store/providers/slice';
import { fetchTopMenu, fetchBottomMenu } from 'store/sidebar/slice';
import { getCategories } from 'store/categories/slice';
import { fetchBanner } from 'store/banner/slice';
import { getPromotions } from 'store/promotions/slice';
import { getQuickLinks, getSecurityLinks } from 'store/footer/slice';
import { getFooterContent } from 'store/footer/footerSlice';
import { getLoyaltyDetails } from 'store/loyaltyDetails/slice';
import { getWalletCurrencies } from 'store/wallet/slice';
import { getTopLeagues } from 'store/SportsHomePage/slice';
import { selectSiteMode } from 'store/siteMode/selectors';
import { SPORTS_ID, STORAGE_KEYS } from 'constants/storage';

export const useInitialData = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const siteMode = useAppSelector(selectSiteMode);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLoyaltyDetails());
      dispatch(getWalletCurrencies({}));
    }
    dispatch(fetchBanner());
    dispatch(getCategories());
    dispatch(fetchTopMenu());
    dispatch(fetchBottomMenu());
    dispatch(fetchGames());
    dispatch(getPromotions());
    dispatch(fetchProviders());
    dispatch(getSecurityLinks());
    dispatch(getQuickLinks());
    dispatch(getFooterContent());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (siteMode === 'sports') {
      const xApiKey = import.meta.env.VITE_X_Api_Key;
      const xClientId = import.meta.env.VITE_X_Client_Id;
      const accessToken = localStorage.getItem(STORAGE_KEYS?.accessToken) || '';

      dispatch(getTopLeagues({
        sportId: SPORTS_ID.sportId,
        accessToken,
        minutes: 43200,
        'X-Client-Id': xClientId,
        'X-Api-Key': xApiKey,
        isNextBetRequired: false,
      }));
    }
  }, [dispatch, siteMode]);
};
