import { type ApiMission } from 'api/content/content.types';
import { type AxiosResponse } from 'axios';
import { type Mission } from './slice';

export const handleResponse = (
  response: AxiosResponse<ApiMission[]>,
): Mission[] => {
  const { data } = response;

  const missions = data.map((mission) => ({
    id: mission.missionId,
    href: mission.missionIconUrl,
    name: mission.missionName,
    progress: mission.missionProgressPerc,
    disabled: mission.rewarded,
    received: mission.rewarded,
    value: mission.coins,
  }));

  return missions;
};
