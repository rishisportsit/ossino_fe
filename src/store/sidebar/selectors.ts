import type { ClientType } from 'constants/clientType';
import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { transformBottomMenuItems } from 'components/shared/NavBar/navigationsItems';
import { selectMenuItems } from './helpers';

const selectMenuItemsData = (state: RootState) => state.sidebar.menuItems;
const selectBottomMenuItemsData = (state: RootState) => state.sidebar.bottomMenuItems;

export const selectTopMenuItems = (device: ClientType) =>
  createSelector(
    selectMenuItemsData,
    selectIsLoggedIn,
    (menuItems, isAuth) => selectMenuItems(menuItems, isAuth, device),
  );

export const selectBottomMenuItems = (device: ClientType) =>
  createSelector(
    selectBottomMenuItemsData,
    selectIsLoggedIn,
    (menuItems, isAuth) => transformBottomMenuItems(menuItems, isAuth, device),
  );

export const selectMenuItemsLoading = (state: RootState) =>
  state.sidebar.loading;

export const selectSelectedGameType = (state: RootState) =>
  state.sidebar.selectedGameType;
