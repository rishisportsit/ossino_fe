import { useState, useEffect } from 'react';
import { Button } from 'components/shared/ui/Button';
import { promotionsApi } from 'api/promotions/promotions.api';
import { cn } from 'helpers/ui';
import type { CmsPromotionResponse } from 'api/content/content.types';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { useAppDispatch } from 'store/index';
import { getLeaderboard } from 'store/promotionLeaderboard/slice';

interface PromotionDetailsProps {
  cmsData: CmsPromotionResponse;
}

const PromotionDetails = ({ cmsData }: PromotionDetailsProps) => {
  const [optInLoading, setOptInLoading] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  const [optInError, setOptInError] = useState<string | null>(null);
  const [hasLeaderboardMission, setHasLeaderboardMission] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = String(LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '');
  const operatorId = import.meta.env.VITE_OPERATOR_ID || '';

  // On mount, check if leaderboard mission exists for user and promo id
  useEffect(() => {
    async function checkLeaderboardMission() {
      if (!cmsData.selectedpromotionid || !userId) return;
      try {
        const data = await promotionsApi.getLeaderboardPromotions(operatorId, '', userId);
        if (Array.isArray(data) && data.length > 0) {
          const found = data.some(
            (item) => item.promotionMission?.id === cmsData.selectedpromotionid
          );
          setHasLeaderboardMission(found);
          if (found) setOptedIn(true);
        }
      } catch (e) {
        // ignore error, do not block UI
      }
    }
    checkLeaderboardMission();
  }, [cmsData.selectedpromotionid, userId, operatorId]);

  const handleOptIn = async () => {
    if (!cmsData.selectedpromotionid) return;
    setOptInLoading(true);
    setOptInError(null);
    try {
      // Fill required fields for opt-in
      const { VITE_OPERATOR_ID } = import.meta.env;
      const optInPayload = {
        playerId: userId,
        operatorId: VITE_OPERATOR_ID || '',
        brand: VITE_OPERATOR_ID || '',
        promotionId: cmsData.selectedpromotionid,
        optIn: true,
        missionType: 'wager',
      };
      const res = await promotionsApi.updateOpt(optInPayload);
      if ('error' in res && res.error) {
        setOptInError(res.message || 'Opt-in failed');
      } else if (res && res.status === 'SUCCESS' && res.optIn === true) {
        setOptedIn(true);
      } else {
        setOptInError(res.message || 'Opt-in failed');
      }
    } catch (err: any) {
      setOptInError(err?.message || 'Opt-in failed');
    } finally {
      setOptInLoading(false);
    }
  };

  const handleLeaderboard = async () => {
    if (!cmsData.selectedpromotionid) return;

    // First, load the leaderboard data
    const payload = {
      promotionId: cmsData.selectedpromotionid,
      playerId: userId,
      leaderboardSize: '10',
    };

    // Dispatch the action to load promotion leaderboard data
    await dispatch(getLeaderboard(payload));

    // Navigate to leaderboard page with promotion context
    navigate(`/promotion/leaderboard?promotion=${cmsData.selectedpromotionid}`);
  };

  if (!cmsData) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-base-400">No promotion details available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cmsData.offerimage && (
        <div className="mb-4">
          <div dangerouslySetInnerHTML={{ __html: cmsData.offerimage }} />
        </div>
      )}

      <div className="mb-4">
        {cmsData.title && (
          <h2 className="text-xl font-bold body-txtColor-1 mb-2">{cmsData.title}</h2>
        )}

        {cmsData.categories && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cmsData.categories.split(',').map((category, index) => (
              <span
                key={`${category.trim()}-${index}`}
                className="text-xs px-2 py-1 bg-base-700 rounded-lg text-base-300"
              >
                {category.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {cmsData.selectedpromotionid && userId && (
        <div className="flex gap-3 mb-4">
          <Button
            variant="outline"
            onClick={handleOptIn}
            disabled={optInLoading || optedIn || hasLeaderboardMission}
            className={cn(
              'min-w-[120px]',
              optInLoading || optedIn || hasLeaderboardMission
                ? 'bg-base-700 text-base-400 border-base-700 cursor-not-allowed'
                : '',
            )}
          >
            {optInLoading
              ? 'Opting In...'
              : optedIn || hasLeaderboardMission
                ? 'Opted In'
                : 'Opt-In'}
          </Button>
          <Button
            variant="outline"
            onClick={handleLeaderboard}
            className="min-w-[120px]"
          >
            View Leaderboard
          </Button>
        </div>
      )}
      {optInError && (
        <div className="text-red-400 text-sm mb-2">{optInError}</div>
      )}

      {/* Main Offer Content */}
      {cmsData.mainofferitem && (
        <div className="prose prose-invert max-w-none">
          <div
            className={cn('markdown', styles['promotion-markdown'])}
            dangerouslySetInnerHTML={{ __html: cmsData.mainofferitem }}
          />
        </div>
      )}

      {/* Additional offer details if available */}
      {cmsData.offerdetails && (
        <div className="prose prose-invert max-w-none">
          <div
            className={cn(
              'markdown text-sm text-base-300',
              styles['promotion-markdown'],
            )}
            dangerouslySetInnerHTML={{ __html: cmsData.offerdetails }}
          />
        </div>
      )}

      {/* External Link */}
      {/* {cmsData.detailedofferlink && (
        <div className="mt-6 pt-4 border-t border-base-700">
          <a
            href={cmsData.detailedofferlink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 body-txtColor-1 text-sm font-medium rounded-lg transition-colors"
          >
            View Full Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )} */}
    </div>
  );
};

export default PromotionDetails;
