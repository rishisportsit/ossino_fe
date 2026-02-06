import { Drawer, DrawerContent } from 'components/shared/ui/Drawer';
import Icon from 'components/shared/Icon';
import status from '/icons/statusUp.svg?url';
import StatsBlock from 'components/features/game-detail/StatsBlock';
import DailyRaceBlock from 'components/features/game-detail/DailyRaceBlock';

interface MobileStatsMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileStatsMenu = ({ open, onClose }: MobileStatsMenuProps) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="h-auto pb-6 bg-base-700">
        <h3 className="flex items-center gap-2 text-base">
          <Icon
            id="statusUpIcon"
            href={status}
            className="w-4 h-4 fill-current  body-txtColor-1"
          />
          Live Stats
        </h3>
        <StatsBlock />
        <DailyRaceBlock />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileStatsMenu;
