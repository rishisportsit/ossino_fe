import { useEffect, useState } from 'react';
import { type ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { closeDialog, DIALOG_TYPE } from 'store/dialog/slice';
import {
  getVipDetails,
  getVipGamesData,
  type VipSelectedGame,
  updateVipGames,
  generateVipAffiliate,
  clearErrorMessage,
  clearSuccessMessage,
  selectVipSelectedGamesAreFresh,
  selectAffiliateData,
  selectAffiliateLoading,
  clearVipCache,
  checkVipData,
} from 'store/vip/slice';
import { fetchGames } from 'store/games/slice';
import { selectGamesWithFavorites } from 'store/games/selectors';
import { selectCategories } from 'store/categories/selectors';
import { getCategories } from 'store/categories/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { type Game } from 'api/content/content.types';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';

import Input from 'components/shared/ui/Input';
import { toast } from 'sonner';
import GameCard from '../GameCard';
import searchNormal from '/icons/searchNormal.svg?url';
import copy from '/icons/copy.svg?url';
import Loader from 'components/shared/ui/Loader';
import { config } from 'config/index';

type Values = {
  name: string;
  url: string;
  games: string[];
};

const createFormSchema = () =>
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    url: z.string(),
    games: z
      .string()
      .array()
      .min(1, { message: 'Please select at least 1 game' })
      .max(5, { message: 'Maximum 5 games allowed' }),
  });

type VipEditFormProps = {
  defaultValues: Values;
  isNew?: boolean;
};

const VipEditForm = ({ defaultValues, isNew = false }: VipEditFormProps) => {
  const { screenWidth } = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const affiliateData = useAppSelector(selectAffiliateData);
  const affiliateLoading = useAppSelector(selectAffiliateLoading);
  const selectedGames = useAppSelector((state) => state.vip.selectedGames.data);
  const selectedGamesLoading = useAppSelector(
    (state) => state.vip.selectedGames.loading,
  );
  const vipName = useAppSelector((state) => state.vip.vipName);
  const vipErrorMessage = useAppSelector((state) => state.vip.errorMessage);
  const vipSuccessMessage = useAppSelector((state) => state.vip.successMessage);

  const games = useAppSelector(selectGamesWithFavorites);
  const categories = useAppSelector(selectCategories);
  const gamesLoading = useAppSelector((state) => state.games.loading);
  const gamesError = useAppSelector((state) => state.games.error);
  const vipSelectedGamesAreFresh = useAppSelector(
    selectVipSelectedGamesAreFresh,
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (games && games.length > 0) {
    const gameIds = games.map((g) => g.id);
    const uniqueIds = [...new Set(gameIds)];
    if (gameIds.length !== uniqueIds.length) {
      console.warn('VipEditForm: Duplicate game IDs detected', {
        totalGames: gameIds.length,
        uniqueGames: uniqueIds.length,
        duplicates: gameIds.filter(
          (id, index) => gameIds.indexOf(id) !== index,
        ),
      });
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the centralized config for website URL with staging fallback
  const siteUrl = config.websiteUrl || 'https://ossino-stg.negroup-tech.net';
  const dynamicVipUrl = affiliateData?.btag
    ? `${siteUrl}/register?afid=${affiliateData.btag}`
    : '';

  const formSchema = createFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      url: !isNew && dynamicVipUrl ? dynamicVipUrl : defaultValues.url,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const [search, setSearch] = useState<string>('');

  useEffect(() => {

    dispatch(fetchGames());
    dispatch(getCategories());

    if (
      !isNew &&
      userData?.id &&
      affiliateData?.btag &&
      !vipSelectedGamesAreFresh &&
      !selectedGamesLoading
    ) {

      dispatch(
        getVipGamesData({
          userId: userData.id.toString(),
          affiliateId: affiliateData.btag,
        }),
      );
    } else if (!isNew && !selectedGames) {
      dispatch(getVipDetails());
    }
  }, [
    dispatch,
    userData?.id,
    affiliateData?.btag,
    isNew,
    vipSelectedGamesAreFresh,
    selectedGamesLoading,
    selectedGames,
  ]);

  useEffect(() => {
    if (!isNew && selectedGames && selectedGames.length > 0 && games) {
      const selectedGameIds: string[] = [];
      selectedGames.forEach((vipGame: VipSelectedGame) => {
        const matchingGame = games.find(
          (game: Game) =>
            game.title === vipGame.gameName ||
            game.title === vipGame.name ||
            game.id === vipGame.game_code ||
            game.id === vipGame.gameCode,
        );
        if (matchingGame) {
          selectedGameIds.push(matchingGame.id);
        }
      });



      if (selectedGameIds.length > 0) {
        form.setValue('games', selectedGameIds);
      }

      if (vipName) {
        form.setValue('name', vipName);
      }
    }

    if (dynamicVipUrl) {
      form.setValue('url', dynamicVipUrl);
    }
  }, [isNew, selectedGames, games, vipName, form, dynamicVipUrl]);

  useEffect(() => {
    return () => {
      dispatch(clearErrorMessage());
      dispatch(clearSuccessMessage());
    };
  }, [dispatch]);

  const onSubmit = async (values: Values) => {
    if (!userData?.id) {
      console.error('User data not found');
      return;
    }

    setIsSubmitting(true);

    dispatch(clearSuccessMessage());
    dispatch(clearErrorMessage());

    try {
      let affiliateId = affiliateData?.btag;

      if (isNew && !affiliateId && !affiliateLoading) {

        const affiliateResult = await dispatch(generateVipAffiliate()).unwrap();
        affiliateId = affiliateResult?.result?.data?.btag;
      } else if (isNew && !affiliateId && affiliateLoading) {
        return;
      }

      if (!affiliateId) {
        console.error('Affiliate ID not found');
        return;
      }

      const selectedGameObjects: any[] = [];
      if (games && values.games.length > 0) {
        values.games.forEach((gameId) => {
          const gameData = games.find((g: Game) => g.id === gameId);
          if (gameData) {
            selectedGameObjects.push({
              name: gameData.title,
              gameName: gameData.title,
              provider: gameData.providers?.[0] || 'default',
              game_code: gameData.game_code || gameData.id,
              gameCode: gameData.game_code || gameData.id,
              image: {
                url: gameData.image,
                configurl: gameData.image,
              },
              active: true,
            });
          }
        });
      }

      await dispatch(
        updateVipGames({
          userId: userData.id.toString(),
          affiliateId: affiliateId,
          games: selectedGameObjects,
          userName: values.name || userData.userName || userData.email,
        }),
      ).unwrap();

      dispatch(clearVipCache());

      const VIP_AFFILIATE_CACHE_KEY = 'vip_affiliate_cache';
      const cache = localStorage.getItem(VIP_AFFILIATE_CACHE_KEY);
      if (cache && userData?.id) {
        try {
          const parsedCache = JSON.parse(cache);
          if (parsedCache[userData.id.toString()]) {
            delete parsedCache[userData.id.toString()];
            localStorage.setItem(
              VIP_AFFILIATE_CACHE_KEY,
              JSON.stringify(parsedCache),
            );
          }
        } catch (error) {
          console.warn('Error clearing VIP cache:', error);
        }
      }

      try {
        await dispatch(
          getVipGamesData({
            userId: userData.id.toString(),
            affiliateId: affiliateId,
          }),
        ).unwrap();
      } catch (refreshError) {}

      if (isNew) {
        dispatch(closeDialog({ id: DIALOG_TYPE.vipPage }));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {

        if (userData?.id && affiliateId) {
          dispatch(
            checkVipData({
              userId: userData.id.toString(),
              affiliateId: affiliateId,
            }),
          );
        }

        setTimeout(() => {
          if (screenWidth < BREAKPOINTS.xl) {
            navigate('/loyalty/overview');
          } else {
            dispatch(closeDialog({ id: DIALOG_TYPE.vipPage }));
          }
        }, 300);
      }
    } catch (error) {
      console.error('Error submitting VIP form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClick =
    (field: ControllerRenderProps<Values, 'games'>, game: Game) => () => {
      const index = field.value.indexOf(game.id);
      const array = [...field.value];
      if (index >= 0) {
        array.splice(index, 1);
      } else {
        if (array.length >= 5) {
          toast.error('You can select a maximum of 5 games');
          return;
        }
        array.push(game.id);
      }
      form.setValue('games', array);
    };

  const getFilteredGames = (categoryGames: Game[]) => {
    return categoryGames.filter(
      (game) =>
        search === '' ||
        game.title?.toLowerCase().includes(search?.toLowerCase()),
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 md:gap-4 md:flex-row md:mb-8 xl:gap-5 xl:flex-col xl:mb-10">
          <div className="flex flex-col gap-3 md:w-1/2 justify-between xl:w-full">
            <div>
              <h2 className="font-bold body-txtColor-1 mb-3">
                {isNew ? 'Create your VIP Page' : 'Update your VIP Page'}
              </h2>
              <p className="text-xs body-txtColor-1">
                Share you VIP Page and earn up to&nbsp;
                <span className="text-primary-1">20%</span>&nbsp;on every game that
                the players plays after registering through your VIP page.
              </p>
            </div>
            <div className="rounded-xl bg-base-800 p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        readOnly={!isNew}
                        disabled={!isNew}
                        className={
                          !isNew
                            ? 'bg-base-700 text-base-300 cursor-not-allowed'
                            : ''
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your VIP Page URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={
                            affiliateLoading
                              ? 'Generating your VIP URL...'
                              : dynamicVipUrl
                                ? 'Your VIP URL'
                                : isNew
                                  ? 'VIP URL will be generated automatically'
                                  : 'Your VIP URL will appear here'
                          }
                          className="bg-base-700 border border-base-600 text-base-300 cursor-not-allowed pr-10"
                          {...field}
                          readOnly={true}
                          disabled={true}
                        />
                        {field.value && dynamicVipUrl && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (field.value) {
                                try {
                                  await navigator.clipboard.writeText(
                                    field.value,
                                  );
                                  toast.success('URL copied to clipboard!');
                                } catch (err) {
                                  console.error('Failed to copy URL:', err);
                                  toast.error('Failed to copy URL');
                                }
                              }
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-400 hover:body-txtColor-1"
                          >
                            <Icon
                              id="copyIcon"
                              href={copy}
                              className="h-4 w-4 fill-1"
                            />
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:w-1/2 justify-between xl:w-full">
            <div>
              <h2 className="font-bold body-txtColor-1 mb-3">Select Games</h2>
              <p className="text-xs body-txtColor-1">
                Choose up to 5 games for your earnings.
              </p>
              {games && (
                <p className="text-xs text-base-400 mt-1">
                  {
                    games.filter((game) => {
                      const categoryMatch =
                        selectedCategory === 'all' ||
                        game.categories.includes(selectedCategory);
                      const searchMatch =
                        search === '' ||
                        game.title?.toLowerCase().includes(search?.toLowerCase());
                      return categoryMatch && searchMatch;
                    }).length
                  }{' '}
                  games available
                </p>
              )}
            </div>
            <div className="rounded-xl bg-base-800 p-4">
              {/* Category Selection */}
              {categories && categories.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm font-medium body-txtColor-1 mb-2 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded bg-base-700 border border-base-600 body-txtColor-1"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search Input */}
              <div className="relative flex-1 mb-5">
                <Input
                  className="pl-[42px]"
                  onChange={(event) => setSearch(event.target.value)}
                  value={search}
                  placeholder="Search games"
                />
                <Icon
                  id="searchNormalIcon"
                  href={searchNormal}
                  className="w-5 h-5 fill-base-500 absolute left-3 top-[10px]"
                />
              </div>
              {/* Selection counter and controls */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-base-300">
                    Selected:{' '}
                    <span className="body-txtColor-1 font-medium">
                      {form.watch('games')?.length || 0} / 5
                    </span>{' '}
                    games
                  </span>
                  {form.watch('games')?.length >= 5 && (
                    <span className="text-xs text-amber-400 bg-amber-100/10 px-2 py-1 rounded">
                      Maximum reached
                    </span>
                  )}
                </div>
                {form.watch('games')?.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => form.setValue('games', [])}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Show selected games if any */}
              {form.watch('games')?.length > 0 && (
                <div className="mb-4 p-3 bg-base-700 rounded-lg border border-base-600">
                  <h4 className="text-sm font-medium body-txtColor-1 mb-2">
                    Selected Games:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {form.watch('games')?.map((gameId) => {
                      const game = games?.find((g) => g.id === gameId);
                      return game ? (
                        <div
                          key={gameId}
                          className="flex items-center gap-2 bg-primary-1/20 text-primary-1 px-2 py-1 rounded text-xs border border-primary-1/30"
                        >
                          <span className="truncate max-w-20">
                            {game.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newGames =
                                form
                                  .watch('games')
                                  ?.filter((id) => id !== gameId) || [];
                              form.setValue('games', newGames);
                            }}
                            className="text-primary-1 hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="games"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {gamesLoading ? (
                        <div className="text-center py-4 body-txtColor-1">
                          <Loader />
                        </div>
                      ) : gamesError ? (
                        <div className="text-center py-4 text-red-500">
                          Error loading games. Please try again.
                        </div>
                      ) : games &&
                        games.length > 0 &&
                        categories &&
                        categories.length > 0 ? (
                        (() => {
                          const categoryGames =
                            selectedCategory === 'all'
                              ? games
                              : games.filter((game) => {
                                  const selectedCategoryObj = categories?.find(
                                    (c) => c.id.toString() === selectedCategory,
                                  );
                                  if (!selectedCategoryObj) return false;
                                  return (
                                    game.categories.includes(
                                      selectedCategoryObj.label,
                                    ) ||
                                    game.categories.includes(
                                      selectedCategory,
                                    ) ||
                                    game.categories
                                      .map((cat) => cat?.toLowerCase())
                                      .includes(
                                        selectedCategoryObj.label?.toLowerCase(),
                                      )
                                  );
                                });
                          const filteredGames = getFilteredGames(categoryGames);

                          return filteredGames.length > 0 ? (
                            <div className="bg-base-700 rounded-lg border border-base-600">
                              <div className="p-4">
                                <div className="text-sm text-base-300 mb-3">
                                  {filteredGames.length} game
                                  {filteredGames.length !== 1 ? 's' : ''}{' '}
                                  available
                                  {selectedCategory !== 'all' && (
                                    <span className="ml-2 text-primary-1">
                                      in{' '}
                                      {
                                        categories?.find(
                                          (c) =>
                                            c.id.toString() ===
                                            selectedCategory,
                                        )?.label
                                      }
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="max-h-96 overflow-y-auto px-4 pb-4 vip-games-scroll">
                                <div className="grid grid-cols-4 gap-3 min-h-[200px]">
                                  {filteredGames.map(
                                    (game: Game, index: number) => (
                                      <div
                                        key={`${game.id}-${index}-${selectedCategory}`}
                                        className={cn(
                                          'relative transition-all duration-200 cursor-pointer',
                                          field.value.length >= 5 &&
                                            !field.value.includes(game.id) &&
                                            'opacity-50 cursor-not-allowed',
                                        )}
                                      >
                                        <GameCard
                                          onClick={onClick(field, game)}
                                          selected={field.value.includes(
                                            game.id,
                                          )}
                                          title={game.title}
                                          image={game.image}
                                          categoryIcon={game.categoryicon}
                                        />
                                      </div>
                                    ),
                                  )}
                                </div>
                                {filteredGames.length === 0 && (
                                  <div className="text-center py-8 text-base-400">
                                    <p className="text-sm">
                                      No games found in this category
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-base-400 bg-base-700 rounded-lg border border-base-600">
                              <div className="mb-3">
                                <Icon
                                  id="searchNormalIcon"
                                  href={searchNormal}
                                  className="w-8 h-8 mx-auto opacity-50 fill-base-500"
                                />
                              </div>
                              <p className="text-sm">
                                {search
                                  ? `No games found matching "${search}"`
                                  : 'No games available'}
                              </p>
                              {search && (
                                <button
                                  type="button"
                                  onClick={() => setSearch('')}
                                  className="text-primary-1 text-xs mt-2 hover:underline"
                                >
                                  Clear search
                                </button>
                              )}
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-8 text-base-400">
                          <div className="mb-3">
                            <Icon
                              id="searchNormalIcon"
                              href={searchNormal}
                              className="w-8 h-8 mx-auto opacity-50 fill-base-500"
                            />
                          </div>
                          <p className="text-sm">
                            {search
                              ? `No games found matching "${search}"`
                              : 'No games available'}
                          </p>
                          {search && (
                            <button
                              type="button"
                              onClick={() => setSearch('')}
                              className="text-primary-1 text-xs mt-2 hover:underline"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {vipErrorMessage && (
          <div className="text-red-500 text-sm mb-4 p-3 bg-red-100 rounded-lg">
            {vipErrorMessage}
          </div>
        )}

        {vipSuccessMessage && (
          <div className="text-green-500 text-sm mb-4 p-3 bg-secondary-100 rounded-lg">
            {vipSuccessMessage}
          </div>
        )}

        <Button
          variant="filled"
          className="w-full md:w-fit xl:w-full md:px-16"
          disabled={
            isSubmitting || gamesLoading || selectedGamesLoading || !games
          }
        >
          {isSubmitting ? (
            isNew ? (
              'Creating VIP Page...'
            ) : (
              'Updating VIP Page...'
            )
          ) : gamesLoading ? (
            <Loader />
          ) : isNew ? (
            'Create VIP Page'
          ) : (
            'Update VIP Page'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VipEditForm;
