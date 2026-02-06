import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import {
  selectError,
  selectGamesByCategories,
  selectIsLoading,
} from 'store/games/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useMemo, useEffect } from 'react';
import GamesSkeleton from '../GamesSkeleton';
import { fetchGames } from 'store/games/slice';
import GamesSlider from '../GamesSlider';
import LastWinsBlock from '../LastWinsBlock';
import NoGamesMessage from '../NoGamesMessage';
import ProvidersBlock from '../ProvidersBlock';
import { selectCategories, selectCategoriesLoading } from 'store/categories/selectors';
import { getCategories } from 'store/categories/slice';

type MainPageBlocksProps = {
  category: string;
};

const MainPageBlocks = ({ category }: MainPageBlocksProps) => {
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const gamesByCategories = useAppSelector(selectGamesByCategories);
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories?.length <= 0) {
      dispatch(getCategories());
    }
    if (!gamesByCategories) {
      dispatch(fetchGames());
    }
  }, [dispatch, gamesByCategories, categories]);

  const { filteredCategories } = useMemo(() => {
    if (!gamesByCategories || !categories) {
      return { filteredGames: [], filteredCategories: [] };
    }

    if (category === 'Lobby') {
      return {
        filteredGames: Object.values(gamesByCategories).flatMap(
          (categoryData) => categoryData.games || [],
        ),
        filteredCategories: Object.keys(gamesByCategories),
      };
    } else {
      const selectedCategoryObj = categories.find(
        (cat) => cat.label === category,
      );
      if (!selectedCategoryObj) {
        return { filteredGames: [], filteredCategories: [] };
      }

      const categoryData = gamesByCategories[selectedCategoryObj.id];
      return {
        filteredGames: categoryData?.games || [],
        filteredCategories: categoryData ? [selectedCategoryObj.id] : [],
      };
    }
  }, [category, gamesByCategories, categories]);

  if (error) {
    const { message } = error;

    return (
      <>
        <div className="flex justify-center items-center py-[70px]">
          <ErrorMessage message={message} />
        </div>
        <ProvidersBlock />
        <LastWinsBlock />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <GamesSkeleton />
        <GamesSkeleton />
        <GamesSkeleton />
        <ProvidersBlock />
        <GamesSkeleton />
        <GamesSkeleton />
        <GamesSkeleton />
        <LastWinsBlock />
      </>
    );
  }

  if (categoriesLoading || !categories) {
    return (
      <>
        <GamesSkeleton />
        <GamesSkeleton />
        <GamesSkeleton />
        <ProvidersBlock />
        <GamesSkeleton />
        <GamesSkeleton />
        <GamesSkeleton />
        <LastWinsBlock />
      </>
    );
  }

  if (category !== 'Lobby' && category !== 'All') {
    if (filteredCategories.length === 0) {
      return <NoGamesMessage label={category} message="No games found" />;
    }

    const categoryId = filteredCategories[0];
    const categoryData = gamesByCategories?.[categoryId];

    if (!categoryData) {
      return <NoGamesMessage label={category} message="No games found" />;
    }

    const { games, href } = categoryData;

    return (
      <div className="-mt-[1.334px]">
        <GamesSlider games={games} label={category} href={href} />
      </div>
    );
  }

  if (!gamesByCategories) {
    return (
      <>
        <div className="flex justify-center items-center py-[70px]">
          <NoItemsMessage message="No games found" />
        </div>
        <ProvidersBlock />
        <LastWinsBlock />
      </>
    );
  }

  const categoriesToShow =
    category === 'Lobby'
      ? Object.keys(gamesByCategories)
      : Object.keys(gamesByCategories);

  return (
    <>
      {categoriesToShow.map((key, index, { length }) => {
        const { games, href } = gamesByCategories[key];
        const categoryLabel =
          categories?.find((cat) => cat.id === key)?.label || key;

        if (index === Math.ceil(length / 2) - 1) {
          return (
            <div key={key}>
              <GamesSlider games={games} label={categoryLabel} href={href} />
              <div className="mt-8">
                <ProvidersBlock />
              </div>
            </div>
          );
        }

        return (
          <GamesSlider
            key={key}
            games={games}
            label={categoryLabel}
            href={href}
          />
        );
      })}
      <LastWinsBlock />
    </>
  );
};

export default MainPageBlocks;
