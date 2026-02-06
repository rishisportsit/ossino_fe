import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import LeaderboardSkeleton from '../LeaderboardSkeleton';
import LeaderboardTable from '../LeaderboardTable';
import LeaderboardTop from '../LeaderboardTop';

const Leaderboard = ({
  loading,
  error,
  data,
  onClose,
}: {
  loading?: boolean;
  error?: any;
  data?: any;
  onClose?: () => void;
}) => {
  if (error) {
    const { message } = error;
    return (
      <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl xl:flex-1 flex justify-center items-center h-[332px]">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (loading) {
    return <LeaderboardSkeleton />;
  }

  if (!data) {
    return (
      <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl xl:flex-1 flex justify-center items-center h-[332px]">
        <NoItemsMessage message="No leaderboard data" />
      </div>
    );
  }

  return (
    <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl xl:flex-1">
      {onClose && (
        <button
          className="mb-4 px-4 py-2 bg-base-700 body-txtColor-1 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      )}
      <LeaderboardTop leaderboard={data.top} />
      <LeaderboardTable leaderboard={data.others} />
    </div>
  );
};

export default Leaderboard;
