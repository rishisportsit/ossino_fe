import { getMissions, type Mission } from 'store/missions/slice';
import MissionCard from 'components/shared/MissionCard';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import { useAppDispatch } from 'store/index';

type MissionListProps = {
  missions: Mission[];
  onClick?: (value: number) => void;
};

const MissionList = ({ missions, onClick }: MissionListProps) => {
  const dispatch = useAppDispatch();
  const handleMissionClick = async (mission: Mission) => {
    const response = await LoyaltyApi.claimPromotion(mission.promotionId);
    if (response && response.data && response.data.code == 1000) {
      if (onClick) {
        onClick(mission.prizeAmount);
        dispatch(getMissions());
      }
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 xl:p-5 xl:bg-base-800 xl:rounded-xl">
      {missions.map((mission) => (
        <MissionCard
          key={mission.promotionId}
          data={mission}
          onClick={() => handleMissionClick(mission)}
          imgClassName="md:aspect-[1/0.75] xl:aspect-square"
        />
      ))}
    </div>
  );
};

export default MissionList;
