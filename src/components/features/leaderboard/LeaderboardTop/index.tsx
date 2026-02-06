import { formatNumber } from 'helpers/numbers';
import { cn } from 'helpers/ui';
import type { UserLeaderboard } from 'api/loyalty/loyalty.models';
import { Avatar, AvatarImage } from 'components/shared/ui/Avatar';
import { faker } from '@faker-js/faker';

export const LEADERBOARD_TOP_STYLES = [
  'to-[#FF7E08] h-32 order-2',
  'to-[#09ECD1] h-28 order-1',
  'to-[#D12CDF] h-24 order-3',
];

type LeaderboardTopProps = {
  leaderboard: UserLeaderboard[];
};

const LeaderboardTop = ({ leaderboard }: LeaderboardTopProps) => {
  return (
    <div className="flex gap-3 mb-3 xl:mb-0 items-end pt-8 xl:p-5 xl:bg-base-900 xl:rounded-xl xl:justify-center xl:pt-12">
      {/* Find the current user id (the one with a non-numeric username or matching the username in state) */}
      {(() => {
        const currentUser = leaderboard.find(
          (u) => u.username && isNaN(Number(u.username)),
        );
        const currentUserId = currentUser ? currentUser.id : null;
        return leaderboard.map(
          ({ place, username, avatar, value, id }, index) => {
            let displayUsername = username;
            if (!currentUserId || id !== currentUserId) {
              const randomName = faker.person.firstName().toLowerCase();
              displayUsername = `${randomName}****.com`;
            }
            return (
              <div
                key={id}
                className={cn(
                  'bg-gradient-to-t from-black to-90% flex-1 backdrop-blur-[210px] rounded-t-xl relative flex flex-col items-center justify-end pb-4 xl:max-w-[186px]',
                  LEADERBOARD_TOP_STYLES[index],
                )}
              >
                <div className="p-1 background-2 h-fit w-fit rounded-full absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3/4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatar} className="object-cover" />
                  </Avatar>
                </div>
                <div className="w-5 h-5 rounded-full background-2 flex items-center justify-center mb-1">
                  <span className="font-bold text-xs">{place}</span>
                </div>
                <p
                  className="text-xs text-base-200 break-words max-w-[120px] truncate text-center"
                  title={displayUsername}
                >
                  {displayUsername}
                </p>
                <span className="text-primary-1 text-sm font-medium">
                  {formatNumber(value, 0)}
                </span>
              </div>
            );
          },
        );
      })()}
    </div>
  );
};

export default LeaderboardTop;
