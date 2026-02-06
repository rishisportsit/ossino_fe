import type { CoinHistory } from 'store/coinsHistory/types';
import CoinsHistoryItem from '../CoinsHistoryItem/CoinsHistoryItem';

const CoinsHistoryList = ({
  coinsHistory,
  currentTab,
}: {
  coinsHistory: CoinHistory[];
  currentTab: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {coinsHistory.map((history) => (
        <CoinsHistoryItem 
          history={history} 
          key={history.id}
          isBurnTab={currentTab === 'burns'}
        />
      ))}
    </div>
  );
};

export default CoinsHistoryList;