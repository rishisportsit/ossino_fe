import type { ApiBadge } from 'api/content/content.types';
import type { AxiosResponse } from 'axios';
import type { Badge } from './slice';

export const handleResponse = (
  response: AxiosResponse<ApiBadge[]>,
): Badge[] => {
  const badges = response.data;

  const parsedBadges = badges.map((badge) => {
    return {
      id: badge.badgeId,
      href: badge.logoUrl,
      total: badge.totalMilestones,
      completed: badge.currentMilestone,
      name: badge.badgeName,
    };
  });

  return parsedBadges;
};
