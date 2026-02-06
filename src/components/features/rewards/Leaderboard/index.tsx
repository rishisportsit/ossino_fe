import LinkWithArrow from 'components/shared/ui/LinkWithArrow';
import LeaderboardTable from '../LeaderboardTable';

const Leaderboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Leaderboard</h2>
        <LinkWithArrow to="leaderboard">See all</LinkWithArrow>
      </div>
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
