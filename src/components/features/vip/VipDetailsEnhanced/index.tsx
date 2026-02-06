import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from 'store/index';
import {
  updateVipGames,
  setVipName,
  clearSuccessMessage,
  clearErrorMessage,
  getVipGamesData,
  selectVipSelectedGamesAreFresh,
} from 'store/vip/slice';
import { type Game, type VipDetailsData } from 'store/vip/slice';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';

import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shared/ui/Form';
import { toast } from 'sonner';
import Icon from 'components/shared/Icon';
import { VipSheetView } from 'components/features/overview/VipSheet';
import EarningOverview from '../EarningOverview';
import GameCard from '../GameCard';
import SliderGames from '../SliderGames';
import { config } from 'config/index';
import arrowRight from '/icons/arrowRight.svg?url';
import copy from '/icons/copy.svg?url';
import edit from '/icons/edit.svg?url';
import exp from '/icons/export.svg?url';

type VipDetailsProps = {
  onViewChange?: (view: VipSheetView) => void;
  games: Game[];
  data?: VipDetailsData | null;
};

const vipNameSchema = z.object({
  vipName: z
    .string()
    .min(4, 'Please choose a name between 4 to 12 characters in length.')
    .max(12, 'Please choose a name between 4 to 12 characters in length.')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Please choose a name that only contains alphanumeric characters (letters and numbers).',
    ),
});

const VipDetailsEnhanced = ({ onViewChange, games, data }: VipDetailsProps) => {
  const dispatch = useAppDispatch();
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const user = useAppSelector((state) => state.user.data);
  const affiliate = useAppSelector((state) => state.vip.affiliate);
  const selectedGames = useAppSelector((state) => state.vip.selectedGames);
  const vipName = useAppSelector((state) => state.vip.vipName);
  const affiliateSummary = useAppSelector(
    (state) => state.vip.affiliateSummary?.data ?? null,
  );
  const isVipNameUpdated = useAppSelector(
    (state) => state.vip.isVipNameUpdated,
  );
  const successMessage = useAppSelector((state) => state.vip.successMessage);
  const errorMessage = useAppSelector((state) => state.vip.errorMessage);
  const vipSelectedGamesAreFresh = useAppSelector(
    selectVipSelectedGamesAreFresh,
  );

  // Get commission percentage from affiliate summary, fallback to 10%
  const commissionPercentage = Array.isArray(affiliateSummary)
    ? affiliateSummary[0]?.commissionPercentage || 10
    : 10;

  const [copiedText, setCopiedText] = useState('');

  const hasReachedVipLevel = loyaltyDetails?.level === 'level6';
  const hasAffiliateData = !!affiliate.data?.btag;

  const form = useForm<z.infer<typeof vipNameSchema>>({
    resolver: zodResolver(vipNameSchema),
    defaultValues: { vipName: vipName || '' },
  });

  const filteredGames = useMemo(() => {
    if (data?.games && games) {
      return games.filter((g) => data.games.includes(g.id));
    }
    return (selectedGames.data || []).map((vipGame) => ({
      id: parseInt(vipGame.game_code || vipGame.gameCode || '0', 10),
      title: vipGame.gameName || vipGame.name || 'Unknown Game',
      image:
        typeof vipGame.image === 'string'
          ? vipGame.image
          : vipGame.image?.url ||
          vipGame.image?.configurl ||
          '/images/default-game.png',
      link: '#',
    }));
  }, [games, data, selectedGames.data]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [dispatch, errorMessage]);

  useEffect(() => {
    if (
      hasAffiliateData &&
      user?.id &&
      !vipSelectedGamesAreFresh &&
      !selectedGames.loading &&
      !selectedGames.data
    ) {
      dispatch(
        getVipGamesData({
          userId: user.id.toString(),
          affiliateId: affiliate.data?.btag || '',
        }),
      );
    }
  }, [
    dispatch,
    hasAffiliateData,
    user?.id,
    vipSelectedGamesAreFresh,
    selectedGames.loading,
    selectedGames.data,
    affiliate.data?.btag,
  ]);

  const changeView = (view: VipSheetView) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  const onCopy = async () => {
    // Use the centralized config for website URL with staging fallback
    const siteUrl = config.websiteUrl || 'https://ossino-stg.negroup-tech.net';
    const url =
      hasAffiliateData && affiliate.data?.btag
        ? `${siteUrl}/register?afid=${affiliate.data.btag}`
        : '';

    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedText('Copied!');
        setTimeout(() => setCopiedText(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const onShare = async () => {
    // Use the centralized config for website URL with staging fallback
    const siteUrl = config.websiteUrl || 'https://ossino-stg.negroup-tech.net';
    const url =
      hasAffiliateData && affiliate.data?.btag
        ? `${siteUrl}/register?afid=${affiliate.data.btag}`
        : '';

    if (url && navigator.share) {
      try {
        await navigator.share({
          title: 'Ossino - VIP',
          text: 'Join me on Ossino!',
          url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedText('Link copied to clipboard!');
        setTimeout(() => setCopiedText(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const onSubmitVipName = async (values: z.infer<typeof vipNameSchema>) => {
    if (!user?.id || !hasAffiliateData) return;

    dispatch(setVipName(values.vipName));

    const vipGames = (selectedGames.data || []).map((game) => ({
      gameName: game.gameName || game.name || '',
      aggregator_type: game.aggregator_type || game.aggregator || '',
      provider: game.provider || '',
      game_code: game.game_code || game.gameCode || '',
      image: {
        url:
          typeof game.image === 'string' ? game.image : game.image?.url || '',
        configurl:
          typeof game.image === 'string'
            ? game.image
            : game.image?.configurl || '',
      },
      gametype: game.gametype || '',
    }));

    dispatch(
      updateVipGames({
        userId: user.id.toString(),
        affiliateId: affiliate.data?.btag || '',
        games: vipGames,
        userName: values.vipName,
      }),
    );
  };

  // If user hasn't reached VIP level yet, show message
  if (!hasReachedVipLevel) {
    return (
      <div className="px-4 py-8 text-center">
        <h2 className="font-bold text-xl mb-4">VIP Access</h2>
        <p className="text-base-300 mb-4">
          Reach Level 6 to unlock VIP features and start earning through
          referrals!
        </p>
        <div className="w-24 h-24 mx-auto mb-4 bg-base-700 rounded-full flex items-center justify-center">
          <Icon
            id="crownIcon"
            href="/icons/crown2.svg"
            className="w-12 h-12 text-base-400"
          />
        </div>
      </div>
    );
  }

  // If affiliate is loading, show loading state
  if (affiliate.loading) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-1 mx-auto mb-4" />
        <p className="text-base-300">Setting up your VIP account...</p>
      </div>
    );
  }

  // If we have affiliate data but selectedGames is still loading, show loading state
  if (hasAffiliateData && selectedGames.loading) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-1 mx-auto mb-4" />
        <p className="text-base-300">Loading your VIP data...</p>
      </div>
    );
  }

  // If no affiliate data OR (has affiliate but no VIP name AND no existing selected games), show VIP name form
  if (
    !hasAffiliateData ||
    (!isVipNameUpdated &&
      !vipName &&
      (!selectedGames.data || selectedGames.data.length === 0))
  ) {
    return (
      <div className="px-4">
        <div className="p-6 rounded-xl bg-base-800">
          <h2 className="font-bold text-xl mb-4">Create Your VIP Page</h2>
          <p className="text-base-300 text-sm mb-6">
            Enter your VIP name to create your personalized referral page and
            start earning!
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitVipName)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="vipName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your VIP Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your VIP name (4-12 characters)"
                        {...field}
                        maxLength={12}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            '',
                          );
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={affiliate.loading || selectedGames.loading}
              >
                {affiliate.loading || selectedGames.loading
                  ? 'Creating...'
                  : 'Create VIP Page'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  // Main VIP details view - always use dynamic affiliate URL with centralized config
  const siteUrl = config.websiteUrl || 'https://ossino-stg.negroup-tech.net';
  const vipUrl =
    hasAffiliateData && affiliate.data?.btag
      ? `${siteUrl}/register?afid=${affiliate.data.btag}`
      : '';

  return (
    <div className="px-4 flex flex-col md:flex-row gap-5 md:gap-4 xl:flex-col xl:gap-5 xl:p-0">
      <div className="p-4 rounded-xl bg-base-800 flex-1">
        <div className="flex justify-between mb-3">
          <h2 className="font-bold">Your VIP Page</h2>
          <Link
            className="text-primary-1 flex gap-1 items-center text-sm font-medium xl:hidden"
            to="edit"
          >
            Edit
            <Icon id="editIcon" href={edit} className="h-4 w-4 fill-current text-primary-1" />
          </Link>
          <Button
            variant="outline"
            className="hidden xl:flex gap-1 items-center text-sm font-medium border-none h-6 p-0"
            onClick={() => changeView(VipSheetView.Edit)}
          >
            Edit
            <Icon id="editIcon" href={edit} className="h-4 w-4 fill-currenttext-primary-1" />
          </Button>
        </div>

        {vipName && (
          <div className="mb-3">
            <p className="text-sm text-base-300">
              VIP Name:{' '}
              <span className="body-txtColor-1 font-medium">{vipName}</span>
            </p>
          </div>
        )}

        <p className="text-xs body-txtColor-1 mb-3">
          Share your VIP Page and earn up to&nbsp;
          <span className="text-primary-1">{commissionPercentage}%</span>&nbsp;on every game that the
          players play after registering through your VIP page.
        </p>

        {vipUrl && (
          <div
            className="px-3 h-10 rounded-lg border border-base-600 mb-3 flex justify-between items-center cursor-pointer"
            onClick={onCopy}
          >
            <span className="text-base-100 text-sm truncate flex-1 mr-2">
              {vipUrl}
            </span>
            <div className="flex items-center gap-2">
              {copiedText && (
                <span className="text-primary-1 text-xs">{copiedText}</span>
              )}
              <Icon id="copyIcon" href={copy} className="h-4 w-4 fill-1" />
            </div>
          </div>
        )}

        <Button
          variant="filled"
          className="w-full mb-8 flex gap-2"
          onClick={onShare}
        >
          <Icon id="exportIcon" href={exp} className="h-4 w-4" />
          Share
        </Button>

        {/* Games Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm">
              Selected Games ({filteredGames.length}/5)
            </h3>
          </div>

          {filteredGames && filteredGames.length > 0 ? (
            <SliderGames>
              {filteredGames.map((game, index) => (
                <SwiperSlide key={game.id || index} className="w-14">
                  <GameCard
                    selected
                    title={game.title || ''}
                    image={game.image || ''}
                  />
                </SwiperSlide>
              ))}
            </SliderGames>
          ) : (
            <div className="text-center py-4 text-base-400 text-sm">
              No games selected. Use the Edit VIP Page to choose up to 5 games.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 flex-1 md:gap-3">
        <EarningOverview />
        <Button
          size="xl"
          className="bg-base-800 rounded-xl body-txtColor-1 text-base font-bold w-full justify-between hidden xl:flex"
          onClick={() => changeView(VipSheetView.History)}
        >
          Earning History
          <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
        </Button>
        <Link
          to="history"
          className="bg-base-800 rounded-xl body-txtColor-1 text-base font-bold w-full flex justify-between h-14 items-center px-4 xl:hidden"
        >
          Earning History
          <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
        </Link>
      </div>
    </div>
  );
};

export default VipDetailsEnhanced;
