import { LeaderboardData } from 'api/loyalty/loyalty.models';
import type { GetLeaderBoardResponseData } from 'api/loyalty/loyalty.types';
import type { AxiosResponse } from 'axios';

export const handleResponse = (
  response: AxiosResponse<GetLeaderBoardResponseData>,
): LeaderboardData => {
  const { leaderBoard, playerRewardDetails } = response.data;

  const userLeaderboard = leaderBoard.map((item) => ({
    id: item.userId,
    place: item.rank,
    username: item.userName,
    avatar: item.userImageUrl,
    value: item.score,
  }));

  return {
    leaderboard: userLeaderboard,
    userPosition: playerRewardDetails.position,
  };
};
