import { useEffect } from 'react';
import {
  selectCategories,
  selectCategoriesLoading,
} from 'store/categories/selectors';
import { selectSelectedGameType } from 'store/sidebar/selectors';
import { getCategories } from 'store/categories/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectSiteMode } from 'store/siteMode/selectors';
import { sportsCategoriesItems } from 'components/shared/MenuItem/menuItemsSports';
import MenuList from '../MenuItem/MenuList';
import MenuListLoader from './MenuListLoader';
import { useLocation } from 'react-router-dom';

interface CategoriesMenuListProps {
  isOpen: boolean;
  onClick: (itemId: number | string) => void;
}

const CategoriesMenuList = ({ isOpen, onClick }: CategoriesMenuListProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectSiteMode);
  const location = useLocation();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const selectedGameType = useAppSelector(selectSelectedGameType);

  useEffect(() => {
    const gameTypeForCategories = selectedGameType &&
      !['Favourites', 'Providers', 'Discovery'].includes(selectedGameType)
      ? selectedGameType
      : undefined;

    dispatch(getCategories(gameTypeForCategories));
  }, [dispatch, selectedGameType]);

  if (mode === 'casino' && categoriesLoading) {
    return <MenuListLoader isOpen={isOpen} />;
  }

  const list = mode === 'casino' ? (categories ?? []) : sportsCategoriesItems;
  if (!categories || categories.length === 0 || location.pathname !== '/') {
    return null;
  }

  return (
    <MenuList list={list} isOpen={isOpen} onClick={onClick} withBorder />
  );
};

export default CategoriesMenuList;
