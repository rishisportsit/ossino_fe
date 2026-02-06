import ErrorMessage from 'components/shared/ErrorMessage';
import MissionCardSkeleton from 'components/shared/MissionCardSkeleton';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectFilteredMissions,
  selectMissionsError,
  selectMissionsLoading,
} from 'store/missions/selectors';
import { getMissions } from 'store/missions/slice';
import MissionList from '../MissionsList';

enum TabValue {
  Live = 'live',
  Completed = 'completed',
}

type Tab = {
  label: string;
  value: TabValue;
};

const options: Tab[] = [
  {
    label: 'Live',
    value: TabValue.Live,
  },
  {
    label: 'Completed',
    value: TabValue.Completed,
  },
];

type MissionsTabsProps = {
  onSelectReward: (reward: number) => void;
};

const MissionsTabs = ({ onSelectReward }: MissionsTabsProps) => {
  const dispatch = useAppDispatch();

  const filteredMissions = useAppSelector(selectFilteredMissions);
  const missionsError = useAppSelector(selectMissionsError);
  const missionsLoading = useAppSelector(selectMissionsLoading);

  const [currentTab, setCurrentTab] = useState<string>(options[0].value);

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  if (missionsError) {
    const { message } = missionsError;

    return (
      <div className="flex flex-col justify-center h-[338px] xl:bg-base-800 xl:rounded-xl">
        <ErrorMessage message={message} />
      </div>
    );
  }

  const renderTab = (value: TabValue) => {
    if (missionsLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 xl:p-5 xl:bg-base-800 xl:rounded-xl">
          {Array.from({ length: 2 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MissionCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    const missions = filteredMissions?.[value];

    if (!missions || missions.length === 0) {
      const noMissionsMessage =
        currentTab === TabValue.Live
          ? 'No live missions'
          : 'No completed missions';

      return (
        <div className="flex flex-col justify-center h-[338px] xl:bg-base-800 xl:rounded-xl">
          <NoItemsMessage message={noMissionsMessage} />
        </div>
      );
    }

    return <MissionList missions={missions} onClick={onSelectReward} />;
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
      <TabsList>
        {options.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="font-medium w-32">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map(({ value }) => (
        <TabsContent key={value} value={value}>
          {renderTab(value)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MissionsTabs;
