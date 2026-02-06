import { useState } from 'react';

import { type Badge } from 'store/badges/slice';
import DialogBadge from '../DialogBadge';
import BadgesList from '../BadgesList';

const Badges = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const onModalClose = () => {
    setSelectedBadge(null);
  };

  return (
    <>
      <div className="pb-16 px-4 xl:px-5">
        <BadgesList setSelectedBadge={setSelectedBadge} />
      </div>
      <DialogBadge data={selectedBadge} onClose={onModalClose} />
    </>
  );
};

export default Badges;
