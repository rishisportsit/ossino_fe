import { type AxiosResponse } from 'axios';
import { differenceInDays } from 'date-fns';
import { type GetDailyRewardsResponseData } from 'api/loyalty/loyalty.types';
import { type Reward } from './slice';

export const handleResponse = (
  response: AxiosResponse<GetDailyRewardsResponseData>,
): Reward[] => {
  const { dailyRewardsList } = response.data;

  const rewards = dailyRewardsList.map((reward) => {
    const availableAt = differenceInDays(
      new Date(),
      new Date(reward.unlockDate),
    );

    return {
      id: reward.rewardId,
      value: reward.coins,
      opened: reward.isRead,
      available_at: availableAt,
    };
  });

  return rewards;
};
