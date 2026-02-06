import { useState } from 'react';

import DialogCoins from 'components/shared/DialogCoins';
import RewardsList from '../RewardsList';

const DailyRewards = () => {
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  return (
    <>
      <RewardsList onSelectReward={setSelectedReward} />
      <DialogCoins
        title="Congratulations!"
        value={selectedReward}
        onClose={() => setSelectedReward(null)}
        description="You've won"
        currency="Coins"
      />
    </>
  );
};

export default DailyRewards;
