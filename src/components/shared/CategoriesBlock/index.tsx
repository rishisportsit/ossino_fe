import { FILTERS } from 'constants/filters';
import { ROUTES } from 'constants/routes';
import Button from 'components/shared/Button';
import Icon from 'components/shared/Icon';
import Slider from 'components/shared/Slider';
import { replaceString } from 'helpers/common';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import home from '/icons/home2.svg?url';
import {
  selectCategories,
  selectCategoriesLoading,
} from 'store/categories/selectors';
import { selectSelectedGameType } from 'store/sidebar/selectors';
import { getCategories } from 'store/categories/slice';
import { useAppSelector, useAppDispatch } from 'store/index';
import { Skeleton } from '../ui/Skeleton';

interface ICategoriesBlockProps {
  applyCurrentCategory?: (category: string[]) => void;
  currentCategory?: string[];
}

const CategoriesBlock = ({ applyCurrentCategory, currentCategory: propCurrentCategory }: ICategoriesBlockProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const selectedGameType = useAppSelector(selectSelectedGameType);


  const [currentCategory, setCurrentCategory] = useState<string[]>(['Lobby']);
  const { pathname } = useLocation();
  const { screenWidth } = useBreakpoint();
  const { clearFilter, categories, applyFilter } = useCustomQueryParams();
  const xl = screenWidth >= BREAKPOINTS.xl;

  useEffect(() => {
    const gameTypeForCategories = selectedGameType &&
      !['Favourites', 'Providers', 'Discovery'].includes(selectedGameType)
      ? selectedGameType
      : undefined;

    dispatch(getCategories(gameTypeForCategories));
  }, [dispatch, selectedGameType]);

  const staticLobbyCategory = {
    id: 'lobby',
    label: 'Lobby',
    icon: {
      id: 'home2Icon',
      href: home,
    },
  };

  const onClickHandler = (category: string) => {
    if (pathname === ROUTES.search) {
      if (category === 'Lobby') {
        if (applyCurrentCategory) {
          applyCurrentCategory(['Lobby']);
        } else {
          clearFilter(FILTERS.category);
        }
      } else {
        if (applyCurrentCategory) {
          applyCurrentCategory([category]);
        } else {
          applyFilter(FILTERS.category, category);
        }
      }
      return;
    }

    if (applyCurrentCategory) {
      applyCurrentCategory([category]);
      setCurrentCategory([category]);
    }
  };

  if (categoriesLoading) {
    return (
      <Slider withShadow slidesPerView={xl ? 7 : undefined}>
        {Array.from({ length: 7 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} style={{ width: xl ? '173px' : 'auto' }}>
            <Skeleton className="h-9 rounded-[12px] bg-base-600" />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!items) return null;

  const selectedItem = (category: string) => {
    if (pathname === ROUTES.search) {
      if (category === 'Lobby' && !categories.length) {
        return true;
      }
      if (propCurrentCategory) {
        return propCurrentCategory.includes(category);
      }
      return categories.includes(category as string);
    }

    if (propCurrentCategory !== undefined) {
      return propCurrentCategory.includes(category);
    }

    return currentCategory.includes(category);
  };

  const allCategories = [staticLobbyCategory, ...items];

  return (
    <Slider withShadow>
      {allCategories.map((item) => {
        if (pathname === ROUTES.search && item.label === 'Providers') {
          return null;
        }

        return (
          <SwiperSlide key={item.id} style={{ width: xl ? '173px' : 'auto' }}>
            <Button
              onClick={() => onClickHandler(item.label as string)}
              className={cn(
                'bg-base-750 w-full flex items-center justify-center gap-2 rounded-[12px] border border-transparent',
                { 'border-primary-2 ': selectedItem(item.label) },
              )}
            >
              {'id' in item.icon && (
                <Icon
                  id={item.icon.id}
                  href={item.icon.href}
                  className="w-5 h-5 fill-current text-secondary-light-2"
                />
              )}
              <span className={cn('body-txtColor-1 capitalize', { 'text-special-2': selectedItem(item.label) })}>
                {replaceString(item.label, /-/g, ' ')}
              </span>
            </Button>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};

export default CategoriesBlock;
