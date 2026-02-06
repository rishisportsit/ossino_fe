import DialogCoins from 'components/shared/DialogCoins';
import { useState } from 'react';
import MissionsTabs from '../MissionsTabs';

const Missions = () => {
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  return (
    <>
      <div className="pb-16 px-4 xl:px-5">
        <MissionsTabs onSelectReward={setSelectedReward} />
      </div>
      <DialogCoins
        value={selectedReward}
        onClose={() => setSelectedReward(null)}
        description="Your account has been credited with"
        currency="coins"
      />
    </>
  );
};

export default Missions;
